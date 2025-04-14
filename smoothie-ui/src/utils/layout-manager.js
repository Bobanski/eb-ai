/**
 * LAYOUT MANAGER
 * 
 * This file connects the separate mobile and desktop layout configurations
 * and provides a simple interface for the rest of the application.
 * 
 * You don't need to modify this file - instead:
 * - For mobile layout changes: edit src/utils/mobile-layout.js
 * - For desktop layout changes: edit src/utils/desktop-layout.js
 */

import { DESKTOP_LAYOUT } from './desktop-layout';
import { MOBILE_LAYOUT, VERY_SMALL_MOBILE_OVERRIDES } from './mobile-layout';

// Breakpoints for device detection
export const BREAKPOINTS = {
  VERY_SMALL: 375,  // Very small mobile devices
  SMALL: 480,       // Small mobile devices
  MEDIUM: 768,      // Tablets and medium devices
  LARGE: 1024,      // Desktops and large devices
  X_LARGE: 1280     // Extra large displays
};

/**
 * Detects device type based on window dimensions
 * @returns {Object} Device information
 */
export const getDeviceInfo = () => {
  const isMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.MEDIUM}px)`).matches || 
                  (window.matchMedia(`(max-height: ${BREAKPOINTS.SMALL}px)`).matches && 
                   window.matchMedia("(orientation: landscape)").matches);
  
  const isVerySmallMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.VERY_SMALL}px)`).matches || 
                           (window.matchMedia(`(max-height: ${BREAKPOINTS.VERY_SMALL}px)`).matches && 
                            window.matchMedia("(orientation: landscape)").matches);
  
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  
  return {
    isMobile,
    isVerySmallMobile,
    isLandscape,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  };
};

/**
 * Gets the appropriate layout configuration based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Layout configuration
 */
export const getLayout = (deviceInfo) => {
  const { isMobile, isVerySmallMobile } = deviceInfo;
  
  if (isVerySmallMobile) {
    // Merge mobile layout with very small mobile overrides
    return {
      ...MOBILE_LAYOUT,
      ...VERY_SMALL_MOBILE_OVERRIDES
    };
  } else if (isMobile) {
    return MOBILE_LAYOUT;
  } else {
    return DESKTOP_LAYOUT;
  }
};

/**
 * Generates container styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Container styles
 */
export const getContainerStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  const { isMobile } = deviceInfo; // Get isMobile flag

  const baseStyles = {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: layout.CONTAINER.MAX_WIDTH,
    position: "relative",
    zIndex: "5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
    fontSize: layout.CONTAINER.FONT_SIZE,
    padding: layout.CONTAINER.PADDING,
    paddingTop: `calc(env(safe-area-inset-top, 0) + ${layout.CONTAINER.PADDING})`,
    paddingBottom: `calc(env(safe-area-inset-bottom, 0) + ${layout.CONTAINER.PADDING})`,
    margin: "0 auto",
  };

  if (isMobile) {
    // Mobile: Minimum height, allow overflow
    return {
      ...baseStyles,
      minHeight: '100dvh', // Ensure container takes full viewport height
      overflow: "visible", // Allow content to potentially overflow if needed
    };
  } else {
    // Desktop: Minimum height, scrolling allowed
    return {
      ...baseStyles,
      minHeight: "100vh",
      overflow: "visible",
    };
  }
};

/**
 * Generates logo styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Logo styles
 */
export const getLogoStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  return {
    position: "absolute",
    height: layout.APP_LOGO.HEIGHT,
    width: "auto",
    opacity: "0.6",
    top: layout.APP_LOGO.TOP_OFFSET,
    left: layout.APP_LOGO.LEFT_MARGIN,
    zIndex: layout.APP_LOGO.Z_INDEX
  };
};

/**
 * Generates chat logo styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Chat logo styles
 */
export const getChatLogoStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  return {
    height: layout.CHAT_LOGO.HEIGHT,
    width: layout.CHAT_LOGO.WIDTH,
    display: layout.CHAT_LOGO.DISPLAY
  };
};

/**
 * Generates header styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Header styles
 */
export const getHeaderStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  return {
    position: "absolute",
    top: layout.HEADER.TOP,
    left: layout.HEADER.LEFT,
    right: layout.HEADER.RIGHT,
    padding: layout.HEADER.PADDING,
    zIndex: layout.HEADER.Z_INDEX,
    width: "100%",
    textAlign: "center"
  };
};

/**
 * Generates chat container styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Chat container styles
 */
export const getChatContainerStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);

  // If bottom is set in the layout, we override the top to auto
  // so the container stays anchored to the bottom instead of the top.
  const topValue = (layout.CHAT_CONTAINER.BOTTOM !== undefined)
    ? 'auto'
    : layout.CHAT_CONTAINER.TOP;

  return {
    position: "absolute",
    top: topValue,
    left: layout.CHAT_CONTAINER.LEFT,
    right: layout.CHAT_CONTAINER.RIGHT,
    width: layout.CHAT_CONTAINER.WIDTH,
    maxWidth: layout.CHAT_CONTAINER.MAX_WIDTH,
    borderRadius: layout.CHAT_CONTAINER.BORDER_RADIUS,
    zIndex: layout.CHAT_CONTAINER.Z_INDEX,
    margin: "0 auto",
    backgroundColor: "black",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "15px solid black",
    boxSizing: "border-box",
    bottom: layout.CHAT_CONTAINER.BOTTOM || 'auto',
    height: layout.CHAT_CONTAINER.HEIGHT || 'auto'
  };
};


/**
* Generates chat messages area styles based on device type
* @param {Object} deviceInfo Device information from getDeviceInfo()
* @returns {Object} Chat messages styles
*/
export const getChatMessagesStyles = (deviceInfo) => {
const layout = getLayout(deviceInfo);

// Only apply these styles if CHAT_MESSAGES exists in the layout
if (layout.CHAT_MESSAGES) {
  return {
    height: layout.CHAT_MESSAGES.HEIGHT,
    maxHeight: layout.CHAT_MESSAGES.MAX_HEIGHT,
    minHeight: layout.CHAT_MESSAGES.MIN_HEIGHT,
    padding: layout.CHAT_MESSAGES.PADDING,
    flex: layout.CHAT_MESSAGES.FLEX || '1', // Default flex to 1 if not specified
    // Add other necessary base styles that should be controlled by JS
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'relative', // Ensure proper stacking context if needed
    zIndex: 2 // Example z-index, adjust if necessary
  };
}

// Return empty object if no specific styles defined for chat messages
return {};
};

/**
 * Generates footer styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Footer styles
 */
export const getFooterStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  return {
    position: "absolute",
    bottom: layout.FOOTER.BOTTOM,
    left: layout.FOOTER.LEFT,
    right: layout.FOOTER.RIGHT,
    padding: layout.FOOTER.PADDING,
    zIndex: layout.FOOTER.Z_INDEX,
    width: "100%",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "black",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: layout.FOOTER.FONT_SIZE
  };
};

/**
 * Generates background styles
 * @returns {Object} Background styles
 */
export const getBackgroundStyles = () => {
  return {
    primary: {
      position: "absolute",
      top: "-50vh",
      left: "-50vw",
      right: "-50vw",
      bottom: "-100vh",
      width: "200vw",
      height: "300vh",
      background: "#c7e0ff",
      zIndex: "-10",
      pointerEvents: "none"
    },
    gradient: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(to bottom, #e8f3ff, #c7e0ff)",
      zIndex: "-5",
      pointerEvents: "none"
    },
    bottom: {
      position: "fixed",
      top: "95vh",
      left: "0",
      width: "100vw",
      height: "50vh",
      background: "#c7e0ff",
      zIndex: "-3",
      pointerEvents: "none"
    }
  };
};

/**
 * Generates chat input area styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Chat input area styles
 */
export const getChatInputAreaStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  // Only apply these styles if CHAT_INPUT_AREA exists in the layout
  if (layout.CHAT_INPUT_AREA) {
    return {
      padding: layout.CHAT_INPUT_AREA.PADDING,
      paddingBottom: layout.CHAT_INPUT_AREA.PADDING_BOTTOM,
      height: layout.CHAT_INPUT_AREA.HEIGHT,
      backgroundColor: layout.CHAT_INPUT_AREA.BACKGROUND_COLOR,
      position: layout.CHAT_INPUT_AREA.POSITION,
      bottom: layout.CHAT_INPUT_AREA.BOTTOM,
      display: 'flex',
      alignItems: 'center'
    };
  }
  
  // Return default styles if not defined in layout
  return {
    padding: '1rem 1.5rem',
    paddingBottom: 'calc(env(safe-area-inset-bottom, 0.75rem) + 0.25rem)',
    height: '4rem',
    backgroundColor: 'black',
    position: 'relative',
    bottom: '0',
    display: 'flex',
    alignItems: 'center'
  };
};

/**
 * Generates input field styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Input field styles
 */
export const getInputFieldStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  // Only apply these styles if INPUT_FIELD exists in the layout
  if (layout.INPUT_FIELD) {
    const styles = {
      flex: '1',
      padding: layout.INPUT_FIELD.PADDING,
      fontSize: layout.INPUT_FIELD.FONT_SIZE,
      backgroundColor: layout.INPUT_FIELD.BACKGROUND_COLOR,
      color: layout.INPUT_FIELD.TEXT_COLOR,
      borderRadius: layout.INPUT_FIELD.BORDER_RADIUS,
      border: `1px solid ${layout.INPUT_FIELD.BORDER_COLOR}`
    };
    
    // Add width if specified in the layout
    if (layout.INPUT_FIELD.WIDTH) {
      styles.width = layout.INPUT_FIELD.WIDTH;
      styles.flex = 'none'; // Override flex when width is specified
    }
    
    // Add left offset if specified in the layout
    if (layout.INPUT_FIELD.LEFT_OFFSET) {
      styles.marginLeft = layout.INPUT_FIELD.LEFT_OFFSET;
    }
    
    return styles;
  }
  
  // Return default styles if not defined in layout
  // Default styles for when INPUT_FIELD is not defined in layout
  return {
    width: '70%', // Default width
    flex: 'none',
    marginLeft: '7%', // Default left offset
    padding: '0.625rem 0.875rem',
    fontSize: '0.9375rem',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb'
  };
};

/**
 * Generates send button styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @param {boolean} isEnabled Whether the button is enabled
 * @returns {Object} Send button styles
 */
export const getSendButtonStyles = (deviceInfo, isEnabled = true) => {
  const layout = getLayout(deviceInfo);
  
  // Only apply these styles if SEND_BUTTON exists in the layout
  if (layout.SEND_BUTTON) {
    return {
      padding: layout.SEND_BUTTON.PADDING,
      fontSize: layout.SEND_BUTTON.FONT_SIZE,
      fontWeight: layout.SEND_BUTTON.FONT_WEIGHT,
      borderRadius: layout.SEND_BUTTON.BORDER_RADIUS,
      backgroundColor: isEnabled ? layout.SEND_BUTTON.ENABLED_BG_COLOR : layout.SEND_BUTTON.DISABLED_BG_COLOR,
      color: isEnabled ? layout.SEND_BUTTON.ENABLED_TEXT_COLOR : layout.SEND_BUTTON.DISABLED_TEXT_COLOR,
      cursor: isEnabled ? 'pointer' : 'not-allowed',
      transition: 'background-color 0.2s'
    };
  } // End of if (layout.SEND_BUTTON)
  
  // Return default styles if not defined in layout for getSendButtonStyles
  return {
    padding: '0.625rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: '500',
    borderRadius: '0.75rem',
    backgroundColor: isEnabled ? '#3b82f6' : '#e5e7eb',
    color: isEnabled ? 'white' : '#9ca3af',
    cursor: isEnabled ? 'pointer' : 'not-allowed',
    transition: 'background-color 0.2s'
  };
}; // End of getSendButtonStyles function

/**
 * Generates prompt buttons container styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Prompt buttons container styles
 */
export const getPromptButtonsContainerStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  console.log("PROMPT_BUTTONS config:", layout.PROMPT_BUTTONS);
  
  // Apply specific styles if PROMPT_BUTTONS config exists, otherwise use defaults below
  if (layout.PROMPT_BUTTONS && layout.PROMPT_BUTTONS.CONTAINER) {
    // Use the positioning values from the layout configuration
    const containerStyles = {
      display: layout.PROMPT_BUTTONS.CONTAINER.DISPLAY,
      flexDirection: layout.PROMPT_BUTTONS.CONTAINER.FLEX_DIRECTION,
      gap: layout.PROMPT_BUTTONS.CONTAINER.GAP,
      justifyContent: layout.PROMPT_BUTTONS.CONTAINER.JUSTIFY_CONTENT,
      width: layout.PROMPT_BUTTONS.CONTAINER.WIDTH,
      padding: layout.PROMPT_BUTTONS.CONTAINER.PADDING,
      borderTop: layout.PROMPT_BUTTONS.CONTAINER.BORDER_TOP,
      backgroundColor: layout.PROMPT_BUTTONS.CONTAINER.BACKGROUND_COLOR,
      boxSizing: 'border-box',
      // Use POSITION from layout if available, otherwise default to 'absolute'
      position: layout.PROMPT_BUTTONS.CONTAINER.POSITION || 'absolute'
    };
    
    // Only add positioning properties if they are defined in the layout
    if (layout.PROMPT_BUTTONS.CONTAINER.TOP !== undefined) {
      containerStyles.top = layout.PROMPT_BUTTONS.CONTAINER.TOP;
    }
    
    if (layout.PROMPT_BUTTONS.CONTAINER.BOTTOM !== undefined) {
      containerStyles.bottom = layout.PROMPT_BUTTONS.CONTAINER.BOTTOM;
    }
    
    if (layout.PROMPT_BUTTONS.CONTAINER.LEFT !== undefined) {
      containerStyles.left = layout.PROMPT_BUTTONS.CONTAINER.LEFT;
    }
    
    if (layout.PROMPT_BUTTONS.CONTAINER.RIGHT !== undefined) {
      containerStyles.right = layout.PROMPT_BUTTONS.CONTAINER.RIGHT;
    }
    
    console.log("Applied prompt buttons container styles:", containerStyles);
    return containerStyles;
  }
  // Fallback/Default styles (used for desktop now)
  
  // Return default styles if not defined in layout
  const defaultStyles = {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    justifyContent: 'space-around',
    width: '100%',
    padding: '0.25rem 0',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    // Default positioning that can be overridden
    position: 'absolute',
    bottom: '4.5rem'
  };
  
  console.log("Using default prompt buttons container styles:", defaultStyles);
  return defaultStyles;
}; // End of getPromptButtonsContainerStyles function

/**
 * Generates prompt button styles based on device type
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {Object} Prompt button styles
 */
export const getPromptButtonStyles = (deviceInfo) => {
  const layout = getLayout(deviceInfo);
  
  // Apply specific styles if PROMPT_BUTTONS config exists, otherwise use defaults below
  if (layout.PROMPT_BUTTONS && layout.PROMPT_BUTTONS.BUTTON) {
    return {
      backgroundColor: layout.PROMPT_BUTTONS.BUTTON.BACKGROUND_COLOR,
      color: layout.PROMPT_BUTTONS.BUTTON.TEXT_COLOR,
      border: layout.PROMPT_BUTTONS.BUTTON.BORDER,
      borderRadius: layout.PROMPT_BUTTONS.BUTTON.BORDER_RADIUS,
      padding: layout.PROMPT_BUTTONS.BUTTON.PADDING,
      fontSize: layout.PROMPT_BUTTONS.BUTTON.FONT_SIZE,
      fontWeight: layout.PROMPT_BUTTONS.BUTTON.FONT_WEIGHT,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center',
      flex: '1',
      maxWidth: layout.PROMPT_BUTTONS.BUTTON.MAX_WIDTH,
      whiteSpace: layout.PROMPT_BUTTONS.BUTTON.WHITE_SPACE,
      lineHeight: layout.PROMPT_BUTTONS.BUTTON.LINE_HEIGHT,
      boxShadow: 'none'
    };
  }
  // Fallback/Default styles (used for desktop now)
  
  // Return default styles if not defined in layout
  return {
    backgroundColor: '#f2f2f2',
    color: '#666666',
    border: '1px solid #e0e0e0',
    borderRadius: '0.75rem',
    padding: '0.5rem 0.25rem',
    fontSize: '0.85rem',
    fontWeight: '400',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    flex: '1',
    maxWidth: '31%',
    whiteSpace: 'normal',
    lineHeight: '1.2',
    boxShadow: 'none'
  };
}; // End of getPromptButtonStyles function

/**
 * Generates CSS class name based on device type
 * @param {string} baseClass Base class name
 * @param {Object} deviceInfo Device information from getDeviceInfo()
 * @returns {string} Class name with device-specific modifiers
 */
export const getResponsiveClassName = (baseClass, deviceInfo) => {
  const { isMobile, isVerySmallMobile, isLandscape } = deviceInfo;
  
  let className = baseClass;
  
  if (isVerySmallMobile) className += " very-small-mobile";
  else if (isMobile) className += " mobile";
  
  if (isLandscape) className += " landscape";
  
  return className;
};