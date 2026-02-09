from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
from app.i18n.state import get_language
from app.i18n.translations import INSIGHT_GENERATION_PROMPT, INSIGHT_SYSTEM_PROMPT
import json
import re


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

        lang = get_language()
        prompt = INSIGHT_GENERATION_PROMPT[lang].format(cards_json=cards_json)

        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt=INSIGHT_SYSTEM_PROMPT[lang],
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
        if not ai_reply:
            print("[DEBUG] AI reply is empty")
            return []


        json_match = re.search(r'```json\s*(.*?)\s*```', ai_reply, re.DOTALL)
        if json_match:
            try:
                data = json.loads(json_match.group(1))
                print(f"[DEBUG] Parsed from code block, insights count: {len(data.get('insights', []))}")
                return data.get("insights", [])
            except json.JSONDecodeError as e:
                print(f"[DEBUG] JSON decode failed (code block): {e}")
                print(f"[DEBUG] Attempted to parse: {json_match.group(1)[:500]}")
        else:
            print("[DEBUG] No ```json code block found")

        json_match = re.search(r'\{[\s\S]*"insights"[\s\S]*\}', ai_reply)
        if json_match:
            try:
                data = json.loads(json_match.group(0))
                print(f"[DEBUG] Parsed from raw JSON, insights count: {len(data.get('insights', []))}")
                return data.get("insights", [])
            except json.JSONDecodeError as e:
                print(f"[DEBUG] JSON decode failed (raw): {e}")
        else:
            print("[DEBUG] No raw JSON with 'insights' found")

        return []
