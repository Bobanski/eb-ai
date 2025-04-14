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
    // Mobile: Fixed height, no scrolling
    return {
      ...baseStyles,
      height: "100vh",
      overflow: "hidden",
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
  
  return {
    position: "absolute",
    top: layout.CHAT_CONTAINER.TOP,
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
    border: "15px solid black", // Added black border
    boxSizing: "border-box"
  };
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