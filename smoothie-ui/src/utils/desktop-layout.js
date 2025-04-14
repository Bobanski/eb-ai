/**
 * DESKTOP LAYOUT CONFIGURATION
 * 
 * This file is the single source of truth for desktop UI positioning.
 * Adjust these values to move and resize UI elements on desktop devices.
 * 
 * HOW TO USE:
 * 1. Find the UI element you want to adjust in the sections below
 * 2. Change the numerical values to move or resize the element
 * 3. Save the file and refresh your app to see the changes
 */

const DESKTOP_LAYOUT = {
  /**
   * ===== HEADER SECTION =====
   * Controls the positioning of the header container with logo and title
   */
  HEADER: {
    // Absolute position from the top of the container
    TOP: '30px',
    
    // Horizontal position (centered by default)
    LEFT: '-1.1rem',
    RIGHT: '0',
    
    // Internal padding of the header
    PADDING: '1rem',
    
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
    HEIGHT: '100px',
    
    // Absolute position from the left edge
    LEFT_MARGIN: '-5rem',
    
    // Absolute position from the top edge
    TOP_OFFSET: '2rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 20
  },
  
  /**
   * ===== CHAT LOGO (SVG) =====
   * Controls the size and appearance of the SVG logo in the chat header
   */
  CHAT_LOGO: {
    // Logo height (controls the size of the logo)
    HEIGHT: '2.75rem',
    
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
    FONT_SIZE: '1.75rem',
    
    // Line height of the title text
    LINE_HEIGHT: 1.2
  },
  
  /**
   * ===== SUBTITLE TEXT =====
   * Controls the size and appearance of subtitle text
   */
  SUBTITLE: {
    // Font size of the subtitle text
    FONT_SIZE: '0.9rem',
    
    // Space above the subtitle
    TOP_MARGIN: '0.75rem'
  },
  
  /**
   * ===== CHAT CONTAINER =====
   * Controls the positioning and appearance of the main chat container
   */
  CHAT_CONTAINER: {
    // Width of the chat container
    WIDTH: '100%',
    
    // Maximum width of the chat container
    MAX_WIDTH: '800px',
    
    // Absolute position from the top of the container
    TOP: '150px',
    
    // Horizontal position (centered by default)
    LEFT: '0',
    RIGHT: '0',
    
    // Rounded corners radius
    BORDER_RADIUS: '1.5rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 5
  },
  
  /**
   * ===== CHAT MESSAGES =====
   * Controls the chat messages area
   */
  CHAT_MESSAGES: {
    // Height of the chat messages area
    HEIGHT: 'calc(100vh - 12rem)',
    
    // Maximum height of the chat messages area
    MAX_HEIGHT: '40rem',
    
    // Minimum height of the chat messages area
    MIN_HEIGHT: '15rem',
    
    // Internal padding of the chat messages area
    PADDING: '1rem 1.25rem'
  },
  
  /**
   * ===== FOOTER =====
   * Controls the positioning of the footer
   */
  FOOTER: {
    // Absolute position from the bottom of the container
    BOTTOM: '140px',
    
    // Horizontal position (centered by default)
    LEFT: '-1.4rem',
    RIGHT: '0',
    
    // Internal padding of the footer
    PADDING: '1rem',
    
    // Font size of the footer text
    FONT_SIZE: '1.2rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 10
  },
  
  /**
   * ===== MAIN CONTAINER =====
   * Controls the overall container that holds all UI elements
   */
  CONTAINER: {
    // Padding around the entire container
    PADDING: '2rem',
    
    // Maximum width of the container
    MAX_WIDTH: '600px',
    
    // Base font size for the container
    FONT_SIZE: '1rem'
  }
};

export { DESKTOP_LAYOUT };