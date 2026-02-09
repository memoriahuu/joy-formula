from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
from app.i18n.state import get_language
from app.i18n.translations import EXPLORATION_PROMPT, EXPLORATION_SYSTEM_PROMPT
import json
import re


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
        insights_data = [{"insight": i.insight_text, "statement": i.statement,
                          "keywords": i.keywords, "type": i.pattern_type}
                         for i in insights if not i.is_rejected]

        cards_data = [{"summary": c.card_summary, "raw": c.raw_input}
                      for c in recent_cards[:5]]

        lang = get_language()
        prompt = EXPLORATION_PROMPT[lang].format(
            energy_level=energy_level,
            insights_json=json.dumps(insights_data, ensure_ascii=False, indent=2),
            cards_json=json.dumps(cards_data, ensure_ascii=False, indent=2)
        )

        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt=EXPLORATION_SYSTEM_PROMPT[lang],
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
        if not ai_reply:
            return []

        # 尝试匹配 ```json ... ``` 代码块
        json_match = re.search(r'```json\s*(.*?)\s*```', ai_reply, re.DOTALL)
        if json_match:
            try:
                data = json.loads(json_match.group(1))
                return data.get("recommendations", [])
            except json.JSONDecodeError:
                pass

        # 回退：尝试直接找 JSON 对象
        json_match = re.search(r'\{[\s\S]*"recommendations"[\s\S]*\}', ai_reply)
        if json_match:
            try:
                data = json.loads(json_match.group(0))
                return data.get("recommendations", [])
            except json.JSONDecodeError:
                pass

        return []
