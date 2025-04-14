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

  const preGeneratedPrompts = [
    "I need a smoothie to boost my immune system",
    "What's the best smoothie for post-workout recovery?",
    "I'd like a detox smoothie for cleansing"
  ];
  const [isTyping, setIsTyping] = useState(false);
  const [initialViewCaptured, setInitialViewCaptured] = useState(false);

  // Capture initial view state on first render
  useEffect(() => {
    // Small delay to ensure everything is properly rendered
    setTimeout(() => {
      const captured = captureInitialViewState();
      setInitialViewCaptured(captured);
      console.log("Initial view state captured:", captured);
    }, 300);
  }, []);

  // Scroll to bottom of chat messages when messages change
  useEffect(() => {
    // Use a short delay so DOM is updated before calculating scroll height.
    setTimeout(() => {
      const chatMessagesDiv = document.querySelector(".chat-messages");
      if (chatMessagesDiv) {
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
      }
    }, 0);
  }, [messages, isTyping]);
  
  // Initialize mobile auto-scroll functionality
  useEffect(() => {
    // Only enable auto-scroll on mobile devices
    if (deviceInfo.isMobile) {
      // Track viewport height to detect keyboard appearance/dismissal
      let lastHeight = window.innerHeight;
      let lastVisualViewportHeight = window.visualViewport?.height || window.innerHeight;
      
      // Function to scroll to top
      const scrollWindowToTop = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      };
      
      // Function that detects keyboard dismissal and scrolls to top
      const handleViewportChange = () => {
        const currentHeight = window.innerHeight;
        const currentVisualViewportHeight = window.visualViewport?.height || window.innerHeight;
        
        // When height increases significantly, it means keyboard is dismissed
        if (
          (window.visualViewport && currentVisualViewportHeight > lastVisualViewportHeight * 1.1) ||
          (!window.visualViewport && currentHeight > lastHeight * 1.1)
        ) {
          console.log("Keyboard dismissed detected - scrolling to top");
          
          // Multiple attempts for reliability
          scrollWindowToTop();
          setTimeout(scrollWindowToTop, 100);
          setTimeout(scrollWindowToTop, 300);
          setTimeout(scrollWindowToTop, 500);
        }
        
        // Update last heights
        lastHeight = currentHeight;
        lastVisualViewportHeight = currentVisualViewportHeight;
      };
      
      // Register event listeners for viewport changes
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleViewportChange);
      }
      window.addEventListener('resize', handleViewportChange);
      
      // Initial scroll to top
      scrollWindowToTop();
      
      // Clean up event listeners
      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleViewportChange);
        }
        window.removeEventListener('resize', handleViewportChange);
      };
    }
  }, [deviceInfo.isMobile]);
  
  // Handle input field focusing (when keyboard appears)
  useEffect(() => {
    if (deviceInfo.isMobile) {
      const inputEl = document.querySelector('.chat-input');
      if (!inputEl) return;
      
      const handleFocus = () => {
        // Make input visible when keyboard shows
        setTimeout(() => {
          inputEl.scrollIntoView({ behavior: 'auto', block: 'center' });
        }, 100);
      };
      
      inputEl.addEventListener('focus', handleFocus);
      
      return () => {
        inputEl.removeEventListener('focus', handleFocus);
      };
    }
}, [deviceInfo.isMobile]);
// Removed redundant focusout listener to simplify scroll logic

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
    
    // On mobile, blur input and make multiple attempts to restore the initial view for reliability
    if (deviceInfo.isMobile) {
      const inputEl = document.querySelector(".chat-input");
      if (inputEl) inputEl.blur();

      const attemptRestoreView = () => {
        // If initial view state is captured, use that to restore the original view
        if (initialViewCaptured) {
          console.log("Restoring initial view after send");
          restoreInitialView();
        } else {
          // Fall back to standard scroll top if initial view not captured
          console.log("Scrolling to top after send (fallback)");
          scrollToTop({ forceScroll: true });
        }
      };
      
      // Increased initial delay to ensure keyboard is fully dismissed
      setTimeout(attemptRestoreView, 500);
    }

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
        <p className="subtitle" style={{fontSize: getLayout(deviceInfo).SUBTITLE.FONT_SIZE, marginTop: getLayout(deviceInfo).SUBTITLE.TOP_MARGIN}}>Tell us what you're craving, we'll pick out a smoothie that works as hard as you do</p>
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
                          
                          // Restore to initial view on mobile after image loads
                          if (deviceInfo.isMobile) {
                            if (initialViewCaptured) {
                              console.log("Restoring initial view after image load");
                              // Short delay to ensure image is fully rendered
                              setTimeout(restoreInitialView, 50);
                            } else {
                              scrollToTop();
                            }
                          }
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
              style={getInputFieldStyles(deviceInfo)}
              placeholder="What smoothie are you craving?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              onFocus={() => {
                if (deviceInfo.isMobile) {
                  // On focus, ensure the input is visible with keyboard
                  setTimeout(() => {
                    const inputEl = document.querySelector(".chat-input");
                    if (inputEl) inputEl.scrollIntoView({ behavior: 'auto', block: 'center' });
                  }, 100);
                }
              }}
              onBlur={() => {
                if (deviceInfo.isMobile) {
                  // More aggressive approach for iOS on blur
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  
                  // Use initial view restoration if available
                  if (initialViewCaptured) {
                    console.log("Restoring initial view on input blur");
                    restoreInitialView();
                    
                    // Multiple attempts with increasing delays
                    setTimeout(restoreInitialView, 100);
                    setTimeout(restoreInitialView, 300);
                    
                    // iOS needs extra attention
                    if (isIOS) {
                      setTimeout(restoreInitialView, 500);
                      setTimeout(restoreInitialView, 800);
                    }
                  } else {
                    // Fall back to standard scroll if initial view not captured
                    scrollToTop({ forceScroll: true });
                    setTimeout(() => scrollToTop({ forceScroll: true }), 100);
                    setTimeout(() => scrollToTop({ forceScroll: true }), 300);
                    
                    if (isIOS) {
                      setTimeout(() => scrollToTop({ forceScroll: true }), 500);
                      setTimeout(() => scrollToTop({ forceScroll: true }), 800);
                    }
                  }
                }
              }}
              className="chat-input"
            />
            <button
              style={getSendButtonStyles(deviceInfo, input.trim())}
              onClick={() => send()}
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
