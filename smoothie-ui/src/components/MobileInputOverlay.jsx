import { useState, useEffect, useRef } from "react";

/**
 * MobileInputOverlay - A mobile-specific input solution that slides up from the bottom
 * and stays fixed in position to avoid scrolling issues with mobile keyboards.
 */
export default function MobileInputOverlay({ 
  isVisible, 
  onClose, 
  onSendMessage, 
  lastMessages = [],
  placeholderText = "What smoothie are you craving?"
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Auto-focus the input when the overlay becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      // Small delay to ensure the animation starts before focusing
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [isVisible]);

  // Handle sending a message
  const handleSend = (e) => {
    // Stop event propagation to prevent it from reaching the overlay background
    if (e) e.stopPropagation();
    
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
      onClose();
    }
  };

  // Handle keyboard events (Enter to send, Escape to close)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(e); // Pass the event to handleSend
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mobile-input-overlay">
      <div className="overlay-background" onClick={onClose}></div>
      
      <div className="overlay-content">
        {/* Context area - shows the last few messages for context */}
        <div className="context-messages">
          {lastMessages.map((message, index) => (
            <div key={index} className={`context-message ${message.role}`}>
              {message.role === "assistant" ? "🤖 " : "👤 "}
              {message.content}
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="overlay-input-container">
          <input
            ref={inputRef}
            className="overlay-input"
            placeholder={placeholderText}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="overlay-send-button"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}