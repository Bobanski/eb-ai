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
  
  // Only scroll on mobile unless forceScroll is true
  if (forceScroll || window.innerWidth <= 768) {
    // For iOS specifically, need to be more aggressive
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                 
    // Use more aggressive techniques for iOS
    if (isIOS) {
      // For iOS, ensure proper scroll position before manipulating
      document.body.style.overflow = 'hidden';
      
      // Special hack for iOS keyboards
      if (document.activeElement) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
          document.activeElement.blur();
        }
      }
      
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
    document.body.style.paddingTop = '0px';
    
    // Method 4: Force redraw (helps with stubborn iOS cases)
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
    
    // Method 5: For Safari that may ignore other methods
    if (window.pageYOffset > 0) {
      window.scrollTo(0, 0);
    }
    
    // Method 6: Use requestAnimationFrame to ensure scrolling happens during proper animation frame
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
  inputEl.addEventListener('blur', () => {
    // Use multiple delays to ensure we catch the right moment after keyboard dismissal
    setTimeout(() => {
      scrollToTop();
      
      // Reset chat messages container height
      const chatMessages = document.querySelector('.chat-messages');
      if (chatMessages) {
        chatMessages.style.height = 'calc(100dvh - 4rem - 80px)';
      }
      
      // Force redraw of the entire container to fix iOS visual glitches
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.offsetHeight; // Force reflow
        mainContent.style.display = 'flex';
      }
    }, 100);
    
    setTimeout(() => scrollToTop(), 300);
    setTimeout(() => scrollToTop(), 500);
  });
};

/**
 * Sets up listeners for viewport changes (resize, orientation change, etc.)
 * @returns {Function} Cleanup function to remove listeners
 */
export const setupViewportListeners = () => {
  // Handler for viewport changes
  const handleViewportChange = () => {
    // Don't auto-scroll if an input field has focus (keyboard is visible)
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      scrollToTop();
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
  const handleVisualViewportResize = () => {
    // When keyboard appears/disappears, adjust the chat messages container height
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages && window.visualViewport) {
      // If visual viewport is significantly smaller than window height, keyboard is likely visible
      if (window.visualViewport.height < window.innerHeight * 0.8) {
        // Adjust height to account for keyboard
        chatMessages.style.height = `calc(100dvh - 4rem - 80px - ${window.innerHeight - window.visualViewport.height}px)`;
      } else {
        // Reset to default height when keyboard is hidden
        chatMessages.style.height = 'calc(100dvh - 4rem - 80px)';
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