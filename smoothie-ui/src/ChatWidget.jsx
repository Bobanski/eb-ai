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
  const [pendingSend, setPendingSend] = useState(false);
  const pendingInputRef = useRef("");
  // Use ref instead of state for currentSmoothieId to avoid async state update issues
  const currentSmoothieIdRef = useRef(null);
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
      console.log("Initializing mobile autoscroll");
      const cleanup = initMobileAutoScroll();
      
      // IMPORTANT: Add keyboard event listeners for better debugging
      const inputEl = document.querySelector('.chat-input');
      if (inputEl) {
        const originalFocus = inputEl.onfocus;
        const originalBlur = inputEl.onblur;
        
        // Add global tracking for first keyboard appearance
        window._keyboardShownFirstTime = false;
        
        // Expose helper to reset keyboard appearance
        window.resetKeyboardFirstTimeState = () => {
          window._keyboardShownFirstTime = false;
          if (inputEl) {
            delete inputEl.dataset.hadFocus;
            delete inputEl.dataset.hadFullKeyboardShown;
          }
          console.log("Keyboard first-time state has been reset");
        };
      }
      
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
    // BUT NOT during first keyboard appearance
    if (deviceInfo.isMobile) {
      // Get reference to input element to check if it's in first keyboard state
      const inputEl = document.querySelector('.chat-input');
      const isFirstKeyboardAppearance = inputEl &&
                                       !inputEl.dataset.hadFullKeyboardShown &&
                                       document.activeElement === inputEl;
      
      if (!isFirstKeyboardAppearance) {
        scrollToTop();
      } else {
        console.log("Skipping scrollToTop during messages update - first keyboard appearance in progress");
      }
    }
  }, [messages, isTyping, deviceInfo.isMobile]);

  // Handle pending send requests (for keyboard issues)
  useEffect(() => {
    if (pendingSend && pendingInputRef.current) {
      // We need specific handling for iOS devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
      // Reset the pendingSend state immediately to prevent double execution
      setPendingSend(false);
      
      // Use longer delays for iOS devices
      const delay = isIOS ? 300 : 100;
      
      console.log("Preparing to send with delay:", delay, "ms, text:", pendingInputRef.current);
      
      // Execute the send with a delay to allow for keyboard dismissal
      setTimeout(() => {
        console.log("Executing delayed send with:", pendingInputRef.current);
        if (pendingInputRef.current) {
          send(pendingInputRef.current);
          pendingInputRef.current = "";
        }
      }, delay);
    }
  }, [pendingSend]);


  const messagesEndRef = useRef(null);

  /* ---------------- helpers ---------------- */
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
  // Function to format markdown text by removing ** characters
  const formatMarkdown = (text) => {
    if (!text) return "";
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  /* ---------------- send ---------------- */
  async function send(promptText = input) {
    // Ensure we have a non-empty string
    if (!promptText || !promptText.trim()) return;

    // Normalize the input value
    const inputValue = promptText.trim();
    
    // Hide prompt buttons once a selection is made
    setShowPromptButtons(false);
    
    // Reset currentSmoothieId if the user clears the chat or starts over
    if (inputValue.toLowerCase().includes("start over") ||
        inputValue.toLowerCase().includes("clear chat")) {
      currentSmoothieIdRef.current = null;
      console.log("[Image Logic] Reset smoothie ID to null (new conversation)");
    }
    
    // Log to help debug mobile send issues
    console.log("Sending message:", inputValue);
    
    // No need for manual view restoration on mobile anymore

    const userMsg = { role: "user", content: inputValue };
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
      // Use updatedMessages to avoid stale state references
      const firstRec = !updatedMessages.some(
        (m) => m.role === "assistant" && m.smoothie_data
      );

      // Use updatedMessages for more accurate current state
      const lastSmoothie = [...updatedMessages]
        .reverse()
        .find((m) => m.role === "assistant" && m.smoothie_data);
      const newSmoothie =
        !lastSmoothie || lastSmoothie.smoothie_data?.id !== bot.id;

      /* ---------- build bot message ---------- */
      const botMsg = {
        role: "assistant",
        content:
          bot.explanation ||
          "Let me know what you're in the mood for!",
        isFirstRecommendation: firstRec,
        isNewSmoothie: newSmoothie,
        showImage: false, // Default to false, will be updated if needed
      };

      // Set up showImage flag
      let showImage = false;

      // Handle image path for all messages that have smoothie information
      if (imagePath) {
        // Always include the image_path in the message
        botMsg.image_path = imagePath;
        
        // Log the current state and incoming data for debugging
        console.log("[Image Logic] Received bot object:", JSON.stringify(bot, null, 2));
        console.log("[Image Logic] Current Smoothie ID (ref):", currentSmoothieIdRef.current);
        console.log("[Image Logic] New Smoothie ID from bot:", bot.id);
        
        // Use a local variable to store the previous smoothie ID
        const prevSmoothieId = currentSmoothieIdRef.current;
        
        // Default to not showing image
        showImage = false;
        
        // Check if this is a smoothie recommendation (by checking for an ID)
        const newId = bot.id;
        
        // Debug: Log intent information
        console.log("[Image Logic DEBUG] Intent:", bot.intent);
        console.log("[Image Logic DEBUG] Is SMOOTHIE_REQUEST:", bot.intent === "SMOOTHIE_REQUEST");
        
        // Current logic: show the image if newId != currentSmoothieId OR intent="SMOOTHIE_REQUEST"
        if (newId && (newId !== prevSmoothieId || bot.intent === "SMOOTHIE_REQUEST")) {
          // This is a new smoothie - show the image
          showImage = true;
          
          // Update the ref immediately (synchronous)
          currentSmoothieIdRef.current = newId;
          
          console.log(`[Image Logic] NEW SMOOTHIE DETECTED: ${newId}, Intent: ${bot.intent}. Setting showImage = true`);
        } else {
          // This is the same smoothie or no ID - don't show the image
          if (!newId) {
            console.log("[Image Logic] No valid smoothie ID found. Setting showImage = false");
          } else if (newId === prevSmoothieId && bot.intent === "FOLLOW_UP") {
            console.log(`[Image Logic] FOLLOW_UP on SAME SMOOTHIE: ${newId}. Setting showImage = false`);
          } else {
            console.log(`[Image Logic] Other case: ID=${newId}, Intent=${bot.intent}. Setting showImage = false`);
          }
        }
        
        // Add the showImage flag to the botMsg
        botMsg.showImage = showImage;
      }
      
      // Always include smoothie_data for smoothie recommendations
      if (bot.id && bot.name && (bot.intent === "SMOOTHIE_REQUEST" || bot.intent === "FOLLOW_UP")) {
        botMsg.smoothie_data = {
          id: bot.id,
          name: bot.name,
          price_usd: bot.price_usd !== undefined ? bot.price_usd : 0,
        };
      }

      // Final verification log to debug botMsg state before it's added to messages
      console.log("[Image Logic] FINAL botMsg object being added to messages:", JSON.stringify({
        showImage: botMsg.showImage,
        image_path: botMsg.image_path,
        id: botMsg.smoothie_data?.id,
        currentSmoothieId: currentSmoothieIdRef.current
      }, null, 2));

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
                    {/* Display image only when showImage flag is true */}
                    {m.showImage && m.image_path &&
                     m.image_path !== "/images/avatar-icon.png" && (
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

                    {/* Display content and price for all smoothie recommendations */}
                    {m.smoothie_data ? (
                      <>
                        <p dangerouslySetInnerHTML={{ __html: formatMarkdown(m.content) }}>
                        </p>
                        {m.smoothie_data.price_usd && m.smoothie_data.price_usd > 0 ? (
                          <span className="smoothie-price">(${m.smoothie_data.price_usd.toFixed(2)})</span>
                        ) : null}
                      </>
                    ) : (
                      <p dangerouslySetInnerHTML={{ __html: formatMarkdown(m.content) }}></p>
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
              onFocus={(e) => {
                console.log("INPUT FOCUS EVENT - handling keyboard appearance");
                if (deviceInfo.isMobile) {
                  // Log device details
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  
                  console.log("Mobile device detected:", {
                    userAgent: navigator.userAgent,
                    isIOS: isIOS,
                    visualViewportHeight: window.visualViewport?.height,
                    windowHeight: window.innerHeight
                  });
                  
                  // Track if this is the first focus - don't set the flag immediately
                  const isFirstFocus = !e.target.dataset.hadFocus;
                  
                  // Get references to elements
                  const chatMessagesDiv = document.querySelector(".chat-messages");
                  const mainContent = document.querySelector(".main-content");
                  
                  if (isFirstFocus) {
                    console.log("FIRST FOCUS detected - applying special first-time handling");
                    
                    // More aggressive handling for first focus - use a larger estimated height
                    // This prevents the keyboard from covering content on first appearance
                    let keyboardHeight = window.innerHeight * 0.4; // 40% is a good estimate for iOS keyboard height
                    
                    // Use Visual Viewport API if available for more accurate measurement
                    if (window.visualViewport) {
                      // If viewport has already changed, use it, otherwise use our estimate
                      if (window.visualViewport.height < window.innerHeight * 0.8) {
                        keyboardHeight = window.innerHeight - window.visualViewport.height;
                        console.log("Using visual viewport for keyboard height:", keyboardHeight);
                      } else {
                        console.log("Using estimated keyboard height:", keyboardHeight);
                      }
                    }
                    
                    if (chatMessagesDiv) {
                      // Immediate adjustment with more aggressive padding
                      chatMessagesDiv.style.height = `calc(100dvh - 4rem - 80px - ${keyboardHeight}px)`;
                      chatMessagesDiv.style.paddingBottom = `${keyboardHeight * 0.5}px`;
                      
                      // Force scroll adjustment
                      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                      window.scrollTo(0, 0);
                      
                      // Add dramatic temporary padding to the main content to force layout shift
                      if (mainContent && isIOS) {
                        mainContent.style.paddingBottom = `${keyboardHeight}px`;
                        // Force reflow
                        mainContent.style.display = 'none';
                        mainContent.offsetHeight;
                        mainContent.style.display = 'flex';
                      }
                      
                      // Set the flag after a delay to ensure the keyboard is fully shown
                      setTimeout(() => {
                        e.target.dataset.hadFocus = "true";
                        // Remove any temporary padding from main content
                        if (mainContent) {
                          mainContent.style.paddingBottom = '';
                        }
                        // Keep proper height for chat messages
                        if (window.visualViewport) {
                          const updatedKeyboardHeight = window.innerHeight - window.visualViewport.height;
                          if (updatedKeyboardHeight > 100) { // If keyboard is visible
                            chatMessagesDiv.style.height = `calc(100dvh - 4rem - 80px - ${updatedKeyboardHeight}px)`;
                          }
                        }
                        // Ensure input stays in view
                        e.target.scrollIntoView({ block: 'center', behavior: 'auto' });
                      }, 300);
                    }
                  }
                  
                  // Regular adjustment with timeout (for all focus events)
                  setTimeout(() => {
                    console.log("Focus timeout executing - adjusting chat messages height");
                    const chatMessagesDiv = document.querySelector(".chat-messages");
                    if (chatMessagesDiv) {
                      if (window.visualViewport) {
                        const keyboardHeight = window.innerHeight - window.visualViewport.height;
                        chatMessagesDiv.style.height = `calc(100dvh - 4rem - 80px - ${keyboardHeight}px)`;
                      } else {
                        chatMessagesDiv.style.height = 'calc(100dvh - 4rem - 80px)';
                      }
                      
                      // Ensure content is properly scrolled
                      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
                    }
                  }, 300);
                }
              }}
              onBlur={(e) => {
                console.log("INPUT BLUR EVENT - Target:", e.target.tagName, "Related target:", e.relatedTarget ? e.relatedTarget.tagName : 'null');
                if (deviceInfo.isMobile) {
                  // Check if the related target is the send button
                  // If it is, don't scroll to top as we're trying to send a message
                  const relatedTarget = e.relatedTarget;
                  const isSendButton = relatedTarget &&
                    (relatedTarget.className.includes('send-button') ||
                     relatedTarget.closest('.send-button'));
                  
                  console.log("Is send button:", isSendButton);
                  
                  if (!isSendButton) {
                    // Only scroll to top if we're not clicking the send button
                    console.log("Calling scrollToTop from blur event");
                    scrollToTop();
                  }
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
              // Touch events specifically for mobile
              onTouchStart={(e) => {
                // Only for mobile
                if (!deviceInfo.isMobile) return;
                
                // Get current input text
                const currentInput = input.trim();
                if (!currentInput) return;
                
                console.log("Touch START on send button:", currentInput);
                
                // Store it for later use
                pendingInputRef.current = currentInput;
                
                // Clear input for immediate feedback
                setInput("");
                
                // Blur any focused input to dismiss keyboard
                if (document.activeElement &&
                    (document.activeElement.tagName === 'INPUT' ||
                     document.activeElement.tagName === 'TEXTAREA')) {
                  document.activeElement.blur();
                }
              }}
              onTouchEnd={(e) => {
                // Only for mobile
                if (!deviceInfo.isMobile) return;
                
                console.log("Touch END on send button:", pendingInputRef.current);
                if (pendingInputRef.current) {
                  // iOS needs more time for keyboard to fully dismiss
                  setTimeout(() => {
                    const messageToSend = pendingInputRef.current;
                    pendingInputRef.current = "";
                    send(messageToSend);
                  }, 300); // Longer delay for iOS keyboard animation
                }
              }}
              // Fallback click handler for non-touch devices
              onClick={(e) => {
                if (!input.trim()) return;
                
                // For non-mobile, just send directly
                if (!deviceInfo.isMobile) {
                  send(input);
                  return;
                }
                
                // For mobile, we already handled this with touch events
                // This is just a fallback
                console.log("Click fallback on send button");
              }}
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
