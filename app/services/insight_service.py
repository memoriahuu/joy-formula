from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
import json
import re

INSIGHT_GENERATION_PROMPT = """分析以下用户的快乐卡片，识别其中的模式和规律，生成"快乐定律"。

## 卡片数据
{cards_json}

## 分析要求
1. 识别重复出现的场景、人物、事件类型
2. 发现用户快乐的深层需求(如：表达欲、掌控感、亲密感、创造力、探索欲)
3. 用简洁、有洞察力的语言总结模式（像一个专业心理咨询师）

## 输出格式
以JSON格式输出1-3个快乐定律，用```json包裹：

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
```"""


class InsightService:
    """快乐定律生成服务"""

    @staticmethod
    def generate_insights(cards: List[JoyCard]) -> List[Dict]:
        """
        基于用户的快乐卡片生成定律

        Args:
            cards: 用户的快乐卡片列表

        Returns:
            生成的定律列表
        """
        if len(cards) < 5:
            raise ValueError("需要至少5张卡片才能生成定律")

        # 构建卡片数据
        cards_data = []
        for card in cards:
            cards_data.append({
                "id": card.id,
                "summary": card.card_summary,
                "raw_input": card.raw_input,
                "formula": {
                    "scene": card.formula_scene,
                    "people": card.formula_people,
                    "event": card.formula_event,
                    "trigger": card.formula_trigger,
                    "sensation": card.formula_sensation
                }
            })

        cards_json = json.dumps(cards_data, ensure_ascii=False, indent=2)
        prompt = INSIGHT_GENERATION_PROMPT.format(cards_json=cards_json)

        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt="你是一位专业的心理学专家，擅长从数据中发现人类行为模式。",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=3000
        )

        # 提取JSON
        insights = InsightService._extract_insights(ai_reply)
        return insights

    @staticmethod
    def _extract_insights(ai_reply: str) -> List[Dict]:
        """从AI回复中提取定律JSON"""
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return []

        try:
            data = json.loads(json_match.group(1))
            return data.get("insights", [])
        except json.JSONDecodeError:
            return []
