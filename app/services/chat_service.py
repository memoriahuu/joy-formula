from typing import Dict, List, Optional
from app.services.ai_service import ai_service
import json
import re

# Joy Coach 系统提示词
JOY_COACH_SYSTEM_PROMPT = """你是 Joy Coach，一位温柔但专业的快乐引导者。你的使命是帮助用户识别和结构化他们的快乐瞬间。

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
当你认为收集到足够信息后（至少有3个要素），以以下JSON格式输出，用```json包裹：

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

如果信息不够，继续温柔地追问，不要输出JSON。"""


class ChatService:
    """对话服务：处理与用户的交互逻辑"""

    @staticmethod
    def start_conversation() -> Dict:
        """开始新的对话"""
        return {
            "initial_message": "嗨！今天有什么让你感到快乐的小事吗？可以随便和我说说 😊"
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
        ai_reply = ai_service.chat(
            system_prompt=JOY_COACH_SYSTEM_PROMPT,
            messages=messages,
            temperature=0.7
        )

        # 检查是否包含完整的公式（检测JSON输出）
        formula_data = ChatService._extract_formula(ai_reply)

        return {
            "assistant_reply": ai_reply,
            "is_complete": formula_data is not None,
            "formula": formula_data,
            "updated_history": messages + [{"role": "assistant", "content": ai_reply}]
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
