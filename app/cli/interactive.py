"""
命令行交互式界面 - 用于快速测试核心逻辑
"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app.database import SessionLocal, init_db
from app.models.user import User
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
from app.models.chat_session import ChatSession, SessionStatus, SessionType
from app.services.chat_service import ChatService
from app.services.insight_service import InsightService
from app.services.exploration_service import ExplorationService
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, IntPrompt
from rich.table import Table
from rich import print as rprint

console = Console()


class JoyFormulaCLI:
    def __init__(self):
        self.db = SessionLocal()
        self.user = None
        self.current_session = None

    def start(self):
        """启动CLI"""
        console.print(Panel.fit(
            "[bold cyan]🎉 欢迎使用 JoyFormula[/bold cyan]\n"
            "[dim]基于 AI 的快乐心理健康助手[/dim]",
            border_style="cyan"
        ))

        # 获取或创建用户
        user_id = Prompt.ask("\n请输入你的用户ID", default="demo_user")
        self.user = self.db.query(User).filter(User.user_identifier == user_id).first()

        if not self.user:
            self.user = User(user_identifier=user_id, display_name=f"用户_{user_id}")
            self.db.add(self.user)
            self.db.commit()
            console.print(f"[green]✓[/green] 创建新用户: {user_id}")
        else:
            console.print(f"[green]✓[/green] 欢迎回来，{self.user.display_name}!")

        self.main_menu()

    def main_menu(self):
        """主菜单"""
        while True:
            console.print("\n" + "="*50)
            console.print("[bold]主菜单[/bold]")
            console.print("1. 📝 创建快乐卡片（和Joy Coach聊天）")
            console.print("2. 📚 查看我的快乐卡片")
            console.print("3. 💡 生成快乐定律")
            console.print("4. 🎁 快乐盲盒推荐")
            console.print("5. 🔄 切换AI提供商")
            console.print("0. 退出")

            choice = Prompt.ask("\n请选择", choices=["0", "1", "2", "3", "4", "5"])

            if choice == "0":
                console.print("[yellow]再见！希望你每天都快乐 😊[/yellow]")
                break
            elif choice == "1":
                self.create_joy_card()
            elif choice == "2":
                self.view_cards()
            elif choice == "3":
                self.generate_insights()
            elif choice == "4":
                self.explore_joy()
            elif choice == "5":
                self.switch_ai_provider()

    def create_joy_card(self):
        """创建快乐卡片"""
        console.print("\n[bold cyan]开始和Joy Coach对话[/bold cyan]")
        console.print("[dim]提示：直接分享让你快乐的事，AI会引导你完善细节[/dim]\n")

        # 创建会话
        session = ChatSession(
            user_id=self.user.id,
            session_type=SessionType.CARD_CREATION
        )
        self.db.add(session)
        self.db.commit()

        # 初始消息
        initial = ChatService.start_conversation()
        session.messages = [{"role": "assistant", "content": initial["initial_message"]}]
        self.db.commit()

        console.print(f"[bold green]Joy Coach:[/bold green] {initial['initial_message']}\n")

        # 对话循环
        while session.status == SessionStatus.ACTIVE:
            user_input = Prompt.ask("[bold blue]你[/bold blue]")

            if user_input.lower() in ['退出', 'quit', 'exit']:
                session.status = SessionStatus.ABANDONED
                self.db.commit()
                console.print("[yellow]对话已结束[/yellow]")
                break

            # 处理消息
            result = ChatService.process_message(session.messages, user_input)

            # 更新会话
            session.messages = result["updated_history"]

            # 显示回复
            console.print(f"\n[bold green]Joy Coach:[/bold green] {result['assistant_reply']}\n")

            # 如果完成
            if result["is_complete"]:
                formula = result["formula"]["formula"]
                card = JoyCard(
                    user_id=self.user.id,
                    raw_input=user_input,
                    formula_scene=formula.get("scene"),
                    formula_people=formula.get("people"),
                    formula_event=formula.get("event"),
                    formula_trigger=formula.get("trigger"),
                    formula_sensation=formula.get("sensation"),
                    card_summary=result["formula"]["card_summary"],
                    conversation_history=session.messages
                )
                self.db.add(card)
                session.status = SessionStatus.COMPLETED
                session.joy_card_id = card.id
                self.db.commit()

                # 显示卡片
                console.print("\n" + "="*50)
                console.print(Panel(
                    f"[bold]{card.card_summary}[/bold]\n\n"
                    f"🎬 场景: {card.formula_scene}\n"
                    f"👥 人物: {card.formula_people}\n"
                    f"📌 事情: {card.formula_event}\n"
                    f"✨ 诱因: {card.formula_trigger}\n"
                    f"💫 感受: {card.formula_sensation}",
                    title="[bold green]✓ 快乐卡片生成成功[/bold green]",
                    border_style="green"
                ))
                break
            else:
                self.db.commit()

        Prompt.ask("\n按回车返回主菜单")

    def view_cards(self):
        """查看卡片"""
        cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).all()

        if not cards:
            console.print("[yellow]你还没有快乐卡片，去创建第一张吧！[/yellow]")
            return

        console.print(f"\n[bold]你有 {len(cards)} 张快乐卡片[/bold]\n")

        table = Table(show_header=True, header_style="bold cyan")
        table.add_column("#", width=3)
        table.add_column("摘要", width=40)
        table.add_column("创建时间", width=20)

        for idx, card in enumerate(cards, 1):
            table.add_row(
                str(idx),
                card.card_summary[:37] + "..." if len(card.card_summary) > 40 else card.card_summary,
                card.created_at.strftime("%Y-%m-%d %H:%M")
            )

        console.print(table)

        # 查看详情
        detail = Prompt.ask("\n输入编号查看详情（回车返回）", default="")
        if detail.isdigit() and 1 <= int(detail) <= len(cards):
            card = cards[int(detail) - 1]
            console.print(Panel(
                f"[bold]{card.card_summary}[/bold]\n\n"
                f"🎬 场景: {card.formula_scene}\n"
                f"👥 人物: {card.formula_people}\n"
                f"📌 事情: {card.formula_event}\n"
                f"✨ 诱因: {card.formula_trigger}\n"
                f"💫 感受: {card.formula_sensation}\n\n"
                f"[dim]原始记录: {card.raw_input}[/dim]",
                title=f"[bold cyan]卡片 #{detail}[/bold cyan]",
                border_style="cyan"
            ))
            Prompt.ask("\n按回车继续")

    def generate_insights(self):
        """生成定律"""
        cards = self.db.query(JoyCard).filter(JoyCard.user_id == self.user.id).all()

        if len(cards) < 5:
            console.print(f"[yellow]需要至少5张卡片才能生成定律，当前有{len(cards)}张[/yellow]")
            return

        console.print(f"\n[bold]基于你的 {len(cards)} 张卡片生成快乐定律...[/bold]")

        try:
            with console.status("[bold green]AI 正在分析你的快乐模式..."):
                insights_data = InsightService.generate_insights(cards)

            # 保存定律
            for insight_data in insights_data:
                insight = JoyInsight(
                    user_id=self.user.id,
                    insight_text=insight_data["insight"],
                    pattern_type=insight_data.get("pattern_type"),
                    evidence_cards=insight_data.get("evidence", [])
                )
                self.db.add(insight)

            self.db.commit()

            console.print(f"\n[bold green]✓ 成功生成 {len(insights_data)} 条快乐定律[/bold green]\n")

            # 显示定律
            for idx, insight_data in enumerate(insights_data, 1):
                console.print(Panel(
                    f"[bold]{insight_data['insight']}[/bold]\n\n"
                    f"[dim]模式类型: {insight_data.get('pattern_type', '未分类')}[/dim]",
                    title=f"[bold cyan]定律 #{idx}[/bold cyan]",
                    border_style="cyan"
                ))

        except Exception as e:
            console.print(f"[red]生成失败: {str(e)}[/red]")

        Prompt.ask("\n按回车返回主菜单")

    def explore_joy(self):
        """快乐盲盒"""
        insights = self.db.query(JoyInsight).filter(JoyInsight.user_id == self.user.id).all()
        recent_cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).limit(5).all()

        if not insights and len(recent_cards) < 3:
            console.print("[yellow]数据不足，需要至少3张快乐卡片或1条快乐定律[/yellow]")
            return

        console.print("\n[bold cyan]🎁 快乐盲盒[/bold cyan]")
        energy = IntPrompt.ask("你现在的能量值是多少？", default=5, show_default=True)

        if not 1 <= energy <= 10:
            console.print("[red]能量值请输入1-10之间的数字[/red]")
            return

        console.print(f"\n[bold]基于你的能量值 {energy}/10 生成推荐...[/bold]")

        try:
            with console.status("[bold green]AI 正在为你定制快乐方案..."):
                recommendations = ExplorationService.recommend(
                    energy_level=energy,
                    insights=insights,
                    recent_cards=recent_cards
                )

            console.print(f"\n[bold green]✓ 为你准备了 {len(recommendations)} 个快乐探索方案[/bold green]\n")

            for idx, rec in enumerate(recommendations, 1):
                console.print(Panel(
                    f"[bold]{rec['title']}[/bold]\n\n"
                    f"{rec['description']}\n\n"
                    f"[dim]适合原因: {rec.get('energy_match', '基于你的历史快乐模式')}[/dim]",
                    title=f"[bold cyan]推荐 #{idx}[/bold cyan]",
                    border_style="cyan"
                ))

        except Exception as e:
            console.print(f"[red]推荐失败: {str(e)}[/red]")

        Prompt.ask("\n按回车返回主菜单")

    def switch_ai_provider(self):
        """切换AI提供商"""
        from app.config import settings
        from app.services.ai_service import ai_service

        console.print("\n[bold]当前AI提供商:[/bold]", settings.AI_PROVIDER)
        console.print("\n可用选项:")
        console.print("1. anthropic (Claude)")
        console.print("2. openai (GPT)")
        console.print("3. gemini (Google)")
        console.print("4. custom (自定义端点)")

        choice = Prompt.ask("选择提供商", choices=["1", "2", "3", "4"])

        provider_map = {
            "1": "anthropic",
            "2": "openai",
            "3": "gemini",
            "4": "custom"
        }

        new_provider = provider_map[choice]
        settings.AI_PROVIDER = new_provider
        ai_service.__init__(new_provider)

        console.print(f"[green]✓ 已切换到 {new_provider}[/green]")
        Prompt.ask("\n按回车返回主菜单")


def main():
    # 初始化数据库
    init_db()

    # 启动CLI
    cli = JoyFormulaCLI()
    try:
        cli.start()
    except KeyboardInterrupt:
        console.print("\n[yellow]程序已退出[/yellow]")
    except Exception as e:
        console.print(f"\n[red]错误: {str(e)}[/red]")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
