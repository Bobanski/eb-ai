/**
 * Responsive Design Utilities
 * 
 * This file contains centralized utilities for handling responsive design
 * including device detection, breakpoints, and style generation
 */

// Standardized breakpoints for the application
export const BREAKPOINTS = {
  VERY_SMALL: 375,  // Very small mobile devices
  SMALL: 480,       // Small mobile devices
  MEDIUM: 768,      // Tablets and medium devices
  LARGE: 1024,      // Desktops and large devices
  X_LARGE: 1280     // Extra large displays
};

/**
 * Device detection hooks and utilities
 */
export const getDeviceInfo = () => {
  const isMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.MEDIUM}px)`).matches || 
                  (window.matchMedia(`(max-height: ${BREAKPOINTS.SMALL}px)`).matches && 
                   window.matchMedia("(orientation: landscape)").matches);
  
  const isVerySmallMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.VERY_SMALL}px)`).matches || 
                           (window.matchMedia(`(max-height: ${BREAKPOINTS.VERY_SMALL}px)`).matches && 
                            window.matchMedia("(orientation: landscape)").matches);
  
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  
  // Return an object with all device information
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
 * Style generators for different device types
 */

// Generate container styles based on device type
export const getContainerStyles = (deviceInfo) => {
  const { isMobile, isVerySmallMobile } = deviceInfo;
  
  // Base styles common to all device types
  const baseStyles = {
    boxSizing: "border-box",
    width: "100%",
    position: "relative",
    zIndex: "5",
  };
  
  // Mobile-specific styles
  if (isMobile) {
    return {
      ...baseStyles,
      minHeight: "90dvh", // MOBILE-UI-ELEMENT-SIZING - Use dynamic viewport height for better iOS support
      paddingTop: "env(safe-area-inset-top, 0)",
      paddingBottom: "env(safe-area-inset-bottom, 6rem)", // MOBILE-UI-ELEMENT-POSITIONING-VERTICAL
      display: "flex",
      alignItems: "flex-start", // Changed from center to fix content being pushed above viewport
      justifyContent: "center",
      backgroundColor: "transparent",
      overflow: "auto", // Changed from hidden to allow scrolling if needed
      fontSize: isVerySmallMobile ? "0.85rem" : "0.9rem", // MOBILE-UI-ELEMENT-SIZING
    };
  }
  
  // Desktop styles
  return {
    ...baseStyles,
    position: "fixed",
    inset: 0,
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    overflow: "hidden",
  };
};

// Generate background styles
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

// Generate logo styles based on device type
export const getLogoStyles = (deviceInfo) => {
  const { isMobile, isVerySmallMobile } = deviceInfo;
  
  return {
    position: "absolute",
    top: isVerySmallMobile ? "calc(env(safe-area-inset-top, 0) + 70px)" : // MOBILE-UI-ELEMENT-POSITIONING-VERTICAL
         (isMobile ? "calc(env(safe-area-inset-top, 0) + 33px)" : "20px"), // MOBILE-UI-ELEMENT-POSITIONING-VERTICAL / DESKTOP-UI-ELEMENT-POSITIONING-VERTICAL
    left: isVerySmallMobile ? "3px" : (isMobile ? "26px" : "20px"), // MOBILE-UI-ELEMENT-POSITIONING-HORIZONTAL / DESKTOP-UI-ELEMENT-POSITIONING-HORIZONTAL - Slight change to force cache invalidation
    width: isVerySmallMobile ? "14px" : (isMobile ? "40px" : "120px"), // MOBILE-UI-ELEMENT-SIZING / DESKTOP-UI-ELEMENT-SIZING
    zIndex: "10",
    opacity: "0.6",
  };
};

// Generate content container styles based on device type
// This function is now deprecated as styles are handled in styles.css
export const getContentContainerStyles = (deviceInfo) => {
  console.warn("getContentContainerStyles is deprecated. Use CSS classes instead.");
  return {}; // Return empty object to avoid breaking imports
};

// Generate footer styles based on device type
export const getFooterStyles = (deviceInfo) => {
  const { isMobile } = deviceInfo;
  
  return {
    container: {
      width: "100%",
      textAlign: "center",
      marginTop: "auto",
      paddingTop: "1rem",
      paddingBottom: isMobile ? "env(safe-area-inset-bottom, 1rem)" : "0.5rem",
      backgroundColor: "transparent",
      zIndex: "10",
    },
    text: (deviceInfo) => ({
      color: "black",
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: deviceInfo.isVerySmallMobile ? "0.8rem" : (deviceInfo.isMobile ? "0.9rem" : "1.2rem"),
      margin: 0,
      marginTop: deviceInfo.isMobile ? "-0.25rem" : "-1rem",
      padding: 0,
    })
  };
};

// CSS class name generator based on device type
export const getResponsiveClassName = (baseClass, deviceInfo) => {
  const { isMobile, isVerySmallMobile, isLandscape } = deviceInfo;
  
  let className = baseClass;
  
  if (isVerySmallMobile) className += " very-small-mobile";
  else if (isMobile) className += " mobile";
  
  if (isLandscape) className += " landscape";
  
  return className;
};