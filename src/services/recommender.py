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
        parsed_json = json.loads(raw)
        
        # Ensure the intent field exists and has a valid value
        if "intent" not in parsed_json:
            parsed_json["intent"] = "SMOOTHIE_REQUEST"  # Default intent
        elif parsed_json["intent"] not in ["SMOOTHIE_REQUEST", "FOLLOW_UP", "GENERAL_CHAT", "NEEDS_INFO"]:
            parsed_json["intent"] = "SMOOTHIE_REQUEST"  # Default if invalid value
            
        return SmoothieResponse(**parsed_json)
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
                                # Try to detect intent from the response text
                                intent = "SMOOTHIE_REQUEST"  # Default
                                if "FOLLOW_UP" in raw or "follow up" in raw.lower():
                                    intent = "FOLLOW_UP"
                                
                                return SmoothieResponse(
                                    intent=intent,
                                    id=smoothie_id,
                                    name=item["name"],
                                    type=item["type"],
                                    price_usd=item["price_usd"],
                                    requiresAddOn=True,
                                    image_path=item["image_path"],
                                    explanation=raw
                                )
            
            # Check for intent signals in the text
            intent = "SMOOTHIE_REQUEST"  # Default intent
            if "GENERAL_CHAT" in raw or "general chat" in raw.lower():
                intent = "GENERAL_CHAT"
            elif "FOLLOW_UP" in raw or "follow up" in raw.lower():
                intent = "FOLLOW_UP"
            elif "NEEDS_INFO" in raw or "need more information" in raw.lower():
                intent = "NEEDS_INFO"
            
            # Final fallback: create a response based on intent
            if intent == "GENERAL_CHAT":
                # Check if response ends with proper punctuation
                explanation = raw[:150]
                if not explanation.strip().endswith((".", "!", "?")):
                    explanation = explanation.rstrip() + "."  # Add period for complete sentence
                
                # For general chat, completely omit price_usd from response
                return SmoothieResponse(
                    intent=intent,
                    id="general_chat",
                    name="Friendly Chat",
                    type="general",
                    # No price_usd field for general chat
                    requiresAddOn=False,
                    image_path="/images/avatar-icon.png",
                    explanation=explanation
                )
            elif intent == "NEEDS_INFO":
                # Ensure the explanation ends with a question mark for info requests
                explanation = raw[:150]
                if not explanation.strip().endswith("?"):
                    explanation = explanation.rstrip() + "?"  # Add question mark for info requests
                
                # For info requests, completely omit price_usd field
                return SmoothieResponse(
                    intent=intent,
                    id="needs_info",
                    name="More Information Needed",
                    type="general",
                    # No price_usd field for info requests
                    requiresAddOn=False,
                    image_path="/images/avatar-icon.png",
                    explanation=explanation
                )
            else:
                # Default smoothie recommendation
                # Start with greeting, then recommendation
                smoothie_explanation = "Hi there! Based on what you're looking for, "
                if raw.strip():
                    # Append raw response but ensure it ends with proper punctuation
                    additional_text = raw[:100].strip()
                    if not additional_text.endswith((".", "!", "?")):
                        additional_text += "."
                    smoothie_explanation += additional_text
                else:
                    smoothie_explanation += "I recommend trying our signature Chocolate Supreme smoothie. It's packed with protein and delicious chocolate flavor."
                
                return SmoothieResponse(
                    intent=intent,
                    id="default_smoothie",
                    name="Recommended Smoothie",
                    type="smoothie",
                    price_usd=12.95,  # Include price for actual product recommendations
                    requiresAddOn=True,
                    image_path="/images/ChocolateSupreme.jpg",
                    explanation=smoothie_explanation
                )
        except Exception as inner_e:
            # Log the detailed error for debugging
            import traceback
            error_details = traceback.format_exc()
            if os.getenv("ENVIRONMENT") != "production":
                print(f"Error parsing LLM response: {error_details}")
            
            # Raise a clean error for production
            raise RuntimeError(f"Failed to process model response: {str(inner_e)}") from e
