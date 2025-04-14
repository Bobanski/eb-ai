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
    // Position from the top of the container (percentage-based)
    TOP: '3%',
    
    // Horizontal position (centered by default)
    LEFT: '-4%',
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
    // Logo height (controls the size of the logo - percentage of viewport height)
    HEIGHT: '12vh',
    
    // Position from the left edge (percentage-based)
    LEFT: '2%',
    LEFT_MARGIN: '2%', // For inline style consistency
    
    // Position from the top edge (percentage-based)
    TOP: '3%',
    TOP_OFFSET: '3%', // For inline style consistency
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 20,
    
    // Make the logo responsive to viewport changes but still scroll with content
    POSITION: 'absolute'
  },
  
  /**
   * ===== CHAT LOGO (SVG) =====
   * Controls the size and appearance of the SVG logo in the chat header
   */
  CHAT_LOGO: {
    // Logo height (controls the size of the logo - percentage of viewport height)
    HEIGHT: '4vh',
    
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
    // Font size of the title text (using viewport width units for responsive text)
    FONT_SIZE: '1.5vw',
    
    // Line height of the title text
    LINE_HEIGHT: 1.2
  },
  
  /**
   * ===== SUBTITLE TEXT =====
   * Controls the size and appearance of subtitle text
   */
  SUBTITLE: {
    // Font size of the subtitle text (using viewport width units for responsive text)
    FONT_SIZE: '1vw',
    
    // Space above the subtitle (percentage-based)
    TOP_MARGIN: '-2%', // Increased to allow for vertical adjustment
    
    // Additional properties for subtitle positioning
    MAX_WIDTH: '90%',
    TEXT_ALIGN: 'center'
  },
  
  /**
   * ===== CHAT CONTAINER =====
   * Controls the positioning and appearance of the main chat container
   */
  CHAT_CONTAINER: {
    // Width of the chat container
    WIDTH: '100%',
    
    // Maximum width of the chat container
    MAX_WIDTH: '100%',
    
    // Position from the top of the container (percentage-based)
    TOP: '14%',
    
    // Fixed height to prevent overflow
    HEIGHT: '65vh',
    LEFT: '0',
    RIGHT: '0',
    
    // Rounded corners radius (using viewport width units)
    BORDER_RADIUS: '1.5vw',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 5,
    
    // Display and flex direction for internal layout (added from mobile layout)
    DISPLAY: 'flex',
    FLEX_DIRECTION: 'column'
  },
  
  /**
   * ===== CHAT MESSAGES =====
   * Controls the chat messages area
   */
  CHAT_MESSAGES: {
    // Height of the chat messages area - use flex to fill available space
    HEIGHT: 'auto',
    
    // Maximum height - let it be determined by the container
    MAX_HEIGHT: 'none',
    
    // Minimum height - ensure there's always space for messages
    MIN_HEIGHT: '200px',
    
    // Internal padding of the chat messages area
    PADDING: '2% 2.5%',
    
    // Flex property to take available space
    FLEX: '1',
    
    // Display and flex direction
    DISPLAY: 'flex',
    FLEX_DIRECTION: 'column'
  },
  
  /**
   * ===== CHAT INPUT AREA =====
   * Controls the positioning and appearance of the chat input area
   */
  CHAT_INPUT_AREA: {
    // Height of the input area (percentage-based)
    HEIGHT: '5%',
    
    // Internal padding of the input area (percentage-based)
    PADDING: '2% 2%',
    
    // Extra padding for the bottom (adds safe area inset for iOS)
    PADDING_BOTTOM: 'calc(env(safe-area-inset-bottom, 0.75rem) + 0.5rem)',
    
    // Background color
    BACKGROUND_COLOR: 'black',
    
    // Position
    POSITION: 'relative',
    BOTTOM: '2%'
  },
  
  /**
   * ===== INPUT FIELD =====
   * Controls the appearance of the text input field
   */
  INPUT_FIELD: {
    // Padding inside the input field (percentage-based)
    PADDING: '1.5% 2%',
    
    // Font size of the input text (using viewport width units)
    FONT_SIZE: '1vw',
    
    // Width of the input field (relative to container)
    WIDTH: '75%',
    
    // Position from the left side of the container
    LEFT_OFFSET: '-2%',
    
    // Vertical position relative to the container (percentage from top)
    VERTICAL_POSITION: '18%',
    
    // Height of the input field (percentage-based)
    HEIGHT: '95%',
    
    // Border radius for rounded corners (using viewport width units)
    BORDER_RADIUS: '1vw',
    
    // Colors
    BACKGROUND_COLOR: 'white',
    TEXT_COLOR: 'black',
    BORDER_COLOR: '#e5e7eb',
    
    // Gap between input field and send button
    GAP: '1.5%',
    
    // Placeholder text properties (added from mobile layout)
    PLACEHOLDER: {
      // Maximum width of the placeholder text (percentage of input field width)
      MAX_WIDTH: '90%',
      
      // Font size of the placeholder text
      FONT_SIZE: '1vw',
      
      // Color of the placeholder text
      COLOR: '#9ca3af',
      
      // Text overflow handling
      TEXT_OVERFLOW: 'ellipsis'
    }
  },
  
  /**
   * ===== SEND BUTTON =====
   * Controls the appearance of the send button
   */
  SEND_BUTTON: {
    // Padding inside the button (percentage-based)
    PADDING: '1% 5%',
    
    // Vertical position relative to the container (percentage from top)
    VERTICAL_POSITION: '18%',
    
    // Horizontal position from the left side of the container
    LEFT_OFFSET: '77%',
    
    // Height of the button (percentage-based)
    HEIGHT: '95%',
    
    // Border radius for rounded corners (using viewport width units)
    BORDER_RADIUS: '1vw',
    
    // Colors for enabled state
    ENABLED_BG_COLOR: '#3b82f6',
    ENABLED_TEXT_COLOR: 'white',
    
    // Colors for disabled state
    DISABLED_BG_COLOR: '#e5e7eb',
    DISABLED_TEXT_COLOR: '#9ca3af',
    
    // Text styling properties (added from mobile layout)
    TEXT: {
      // Font size of the button text (using viewport width units)
      FONT_SIZE: '1vw',
      
      // Font weight of the button text
      FONT_WEIGHT: '500',
      
      // Text transform (uppercase, lowercase, capitalize, none)
      TEXT_TRANSFORM: 'none',
      
      // Letter spacing
      LETTER_SPACING: 'normal',
      
      // Line height
      LINE_HEIGHT: '1.2'
    }
  },
  
  /**
   * ===== FOOTER =====
   * Controls the positioning of the footer
   */
  FOOTER: {
    // Position from the bottom of the container (percentage-based)
    BOTTOM: '2%',
    
    // Horizontal position (centered by default)
    LEFT: '-2%',
    RIGHT: '0',
    
    // Internal padding of the footer (percentage-based)
    PADDING: '1.5%',
    
    // Font size of the footer text (using viewport width units)
    FONT_SIZE: '1.5vw',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 10,
    
    // Make the footer fixed to prevent scrolling with content
    POSITION: 'fixed',
    
    // Additional styling for better responsiveness
    WIDTH: '100%',
    TEXT_ALIGN: 'center',
    BACKGROUND_COLOR: 'transparent',
    COLOR: 'black',
    FONT_FAMILY: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    FONT_WEIGHT: 'bold'
  },
  
  /**
   * ===== MAIN CONTAINER =====
   * Controls the overall container that holds all UI elements
   */
  CONTAINER: {
    // Padding around the entire container (percentage-based)
    PADDING: '3%',
    
    // Maximum width of the container (percentage-based)
    MAX_WIDTH: '100%',
    
    // Base font size for the container (using viewport width units)
    FONT_SIZE: '1.2vw',
    
    // Prevent scrolling by constraining to viewport
    HEIGHT: '100vh',
    OVERFLOW: 'hidden'
  }
,
    PROMPT_BUTTONS: {
      CONTAINER: {
        DISPLAY: 'flex',
        FLEX_DIRECTION: 'row',
        FLEX_WRAP: 'wrap',
        GAP: '1%',
        JUSTIFY_CONTENT: 'space-around',
        WIDTH: '90%',
        POSITION: 'absolute',
        /* Shifting offsets below - user can adjust these to move container as desired. */
        TOP: 'auto',
        LEFT: '4%',
        RIGHT: '1.5%',
        BOTTOM: '1%',
        PADDING: '2.5% 0',
        BORDER_TOP: '1px solid #e5e7eb',
        BACKGROUND_COLOR: 'white',
        /* Explicit minimum height that can be adjusted */
        MIN_HEIGHT: '4rem',
        BOX_SIZING: 'border-box'
      },
      BUTTON: {
        BACKGROUND_COLOR: '#f2f2f2',
        TEXT_COLOR: '#666666',
        BORDER: '1px solid #e0e0e0',
        BORDER_RADIUS: '1vw',
        PADDING: '1% 0.5%',
        FONT_SIZE: '0.7vw',
        FONT_WEIGHT: '400',
        WHITE_SPACE: 'normal',
        LINE_HEIGHT: '1.3',
        MAX_WIDTH: '31%',
        /* Ensure content is properly aligned */
        DISPLAY: 'flex',
        ALIGN_ITEMS: 'center',
        JUSTIFY_CONTENT: 'center',
        /* Explicit height property that can be easily adjusted */
        HEIGHT: '4rem'
      }
    }
  };

export { DESKTOP_LAYOUT };