/**
 * MOBILE AUTO-SCROLL UTILITY
 * 
 * This utility handles automatic scrolling behavior for mobile views,
 * particularly to handle situations like:
 * - Scrolling to top on initial load
 * - Scrolling to top when keyboard appears or disappears
 * - Scrolling to top when messages change or images load
 * - Proper zooming behavior for better mobile UX
 */

/**
 * Scrolls to the top of the page for mobile views
 * @param {Object} options - Options for scrolling
 * @param {string} options.behavior - The scrolling behavior ('auto' or 'smooth')
 * @param {boolean} options.forceScroll - Whether to scroll even if not on mobile
 */
export const scrollToTop = (options = {}) => {
  const { behavior = 'auto', forceScroll = false } = options;
  
  // Block scrollToTop during first keyboard appearance if input has focus
  if (document.activeElement &&
      (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
      !document.activeElement.dataset.hadFullKeyboardShown) {
    console.log("CRITICAL: Blocking scrollToTop during first keyboard appearance");
    return;
  }
  
  // Only scroll on mobile unless forceScroll is true
  if (forceScroll || window.innerWidth <= 768) {
    // For iOS specifically, need to be more aggressive
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                 
    // Use more aggressive techniques for iOS
    if (isIOS) {
      // Check if an input field is focused and keyboard is likely visible
      const inputHasFocus = document.activeElement &&
                           (document.activeElement.tagName === 'INPUT' ||
                            document.activeElement.tagName === 'TEXTAREA');
      
      // CRITICAL: Don't do anything that could dismiss the keyboard on first appearance
      if (inputHasFocus && !document.activeElement.dataset.hadFullKeyboardShown) {
        console.log("iOS: Detected first keyboard appearance - SKIPPING ALL scrollToTop operations");
        return;
      }
      
      // For iOS, ensure proper scroll position before manipulating
      document.body.style.overflow = 'hidden';
      
      // Special hack for iOS keyboards - never blur during scrollToTop
      if (document.activeElement) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
          console.log("iOS: Input element focused in scrollToTop - NOT blurring");
          // Never auto-blur as it causes keyboard dismissal
        }
      }
      
      // Only perform these operations if we're not in first keyboard appearance
      if (!inputHasFocus || document.activeElement.dataset.hadFullKeyboardShown) {
        // iOS specific body/document position reset
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
        
        // Fix iOS position with transform - this forces a repaint
        document.body.style.transform = 'translateY(0)';
        document.body.offsetHeight; // Force reflow
        document.body.style.transform = '';
        
        // Force redraw to fix iOS visual glitches after keyboard dismissal
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
          chatContainer.style.display = 'none';
          chatContainer.offsetHeight; // Force reflow
          chatContainer.style.display = 'flex';
        }
        
        // Re-enable scrolling after forced position
        setTimeout(() => {
          document.body.style.overflow = '';
          window.scrollTo(0, 0);
        }, 50);
      }
    }
    
    // Check again before performing standard scroll methods
    // Block scrollToTop during first keyboard appearance if input has focus
    if (document.activeElement &&
        (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
        !document.activeElement.dataset.hadFullKeyboardShown) {
      console.log("CRITICAL: Blocking standard scroll methods during first keyboard appearance");
      return;
    }
    
    // Standard methods for all devices
    // Method 1: Standard scrollTo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
    
    // Method 2: Direct property assignment
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Method 3: Direct CSS manipulation (helps with some iOS cases)
    document.body.style.marginTop = '0px';
    document.body.style.paddingBottom = '';
    
    // Method 5: For Safari that may ignore other methods
    if (window.pageYOffset > 0) {
      window.scrollTo(0, 0);
    }
    
    // Method 6: Use requestAnimationFrame for last attempt
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }
};

/**
 * Sets up handlers for scrolling when input field is focused/blurred
 * This helps keep the view properly positioned when the keyboard appears
 * @param {string} inputSelector - CSS selector for the input field
 */
export const setupInputFocusHandlers = (inputSelector = '.chat-input') => {
  const inputEl = document.querySelector(inputSelector);
  
  if (!inputEl) return;
  
  // When input is focused (keyboard appears), scroll to the input field
  inputEl.addEventListener('focus', () => {
    // Small delay to allow keyboard to appear
    setTimeout(() => {
      // Scroll the input element into view
      inputEl.scrollIntoView({ behavior: 'auto', block: 'center' });
      
      // Attempt to zoom out (may not work on all devices due to security limitations)
      if (document.body.style.zoom) {
        document.body.style.zoom = 1.0;
      }
      
      // Ensure chat messages container is properly sized
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        // Force recalculation of chat messages height when keyboard appears
        chatMessages.style.height = `calc(100dvh - 4rem - 80px - ${window.visualViewport?.height || window.innerHeight}px + ${window.innerHeight}px)`;
      }
    }, 100);
  });
  
  // When input is blurred (keyboard disappears), scroll to top and fix layout
  inputEl.addEventListener('blur', (e) => {
    console.log("INPUT BLUR in setupInputFocusHandlers - RelatedTarget:", e.relatedTarget ? e.relatedTarget.tagName : 'null');
    
    // Don't perform scroll actions if we're switching to another input-related element
    // like the send button
    const relatedTarget = e.relatedTarget;
    const isFocusingSendButton = relatedTarget &&
      (relatedTarget.className.includes('send-button') ||
       relatedTarget.closest('.send-button'));
    
    if (isFocusingSendButton) {
      console.log("Focusing send button - skipping scrollToTop");
      return;
    }
    
    // For the first focus/blur cycle, don't do anything aggressive
    // This fixes the first-click issue
    if (!inputEl.dataset.hadInitialFocus) {
      console.log("First blur after focus - setting flag and doing minimal adjustment", {
        activeElement: document.activeElement ? document.activeElement.tagName : 'none',
        visualViewportHeight: window.visualViewport?.height,
        windowHeight: window.innerHeight,
        ratio: window.visualViewport ? window.visualViewport.height / window.innerHeight : 'N/A'
      });
      
      inputEl.dataset.hadInitialFocus = "true";
      
      // Fix for keyboard appearing and disappearing on first focus/blur
      // Restore normal height - but don't scroll aggressively
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.style.height = 'calc(100dvh - 4rem - 80px)';
        chatMessages.style.paddingBottom = '';
      }
      
      return;
    }
    
    // Use a single timeout with a reasonable delay
    setTimeout(() => {
      console.log("Blur timeout executing");
      
      // Reset chat messages container height
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.style.height = 'calc(100dvh - 4rem - 80px)';
      }
      
      // Only scroll to top for actual keyboard dismissal
      scrollToTop();
      
      // Force redraw of the entire container to fix iOS visual glitches
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.offsetHeight; // Force reflow
        mainContent.style.display = 'flex';
      }
    }, 150);
  });
};

/**
 * Sets up listeners for viewport changes (resize, orientation change, etc.)
 * @returns {Function} Cleanup function to remove listeners
 */
export const setupViewportListeners = () => {
  // Track if this is the first resize event
  let isFirstResizeEvent = true;
  // Track if we're in the middle of first keyboard appearance
  let isHandlingFirstKeyboardAppearance = false;
  // Track when keyboard is visible
  let isKeyboardVisible = false;
  
  // Handler for viewport changes
  const handleViewportChange = () => {
    console.log("VIEWPORT CHANGE detected", {
      activeElement: document.activeElement.tagName,
      isFirstResizeEvent,
      isHandlingFirstKeyboardAppearance,
      visualViewportHeight: window.visualViewport?.height,
      windowHeight: window.innerHeight,
      ratio: window.visualViewport ? window.visualViewport.height / window.innerHeight : 'N/A'
    });
    
    // Detect if keyboard is appearing or disappearing
    if (window.visualViewport) {
      const heightRatio = window.visualViewport.height / window.innerHeight;
      const wasKeyboardVisible = isKeyboardVisible;
      isKeyboardVisible = heightRatio < 0.8;
      
      // Detect first keyboard appearance
      if (!wasKeyboardVisible && isKeyboardVisible &&
          (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        console.log("Keyboard appears to be showing for the first time");
        
        // For first keyboard appearance, set flag to prevent scrollToTop
        if (!document.activeElement.dataset.hadInitialFocus || !document.activeElement.dataset.hadFullKeyboardShown) {
          isHandlingFirstKeyboardAppearance = true;
          console.log("CRITICAL: Blocking all scrollToTop calls during first keyboard appearance");
          
          // Mark that we've seen full keyboard shown
          setTimeout(() => {
            if (document.activeElement) {
              document.activeElement.dataset.hadFullKeyboardShown = "true";
            }
            // Extend the blocking period
            setTimeout(() => {
              isHandlingFirstKeyboardAppearance = false;
              console.log("Unblocking scrollToTop calls after keyboard fully shown");
            }, 500);
          }, 300);
        }
      }
    }
    
    // Special handling for first viewport change to prevent initial keyboard dismissal
    if (isFirstResizeEvent) {
      console.log("First viewport change event - skipping scrollToTop");
      isFirstResizeEvent = false;
      return;
    }
    
    // CRITICAL: Block scrollToTop during first keyboard appearance
    if (isHandlingFirstKeyboardAppearance) {
      console.log("Blocking scrollToTop during first keyboard appearance");
      return;
    }
    
    // Don't auto-scroll if an input field has focus (keyboard is visible)
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      console.log("No input active, calling scrollToTop from viewport change");
      scrollToTop();
    } else {
      console.log("Input is active, NOT scrolling to top");
    }
  };
  
  // Add event listeners
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', handleViewportChange);
  
  // Use Visual Viewport API if available (better for keyboard events)
  window.visualViewport?.addEventListener('resize', handleViewportChange);
  window.visualViewport?.addEventListener('scroll', handleViewportChange);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleViewportChange);
    window.removeEventListener('orientationchange', handleViewportChange);
    window.visualViewport?.removeEventListener('resize', handleViewportChange);
    window.visualViewport?.removeEventListener('scroll', handleViewportChange);
  };
};

/**
 * Initializes all mobile auto-scroll functionality
 * @returns {Function} Cleanup function to remove all listeners
 */
export const initMobileAutoScroll = () => {
  // Force immediate scroll to top
  scrollToTop({ forceScroll: true });
  
  // Setup input focus handlers
  setupInputFocusHandlers();
  
  // Setup viewport change listeners and get cleanup function
  const cleanupViewportListeners = setupViewportListeners();
  
  // Set up a periodic check to ensure we're at the top (iOS can be stubborn)
  const initialScrollInterval = setInterval(() => {
    if (window.pageYOffset > 0) {
      scrollToTop({ forceScroll: true });
    }
  }, 200);
  
  // Clear interval after 2 seconds
  setTimeout(() => clearInterval(initialScrollInterval), 2000);
  
  // Add event listener for visual viewport changes (better for keyboard events)
  // Track if this is the first keyboard appearance
  let isFirstKeyboardAppearance = true;
  
  const handleVisualViewportResize = () => {
    // When keyboard appears/disappears, adjust the chat messages container height
    const chatMessages = document.querySelector('.chat-messages');
    const inputEl = document.querySelector('.chat-input');
    const mainContent = document.querySelector('.main-content');
    
    // Log viewport changes
    console.log("VISUAL VIEWPORT RESIZE:", {
      visualViewportHeight: window.visualViewport?.height,
      windowInnerHeight: window.innerHeight,
      ratio: window.visualViewport ? window.visualViewport.height / window.innerHeight : 'N/A',
      activeElement: document.activeElement.tagName,
      isFirstKeyboardAppearance
    });
    
    if (chatMessages && window.visualViewport) {
      // Calculate height ratio to detect keyboard
      const heightRatio = window.visualViewport.height / window.innerHeight;
      const keyboardHeight = window.innerHeight - window.visualViewport.height;
      
      // If visual viewport is significantly smaller than window height, keyboard is likely visible
      if (heightRatio < 0.8) {
        console.log("Keyboard appears to be visible - adjusting container height");
        
        // Special handling for first keyboard appearance
        if (isFirstKeyboardAppearance && inputEl && document.activeElement === inputEl) {
          console.log("FIRST KEYBOARD APPEARANCE - applying aggressive adjustment", {
            keyboardHeight,
            windowInnerHeight: window.innerHeight,
            visualViewportHeight: window.visualViewport?.height,
            hadInitialFocus: inputEl.dataset.hadInitialFocus
          });
          
          // Don't change the flag yet - we'll set it after successful adjustment
          // This ensures we properly handle the first keyboard appearance
          
          // Apply more aggressive adjustments for first appearance
          // This fixes the issue where keyboard covers content on first tap
          
          // 1. Immediate UI adjustments
          if (mainContent) {
            // Force a more dramatic layout shift - use 20% more padding to ensure it shifts enough
            const adjustedHeight = Math.max(keyboardHeight, window.innerHeight * 0.4);
            console.log("Using adjusted height for padding:", adjustedHeight);
            mainContent.style.paddingBottom = `${adjustedHeight}px`;
            
            // Trigger reflow to force immediate layout update
            mainContent.style.display = 'none';
            mainContent.offsetHeight;
            mainContent.style.display = 'flex';
          }
          
          // 2. Apply stronger viewport & scroll adjustments
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          window.scrollTo(0, 0);
          
          // 3. Ensure the chat container has extra padding for keyboard
          chatMessages.style.paddingBottom = `${keyboardHeight}px`;
          
          // 4. Ensure input remains focused & content is properly positioned
          setTimeout(() => {
            console.log("First keyboard adjustment timeout running");
            if (document.activeElement !== inputEl) {
              console.log("Re-focusing input after first keyboard appearance");
              inputEl.focus();
            }
            
            // Scroll the input into view
            inputEl.scrollIntoView({ block: 'center', behavior: 'auto' });
            
            // Ensure messages are also properly scrolled
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // IMPORTANT: Now that our adjustments are complete, mark the flag
            // This prevents double-handling and ensures proper sync with the blur handler
            isFirstKeyboardAppearance = false;
            
            // Reset padding after initial adjustment (but keep proper height)
            setTimeout(() => {
              console.log("Removing padding after adjustment");
              if (mainContent) {
                mainContent.style.paddingBottom = '';
              }
              
              // Force one more scroll after all adjustments
              window.scrollTo(0, 0);
            }, 300);
          }, 150); // Increased timeout for more reliable behavior
        }
        
        // For all keyboard appearances (first or subsequent):
        
        // Adjust height to account for keyboard
        chatMessages.style.height = `calc(100dvh - 4rem - 80px - ${keyboardHeight}px)`;
        
        // Ensure proper scrolling behavior
        setTimeout(() => {
          // Scroll to bottom of messages
          chatMessages.scrollTop = chatMessages.scrollHeight;
          
          // Force window to top
          window.scrollTo(0, 0);
        }, 10);
      } else {
        console.log("Keyboard appears to be hidden - resetting container height");
        // Reset to default height when keyboard is hidden
        chatMessages.style.height = 'calc(100dvh - 4rem - 80px)';
        
        // Reset any padding we might have added
        chatMessages.style.paddingBottom = '';
        if (mainContent) {
          mainContent.style.paddingBottom = '';
        }
      }
    }
  };
  
  // Add visual viewport event listener if available
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleVisualViewportResize);
  }
  
  // Return a function that cleans up all listeners
  return () => {
    clearInterval(initialScrollInterval);
    cleanupViewportListeners();
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleVisualViewportResize);
    }
  };
};