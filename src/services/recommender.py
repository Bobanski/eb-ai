import json
from typing import List
from pydantic import ValidationError
import re # Import re for keyword searching
from .prompt_builder import build_prompt
from ..deps import openai_client, settings
from ..schemas import SmoothieResponse, ChatTurn


# Helper function to check if the last assistant message likely recommended a smoothie
def last_message_was_smoothie_rec(chat_history: List[ChatTurn]) -> bool:
    if not chat_history:
        return False
    
    last_message = None
    # Find the most recent assistant message
    for i in range(len(chat_history) - 1, -1, -1):
        if chat_history[i].role == "assistant":
            last_message = chat_history[i]
            break
            
    if not last_message:
        return False # No assistant message found

    # Basic check: Does the content mention known smoothie names?
    # (Could be expanded with more sophisticated checks if needed)
    # Using the same keywords as later in the file for consistency
    smoothie_keywords = [
        "chocolate supreme", "blueberry bliss", "detox greens", "blue moon",
        "great breakfast", "muscle up", "flax master", "power shred", "slim down"
    ]
    content_lower = last_message.content.lower()
    for keyword in smoothie_keywords:
        if keyword in content_lower:
            return True
            
    # Add checks for common recommendation phrases if needed
    # e.g., if "recommend" in content_lower or "try the" in content_lower:
    #    return True

    return False


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
            # Determine default based on history
            default_intent = "FOLLOW_UP" if last_message_was_smoothie_rec(chat_history) else "SMOOTHIE_REQUEST"
            parsed_json["intent"] = default_intent
            print(f"[DEBUG] Defaulting intent (missing): {default_intent}") # Debug log
        elif parsed_json["intent"] not in ["SMOOTHIE_REQUEST", "FOLLOW_UP", "GENERAL_CHAT", "NEEDS_INFO"]:
             # Determine default based on history
            default_intent = "FOLLOW_UP" if last_message_was_smoothie_rec(chat_history) else "SMOOTHIE_REQUEST"
            parsed_json["intent"] = default_intent
            print(f"[DEBUG] Defaulting intent (invalid): {default_intent}") # Debug log
            
        # Log the preference analysis from the AI
        preference = parsed_json.get("preference_analysis", "not provided")
        print(f"[AI PREFERENCE LOG] AI analysis of user preference: {preference}")
            
        return SmoothieResponse(**parsed_json)
    except (json.JSONDecodeError, ValidationError) as e:
        # Second attempt: try to extract JSON from the response if it's mixed with text
        try:
            # Look for text that might be JSON (between curly braces)
            import re
            json_match = re.search(r'\{.*\}', raw, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
                parsed_json_fallback = None
                try:
                    parsed_json_fallback = json.loads(json_str)
                    # Log the preference analysis from the AI (fallback 1)
                    preference = parsed_json_fallback.get("preference_analysis", "not provided")
                    print(f"[AI PREFERENCE LOG] AI analysis (fallback 1): {preference}")
                    return SmoothieResponse(**parsed_json_fallback)
                except (json.JSONDecodeError, ValidationError):
                    # If the extracted JSON is still invalid, try to fix common issues
                    try:
                        fixed_json_str = json_str.replace("'", '"')  # Replace single quotes with double quotes
                        parsed_json_fallback_fixed = json.loads(fixed_json_str)
                        # Log the preference analysis from the AI (fallback 2)
                        preference = parsed_json_fallback_fixed.get("preference_analysis", "not provided")
                        print(f"[AI PREFERENCE LOG] AI analysis (fallback 2 - fixed quotes): {preference}")
                        return SmoothieResponse(**parsed_json_fallback_fixed)
                    except (json.JSONDecodeError, ValidationError):
                         # If still failing after fixing quotes, proceed to next fallback
                         pass # Let it fall through to the next attempt
            
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
                                # Try to detect intent from the response text, default based on history
                                intent = "FOLLOW_UP" if last_message_was_smoothie_rec(chat_history) else "SMOOTHIE_REQUEST"
                                if "FOLLOW_UP" in raw or "follow up" in raw.lower():
                                    intent = "FOLLOW_UP"
                                elif "SMOOTHIE_REQUEST" in raw or "recommend" in raw.lower(): # Be more specific for request
                                     intent = "SMOOTHIE_REQUEST"
                                print(f"[DEBUG] Detected intent (fallback smoothie): {intent}") # Debug log
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
            
            # Check for intent signals in the text, default based on history
            intent = "FOLLOW_UP" if last_message_was_smoothie_rec(chat_history) else "SMOOTHIE_REQUEST"
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
                
                # Final fallback intent determination
                final_fallback_intent = intent # Use the intent determined above (lines 103-109)
                print(f"[DEBUG] Final fallback intent: {final_fallback_intent}") # Debug log
                
                return SmoothieResponse(
                    intent=final_fallback_intent,
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
