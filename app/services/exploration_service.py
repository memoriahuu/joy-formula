from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
import json
import re

EXPLORATION_PROMPT = """用户当前能量值：{energy_level} / 10

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
```"""


class ExplorationService:
    """快乐盲盒探索服务"""

    @staticmethod
    def recommend(energy_level: int, insights: List[JoyInsight],
                  recent_cards: List[JoyCard]) -> List[Dict]:
        """
        基于能量值和历史数据推荐快乐行动

        Args:
            energy_level: 用户当前能量值 1-10
            insights: 用户的快乐定律
            recent_cards: 最近的快乐卡片

        Returns:
            推荐列表
        """
        # 构建数据
        insights_data = [{"insight": i.insight_text, "type": i.pattern_type}
                         for i in insights if not i.is_rejected]

        cards_data = [{"summary": c.card_summary, "raw": c.raw_input}
                      for c in recent_cards[:5]]

        prompt = EXPLORATION_PROMPT.format(
            energy_level=energy_level,
            insights_json=json.dumps(insights_data, ensure_ascii=False, indent=2),
            cards_json=json.dumps(cards_data, ensure_ascii=False, indent=2)
        )

        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt="你是一位生活教练，擅长根据人的状态给出实用的建议。",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9,
            max_tokens=2000
        )

        # 提取推荐
        recommendations = ExplorationService._extract_recommendations(ai_reply)
        return recommendations

    @staticmethod
    def _extract_recommendations(ai_reply: str) -> List[Dict]:
        """从AI回复中提取推荐JSON"""
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return []

        try:
            data = json.loads(json_match.group(1))
            return data.get("recommendations", [])
        except json.JSONDecodeError:
            return []
