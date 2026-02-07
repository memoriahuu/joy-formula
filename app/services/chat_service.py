from typing import Dict, List, Optional, Tuple
from app.services.ai_service import ai_service
from app.i18n.state import get_language
from app.i18n.translations import JOY_COACH_SYSTEM_PROMPT, CHAT_INITIAL_MESSAGE
import json
import re

# 匹配 ```json ... ``` 代码块
_JSON_BLOCK_RE = re.compile(r'```json\s*(\{.*?\})\s*```', re.DOTALL)


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

        # 提取公式数据，并从展示内容中剥离 JSON 块
        formula_data, display_reply = ChatService._extract_and_clean(ai_reply)

        return {
            "assistant_reply": display_reply,
            "is_complete": formula_data is not None,
            "formula": formula_data,
            "updated_history": messages + [{"role": "assistant", "content": display_reply}]
        }

    @staticmethod
    def process_voice_message(conversation_history: List[Dict],
                              audio_bytes: bytes, mime_type: str) -> Dict:
        """
        处理用户语音消息：一次性发送音频给 Gemini，获取转录和回复

        Returns:
            {
                "assistant_reply": "AI的回复",
                "transcribed_text": "语音转录文本",
                "is_complete": True/False,
                "formula": {...} if is_complete else None,
                "updated_history": [...]
            }
        """
        lang = get_language()
        result = ai_service.chat_with_audio(
            system_prompt=JOY_COACH_SYSTEM_PROMPT[lang],
            messages=conversation_history,
            audio_bytes=audio_bytes,
            mime_type=mime_type,
            temperature=0.7
        )

        transcribed_text = result["transcribed_text"]
        ai_reply = result["assistant_reply"]

        # 将转录文本作为用户消息存入历史（保证后续对话有上下文）
        messages = conversation_history + [{"role": "user", "content": transcribed_text}]

        # 提取公式数据，并从展示内容中剥离 JSON 块
        formula_data, display_reply = ChatService._extract_and_clean(ai_reply)

        return {
            "assistant_reply": display_reply,
            "transcribed_text": transcribed_text,
            "is_complete": formula_data is not None,
            "formula": formula_data,
            "updated_history": messages + [{"role": "assistant", "content": display_reply}]
        }

    @staticmethod
    def _extract_and_clean(ai_reply: str) -> Tuple[Optional[Dict], str]:
        """
        从 AI 回复中提取公式 JSON，并返回去掉 JSON 块的干净文本

        Returns:
            (formula_data or None, 用户可见的干净回复)
        """
        formula_data = None
        json_match = _JSON_BLOCK_RE.search(ai_reply)

        if json_match:
            try:
                data = json.loads(json_match.group(1))
                if data.get("stage") == "complete" and "formula" in data:
                    formula_data = data
            except json.JSONDecodeError:
                pass

        # 无论是否解析成功，都把 JSON 块从展示内容中去掉
        display_reply = _JSON_BLOCK_RE.sub('', ai_reply).strip()

        return formula_data, display_reply
