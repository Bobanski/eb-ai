/**
 * Responsive Design Utilities
 *
 * This file contains centralized utilities for handling responsive design
 * including device detection, breakpoints, and style generation.
 *
 * For positioning and sizing constants, see utils/layout.js
 */

import { getLayout } from './layout';

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
  // Get layout based on device type
  const layout = getLayout(deviceInfo);
  
  // Base styles common to all device types
  return {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: layout.SIZE.CONTAINER_MAX_WIDTH,
    position: "relative",
    zIndex: "5",
    display: "flex",
    flexDirection: "column", // Stack children vertically
    alignItems: "center", // Center children horizontally
    minHeight: "100vh", // Full viewport height for all devices
    backgroundColor: "transparent",
    overflow: "visible", // Allow content to overflow and scroll naturally
    justifyContent: "flex-start", // Align children to the top
    fontSize: layout.SIZE.FONT_BASE,
    padding: layout.PADDING.CONTAINER,
    paddingTop: `calc(env(safe-area-inset-top, 0) + ${layout.PADDING.CONTAINER})`,
    paddingBottom: `calc(env(safe-area-inset-bottom, 0) + ${layout.PADDING.CONTAINER})`,
    margin: "0 auto", // Center the container
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
  // Get layout based on device type
  const layout = getLayout(deviceInfo);
  
  return {
    position: "relative",
    marginTop: layout.MARGIN.LOGO_TOP,
    marginBottom: layout.MARGIN.LOGO_BOTTOM,
    height: layout.SIZE.LOGO_HEIGHT,
    width: layout.SIZE.LOGO_WIDTH,
    zIndex: "10",
    opacity: "0.6",
    alignSelf: "flex-start", // Align to the start of the flex container
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
  // Get layout based on device type
  const layout = getLayout(deviceInfo);
  
  return {
    container: {
      width: "100%",
      textAlign: "center",
      marginTop: layout.MARGIN.FOOTER_TOP, // Push to bottom of container
      marginBottom: layout.MARGIN.FOOTER_BOTTOM,
      padding: `${layout.PADDING.FOOTER} 0`,
      paddingBottom: `calc(env(safe-area-inset-bottom, 0) + ${layout.PADDING.FOOTER})`,
      backgroundColor: "transparent",
      zIndex: "10",
      position: "relative",
    },
    text: () => ({
      color: "black",
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: layout.SIZE.FONT_FOOTER,
      margin: 0,
      padding: 0,
      position: "relative",
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