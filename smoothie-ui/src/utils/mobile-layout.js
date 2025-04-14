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
    TOP: '85px',
    
    // Absolute position from the bottom of the container
    // Setting this extends the container downward
    BOTTOM: '50px',
    
    // Horizontal position (centered by default)
    LEFT: '0',
    RIGHT: '0',
    
    // Rounded corners radius
    BORDER_RADIUS: '1rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 5,
    
    // Height property (percentage of available space)
    HEIGHT: 'calc(100dvh - 8rem)' // Further increased container height
  },
  
  /**
   * ===== CHAT MESSAGES =====
   * Controls the chat messages area
   */
  CHAT_MESSAGES: {
    // Height of the chat messages area - now using percentage
    HEIGHT: 'calc(100% - 10rem)', // Adjusted to be relative to container height minus input area height
    
    // Maximum height of the chat messages area
    MAX_HEIGHT: '100dvh',
    
    // Minimum height of the chat messages area
    MIN_HEIGHT: '60vh',
    
    // Internal padding of the chat messages area
    PADDING: '1.5rem',
    
    // Flex property to take available space
    FLEX: '2'
  },
  
  /**
   * ===== FOOTER =====
   * Controls the positioning of the footer
   */
  FOOTER: {
    // Absolute position from the bottom of the container
    BOTTOM: '-25px',
    
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
    PADDING: '0rem',
    
    // Maximum width of the container
    MAX_WIDTH: '100%',
    
    // Base font size for the container
    FONT_SIZE: '0.9rem'
  },
  
  /**
   * ===== INPUT FIELD =====
   * Controls the appearance of the text input field
   */
  INPUT_FIELD: {
    // Padding inside the input field
    PADDING: '0.9rem 1.5rem',
    
    // Font size of the input text
    FONT_SIZE: '0.85rem',
    
    // Width of the input field (relative to container)
    WIDTH: '70%',
    
    // Position from the left side of the container
    LEFT_OFFSET: '-8%',
    
    // Border radius for rounded corners
    BORDER_RADIUS: '0.75rem',
    
    // Colors
    BACKGROUND_COLOR: 'white',
    TEXT_COLOR: 'black',
    BORDER_COLOR: '#e5e7eb',
    
    // Gap between input field and send button
    GAP: '0.5rem'
  },
  
  /**
   * ===== SEND BUTTON =====
   * Controls the appearance of the send button for mobile devices
   */
  SEND_BUTTON: {
    // Padding inside the button
    PADDING: '0.9rem 1rem',

    // Font size and weight
    FONT_SIZE: '0.9rem',
    FONT_WEIGHT: '500',

    // Border radius for rounded corners
    BORDER_RADIUS: '0.75rem',

    // Colors for enabled state
    ENABLED_BG_COLOR: '#3b82f6',
    ENABLED_TEXT_COLOR: 'white',

    // Colors for disabled state
    DISABLED_BG_COLOR: '#e5e7eb',
    DISABLED_TEXT_COLOR: '#9ca3af'
  }
,
  PROMPT_BUTTONS: {
    CONTAINER: {
      DISPLAY: 'flex',
      FLEX_DIRECTION: 'row',
      GAP: '.5rem',
      JUSTIFY_CONTENT: 'space-between',
      WIDTH: '100%',
      PADDING: '.5rem',
      BORDER_TOP: '1px solid #e5e7eb',
      BACKGROUND_COLOR: '#f9f9f9',
      POSITION: 'absolute',
      TOP: 'auto',
      BOTTOM: '0rem',
      LEFT: '0rem',
      RIGHT: '1rem',
      /* The user can easily shift these offsets (TOP, BOTTOM, LEFT, RIGHT) as desired
         to reposition the prompt buttons within the chat window. */
    },
    BUTTON: {
      BACKGROUND_COLOR: '#f2f2f2',
      TEXT_COLOR: '#666666',
      BORDER: '1px solid #e0e0e0',
      BORDER_RADIUS: '0.75rem',
      PADDING: '0.5rem 0.25rem',
      FONT_SIZE: '0.75rem',
      FONT_WEIGHT: '400',
      WHITE_SPACE: 'normal',
      LINE_HEIGHT: '1.2',
      MAX_WIDTH: '100%'
    }
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
  PROMPT_BUTTONS: {
    CONTAINER: {
      DISPLAY: 'flex',
      FLEX_DIRECTION: 'row',
      FLEX_WRAP: 'wrap',
      GAP: '0.5rem',
      JUSTIFY_CONTENT: 'space-between',
      WIDTH: '100%',
      POSITION: 'absolute',
      /* Shifting offsets below - user can edit these to move container. Currently all set to 'auto' except top, which is 0. */
      TOP: '0',
      LEFT: 'auto',
      RIGHT: 'auto',
      BOTTOM: 'auto',
      PADDING: '0.5rem',
      BORDER_TOP: '1px solid #e5e7eb',
      BACKGROUND_COLOR: 'white'
    },
    BUTTON: {
      BACKGROUND_COLOR: '#f2f2f2',
      TEXT_COLOR: '#666666',
      BORDER: '1px solid #e0e0e0',
      BORDER_RADIUS: '0.75rem',
      PADDING: '0.5rem 0.25rem',
      FONT_SIZE: '0.75rem',
      FONT_WEIGHT: '400',
      WHITE_SPACE: 'normal',
      LINE_HEIGHT: '1.2',
      MAX_WIDTH: '30%'
    }
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
  },
  INPUT_FIELD: {
    // Smaller padding for very small devices
    PADDING: '0.5rem 0.6rem',
    
    // Smaller font size for very small devices
    FONT_SIZE: '0.75rem',
    
    // Narrower width for very small devices
    WIDTH: '60%',
    
    // Position from the left side of the container for very small devices
    LEFT_OFFSET: '2%',
    
    // Smaller border radius
    BORDER_RADIUS: '0.5rem'
  },
  // No duplicate PROMPT_BUTTONS needed here
};

export { MOBILE_LAYOUT, VERY_SMALL_MOBILE_OVERRIDES };