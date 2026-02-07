"""全局语言状态"""

# 支持: "zh", "en"
current_language: str = "en"


def set_language(lang: str) -> None:
    global current_language
    if lang not in ("zh", "en"):
        raise ValueError(f"Unsupported language: {lang}")
    current_language = lang


def get_language() -> str:
    return current_language
