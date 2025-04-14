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
    MAX_WIDTH: '1200px',
    
    // Absolute position from the top of the container
    TOP: '150px',
    
    // BOTTOM: '185px',
    HEIGHT: '750px',
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
    POSITION: 'absolute',
    TOP: '0',
    LEFT: '0',
    RIGHT: '0',
    BOTTOM: '6.5rem',
    OVERFLOW: 'auto',
    PADDING: '1rem 1.25rem'
  },
  
  /**
   * ===== CHAT INPUT AREA =====
   * Controls the positioning and appearance of the chat input area
   */
  CHAT_INPUT_AREA: {
    // Height of the input area
    HEIGHT: '4.5rem',
    
    // Internal padding of the input area
    PADDING: '1rem 1rem',
    
    // Extra padding for the bottom (adds safe area inset for iOS)
    PADDING_BOTTOM: 'calc(env(safe-area-inset-bottom, 0.75rem) + 0.5rem)',
    
    // Background color
    BACKGROUND_COLOR: 'black',
    
    // Position
    POSITION: 'relative',
    BOTTOM: '20px'
  },
  
  /**
   * ===== INPUT FIELD =====
   * Controls the appearance of the text input field
   */
  INPUT_FIELD: {
    // Padding inside the input field
    PADDING: '0.8rem 1rem',
    
    // Font size of the input text
    FONT_SIZE: '1rem',
    
    // Width of the input field (relative to container)
    WIDTH: '114%',
    
    // Position from the left side of the container
    LEFT_OFFSET: '-5%',
    
    // Border radius for rounded corners
    BORDER_RADIUS: '0.75rem',
    
    // Colors
    BACKGROUND_COLOR: 'white',
    TEXT_COLOR: 'black',
    BORDER_COLOR: '#e5e7eb',
    
    // Gap between input field and send button
    GAP: '0.75rem'
  },
  
  /**
   * ===== SEND BUTTON =====
   * Controls the appearance of the send button
   */
  SEND_BUTTON: {
    // Padding inside the button
    PADDING: '0.8rem 1.5rem',
    
    // Font size and weight
    FONT_SIZE: '1rem',
    FONT_WEIGHT: '500',
    
    // Border radius for rounded corners
    BORDER_RADIUS: '0.75rem',
    
    // Colors for enabled state
    ENABLED_BG_COLOR: '#3b82f6',
    ENABLED_TEXT_COLOR: 'white',
    
    // Colors for disabled state
    DISABLED_BG_COLOR: '#e5e7eb',
    DISABLED_TEXT_COLOR: '#9ca3af'
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
,
    PROMPT_BUTTONS: {
      CONTAINER: {
        DISPLAY: 'flex',
        FLEX_DIRECTION: 'row',
        FLEX_WRAP: 'wrap',
        GAP: '0.5rem',
        JUSTIFY_CONTENT: 'space-around',
        WIDTH: '90%',
        POSITION: 'absolute',
        /* Shifting offsets below - user can adjust these to move container as desired. */
        TOP: 'auto',
        LEFT: '20px',
        RIGHT: '10px',
        BOTTOM: '10px',
        PADDING: '0.25rem 0',
        BORDER_TOP: '1px solid #e5e7eb',
        BACKGROUND_COLOR: 'white'
      },
      BUTTON: {
        BACKGROUND_COLOR: '#f2f2f2',
        TEXT_COLOR: '#666666',
        BORDER: '1px solid #e0e0e0',
        BORDER_RADIUS: '0.75rem',
        PADDING: '0.5rem 0.25rem',
        FONT_SIZE: '0.85rem',
        FONT_WEIGHT: '400',
        WHITE_SPACE: 'normal',
        LINE_HEIGHT: '1.2',
        MAX_WIDTH: '31%'
      }
    }
  };

export { DESKTOP_LAYOUT };