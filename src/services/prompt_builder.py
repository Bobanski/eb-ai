from pathlib import Path
import json
import yaml
import os

BASE_DIR = Path(__file__).resolve().parents[2]

def load_menu():
    return json.loads((BASE_DIR / "data/menu.json").read_text())

def load_llm_config():
    cfg = yaml.safe_load((BASE_DIR / "llm/config.yaml").read_text())
    # expand env vars like ${OPENAI_API_KEY}
    cfg["api_key"] = os.environ.get("OPENAI_API_KEY", cfg.get("api_key"))
    return cfg

def build_prompt(chat_history: list) -> list[dict]:
    """
    Return a messages list ready for openai.ChatCompletion.create.
    
    Args:
        chat_history: List of ChatTurn objects representing the conversation history
        
    Returns:
        List of message dicts formatted for OpenAI API
    """
    menu_json = json.dumps(load_menu(), indent=2)
    system_template = (BASE_DIR / "llm/system_prompt.txt").read_text()
    system_prompt = system_template.replace("{{MENU}}", menu_json)
    
    # Start with system prompt
    messages = [{"role": "system", "content": system_prompt}]
    
    # Apply token window policy: keep only the last 8 turns (4 user + 4 assistant)
    # This is handled at the router level, so we just add all turns we receive
    for turn in chat_history:
        messages.append({"role": turn.role, "content": turn.content.strip()})
    
    return messages
