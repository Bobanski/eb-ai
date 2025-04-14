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
    // Position from the top of the container (percentage-based)
    TOP: '-3%',
    
    // Horizontal position (centered by default)
    LEFT: '-2%',
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
    // Logo height (controls the size of the logo - percentage of viewport height)
    HEIGHT: '5vh',
    
    // Position from the left edge (percentage-based)
    LEFT: '2%',
    LEFT_MARGIN: '2%', // For inline style consistency
    
    // Position from the top edge (percentage-based)
    TOP: '2%',
    TOP_OFFSET: '2%', // For inline style consistency
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 20
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
    FONT_SIZE: '4.5vw',
    
    // Line height of the title text
    LINE_HEIGHT: 1.2
  },
  
  /**
   * ===== SUBTITLE TEXT =====
   * Controls the size and appearance of subtitle text
   */
  SUBTITLE: {
    // Font size of the subtitle text (using viewport width units for responsive text)
    FONT_SIZE: '3vw',
    
    // Space above the subtitle (percentage-based)
    TOP_MARGIN: '1%',
    
    // Maximum width of the subtitle (percentage-based)
    MAX_WIDTH: '70%', // Adjust this value to control the width of the subtitle
    
    // Text alignment
    TEXT_ALIGN: 'center'
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
    
    // Position from the top of the container (percentage-based)
    TOP: '12%',
    
    // Horizontal position (centered by default)
    LEFT: '0',
    RIGHT: '0',
    
    // Rounded corners radius
    BORDER_RADIUS: '1rem',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 5,
    
    // Height property - directly control the height with viewport units
    // Adjust this value to make the container taller or shorter
    HEIGHT: '75vh', // 70% of viewport height - change this value as needed
    
    // Display and flex direction for internal layout
    DISPLAY: 'flex',
    FLEX_DIRECTION: 'column'
  },
  
  /**
   * ===== CHAT MESSAGES =====
   * Controls the chat messages area
   */
  CHAT_MESSAGES: {
    // Height of the chat messages area - use flex to fill available space
    HEIGHT: 'auto', // Let flex determine the height
    
    // Maximum height - let it be determined by the container
    MAX_HEIGHT: 'none',
    
    // Minimum height - ensure there's always space for messages
    MIN_HEIGHT: '200px',
    
    // Internal padding of the chat messages area
    PADDING: '1rem',
    
    // Flex property to take available space
    FLEX: '1',
    
    // Display and flex direction
    DISPLAY: 'flex',
    FLEX_DIRECTION: 'column'
  },
  
  /**
   * ===== FOOTER =====
   * Controls the positioning of the footer
   */
  FOOTER: {
    // Position from the bottom of the container (percentage-based)
    BOTTOM: '-4%',
    
    // Horizontal position (centered by default)
    LEFT: '-2%',
    RIGHT: '2%',
    
    // Internal padding of the footer (percentage-based)
    PADDING: '1%',
    
    // Font size of the footer text (using viewport width units)
    FONT_SIZE: '3vw',
    
    // Z-index (controls stacking order - higher numbers appear on top)
    Z_INDEX: 10
  },
  
  /**
   * ===== MAIN CONTAINER =====
   * Controls the overall container that holds all UI elements
   */
  CONTAINER: {
    // Padding around the entire container (percentage-based)
    PADDING: '0%',
    
    // Maximum width of the container
    MAX_WIDTH: '100%',
    
    // Base font size for the container (using viewport width units)
    FONT_SIZE: '2.5vw'
  },
  
  /**
   * ===== INPUT FIELD =====
   * Controls the appearance of the text input field
   */
  INPUT_FIELD: {
    // Padding inside the input field (percentage-based)
    PADDING: '2% 4%',
    
    // Font size of the input text (using viewport width units)
    FONT_SIZE: '2.5vw',
    
    // Width of the input field (relative to container)
    WIDTH: '70%',
    
    // Position from the left side of the container
    LEFT_OFFSET: '-6%',
    
    // Vertical position relative to the container (percentage from top)
    VERTICAL_POSITION: '30%',
    
    // Height of the input field (percentage-based)
    HEIGHT: '60%',
    
    // Border radius for rounded corners (percentage-based)
    BORDER_RADIUS: '1.5vw',
    
    // Colors
    BACKGROUND_COLOR: 'white',
    TEXT_COLOR: 'black',
    BORDER_COLOR: '#e5e7eb',
    
    // Gap between input field and send button
    GAP: '1%',
    
    // Placeholder text properties
    PLACEHOLDER: {
      // Maximum width of the placeholder text (percentage of input field width)
      MAX_WIDTH: '90%',
      
      // Font size of the placeholder text (closer to input text size for better readability)
      FONT_SIZE: '3.2vw', // Match the input field font size
      
      // Color of the placeholder text
      COLOR: '#9ca3af',
      
      // Text overflow handling
      TEXT_OVERFLOW: 'ellipsis'
    }
  },
  
  /**
   * ===== SEND BUTTON =====
   * Controls the appearance of the send button for mobile devices
   */
  SEND_BUTTON: {
    // Padding inside the button (percentage-based)
    PADDING: '2% 8%',
    
    // Vertical position relative to the container (percentage from top)
    VERTICAL_POSITION: '30%',
    
    // Horizontal position from the left side of the container
    LEFT_OFFSET: '66%',
    
    // Height of the button (percentage-based)
    HEIGHT: '60%',

    // Border radius for rounded corners (percentage-based)
    BORDER_RADIUS: '1.5vw',

    // Colors for enabled state
    ENABLED_BG_COLOR: '#3b82f6',
    ENABLED_TEXT_COLOR: 'white',

    // Colors for disabled state
    DISABLED_BG_COLOR: '#e5e7eb',
    DISABLED_TEXT_COLOR: '#9ca3af',
    
    // Text styling properties
    TEXT: {
      // Font size of the button text (using viewport width units)
      FONT_SIZE: '3.5vw',
      
      // Font weight of the button text
      FONT_WEIGHT: '500',
      
      // Text transform (uppercase, lowercase, capitalize, none)
      TEXT_TRANSFORM: 'none',
      
      // Letter spacing
      LETTER_SPACING: 'normal',
      
      // Line height
      LINE_HEIGHT: '1.2'
    }
  }
,
  PROMPT_BUTTONS: {
    CONTAINER: {
      DISPLAY: 'flex',
      FLEX_DIRECTION: 'row',
      GAP: '1%',
      JUSTIFY_CONTENT: 'space-between',
      WIDTH: '100%',
      PADDING: '1%',
      BORDER_TOP: '1px solid #e5e7eb',
      BACKGROUND_COLOR: '#f9f9f9',
      POSITION: 'absolute',
      TOP: 'auto',
      BOTTOM: '0%',
      LEFT: '0%',
      RIGHT: '1rem',
      /* The user can easily shift these offsets (TOP, BOTTOM, LEFT, RIGHT) as desired
         to reposition the prompt buttons within the chat window. */
      /* Explicit minimum height that can be adjusted */
      MIN_HEIGHT: '5rem',
      BOX_SIZING: 'border-box',
    },
    BUTTON: {
      BACKGROUND_COLOR: '#f2f2f2',
      TEXT_COLOR: '#666666',
      BORDER: '1px solid #e0e0e0',
      BORDER_RADIUS: '1.5vw',
      PADDING: '1% 2%',
      FONT_SIZE: '3vw',
      FONT_WEIGHT: '400',
      WHITE_SPACE: 'normal',
      LINE_HEIGHT: '1.2',
      MAX_WIDTH: '100%',
      /* Explicit height property that can be easily adjusted */
      HEIGHT: '5rem',
      /* Ensure content is properly aligned */
      DISPLAY: 'flex',
      ALIGN_ITEMS: 'center',
      JUSTIFY_CONTENT: 'center'
    }
  }
};

// Very small mobile overrides (phones smaller than 375px)
const VERY_SMALL_MOBILE_OVERRIDES = {
  APP_LOGO: {
    HEIGHT: '3vh'
  },
  CHAT_LOGO: {
    HEIGHT: '3.5vh'
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
      TOP: '0%',
      LEFT: 'auto',
      RIGHT: 'auto',
      BOTTOM: 'auto',
      PADDING: '1%',
      BORDER_TOP: '1px solid #e5e7eb',
      BACKGROUND_COLOR: 'white',
      /* Explicit minimum height that can be adjusted */
      MIN_HEIGHT: '2.5rem',
      BOX_SIZING: 'border-box',
    },
    BUTTON: {
      BACKGROUND_COLOR: '#f2f2f2',
      TEXT_COLOR: '#666666',
      BORDER: '1px solid #e0e0e0',
      BORDER_RADIUS: '1.5vw',
      /* Increased padding to prevent text from getting too close to borders */
      PADDING: '2% 3%',
      FONT_SIZE: '2vw',
      FONT_WEIGHT: '400',
      WHITE_SPACE: 'normal',
      LINE_HEIGHT: '1.2',
      MAX_WIDTH: '30%',
      /* Explicit height property that can be easily adjusted */
      HEIGHT: '2rem',
      /* Ensure content is properly aligned */
      DISPLAY: 'flex',
      ALIGN_ITEMS: 'center',
      JUSTIFY_CONTENT: 'center'
    }
  },
  TITLE: {
    FONT_SIZE: '2vw'
  },
  SUBTITLE: {
    FONT_SIZE: '1.8vw',
    MAX_WIDTH: '85%', // Wider subtitle for very small screens
    TEXT_ALIGN: 'center'
  },
  CONTAINER: {
    PADDING: '1%',
    FONT_SIZE: '2.2vw'
  },
  FOOTER: {
    FONT_SIZE: '1.8vw'
  },
  HEADER: {
    TOP_MARGIN: '1%',
    BOTTOM_MARGIN: '0.5%',
    PADDING: '0.5%'
  },
  INPUT_FIELD: {
    // Smaller padding for very small devices (percentage-based)
    PADDING: '1.5% 2%',
    
    // Smaller font size for very small devices (using viewport width units)
    FONT_SIZE: '2vw',
    
    // Narrower width for very small devices
    WIDTH: '60%',
    
    // Position from the left side of the container for very small devices
    LEFT_OFFSET: '2%',
    
    // Smaller border radius (using viewport width units)
    BORDER_RADIUS: '1vw',
    
    // Placeholder text properties for very small devices
    PLACEHOLDER: {
      // Maximum width of the placeholder text (percentage of input field width)
      MAX_WIDTH: '90%',
      
      // Font size of the placeholder text (match input text size for better readability)
      FONT_SIZE: '2vw', // Match the input field font size
      
      // Color of the placeholder text
      COLOR: '#9ca3af',
      
      // Text overflow handling
      TEXT_OVERFLOW: 'ellipsis'
    }
  },
  // Add send button overrides for very small devices
  SEND_BUTTON: {
    // Smaller padding for very small devices
    PADDING: '1.5% 6%',
    
    // Smaller height for very small devices
    HEIGHT: '50%',
    
    // Smaller border radius for very small devices
    BORDER_RADIUS: '1vw',
    
    // Text styling properties for very small devices
    TEXT: {
      // Smaller font size for very small devices
      FONT_SIZE: '2vw',
      
      // Font weight for very small devices
      FONT_WEIGHT: '500',
      
      // Other text properties can be overridden here if needed
      TEXT_TRANSFORM: 'none',
      LETTER_SPACING: 'normal',
      LINE_HEIGHT: '1.2'
    }
  }
};

export { MOBILE_LAYOUT, VERY_SMALL_MOBILE_OVERRIDES };