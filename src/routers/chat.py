from fastapi import APIRouter, HTTPException
from typing import List
from ..services.recommender import recommend
from ..schemas import ChatRequest, ChatResponse, ChatTurn

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        # Apply token window policy: keep only the last 8 turns (4 user + 4 assistant)
        # This ensures we stay within token budget
        trimmed_history: List[ChatTurn] = req.history[-8:] if len(req.history) > 8 else req.history
        
        # Call the recommender with the trimmed history
        return recommend(trimmed_history)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
