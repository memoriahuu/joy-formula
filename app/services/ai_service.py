from typing import List, Dict, Optional
import re
from app.config import settings

AUDIO_TRANSCRIPTION_TAG_OPEN = "[语音内容]"
AUDIO_TRANSCRIPTION_TAG_CLOSE = "[/语音内容]"


class AIService:
    """统一的 AI 服务接口，支持多个提供商切换"""

    def __init__(self, provider: Optional[str] = None):
        self.provider = provider or settings.AI_PROVIDER
        self._init_client()

    def _init_client(self):
        """初始化对应的 AI 客户端"""
        if self.provider == "anthropic":
            import anthropic
            self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.model = "claude-sonnet-4-20250514"

        elif self.provider == "openai":
            import openai
            self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = "gpt-4o"

        elif self.provider == "gemini":
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.client = genai.GenerativeModel('gemini-2.5-flash')
            self.model = "gemini-2.5-flash"

        elif self.provider == "custom":
            # 用于 Defy 或其他自定义端点
            import requests
            self.client = requests.Session()
            self.custom_endpoint = settings.CUSTOM_AI_ENDPOINT
            self.custom_api_key = settings.CUSTOM_AI_API_KEY

    def chat(self, system_prompt: str, messages: List[Dict[str, str]],
             temperature: float = 0.7, max_tokens: int = 2000) -> str:
        """
        统一的对话接口

        Args:
            system_prompt: 系统提示词
            messages: 消息历史 [{"role": "user"/"assistant", "content": "..."}]
            temperature: 温度参数
            max_tokens: 最大token数

        Returns:
            AI 的回复文本
        """
        try:
            if self.provider == "anthropic":
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system_prompt,
                    messages=messages
                )
                return response.content[0].text

            elif self.provider == "openai":
                formatted_messages = [{"role": "system", "content": system_prompt}] + messages
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=formatted_messages,
                    temperature=temperature,
                    max_tokens=max_tokens
                )
                return response.choices[0].message.content

            elif self.provider == "gemini":
                # Gemini 处理
                chat = self.client.start_chat(history=[])
                # 将 system prompt 和消息合并
                full_prompt = f"{system_prompt}\n\n"
                for msg in messages:
                    full_prompt += f"{msg['role']}: {msg['content']}\n"
                response = chat.send_message(full_prompt)
                return response.text

            elif self.provider == "custom":
                # 自定义端点（Defy）
                payload = {
                    "system": system_prompt,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                headers = {
                    "Authorization": f"Bearer {self.custom_api_key}",
                    "Content-Type": "application/json"
                }
                response = self.client.post(self.custom_endpoint, json=payload, headers=headers)
                return response.json()["response"]  # 根据实际返回格式调整

        except Exception as e:
            print(f"AI API 调用失败: {str(e)}")
            raise

    def chat_with_audio(self, system_prompt: str, messages: List[Dict[str, str]],
                        audio_bytes: bytes, mime_type: str,
                        temperature: float = 0.7) -> Dict[str, str]:
        """
        将音频和对话历史一次性发送给 Gemini，返回转录文本和 AI 回复

        Args:
            system_prompt: 系统提示词
            messages: 消息历史
            audio_bytes: 音频文件字节
            mime_type: 音频 MIME 类型
            temperature: 温度参数

        Returns:
            {"transcribed_text": "...", "assistant_reply": "..."}
        """
        if self.provider != "gemini":
            raise ValueError("语音输入当前仅支持 Gemini 提供商")

        try:
            import google.generativeai as genai

            # 构建 prompt：系统提示 + 对话历史 + 语音指令
            full_prompt = f"{system_prompt}\n\n"
            for msg in messages:
                full_prompt += f"{msg['role']}: {msg['content']}\n"
            full_prompt += (
                "\n用户发送了一段语音消息（音频内容见下方）。"
                f"请先将语音内容转写在 {AUDIO_TRANSCRIPTION_TAG_OPEN}...{AUDIO_TRANSCRIPTION_TAG_CLOSE} 标签内，"
                "然后以 Joy Coach 身份正常回复。\n"
            )

            # 单次 API 调用：文本 prompt + 音频数据
            response = self.client.generate_content(
                [full_prompt, {"mime_type": mime_type, "data": audio_bytes}],
                generation_config=genai.types.GenerationConfig(temperature=temperature)
            )

            return self._parse_audio_response(response.text)

        except Exception as e:
            print(f"语音 AI API 调用失败: {str(e)}")
            raise

    @staticmethod
    def _parse_audio_response(text: str) -> Dict[str, str]:
        """从 Gemini 回复中分离转录文本和 AI 回复"""
        pattern = re.escape(AUDIO_TRANSCRIPTION_TAG_OPEN) + r"(.*?)" + re.escape(AUDIO_TRANSCRIPTION_TAG_CLOSE)
        match = re.search(pattern, text, re.DOTALL)

        if match:
            transcribed_text = match.group(1).strip()
            # 去掉转录标签部分，剩余的就是 AI 回复
            assistant_reply = text[:match.start()] + text[match.end():]
            assistant_reply = assistant_reply.strip()
        else:
            # 如果没有找到标签，整个回复作为 assistant_reply
            transcribed_text = ""
            assistant_reply = text.strip()

        return {
            "transcribed_text": transcribed_text,
            "assistant_reply": assistant_reply
        }


# 全局 AI 服务实例
ai_service = AIService()
