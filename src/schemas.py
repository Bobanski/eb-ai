from pydantic import BaseModel
from typing import Literal, List, Optional

class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    history: List[ChatTurn]

class SmoothieResponse(BaseModel):
    intent: Literal["SMOOTHIE_REQUEST", "FOLLOW_UP", "GENERAL_CHAT", "NEEDS_INFO"] = "SMOOTHIE_REQUEST"
    id: str
    name: str
    type: str
    price_usd: Optional[float] = None  # Make price_usd optional so it can be omitted entirely
    requiresAddOn: bool
    image_path: str
    explanation: str

class ChatResponse(SmoothieResponse):
    pass
