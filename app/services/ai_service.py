from typing import List, Dict, Optional
from app.config import settings


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
            self.client = genai.GenerativeModel('gemini-2.5-flash-lite')
            self.model = "gemini-2.5-flash-lite"

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


# 全局 AI 服务实例
ai_service = AIService()
