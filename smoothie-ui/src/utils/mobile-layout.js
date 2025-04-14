/**
 * MOBILE LAYOUT CONFIGURATION
 * 
 * This file is the single source of truth for mobile UI positioning.
 * Adjust these values to move and resize UI elements on mobile devices.
 * 
 * HOW TO USE:
 * 1. Find the UI element you want to adjust in the sections below
 * 2. Change the numerical values to move or resize the element
 * 3. Save the file and refresh your app to see the changes
 */

const MOBILE_LAYOUT = {
  /**
   * ===== HEADER SECTION =====
   * Controls the positioning of the header container with logo and title
   */
  HEADER: {
    // Absolute position from the top of the container
    TOP: '-25px',
    
    // Horizontal position (centered by default)
    LEFT: '-0.7rem',
    RIGHT: '0',
    
    // Internal padding of the header
    PADDING: '0.5rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 10
  },
  /**
   * ===== APP LOGO (PNG) =====
   * Controls the size and positioning of the main PNG logo in App.jsx
   * Note: The logo is absolutely positioned and won't affect other elements
   */
  APP_LOGO: {
    // Logo height (controls the size of the logo)
    HEIGHT: '35px',
    
    // Absolute position from the left edge
    LEFT: '0.75rem',
    LEFT_MARGIN: '0.75rem', // For inline style consistency
    
    // Absolute position from the top edge
    TOP: '0.75rem',
    TOP_OFFSET: '0.75rem', // For inline style consistency
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 20
  },
  
  /**
   * ===== CHAT LOGO (SVG) =====
   * Controls the size and appearance of the SVG logo in the chat header
   */
  CHAT_LOGO: {
    // Logo height (controls the size of the logo)
    HEIGHT: '2.1rem',
    
    // Width setting (auto by default)
    WIDTH: 'auto',
    
    // Display type
    DISPLAY: 'inline-block'
  },
  
  /**
   * ===== TITLE TEXT =====
   * Controls the size and appearance of title text
   */
  TITLE: {
    // Font size of the title text
    FONT_SIZE: '0.85rem',
    
    // Line height of the title text
    LINE_HEIGHT: 1.2
  },
  
  /**
   * ===== SUBTITLE TEXT =====
   * Controls the size and appearance of subtitle text
   */
  SUBTITLE: {
    // Font size of the subtitle text
    FONT_SIZE: '0.85rem',
    
    // Space above the subtitle
    TOP_MARGIN: '0.5rem'
  },
  
  /**
   * ===== CHAT CONTAINER =====
   * Controls the positioning and appearance of the main chat container
   */
  CHAT_CONTAINER: {
    // Width of the chat container (percentage of screen width)
    WIDTH: '95%',
    
    // Maximum width of the chat container
    MAX_WIDTH: '95%',
    
    // Absolute position from the top of the container
    TOP: '80px',
    
    // Horizontal position (centered by default)
    LEFT: '0',
    RIGHT: '0',
    
    // Rounded corners radius
    BORDER_RADIUS: '1rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 5
  },
  
  /**
   * ===== CHAT MESSAGES =====
   * Controls the chat messages area
   */
  CHAT_MESSAGES: {
    // Height of the chat messages area
    HEIGHT: 'calc(100vh - 13rem)',
    
    // Maximum height of the chat messages area
    MAX_HEIGHT: '60vh',
    
    // Minimum height of the chat messages area
    MIN_HEIGHT: '50vh',
    
    // Internal padding of the chat messages area
    PADDING: '0.5rem'
  },
  
  /**
   * ===== FOOTER =====
   * Controls the positioning of the footer
   */
  FOOTER: {
    // Absolute position from the bottom of the container
    BOTTOM: '60px',
    
    // Horizontal position (centered by default)
    LEFT: '-0.8rem',
    RIGHT: '1.75 rem',
    
    // Internal padding of the footer
    PADDING: '0.5rem',
    
    // Font size of the footer text
    FONT_SIZE: '1rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 10
  },
  
  /**
   * ===== MAIN CONTAINER =====
   * Controls the overall container that holds all UI elements
   */
  CONTAINER: {
    // Padding around the entire container
    PADDING: '1rem',
    
    // Maximum width of the container
    MAX_WIDTH: '100%',
    
    // Base font size for the container
    FONT_SIZE: '0.9rem'
  }
};

// Very small mobile overrides (phones smaller than 375px)
const VERY_SMALL_MOBILE_OVERRIDES = {
  APP_LOGO: {
    HEIGHT: '14px'
  },
  CHAT_LOGO: {
    HEIGHT: '1.8rem'
  },
  TITLE: {
    FONT_SIZE: '0.7rem'
  },
  SUBTITLE: {
    FONT_SIZE: '0.6rem'
  },
  CONTAINER: {
    PADDING: '0.5rem',
    FONT_SIZE: '0.85rem'
  },
  FOOTER: {
    FONT_SIZE: '0.6rem'
  },
  HEADER: {
    TOP_MARGIN: '0.5rem',
    BOTTOM_MARGIN: '0.3rem',
    PADDING: '0.3rem'
  }
};

export { MOBILE_LAYOUT, VERY_SMALL_MOBILE_OVERRIDES };