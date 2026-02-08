from typing import Dict, List, Optional
from app.services.ai_service import ai_service
from app.i18n.state import get_language
from app.i18n.translations import JOY_COACH_SYSTEM_PROMPT, CHAT_INITIAL_MESSAGE
import json
import re


class ChatService:
    """对话服务：处理与用户的交互逻辑"""

    @staticmethod
    def start_conversation() -> Dict:
        """开始新的对话"""
        lang = get_language()
        return {
            "initial_message": CHAT_INITIAL_MESSAGE[lang]
        }

    @staticmethod
    def process_message(conversation_history: List[Dict], user_message: str) -> Dict:
        """
        处理用户消息并返回AI回复

        Returns:
            {
                "assistant_reply": "AI的回复",
                "is_complete": True/False,
                "formula": {...} if is_complete else None
            }
        """
        # 添加用户消息到历史
        messages = conversation_history + [{"role": "user", "content": user_message}]

        # 调用AI
        lang = get_language()
        ai_reply = ai_service.chat(
            system_prompt=JOY_COACH_SYSTEM_PROMPT[lang],
            messages=messages,
            temperature=0.7
        )

        # 检查是否包含完整的公式（检测JSON输出）
        formula_data = ChatService._extract_formula(ai_reply)

        # 如果检测到公式，从显示内容中移除 JSON 代码块
        display_reply = ai_reply
        if formula_data is not None:
            # 移除 JSON 代码块，只保留其他文本
            display_reply = re.sub(r'```json\s*\{.*?\}\s*```', '', ai_reply, flags=re.DOTALL).strip()
            # 如果移除后为空，添加一个默认消息
            if not display_reply:
                display_reply = "Great! I've created your joy card! 🎉" if lang == "en" else "太棒了！我已经为你创建了快乐卡片！🎉"

        return {
            "assistant_reply": display_reply,
            "is_complete": formula_data is not None,
            "formula": formula_data,
            "updated_history": messages + [{"role": "assistant", "content": ai_reply}]  # 保留完整内容到历史
        }

    @staticmethod
    def _extract_formula(ai_reply: str) -> Optional[Dict]:
        """从AI回复中提取公式JSON"""
        # 查找JSON代码块
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return None

        try:
            data = json.loads(json_match.group(1))
            if data.get("stage") == "complete" and "formula" in data:
                return data
        except json.JSONDecodeError:
            return None

        return None
