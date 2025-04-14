import { useState, useEffect, useRef } from "react";
import {
  getDeviceInfo,
  getHeaderStyles,
  getChatContainerStyles,
  getLayout,
  getChatLogoStyles,
  getChatMessagesStyles,
  getChatInputAreaStyles,
  getInputFieldStyles,
  getSendButtonStyles,
  getPromptButtonsContainerStyles,
  getPromptButtonStyles
} from "./utils/layout-manager";
import { scrollToTop, initMobileAutoScroll } from "./utils/mobile-autoscroll";
import { captureInitialViewState, restoreInitialView, isAtInitialView } from "./utils/initial-view-manager";

/* ------------------------------------------------------------------ */
/* 1.  image imports (unchanged)                                      */
/* ------------------------------------------------------------------ */
import BlueMoonImg from "./assets/BlueMoon.jpg";
import GreatBreakfastImg from "./assets/GreatBreakfast.jpg";
import MuscleUpImg from "./assets/MuscleUp.jpg";
import BlueberryBlissImg from "./assets/BlueberryBliss.jpg";
import ChocolateSupremeImg from "./assets/ChocolateSupreme.jpg";
import DetoxGreensImg from "./assets/DetoxGreens.jpg";
import FlaxMasterImg from "./assets/FlaxMaster.jpg";
import PowerShredImg from "./assets/PowerShred.png";
import SlimDownImg from "./assets/SlimDown.jpg";
import OriginalFitFrappeImg from "./assets/OriginalFitFrappe.jpg";
import MochaFitFrappeImg from "./assets/MochaFitFrapee.jpg";
import MatchaFitFrappeImg from "./assets/MatchaFitFrappe.jpg";
import ProteinColdFoamCoffeeImg from "./assets/ProteinColdFoamCoffee.jpg";
import BrainAlchemyLatteImg from "./assets/BrainAlchemyLatte.jpg";
import CollagenMochaLatteImg from "./assets/CollagenMochaLatte.jpg";
import GoldenImmunityLatteImg from "./assets/GoldenImmunityLate.jpg";
import MindfulMatchaLatteImg from "./assets/MindfulMatchaLatte.jpg";
import SuperfoodCoffeeImg from "./assets/SuperfoodCoffee.jpg";
// Import the avatar icon - you'll need to add this PNG file to your assets directory
import AvatarIcon from "./assets/avatar-icon.png";
// Import Earth Bar logo
import EarthBarLogo from "./assets/eb-full-logo.svg";

/* map id → image */
const smoothieImages = {
  blue_moon: BlueMoonImg,
  great_breakfast: GreatBreakfastImg,
  muscle_up: MuscleUpImg,
  blueberry_bliss: BlueberryBlissImg,
  chocolate_supreme: ChocolateSupremeImg,
  detox_greens: DetoxGreensImg,
  flax_master: FlaxMasterImg,
  power_shred: PowerShredImg,
  slim_down: SlimDownImg,
  original_fit_frappe: OriginalFitFrappeImg,
  mocha_fit_frappe: MochaFitFrappeImg,
  matcha_fit_frappe: MatchaFitFrappeImg,
  protein_cold_foam_coffee: ProteinColdFoamCoffeeImg,
  brain_alchemy_latte: BrainAlchemyLatteImg,
  collagen_mocha_latte: CollagenMochaLatteImg,
  golden_immunity_latte: GoldenImmunityLatteImg,
  mindful_matcha_latte: MindfulMatchaLatteImg,
  superfood_coffee: SuperfoodCoffeeImg,
};

/* ------------------------------------------------------------------ */
/* 2.  API constants                                                  */
/* ------------------------------------------------------------------ */
// Use environment variable with fallback to localhost
// Strip any comments from the API_BASE value
let rawApiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
// Remove any comments (anything after #)
const API_BASE = rawApiBase.split('#')[0].trim();
const IS_PRODUCTION = import.meta.env.PROD;

// Log more detailed environment info for debugging
console.log("Raw VITE_API_BASE:", import.meta.env.VITE_API_BASE);
console.log("Cleaned API_BASE:", API_BASE);

// Log API configuration for debugging
console.log("API Configuration:");
console.log("API_BASE:", API_BASE);
console.log("IS_PRODUCTION:", IS_PRODUCTION);
console.log("Environment Variables:", import.meta.env);

/* ------------------------------------------------------------------ */
/* 3.  Component                                                      */
/* ------------------------------------------------------------------ */
export default function ChatWidget() {
  /* ---------------- state ---------------- */
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome! I'm your smoothie assistant. What kind of smoothie are you looking for today?",
    },
  ]);
  const [showPromptButtons, setShowPromptButtons] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());
  
  // Update device info on resize
  useEffect(() => {
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize mobile autoscroll functionality
  useEffect(() => {
    // Only initialize on mobile devices
    if (deviceInfo.isMobile) {
      const cleanup = initMobileAutoScroll();
      return cleanup;
    }
  }, [deviceInfo.isMobile]);

  const preGeneratedPrompts = [
    "I need a smoothie to boost my immune system",
    "What's the best smoothie for post-workout recovery?",
    "I'd like a detox smoothie for cleansing"
  ];
  const [isTyping, setIsTyping] = useState(false);

// Scroll to bottom of chat messages when messages change
useEffect(() => {
  // Use a short delay so DOM is updated before calculating scroll height.
  setTimeout(() => {
    const chatMessagesDiv = document.querySelector(".chat-messages");
    if (chatMessagesDiv) {
      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
  }, 0);
  
  // On mobile, ensure we're at the top of the viewport
  if (deviceInfo.isMobile) {
    scrollToTop();
  }
}, [messages, isTyping, deviceInfo.isMobile]);
  
  

  const messagesEndRef = useRef(null);

  /* ---------------- helpers ---------------- */
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /* ---------------- send ---------------- */
  async function send(promptText = input) {
    if (!promptText.trim()) return;

    // Hide prompt buttons once a selection is made
    setShowPromptButtons(false);
    
    // No need for manual view restoration on mobile anymore

    const userMsg = { role: "user", content: promptText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Add timeout to fetch request to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      // Log the exact URL being used for debugging
      const apiUrl = `${API_BASE}/chat`;
      console.log("API Request URL:", apiUrl);
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: updatedMessages }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId); // Clear timeout if request completes
      setIsTyping(false);
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP Error ${res.status}: ${res.statusText}`);
      }
      
      let bot;
      try {
        bot = await res.json();
      } catch (jsonError) {
        throw new Error(`Invalid JSON response from server: ${jsonError.message}`);
      }

      /* ---------- image path logic ---------- */
      let imagePath;
      // First try to use local image from imported assets
      if (bot.id && smoothieImages[bot.id]) {
        imagePath = smoothieImages[bot.id];
      }
      // If no local image found but image_path is provided
      else if (bot.image_path) {
        // If it's already a full URL, use it directly
        if (bot.image_path.startsWith("http")) {
          imagePath = bot.image_path;
        }
        // In production, use the /images/ directory
        else if (IS_PRODUCTION) {
          // Extract just the filename from the path
          const name = bot.image_path.split("/").pop();
          // Ensure the name exists before creating the path
          imagePath = name ? `/images/${name}` : null;
        }
        // In development, prepend the API base URL
        else {
          imagePath = `${API_BASE}${bot.image_path}`;
        }
      }

      /* ---------- recommendation meta ---------- */
      const firstRec = !messages.some(
        (m) => m.role === "assistant" && m.smoothie_data
      );

      const lastSmoothie = [...messages]
        .reverse()
        .find((m) => m.role === "assistant" && m.smoothie_data);
      const newSmoothie =
        !lastSmoothie || lastSmoothie.smoothie_data.id !== bot.id;

      /* ---------- build bot message ---------- */
      const botMsg = {
        role: "assistant",
        content:
          bot.explanation ||
          "I'm not sure what to recommend. Could you provide more details?",
        isFirstRecommendation: firstRec,
        isNewSmoothie: newSmoothie,
      };

      if (imagePath && newSmoothie) botMsg.image_path = imagePath;
      if (bot.name && bot.price_usd !== undefined)
        botMsg.smoothie_data = {
          id: bot.id,
          name: bot.name,
          price_usd: bot.price_usd,
        };

      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      setIsTyping(false);
      
      // Determine if it's a network error, timeout, or other error
      let errorMessage;
      if (err.name === 'AbortError') {
        errorMessage = "Request timed out. Please check your connection and try again.";
      } else if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        errorMessage = IS_PRODUCTION
          ? "Sorry, we couldn't process your request. Please try again later."
          : `⚠️ Error: ${err.message}`;
      }
      
      // Log error in development for debugging
      if (!IS_PRODUCTION) {
        console.error("API request failed:", err);
      }
      
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4.  UI - With standard CSS classes instead of Tailwind              */
  /* ------------------------------------------------------------------ */
  return (
    <div className="main-content">
      <div style={getHeaderStyles(deviceInfo)}>
        <div className="title-with-logo">
          <div className="title-text" style={{fontSize: getLayout(deviceInfo).TITLE.FONT_SIZE, lineHeight: getLayout(deviceInfo).TITLE.LINE_HEIGHT}}>Your personal</div>
          <div className="logo-container">
            <img
              src={EarthBarLogo}
              alt="Earth Bar"
              style={getChatLogoStyles(deviceInfo)}
            />
          </div>
          <div className="title-text" style={{fontSize: getLayout(deviceInfo).TITLE.FONT_SIZE, lineHeight: getLayout(deviceInfo).TITLE.LINE_HEIGHT}}>assistant</div>
        </div>
        <p className="subtitle" style={{
          fontSize: getLayout(deviceInfo).SUBTITLE.FONT_SIZE,
          marginTop: getLayout(deviceInfo).SUBTITLE.TOP_MARGIN,
          maxWidth: getLayout(deviceInfo).SUBTITLE.MAX_WIDTH,
          textAlign: getLayout(deviceInfo).SUBTITLE.TEXT_ALIGN,
          margin: '0 auto'
        }}>Tell us what you're craving, we'll pick out a smoothie that works as hard as you do</p>
      </div>
      <div style={getChatContainerStyles(deviceInfo)}>
        {/* Chat messages */}
        <div className="chat-messages" style={getChatMessagesStyles(deviceInfo)}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message-wrapper ${m.role} ${i === messages.length - 1 ? 'last-message' : ''}`}
            >
              <div className={`message-container ${m.role}`}>
                {/* Only show avatar for assistant messages */}
                {m.role === "assistant" && (
                  <div className="avatar">
                    <img src={AvatarIcon} alt="Assistant" className="avatar-image" />
                  </div>
                )}

                {/* Message bubble */}
                <div className={`message-wrapper-inner ${m.role}`}>
                  <div className={`message ${m.role}`}>
                    {m.image_path && (
                      <img
                        src={m.image_path}
                        alt="Smoothie"
                        className="smoothie-image"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        onLoad={() => {
                          // Ensure container scrolls after bot image loads
                          const chatMessagesDiv = document.querySelector(".chat-messages");
                          if (chatMessagesDiv) {
                            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                          }
                          
                          // No need for manual view restoration on mobile anymore
                        }}
                      />
                    )}

                    {m.smoothie_data && m.isNewSmoothie ? (
                      <>
                        <p>{m.content} <span className="smoothie-price">(${m.smoothie_data.price_usd.toFixed(2)})</span></p>
                      </>
                    ) : (
                      <p>{m.content}</p>
                    )}
                  </div>
                  <span className={`timestamp ${m.role}`}>
                    {getCurrentTime()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="message-wrapper assistant">
              <div className="message-container assistant">
                <div className="avatar">
                  <img src={AvatarIcon} alt="Assistant" className="avatar-image" />
                </div>
                <div className="message-wrapper-inner assistant">
                  <div className="message assistant">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
          {/* Prompt buttons - using style functions from layout-manager */}
          {showPromptButtons && (
            <div style={getPromptButtonsContainerStyles(deviceInfo)}>
              {preGeneratedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  style={getPromptButtonStyles(deviceInfo)}
                  onClick={() => {
                    setInput(prompt);
                    send(prompt);
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          
        </div>

        {/* Input area - using style functions from layout-manager */}
        <div style={getChatInputAreaStyles(deviceInfo)}>
          <div className="input-container">
            <input
              style={{
                ...getInputFieldStyles(deviceInfo),
                // Add custom placeholder styles for dynamic font sizing
                '--placeholder-max-width': getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER ? getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER.MAX_WIDTH : '90%',
                '--placeholder-font-size': getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER ? getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER.FONT_SIZE : '16px',
                '--placeholder-color': getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER ? getLayout(deviceInfo).INPUT_FIELD.PLACEHOLDER.COLOR : '#9ca3af'
              }}
              placeholder="What smoothie are you craving?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="chat-input"
              // Add keyboard event handlers for iOS
              onFocus={() => {
                if (deviceInfo.isMobile) {
                  // Force redraw after keyboard appears
                  setTimeout(() => {
                    const chatMessagesDiv = document.querySelector(".chat-messages");
                    if (chatMessagesDiv) {
                      chatMessagesDiv.style.height = 'calc(100dvh - 4rem - 80px)';
                    }
                  }, 300);
                }
              }}
              onBlur={() => {
                if (deviceInfo.isMobile) {
                  // Force scroll to top when keyboard is dismissed
                  scrollToTop();
                }
              }}
            />
            <button
              style={{
                ...getSendButtonStyles(deviceInfo, input.trim()),
                // Add custom text styling for the send button
                '--button-font-size': getLayout(deviceInfo).SEND_BUTTON.TEXT ? getLayout(deviceInfo).SEND_BUTTON.TEXT.FONT_SIZE : '0.9375rem',
                '--button-font-weight': getLayout(deviceInfo).SEND_BUTTON.TEXT ? getLayout(deviceInfo).SEND_BUTTON.TEXT.FONT_WEIGHT : '500',
                '--button-text-transform': getLayout(deviceInfo).SEND_BUTTON.TEXT ? getLayout(deviceInfo).SEND_BUTTON.TEXT.TEXT_TRANSFORM : 'none',
                '--button-letter-spacing': getLayout(deviceInfo).SEND_BUTTON.TEXT ? getLayout(deviceInfo).SEND_BUTTON.TEXT.LETTER_SPACING : 'normal',
                '--button-line-height': getLayout(deviceInfo).SEND_BUTTON.TEXT ? getLayout(deviceInfo).SEND_BUTTON.TEXT.LINE_HEIGHT : '1.2'
              }}
              onClick={() => send()}
              disabled={!input.trim()}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
