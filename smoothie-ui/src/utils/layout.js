/**
 * Layout Configuration
 * 
 * This file serves as a single source of truth for positioning and sizing elements
 * across the application. Modify these values to adjust the layout without
 * having to search through multiple files.
 */

// Desktop layout configuration
export const DESKTOP = {
  // Spacing
  PADDING: {
    CONTAINER: '2rem',
    HEADER: '1rem',
    CONTENT: '1.5rem',
    FOOTER: '1rem',
  },
  
  // Margins
  MARGIN: {
    HEADER_TOP: '2rem',
    HEADER_BOTTOM: '1rem',
    LOGO_TOP: '1rem',
    LOGO_BOTTOM: '1rem',
    CHAT_TOP: '1rem',
    CHAT_BOTTOM: '2rem',
    FOOTER_TOP: 'auto', // Push to bottom with flexbox
    FOOTER_BOTTOM: '2rem',
  },
  
  // Sizes
  SIZE: {
    LOGO_HEIGHT: '120px',
    LOGO_WIDTH: 'auto',
    CONTAINER_MAX_WIDTH: '600px',
    CHAT_MAX_WIDTH: '800px',
    FONT_BASE: '1rem',
    FONT_TITLE: '1.75rem',
    FONT_SUBTITLE: '0.9rem',
    FONT_FOOTER: '1.2rem',
  },
  
  // Border radius
  BORDER_RADIUS: {
    CHAT_CONTAINER: '1.5rem',
    MESSAGE: '1rem',
    INPUT: '0.75rem',
    BUTTON: '0.75rem',
  },
};

// Mobile layout configuration
export const MOBILE = {
  // Spacing
  PADDING: {
    CONTAINER: '1rem',
    HEADER: '0.5rem',
    CONTENT: '1rem',
    FOOTER: '0.5rem',
  },
  
  // Margins
  MARGIN: {
    HEADER_TOP: '1rem',
    HEADER_BOTTOM: '0.5rem',
    LOGO_TOP: '0.5rem',
    LOGO_BOTTOM: '0.5rem',
    CHAT_TOP: '0.5rem',
    CHAT_BOTTOM: '1rem',
    FOOTER_TOP: 'auto', // Push to bottom with flexbox
    FOOTER_BOTTOM: '1rem',
  },
  
  // Sizes
  SIZE: {
    LOGO_HEIGHT: '35px',
    LOGO_WIDTH: 'auto',
    CONTAINER_MAX_WIDTH: '100%',
    CHAT_MAX_WIDTH: '95%',
    FONT_BASE: '0.9rem',
    FONT_TITLE: '0.85rem',
    FONT_SUBTITLE: '0.85rem',
    FONT_FOOTER: '1.25rem',
  },
  
  // Border radius
  BORDER_RADIUS: {
    CHAT_CONTAINER: '1rem',
    MESSAGE: '0.75rem',
    INPUT: '0.75rem',
    BUTTON: '0.75rem',
  },
};

// Very small mobile layout configuration
export const VERY_SMALL_MOBILE = {
  // Inherit from mobile and override specific values
  ...MOBILE,
  
  // Spacing
  PADDING: {
    ...MOBILE.PADDING,
    CONTAINER: '0.5rem',
    HEADER: '0.3rem',
  },
  
  // Margins
  MARGIN: {
    ...MOBILE.MARGIN,
    HEADER_TOP: '0.5rem',
    HEADER_BOTTOM: '0.3rem',
  },
  
  // Sizes
  SIZE: {
    ...MOBILE.SIZE,
    LOGO_HEIGHT: '14px',
    FONT_BASE: '0.85rem',
    FONT_TITLE: '0.7rem',
    FONT_SUBTITLE: '0.6rem',
    FONT_FOOTER: '0.6rem',
  },
};

// Helper function to get layout based on device info
export const getLayout = (deviceInfo) => {
  const { isMobile, isVerySmallMobile } = deviceInfo;
  
  if (isVerySmallMobile) {
    return VERY_SMALL_MOBILE;
  } else if (isMobile) {
    return MOBILE;
  } else {
    return DESKTOP;
  }
};