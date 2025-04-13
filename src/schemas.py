from pydantic import BaseModel
from typing import Literal, List

class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    history: List[ChatTurn]

class SmoothieResponse(BaseModel):
    id: str
    name: str
    type: str
    price_usd: float
    requiresAddOn: bool
    image_path: str
    explanation: str

class ChatResponse(SmoothieResponse):
    pass
