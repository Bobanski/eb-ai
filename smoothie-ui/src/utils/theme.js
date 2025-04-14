/**
 * Theme Configuration
 * 
 * Centralizes design tokens and theme variables for consistent styling across the application
 */

// Color palette
export const COLORS = {
  // Primary colors
  PRIMARY: {
    LIGHT: '#e8f3ff',
    DEFAULT: '#c7e0ff',
    DARK: '#a7c7f5',
  },
  
  // Text colors
  TEXT: {
    PRIMARY: '#000000',
    SECONDARY: '#4b5563',
    TERTIARY: '#6b7280',
    LIGHT: '#ffffff',
  },
  
  // UI colors
  UI: {
    BACKGROUND: '#ffffff',
    FOOTER: 'transparent',
    INPUT: '#ffffff',
    BUTTON: {
      PRIMARY: '#3b82f6',
      PRIMARY_HOVER: '#2563eb',
      DISABLED: '#e5e7eb',
    },
    PROMPT_BUTTON: {
      BACKGROUND: '#f2f2f2',
      HOVER: '#e6e6e6',
      TEXT: '#666666',
      BORDER: '#e0e0e0',
    },
    MESSAGE: {
      USER: '#000000',
      ASSISTANT: '#f3f4f6',
    },
  },
};

// Spacing system (in rem)
export const SPACING = {
  XXXS: 0.1,   // 0.1rem = 1.6px
  XXS: 0.25,   // 0.25rem = 4px
  XS: 0.5,     // 0.5rem = 8px
  SM: 0.75,    // 0.75rem = 12px
  MD: 1,       // 1rem = 16px
  LG: 1.5,     // 1.5rem = 24px
  XL: 2,       // 2rem = 32px
  XXL: 3,      // 3rem = 48px
  XXXL: 4,     // 4rem = 64px
};

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: {
    PRIMARY: 'Inter, system-ui, sans-serif',
    LOGO: 'Helvetica Neue, Helvetica, Arial, sans-serif',
  },
  
  FONT_SIZE: {
    TINY: '0.6rem',     // 9.6px
    VERY_SMALL: '0.7rem', // 11.2px
    SMALL: '0.8rem',    // 12.8px
    REGULAR: '0.9rem',  // 14.4px
    MEDIUM: '1rem',     // 16px
    LARGE: '1.2rem',    // 19.2px
    XL: '1.5rem',       // 24px
    XXL: '1.75rem',     // 28px
  },
  
  FONT_WEIGHT: {
    REGULAR: 400,
    MEDIUM: 500,
    BOLD: 700,
  },
  
  LINE_HEIGHT: {
    TIGHT: 1.1,
    NORMAL: 1.3,
    RELAXED: 1.5,
  },
};

// Border radius
export const BORDER_RADIUS = {
  SMALL: '0.5rem',
  MEDIUM: '0.75rem',
  LARGE: '1rem',
  XL: '1.5rem',
};

// Shadows
export const SHADOWS = {
  SMALL: '0 1px 2px rgba(0, 0, 0, 0.05)',
  MEDIUM: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  LARGE: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};
// UI Element Sizes
// ---------------
// USAGE GUIDE:
// To resize the top-left "earthbar-filled.png" logo:
//   - Adjust LOGO values below (values in pixels)
//
// To resize the chat widget "eb-full-logo.svg" logo:
//   - Adjust corresponding CSS variables in chat-styles.css
//   - Look for :root variables at the top of that file
export const UI_SIZES = {
  LOGO: {
    VERY_SMALL_MOBILE: 14, // Default size for very small mobile - in pixels
    MOBILE: 35,           // Default size for mobile - in pixels
    DESKTOP: 120,         // Default size for desktop - in pixels
    // You can adjust these values to change the top-left logo size
  },
  CHAT_LOGO: {
    VERY_SMALL_MOBILE: 1.5, // Default size for very small mobile - in rem
    MOBILE: 1.6,           // Default size for mobile - in rem
    DESKTOP: 3.8,          // Default size for desktop - in rem
    // You can adjust these values to change the chat widget logo size
  }
};

// Z-index stack
export const Z_INDEX = {
  BACKGROUND: -10,
  GRADIENT: -5,
  BOTTOM_COVERAGE: -3,
  BASE: 0,
  CONTENT: 10,
  OVERLAY: 20,
  MODAL: 30,
  POPOVER: 40,
  TOOLTIP: 50,
};

// Animation durations
export const ANIMATIONS = {
  FAST: '0.15s',
  MEDIUM: '0.3s',
  SLOW: '0.5s',
};

// Safe area insets with fallbacks
export const SAFE_AREA = {
  TOP: 'env(safe-area-inset-top, 0)',
  BOTTOM: 'env(safe-area-inset-bottom, 0)',
  LEFT: 'env(safe-area-inset-left, 0)',
  RIGHT: 'env(safe-area-inset-right, 0)',
};

// Viewport-related constants
export const VIEWPORT = {
  MOBILE_MAX_WIDTH: `${BREAKPOINTS.MEDIUM}px`,
  SMALL_MOBILE_MAX_WIDTH: `${BREAKPOINTS.VERY_SMALL}px`,
};

// Breakpoints (should match responsive.js)
export const BREAKPOINTS = {
  VERY_SMALL: 375,
  SMALL: 480,
  MEDIUM: 768,
  LARGE: 1024,
  X_LARGE: 1280,
};

// Function to create media query strings
export const mediaQuery = {
  verySmall: `@media (max-width: ${BREAKPOINTS.VERY_SMALL}px)`,
  small: `@media (max-width: ${BREAKPOINTS.SMALL}px)`,
  medium: `@media (max-width: ${BREAKPOINTS.MEDIUM}px)`,
  large: `@media (max-width: ${BREAKPOINTS.LARGE}px)`,
  xLarge: `@media (max-width: ${BREAKPOINTS.X_LARGE}px)`,
  landscape: `@media (orientation: landscape)`,
};

// Helper function to convert rem to px (for calculations)
export const remToPx = (rem) => {
  // Base font size is 16px
  return rem * 16;
};