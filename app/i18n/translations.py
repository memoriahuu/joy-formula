"""所有可翻译字符串和 AI 提示词"""

# ═══════════════════════════════════════════════════════
# CLI UI 翻译
# ═══════════════════════════════════════════════════════

TRANSLATIONS = {
    # ── 欢迎 & 认证 ──────────────────────────────────
    "welcome_title": {
        "zh": "[bold cyan]🎉 欢迎使用 JoyFormula[/bold cyan]\n[dim]基于 AI 的快乐心理健康助手[/dim]",
        "en": "[bold cyan]🎉 Welcome to JoyFormula[/bold cyan]\n[dim]AI-powered happiness & mental wellness assistant[/dim]",
    },
    "prompt_user_id": {
        "zh": "\n请输入你的用户ID",
        "en": "\nEnter your user ID",
    },
    "user_created": {
        "zh": "[green]✓[/green] 创建新用户: {user_id}",
        "en": "[green]✓[/green] New user created: {user_id}",
    },
    "user_welcome_back": {
        "zh": "[green]✓[/green] 欢迎回来，{display_name}!",
        "en": "[green]✓[/green] Welcome back, {display_name}!",
    },
    "default_display_name": {
        "zh": "用户_{user_id}",
        "en": "User_{user_id}",
    },

    # ── 主菜单 ──────────────────────────────────────
    "menu_title": {
        "zh": "[bold]主菜单[/bold]",
        "en": "[bold]Main Menu[/bold]",
    },
    "menu_1": {
        "zh": "1. 📝 创建快乐卡片（和Joy Coach聊天）",
        "en": "1. 📝 Create Joy Card (chat with Joy Coach)",
    },
    "menu_2": {
        "zh": "2. 📚 查看我的快乐卡片",
        "en": "2. 📚 View My Joy Cards",
    },
    "menu_3": {
        "zh": "3. 💡 生成快乐定律",
        "en": "3. 💡 Generate Joy Laws",
    },
    "menu_4": {
        "zh": "4. 🔍 查看快乐定律",
        "en": "4. 🔍 View Joy Laws",
    },
    "menu_5": {
        "zh": "5. 🎁 快乐盲盒推荐",
        "en": "5. 🎁 Joy Mystery Box",
    },
    "menu_6": {
        "zh": "6. 🔄 切换AI提供商",
        "en": "6. 🔄 Switch AI Provider",
    },
    "menu_7": {
        "zh": "7. 🌐 Language / 语言切换",
        "en": "7. 🌐 Language / 语言切换",
    },
    "menu_0": {
        "zh": "0. 退出",
        "en": "0. Exit",
    },
    "menu_prompt": {
        "zh": "\n请选择",
        "en": "\nYour choice",
    },
    "menu_goodbye": {
        "zh": "[yellow]再见！希望你每天都快乐 😊[/yellow]",
        "en": "[yellow]Goodbye! Wishing you happiness every day 😊[/yellow]",
    },

    # ── 创建卡片 ────────────────────────────────────
    "chat_start_title": {
        "zh": "[bold cyan]开始和Joy Coach对话[/bold cyan]",
        "en": "[bold cyan]Start chatting with Joy Coach[/bold cyan]",
    },
    "chat_hint": {
        "zh": "[dim]提示：直接分享让你快乐的事，AI会引导你完善细节\n输入 /voice 文件路径 发送语音（如：/voice ~/recording.wav）[/dim]\n",
        "en": "[dim]Tip: Share something that made you happy, and the AI will guide you through the details\nType /voice filepath to send audio (e.g.: /voice ~/recording.wav)[/dim]\n",
    },
    "chat_joy_coach": {
        "zh": "[bold green]Joy Coach:[/bold green]",
        "en": "[bold green]Joy Coach:[/bold green]",
    },
    "chat_you": {
        "zh": "[bold blue]你[/bold blue]",
        "en": "[bold blue]You[/bold blue]",
    },
    "chat_ended": {
        "zh": "[yellow]对话已结束[/yellow]",
        "en": "[yellow]Conversation ended[/yellow]",
    },
    "chat_no_card_yet": {
        "zh": "[yellow]还没有生成卡片，继续聊聊吧！[/yellow]",
        "en": "[yellow]No card generated yet, let's keep chatting![/yellow]",
    },
    "draft_continue_hint": {
        "zh": "[dim]你可以继续补充细节，或输入'完成'保存卡片[/dim]\n",
        "en": "[dim]You can continue adding details, or type 'done' to save the card[/dim]\n",
    },

    # ── 卡片标签（创建/查看/草稿共用）──────────────
    "label_scene": {
        "zh": "🎬 场景",
        "en": "🎬 Scene",
    },
    "label_people": {
        "zh": "👥 人物",
        "en": "👥 People",
    },
    "label_event": {
        "zh": "📌 事情",
        "en": "📌 Event",
    },
    "label_trigger": {
        "zh": "✨ 诱因",
        "en": "✨ Trigger",
    },
    "label_sensation": {
        "zh": "💫 感受",
        "en": "💫 Sensation",
    },
    "card_saved_title": {
        "zh": "[bold green]✓ 快乐卡片已保存[/bold green]",
        "en": "[bold green]✓ Joy Card Saved[/bold green]",
    },
    "card_draft_title": {
        "zh": "[bold yellow]📋 快乐卡片草稿[/bold yellow]",
        "en": "[bold yellow]📋 Joy Card Draft[/bold yellow]",
    },

    # ── 查看卡片 ────────────────────────────────────
    "no_cards_yet": {
        "zh": "[yellow]你还没有快乐卡片，去创建第一张吧！[/yellow]",
        "en": "[yellow]You don't have any joy cards yet. Go create your first one![/yellow]",
    },
    "card_count_header": {
        "zh": "\n[bold]你有 {count} 张快乐卡片[/bold]\n",
        "en": "\n[bold]You have {count} joy card(s)[/bold]\n",
    },
    "col_number": {
        "zh": "#",
        "en": "#",
    },
    "col_summary": {
        "zh": "摘要",
        "en": "Summary",
    },
    "col_created_at": {
        "zh": "创建时间",
        "en": "Created",
    },
    "view_detail_prompt": {
        "zh": "\n输入编号查看详情（回车返回）",
        "en": "\nEnter number to view details (press Enter to go back)",
    },
    "card_detail_title": {
        "zh": "[bold cyan]卡片 #{num}[/bold cyan]",
        "en": "[bold cyan]Card #{num}[/bold cyan]",
    },
    "label_raw_input": {
        "zh": "原始记录",
        "en": "Original record",
    },

    # ── 生成定律 ────────────────────────────────────
    "min_cards_needed": {
        "zh": "[yellow]需要至少5张卡片才能生成定律，当前有{count}张[/yellow]",
        "en": "[yellow]At least 5 cards are needed to generate Joy Laws. You currently have {count}.[/yellow]",
    },
    "generating_insights_header": {
        "zh": "\n[bold]基于你的 {count} 张卡片生成快乐定律...[/bold]",
        "en": "\n[bold]Generating Joy Laws from your {count} cards...[/bold]",
    },
    "generating_insights_status": {
        "zh": "[bold green]AI 正在分析你的快乐模式...",
        "en": "[bold green]AI is analyzing your happiness patterns...",
    },
    "insights_generated": {
        "zh": "\n[bold green]✓ 成功生成 {count} 条快乐定律[/bold green]\n",
        "en": "\n[bold green]✓ Successfully generated {count} Joy Law(s)[/bold green]\n",
    },
    "insight_title": {
        "zh": "[bold cyan]定律 #{num}[/bold cyan]",
        "en": "[bold cyan]Joy Law #{num}[/bold cyan]",
    },
    "label_pattern_type": {
        "zh": "模式类型",
        "en": "Pattern type",
    },
    "label_uncategorized": {
        "zh": "未分类",
        "en": "Uncategorized",
    },
    "generation_failed": {
        "zh": "[red]生成失败: {error}[/red]",
        "en": "[red]Generation failed: {error}[/red]",
    },

    # ── 查看定律 ────────────────────────────────────
    "no_insights_yet": {
        "zh": "[yellow]你还没有快乐定律，先积累5张卡片再去生成吧！[/yellow]",
        "en": "[yellow]You don't have any Joy Laws yet. Collect 5 cards first, then generate![/yellow]",
    },
    "insight_count_header": {
        "zh": "\n[bold]你有 {count} 条快乐定律[/bold]\n",
        "en": "\n[bold]You have {count} Joy Law(s)[/bold]\n",
    },
    "col_insight": {
        "zh": "定律",
        "en": "Joy Law",
    },
    "col_pattern_type": {
        "zh": "模式类型",
        "en": "Pattern",
    },
    "col_status": {
        "zh": "状态",
        "en": "Status",
    },
    "col_generated_at": {
        "zh": "生成时间",
        "en": "Generated",
    },
    "label_confirmed": {
        "zh": "✓ 已确认",
        "en": "✓ Confirmed",
    },
    "label_rejected": {
        "zh": "✗ 已否决",
        "en": "✗ Rejected",
    },
    "label_confirmed_rich": {
        "zh": " [green]✓ 已确认[/green]",
        "en": " [green]✓ Confirmed[/green]",
    },
    "label_rejected_rich": {
        "zh": " [red]✗ 已否决[/red]",
        "en": " [red]✗ Rejected[/red]",
    },
    "label_related_cards": {
        "zh": "[bold]关联的快乐卡片:[/bold]",
        "en": "[bold]Related Joy Cards:[/bold]",
    },

    # ── 快乐盲盒 ────────────────────────────────────
    "explore_insufficient_data": {
        "zh": "[yellow]数据不足，需要至少3张快乐卡片或1条快乐定律[/yellow]",
        "en": "[yellow]Not enough data. You need at least 3 joy cards or 1 Joy Law.[/yellow]",
    },
    "explore_title": {
        "zh": "\n[bold cyan]🎁 快乐盲盒[/bold cyan]",
        "en": "\n[bold cyan]🎁 Joy Mystery Box[/bold cyan]",
    },
    "energy_prompt": {
        "zh": "你现在的能量值是多少？",
        "en": "What's your current energy level?",
    },
    "energy_range_error": {
        "zh": "[red]能量值请输入1-10之间的数字[/red]",
        "en": "[red]Please enter a number between 1 and 10[/red]",
    },
    "energy_generating": {
        "zh": "\n[bold]基于你的能量值 {energy}/10 生成推荐...[/bold]",
        "en": "\n[bold]Generating recommendations based on your energy level {energy}/10...[/bold]",
    },
    "energy_status": {
        "zh": "[bold green]AI 正在为你定制快乐方案...",
        "en": "[bold green]AI is crafting your happiness plan...",
    },
    "explore_generated": {
        "zh": "\n[bold green]✓ 为你准备了 {count} 个快乐探索方案[/bold green]\n",
        "en": "\n[bold green]✓ {count} happiness exploration plan(s) ready for you[/bold green]\n",
    },
    "explore_rec_title": {
        "zh": "[bold cyan]推荐 #{num}[/bold cyan]",
        "en": "[bold cyan]Recommendation #{num}[/bold cyan]",
    },
    "label_energy_match": {
        "zh": "适合原因",
        "en": "Why it fits",
    },
    "label_energy_match_default": {
        "zh": "基于你的历史快乐模式",
        "en": "Based on your happiness patterns",
    },
    "recommendation_failed": {
        "zh": "[red]推荐失败: {error}[/red]",
        "en": "[red]Recommendation failed: {error}[/red]",
    },

    # ── AI 提供商 ───────────────────────────────────
    "current_provider": {
        "zh": "\n[bold]当前AI提供商:[/bold]",
        "en": "\n[bold]Current AI provider:[/bold]",
    },
    "available_options": {
        "zh": "\n可用选项:",
        "en": "\nAvailable options:",
    },
    "label_custom_endpoint": {
        "zh": "自定义端点",
        "en": "Custom endpoint",
    },
    "provider_prompt": {
        "zh": "选择提供商",
        "en": "Select provider",
    },
    "provider_switched": {
        "zh": "[green]✓ 已切换到 {provider}[/green]",
        "en": "[green]✓ Switched to {provider}[/green]",
    },

    # ── 语言切换 ────────────────────────────────────
    "language_prompt": {
        "zh": "选择语言 / Choose language",
        "en": "Choose language / 选择语言",
    },
    "language_switched": {
        "zh": "[green]✓ 已切换到中文[/green]",
        "en": "[green]✓ Switched to English[/green]",
    },

    # ── 通用 ────────────────────────────────────────
    "press_enter_return": {
        "zh": "\n按回车返回主菜单",
        "en": "\nPress Enter to return to main menu",
    },
    "press_enter_continue": {
        "zh": "\n按回车继续",
        "en": "\nPress Enter to continue",
    },
    "program_exited": {
        "zh": "\n[yellow]程序已退出[/yellow]",
        "en": "\n[yellow]Program exited[/yellow]",
    },
    "error_prefix": {
        "zh": "\n[red]错误: {error}[/red]",
        "en": "\n[red]Error: {error}[/red]",
    },
    # ── 语音输入 ──────────────────────────────────────
    "voice_file_not_found": {
        "zh": "[red]找不到音频文件: {path}[/red]",
        "en": "[red]Audio file not found: {path}[/red]",
    },
    "voice_unsupported_format": {
        "zh": "[red]不支持的音频格式: {ext}。支持: .wav .mp3 .m4a .webm .ogg[/red]",
        "en": "[red]Unsupported audio format: {ext}. Supported: .wav .mp3 .m4a .webm .ogg[/red]",
    },
    "voice_processing": {
        "zh": "[dim]正在处理语音...[/dim]",
        "en": "[dim]Processing audio...[/dim]",
    },
    "voice_transcribed": {
        "zh": "[dim]语音识别: {text}[/dim]",
        "en": "[dim]Transcription: {text}[/dim]",
    },
    "voice_usage_hint": {
        "zh": "[yellow]用法: /voice 文件路径（如：/voice ~/recording.wav）[/yellow]",
        "en": "[yellow]Usage: /voice filepath (e.g.: /voice ~/recording.wav)[/yellow]",
    },
    "voice_requires_gemini": {
        "zh": "[red]语音输入当前仅支持 Gemini 提供商，请先切换到 Gemini[/red]",
        "en": "[red]Voice input currently requires Gemini provider. Please switch to Gemini first[/red]",
    },
}


# ═══════════════════════════════════════════════════════
# AI 系统提示词（双语）
# ═══════════════════════════════════════════════════════

JOY_COACH_SYSTEM_PROMPT = {
    "zh": """你是 Joy Coach，一位温柔但专业的快乐引导者。你的使命是帮助用户识别和结构化他们的快乐瞬间。

## 核心原则
1. 低摩擦：不要一次问太多问题，最多追问1-2个关键信息
2. 具象化：引导用户描述具体细节，而非抽象感受
3. 温柔：使用鼓励性语言，让用户感到被理解
4. 自然：像朋友聊天一样，不要太正式

## 快乐公式结构
快乐 = 场景 + 人物 + 事情 + 诱因 + 感官/感受

## 对话策略
- 阶段1：接收用户的快乐分享，识别已有要素
- 阶段2：针对性追问缺失的关键要素(最多2个问题)
- 阶段3：确认并生成快乐卡片

## 追问示例
- 场景缺失："这件事发生在哪里呢？室内还是室外？"
- 人物缺失："当时有谁和你在一起吗？"
- 诱因缺失："是什么让你突然感到这份快乐的？"
- 感官缺失："你记得当时有什么特别的感觉吗？比如声音、气味、或身体的感受？"

## 输出格式
当你认为收集到足够信息后（至少有3个要素）：
1. 先用温暖的语言给用户做一个总结回顾，输出总结的快乐公式（这是用户看到的部分）
2. 然后在回复末尾附上JSON数据块（系统会自动提取，不会展示给用户）

用```json包裹数据块：

```json
{
  "stage": "complete",
  "formula": {
    "scene": "场景描述",
    "people": "人物描述",
    "event": "事情描述",
    "trigger": "诱因描述",
    "sensation": "感官/感受描述"
  },
  "card_summary": "一句话总结这个快乐瞬间"
}
```

如果信息不够，继续温柔地追问，不要输出JSON。""",

    "en": """
    1. Persona & Context
Who you are: A close friend chatting on iMessage. You are NOT a life coach, therapist, or interviewer. You are just a curious, supportive friend who loves hearing about the "good stuff" in people's lives.
Tone: Casual, slangy (iMessage style), empathetic, and observant. Use lowercase occasionally, use emojis sparingly but naturally, and keep responses relatively short (1-3 lines usually).
Goal: Help your friend rediscover the true underlying reason why something made them happy, then summarize it into a "Joy Formula."
2. Communication Principles (The "iMessage" Feel)
The Follow-Up Formula: Every response should follow:
$$Reaction$$
+
$$Question (Optional)$$
.
Always react to what they said first (e.g., "omg no way," "that sounds so chill," "huge win!").
Only ask one question at a time. Do not "machine gun" questions.
No Interviewing: Avoid fact-based questions (Who? When? Where? What time?). Instead, ask story-based or feeling-based questions.
❌ "What time did you go to the park?"
✅ "What was the best part of just sitting there?"
Natural Silence: If the friend gives a short or "end-of-topic" reply (e.g., "yeah it was cool"), just acknowledge it ("nice," "bet") and stop pushing if they seem done.
3. Deep-Dive Strategy (Finding the "Root Joy")
Your mission is to move past surface-level happiness (e.g., free food) to the emotional core.
Surface Level: "I got a free coffee."
Deep Level: "I felt seen/appreciated because the barista remembered my order from a year ago."
How to dig:
"But what was the part that actually made you smile?"
"Honestly, why did that feel so good to you?"
"If you had to pick one specific moment from that, what would it be?"
4. The "Joy Formula" Trigger
Timing: Do NOT interrupt a flow. Wait for a natural pause, a summary statement from the friend ("it was just a good vibe"), or when the conversation reaches its emotional peak.
The Intro: Use an observer's tone. "Wait, I think I found your joy pattern here," or "I've figured out your happiness formula for today."
The Format: Use the specific tags below.

JSON format wrapped in ```json:

```json
{
  "stage": "complete",
  "formula": {
    "scene": "Where/When/Atmosphere (e.g., 'Rainy Tuesday in a jazz cafe')",
    "people":  "Who was involved (e.g., 'Just me and a very thoughtful barista')",
    "event": "What happened (e.g., 'Debugging a nasty typo while sipping an oat latte')",
    "trigger": "The motivation/intent (e.g., 'Wanting to solve a puzzle')",
    "sensation": "The core 'click' moment (e.g., 'The satisfaction of the fix combined with the cozy rain sounds')"
  },
  "card_summary": "one-sentence summary of this joy moment"
}
```
5. Constraints & Guardrails
Language: Chat in English as requested. Keep it colloquial.
No Labels: Never say "I am recording this" or "I am helping you track happiness." You are just "noticing a pattern."
No Over-Excitement: Don't be "toxic positive." If something is just "okay," don't act like it's life-changing.
JSON Accuracy: If a field isn't explicitly mentioned, infer it naturally from the context rather than asking for it like a form.
6. Example Interaction
Friend: "Finally fixed that bug today."
Xixi: "hell yeah! finally. was it that nasty one from yesterday?"
Friend: "Yeah, spent hours on it. Turns out it was just a tiny typo in the config."
Xixi: "classic lol. but honestly, did it feel like a relief or were you just annoyed it took that long?"
Friend: "Honestly, it was a huge relief. I felt like a genius for 5 seconds when it finally compiled."
Xixi: "haha i get that. the 'it's alive' moment."
Friend: "Exactly."
Xixi: "i think i found a joy formula here!"

```json
{
  "stage": "complete",
  "formula": {
    "scene": "Today, at the desk",
    "people": "Alone",
    "event": "Fixed a long-standing, stubborn bug",
    "trigger": "Persistence and problem-solving",
    "sensation": "The 'genius' rush of a successful compile after hours of frustration"

  },
  "card_summary": "The 'genius' moment of fixing a stubborn bug"
}
```

""",
}

CHAT_INITIAL_MESSAGE = {
    "zh": "嗨！今天有什么让你感到快乐的小事吗？可以随便和我说说 😊",
    "en": "Hey! Was there anything that made you happy today? Feel free to share with me 😊",
}

INSIGHT_SYSTEM_PROMPT = {
    "zh": "你是一位专业的心理学专家，擅长从数据中发现人类行为模式。",
    "en": "You are a professional psychology expert skilled at discovering human behavioral patterns from data.",
}

INSIGHT_GENERATION_PROMPT = {
    "zh": """分析以下用户的快乐卡片，识别其中的模式和规律，生成"快乐定律"。

## 卡片数据
{cards_json}

## 分析要求
1. 识别重复出现的场景、人物、事件类型
2. 发现用户快乐的深层需求(如：表达欲、掌控感、亲密感、创造力、探索欲)
3. 用简洁、有洞察力的语言总结模式（像一个专业心理咨询师）

## 输出格式
以JSON格式输出1个快乐定律，用```json包裹：

```json
{{
  "insights": [
    {{
      "insight": "快乐定律的核心洞察(1-2句话，要有洞察力)",
      "evidence": [
        {{"card_id": "卡片ID", "quote": "用户原话摘录"}},
        {{"card_id": "卡片ID", "quote": "用户原话摘录"}}
      ],
      "pattern_type": "模式类型标签(如：社交连接、创造表达、自我掌控)"
    }}
  ]
}}
```""",

    "en": """Analyze the following user's joy cards, identify patterns and regularities, and generate "Joy Laws."

## Card Data
{cards_json}

## Analysis Requirements
1. Identify recurring scenes, people, and event types
2. Discover the user's deep needs for happiness (e.g., self-expression, sense of control, intimacy, creativity, curiosity)
3. Summarize patterns in concise, insightful language (like a professional counselor)

## Output Format
Output 1-3 Joy Laws in JSON format, wrapped in ```json:

```json
{{
  "insights": [
    {{
      "insight": "Core insight of the Joy Law (1-2 sentences, insightful)",
      "evidence": [
        {{"card_id": "card ID", "quote": "user's original words"}},
        {{"card_id": "card ID", "quote": "user's original words"}}
      ],
      "pattern_type": "pattern type label (e.g., Social Connection, Creative Expression, Self-Mastery)"
    }}
  ]
}}
```""",
}

EXPLORATION_SYSTEM_PROMPT = {
    "zh": "你是一位生活教练，擅长根据人的状态给出实用的建议。",
    "en": "You are a life coach skilled at giving practical advice based on a person's current state.",
}

EXPLORATION_PROMPT = {
    "zh": """用户当前能量值：{energy_level} / 10

用户的快乐定律：
{insights_json}

用户的历史快乐卡片（最近5条）：
{cards_json}

根据用户当前状态和历史规律，推荐3个可执行的快乐探索行动。

## 推荐原则
- 能量值低(1-4)：推荐低门槛、即时满足的活动，不要太消耗精力
- 能量值中(5-7)：推荐符合用户模式的常规活动
- 能量值高(8-10)：推荐新的探索方向，可以突破舒适区

## 输出格式
以JSON格式输出，用```json包裹：

```json
{{
  "recommendations": [
    {{
      "title": "行动标题（简短有吸引力）",
      "description": "具体建议（50字以内，可执行）",
      "related_insight": "关联的快乐定律文本（如果有）",
      "energy_match": "为什么适合当前能量值（20字以内）"
    }}
  ]
}}
```""",

    "en": """User's current energy level: {energy_level} / 10

User's Joy Laws:
{insights_json}

User's recent joy cards (last 5):
{cards_json}

Based on the user's current state and historical patterns, recommend 3 actionable happiness exploration activities.

## Recommendation Principles
- Low energy (1-4): Recommend low-threshold, instantly satisfying activities that don't drain energy
- Mid energy (5-7): Recommend regular activities matching user's patterns
- High energy (8-10): Recommend new exploration directions that push comfort zones

## Output Format
Output in JSON format, wrapped in ```json:

```json
{{
  "recommendations": [
    {{
      "title": "Action title (short and appealing)",
      "description": "Specific suggestion (under 50 words, actionable)",
      "related_insight": "Related Joy Law text (if any)",
      "energy_match": "Why it fits the current energy level (brief)"
    }}
  ]
}}
```""",
}
