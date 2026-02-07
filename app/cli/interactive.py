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
from app.i18n import t, set_language, get_language
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, IntPrompt
from rich.table import Table
from rich import print as rprint

console = Console()


def _format_card_content(card):
    """格式化卡片内容文本"""
    return (
        f"[bold]{card.card_summary}[/bold]\n\n"
        f"{t('label_scene')}: {card.formula_scene}\n"
        f"{t('label_people')}: {card.formula_people}\n"
        f"{t('label_event')}: {card.formula_event}\n"
        f"{t('label_trigger')}: {card.formula_trigger}\n"
        f"{t('label_sensation')}: {card.formula_sensation}"
    )


class JoyFormulaCLI:
    def __init__(self):
        self.db = SessionLocal()
        self.user = None
        self.current_session = None

    def start(self):
        """启动CLI"""
        # 先输入用户ID，再决定语言
        console.print("\n[dim]JoyFormula[/dim]")
        user_id = Prompt.ask("\n请输入用户ID / Enter user ID", default="demo_user")
        self.user = self.db.query(User).filter(User.user_identifier == user_id).first()

        if self.user and self.user.language:
            # 老用户：使用已存的语言偏好
            set_language(self.user.language)
            console.print(Panel.fit(
                t("welcome_title"),
                border_style="cyan"
            ))
            console.print(t("user_welcome_back", display_name=self.user.display_name))
        else:
            # 新用户或无语言记录：让用户选择
            console.print("\n[bold]1. 中文[/bold]")
            console.print("[bold]2. English[/bold]")
            lang_choice = Prompt.ask("选择语言 / Choose language", choices=["1", "2"], default="2")
            lang = "zh" if lang_choice == "1" else "en"
            set_language(lang)

            console.print(Panel.fit(
                t("welcome_title"),
                border_style="cyan"
            ))

            if not self.user:
                self.user = User(
                    user_identifier=user_id,
                    display_name=t("default_display_name", user_id=user_id),
                    language=lang
                )
                self.db.add(self.user)
                self.db.commit()
                console.print(t("user_created", user_id=user_id))
            else:
                # 老用户但没存过语言
                self.user.language = lang
                self.db.commit()
                console.print(t("user_welcome_back", display_name=self.user.display_name))

        self.main_menu()

    def main_menu(self):
        """主菜单"""
        while True:
            console.print("\n" + "="*50)
            console.print(t("menu_title"))
            console.print(t("menu_1"))
            console.print(t("menu_2"))
            console.print(t("menu_3"))
            console.print(t("menu_4"))
            console.print(t("menu_5"))
            console.print(t("menu_6"))
            console.print(t("menu_7"))
            console.print(t("menu_0"))

            choice = Prompt.ask(t("menu_prompt"), choices=["0", "1", "2", "3", "4", "5", "6", "7"])

            if choice == "0":
                console.print(t("menu_goodbye"))
                break
            elif choice == "1":
                self.create_joy_card()
            elif choice == "2":
                self.view_cards()
            elif choice == "3":
                self.generate_insights()
            elif choice == "4":
                self.view_insights()
            elif choice == "5":
                self.explore_joy()
            elif choice == "6":
                self.switch_ai_provider()
            elif choice == "7":
                self.switch_language()

    def create_joy_card(self):
        """创建快乐卡片"""
        console.print(f"\n{t('chat_start_title')}")
        console.print(t("chat_hint"))

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

        console.print(f"{t('chat_joy_coach')} {initial['initial_message']}\n")

        # 对话循环
        draft_card = None

        while session.status == SessionStatus.ACTIVE:
            user_input = Prompt.ask(t("chat_you"))

            if user_input.lower() in ['退出', 'quit', 'exit']:
                session.status = SessionStatus.ABANDONED
                self.db.commit()
                console.print(t("chat_ended"))
                break

            if user_input.lower() in ['完成', 'done']:
                if draft_card:
                    # 最终更新 raw_input 和 conversation_history
                    draft_card.raw_input = "\n".join(
                        msg["content"] for msg in session.messages if msg["role"] == "user"
                    )
                    draft_card.conversation_history = session.messages
                    session.status = SessionStatus.COMPLETED
                    self.db.commit()
                    console.print("\n" + "="*50)
                    console.print(Panel(
                        _format_card_content(draft_card),
                        title=t("card_saved_title"),
                        border_style="green"
                    ))
                else:
                    console.print(t("chat_no_card_yet"))
                    continue
                break

            # 语音输入处理
            if user_input.startswith("/voice"):
                voice_result = self._handle_voice_input(user_input, session)
                if voice_result is None:
                    continue
                result = voice_result
            else:
                # 处理文本消息
                result = ChatService.process_message(session.messages, user_input)

            # 更新会话
            session.messages = result["updated_history"]

            # 显示回复
            console.print(f"\n{t('chat_joy_coach')} {result['assistant_reply']}\n")

            # 如果检测到公式，创建/更新草稿卡片
            if result["is_complete"]:
                formula = result["formula"]["formula"]
                all_user_inputs = "\n".join(
                    msg["content"] for msg in session.messages if msg["role"] == "user"
                )

                if draft_card is None:
                    draft_card = JoyCard(
                        user_id=self.user.id,
                        raw_input=all_user_inputs,
                        formula_scene=formula.get("scene"),
                        formula_people=formula.get("people"),
                        formula_event=formula.get("event"),
                        formula_trigger=formula.get("trigger"),
                        formula_sensation=formula.get("sensation"),
                        card_summary=result["formula"]["card_summary"],
                        conversation_history=session.messages
                    )
                    self.db.add(draft_card)
                    session.joy_card_id = draft_card.id
                else:
                    draft_card.raw_input = all_user_inputs
                    draft_card.formula_scene = formula.get("scene")
                    draft_card.formula_people = formula.get("people")
                    draft_card.formula_event = formula.get("event")
                    draft_card.formula_trigger = formula.get("trigger")
                    draft_card.formula_sensation = formula.get("sensation")
                    draft_card.card_summary = result["formula"]["card_summary"]
                    draft_card.conversation_history = session.messages

                self.db.commit()

                # 显示草稿卡片
                console.print(Panel(
                    _format_card_content(draft_card),
                    title=t("card_draft_title"),
                    border_style="yellow"
                ))
                console.print(t("draft_continue_hint"))
            else:
                self.db.commit()

        Prompt.ask(t("press_enter_return"))

    def _handle_voice_input(self, user_input: str, session):
        """处理 /voice 命令，返回处理结果或 None（失败时）"""
        from app.config import settings

        # 检查是否为 Gemini
        if settings.AI_PROVIDER != "gemini":
            console.print(t("voice_requires_gemini"))
            return None

        parts = user_input.split(maxsplit=1)
        if len(parts) < 2 or not parts[1].strip():
            console.print(t("voice_usage_hint"))
            return None

        file_path = os.path.expanduser(parts[1].strip())
        if not os.path.isabs(file_path):
            file_path = os.path.abspath(file_path)

        if not os.path.exists(file_path):
            console.print(t("voice_file_not_found", path=file_path))
            return None

        # 检查格式
        ext_to_mime = {
            ".wav": "audio/wav",
            ".mp3": "audio/mpeg",
            ".m4a": "audio/mp4",
            ".webm": "audio/webm",
            ".ogg": "audio/ogg",
        }
        ext = os.path.splitext(file_path)[1].lower()
        mime_type = ext_to_mime.get(ext)
        if not mime_type:
            console.print(t("voice_unsupported_format", ext=ext))
            return None

        # 读取文件并处理
        console.print(t("voice_processing"))
        with open(file_path, "rb") as f:
            audio_bytes = f.read()

        result = ChatService.process_voice_message(
            session.messages, audio_bytes, mime_type
        )

        # 显示转录结果
        if result.get("transcribed_text"):
            console.print(t("voice_transcribed", text=result["transcribed_text"]))

        return result

    def view_cards(self):
        """查看卡片"""
        cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).all()

        if not cards:
            console.print(t("no_cards_yet"))
            return

        console.print(t("card_count_header", count=len(cards)))

        table = Table(show_header=True, header_style="bold cyan")
        table.add_column("#", width=3)
        table.add_column(t("col_summary"), width=40)
        table.add_column(t("col_created_at"), width=20)

        for idx, card in enumerate(cards, 1):
            table.add_row(
                str(idx),
                card.card_summary[:37] + "..." if len(card.card_summary) > 40 else card.card_summary,
                card.created_at.strftime("%Y-%m-%d %H:%M")
            )

        console.print(table)

        # 查看详情
        detail = Prompt.ask(t("view_detail_prompt"), default="")
        if detail.isdigit() and 1 <= int(detail) <= len(cards):
            card = cards[int(detail) - 1]
            console.print(Panel(
                _format_card_content(card) + f"\n\n[dim]{t('label_raw_input')}: {card.raw_input}[/dim]",
                title=t("card_detail_title", num=detail),
                border_style="cyan"
            ))
            Prompt.ask(t("press_enter_continue"))

    def generate_insights(self):
        """生成定律"""
        cards = self.db.query(JoyCard).filter(JoyCard.user_id == self.user.id).all()

        if len(cards) < 5:
            console.print(t("min_cards_needed", count=len(cards)))
            return

        console.print(t("generating_insights_header", count=len(cards)))

        try:
            with console.status(t("generating_insights_status")):
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

            console.print(t("insights_generated", count=len(insights_data)))

            # 显示定律
            for idx, insight_data in enumerate(insights_data, 1):
                console.print(Panel(
                    f"[bold]{insight_data['insight']}[/bold]\n\n"
                    f"[dim]{t('label_pattern_type')}: {insight_data.get('pattern_type', t('label_uncategorized'))}[/dim]",
                    title=t("insight_title", num=idx),
                    border_style="cyan"
                ))

        except Exception as e:
            console.print(t("generation_failed", error=str(e)))

        Prompt.ask(t("press_enter_return"))

    def view_insights(self):
        """查看快乐定律"""
        insights = self.db.query(JoyInsight).filter(
            JoyInsight.user_id == self.user.id
        ).order_by(JoyInsight.created_at.desc()).all()

        if not insights:
            console.print(t("no_insights_yet"))
            return

        console.print(t("insight_count_header", count=len(insights)))

        table = Table(show_header=True, header_style="bold cyan")
        table.add_column("#", width=3)
        table.add_column(t("col_insight"), width=40)
        table.add_column(t("col_pattern_type"), width=12)
        table.add_column(t("col_status"), width=8)
        table.add_column(t("col_generated_at"), width=16)

        for idx, insight in enumerate(insights, 1):
            status = ""
            if insight.is_confirmed:
                status = t("label_confirmed")
            elif insight.is_rejected:
                status = t("label_rejected")

            text = insight.insight_text
            if len(text) > 37:
                text = text[:37] + "..."

            table.add_row(
                str(idx),
                text,
                insight.pattern_type or t("label_uncategorized"),
                status,
                insight.created_at.strftime("%Y-%m-%d %H:%M")
            )

        console.print(table)

        # 查看详情
        detail = Prompt.ask(t("view_detail_prompt"), default="")
        if detail.isdigit() and 1 <= int(detail) <= len(insights):
            insight = insights[int(detail) - 1]

            status = ""
            if insight.is_confirmed:
                status = t("label_confirmed_rich")
            elif insight.is_rejected:
                status = t("label_rejected_rich")

            # 构建证据卡片信息
            evidence_text = ""
            if insight.evidence_cards:
                evidence_text = f"\n\n{t('label_related_cards')}"
                for ev in insight.evidence_cards:
                    card_id = ev.get("card_id", "")
                    quote = ev.get("quote", "")
                    # 尝试查找卡片摘要
                    card = self.db.query(JoyCard).filter(JoyCard.id == card_id).first()
                    if card:
                        evidence_text += f"\n  • {card.card_summary}"
                        if quote:
                            evidence_text += f"\n    [dim]\"{quote}\"[/dim]"
                    elif quote:
                        evidence_text += f"\n  • [dim]\"{quote}\"[/dim]"

            console.print(Panel(
                f"[bold]{insight.insight_text}[/bold]\n\n"
                f"[dim]{t('label_pattern_type')}: {insight.pattern_type or t('label_uncategorized')}[/dim]\n"
                f"[dim]{t('col_generated_at')}: {insight.created_at.strftime('%Y-%m-%d %H:%M')}[/dim]"
                f"{status}"
                f"{evidence_text}",
                title=t("insight_title", num=detail),
                border_style="cyan"
            ))
            Prompt.ask(t("press_enter_continue"))

    def explore_joy(self):
        """快乐盲盒"""
        insights = self.db.query(JoyInsight).filter(JoyInsight.user_id == self.user.id).all()
        recent_cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).limit(5).all()

        if not insights and len(recent_cards) < 3:
            console.print(t("explore_insufficient_data"))
            return

        console.print(t("explore_title"))
        energy = IntPrompt.ask(t("energy_prompt"), default=5, show_default=True)

        if not 1 <= energy <= 10:
            console.print(t("energy_range_error"))
            return

        console.print(t("energy_generating", energy=energy))

        try:
            with console.status(t("energy_status")):
                recommendations = ExplorationService.recommend(
                    energy_level=energy,
                    insights=insights,
                    recent_cards=recent_cards
                )

            console.print(t("explore_generated", count=len(recommendations)))

            for idx, rec in enumerate(recommendations, 1):
                console.print(Panel(
                    f"[bold]{rec['title']}[/bold]\n\n"
                    f"{rec['description']}\n\n"
                    f"[dim]{t('label_energy_match')}: {rec.get('energy_match', t('label_energy_match_default'))}[/dim]",
                    title=t("explore_rec_title", num=idx),
                    border_style="cyan"
                ))

        except Exception as e:
            console.print(t("recommendation_failed", error=str(e)))

        Prompt.ask(t("press_enter_return"))

    def switch_ai_provider(self):
        """切换AI提供商"""
        from app.config import settings
        from app.services.ai_service import ai_service

        console.print(t("current_provider"), settings.AI_PROVIDER)
        console.print(t("available_options"))
        console.print("1. anthropic (Claude)")
        console.print("2. openai (GPT)")
        console.print("3. gemini (Google)")
        console.print(f"4. custom ({t('label_custom_endpoint')})")

        choice = Prompt.ask(t("provider_prompt"), choices=["1", "2", "3", "4"])

        provider_map = {
            "1": "anthropic",
            "2": "openai",
            "3": "gemini",
            "4": "custom"
        }

        new_provider = provider_map[choice]
        settings.AI_PROVIDER = new_provider
        ai_service.__init__(new_provider)

        console.print(t("provider_switched", provider=new_provider))
        Prompt.ask(t("press_enter_return"))

    def switch_language(self):
        """切换语言"""
        console.print("\n[bold]1. 中文[/bold]")
        console.print("[bold]2. English[/bold]")
        lang_choice = Prompt.ask(t("language_prompt"), choices=["1", "2"])
        lang = "zh" if lang_choice == "1" else "en"
        set_language(lang)
        self.user.language = lang
        self.db.commit()
        console.print(t("language_switched"))


def main():
    # 初始化数据库
    init_db()

    # 启动CLI
    cli = JoyFormulaCLI()
    try:
        cli.start()
    except KeyboardInterrupt:
        console.print(t("program_exited"))
    except Exception as e:
        console.print(t("error_prefix", error=str(e)))
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
