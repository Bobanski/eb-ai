import json
from typing import List
from pydantic import ValidationError
from .prompt_builder import build_prompt
from ..deps import openai_client, settings
from ..schemas import SmoothieResponse, ChatTurn

def recommend(chat_history: List[ChatTurn]) -> SmoothieResponse:
    """
    Generate a smoothie recommendation based on chat history.
    
    Args:
        chat_history: List of ChatTurn objects representing the conversation
        
    Returns:
        SmoothieResponse object with recommendation details
    """
    cfg = settings()
    messages = build_prompt(chat_history)

    resp = openai_client().chat.completions.create(
        model=cfg["model"],
        temperature=cfg["temperature"],
        max_tokens=cfg["max_tokens"],
        messages=messages,
    )

    raw = resp.choices[0].message.content.strip()
    
    # Log the raw response for debugging in non-production environments
    import os
    if os.getenv("ENVIRONMENT") != "production":
        print(f"Raw LLM response: {raw}")
    
    try:
        # First attempt: try to parse the entire response as JSON
        return SmoothieResponse(**json.loads(raw))
    except (json.JSONDecodeError, ValidationError) as e:
        # Second attempt: try to extract JSON from the response if it's mixed with text
        try:
            # Look for text that might be JSON (between curly braces)
            import re
            json_match = re.search(r'\{.*\}', raw, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                try:
                    return SmoothieResponse(**json.loads(json_str))
                except (json.JSONDecodeError, ValidationError):
                    # If the extracted JSON is still invalid, try to fix common issues
                    fixed_json = json_str.replace("'", '"')  # Replace single quotes with double quotes
                    return SmoothieResponse(**json.loads(fixed_json))
            
            # Third attempt: try to identify known smoothies in the text
            # Create a mapping of smoothie keywords to their IDs
            smoothie_keywords = {
                "chocolate supreme": "chocolate_supreme",
                "blueberry bliss": "blueberry_bliss",
                "detox greens": "detox_greens",
                "blue moon": "blue_moon",
                "great breakfast": "great_breakfast",
                "muscle up": "muscle_up",
                "flax master": "flax_master",
                "power shred": "power_shred",
                "slim down": "slim_down"
            }
            
            # Check if any known smoothie is mentioned in the text
            for keyword, smoothie_id in smoothie_keywords.items():
                if keyword in raw.lower():
                    # Load menu data to get accurate information
                    from .prompt_builder import load_menu
                    menu_data = load_menu()
                    
                    # Find the smoothie in the menu data
                    for category in menu_data["categories"]:
                        for item in category["items"]:
                            if item["id"] == smoothie_id:
                                return SmoothieResponse(
                                    id=smoothie_id,
                                    name=item["name"],
                                    type=item["type"],
                                    price_usd=item["price_usd"],
                                    requiresAddOn=True,
                                    image_path=item["image_path"],
                                    explanation=raw
                                )
            
            # Final fallback: create a generic response
            return SmoothieResponse(
                id="default_smoothie",
                name="Recommended Smoothie",
                type="smoothie",
                price_usd=12.95,
                requiresAddOn=True,
                image_path="/images/ChocolateSupreme.jpg",
                explanation="I recommend trying our signature smoothie. " + raw[:100]
            )
        except Exception as inner_e:
            # Log the detailed error for debugging
            import traceback
            error_details = traceback.format_exc()
            if os.getenv("ENVIRONMENT") != "production":
                print(f"Error parsing LLM response: {error_details}")
            
            # Raise a clean error for production
            raise RuntimeError(f"Failed to process model response: {str(inner_e)}") from e
