# UI Layout Guide

This guide explains how to easily adjust the positioning and sizing of UI elements in the Smoothie Bot UI.

## Quick Start

To adjust UI elements:

1. **For mobile layout changes:**
   - Edit `src/utils/mobile-layout.js`
   - Find the section for the element you want to adjust
   - Change the values and save the file

2. **For desktop layout changes:**
   - Edit `src/utils/desktop-layout.js`
   - Find the section for the element you want to adjust
   - Change the values and save the file

## Example: Moving the Header Up on Mobile

1. Open `src/utils/mobile-layout.js`
2. Find the HEADER section:
   ```js
   HEADER: {
     // Absolute position from the top of the container
     TOP: '10px',
     
     // Horizontal position (centered by default)
     LEFT: '0',
     RIGHT: '0',
     
     // Internal padding of the header
     PADDING: '0.5rem',
     
     // Z-index (controls stacking order - higher numbers appear on top)
     Z_INDEX: 10
   },
   ```
3. Change `TOP: '10px'` to a smaller value (e.g., `TOP: '5px'`) to move it up
4. Save the file and refresh your app

## Example: Moving the Chat Container on Mobile

1. Open `src/utils/mobile-layout.js`
2. Find the CHAT_CONTAINER section:
   ```js
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
   ```
3. Change `TOP: '80px'` to adjust the position (increase to move down, decrease to move up)
4. Save the file and refresh your app

## Example: Adjusting the Logo Position

1. Open `src/utils/mobile-layout.js` (for mobile) or `src/utils/desktop-layout.js` (for desktop)
2. Find the LOGO section:
   ```js
   LOGO: {
     // Logo height (controls the size of the logo)
     HEIGHT: '35px',
     
     // Absolute position from the left edge
     LEFT: '1rem',
     
     // Absolute position from the top edge
     TOP: '1rem',
     
     // Z-index (controls stacking order - higher numbers appear on top)
     Z_INDEX: 20
   },
   ```
3. Adjust `LEFT` to move the logo horizontally
4. Adjust `TOP` to move the logo vertically
5. Save the file and refresh your app

## Example: Adjusting the Footer Position

1. Open `src/utils/mobile-layout.js` (for mobile) or `src/utils/desktop-layout.js` (for desktop)
2. Find the FOOTER section:
   ```js
   FOOTER: {
     // Absolute position from the bottom of the container
     BOTTOM: '20px',
     
     // Horizontal position (centered by default)
     LEFT: '0',
     RIGHT: '0',
     
     // Internal padding of the footer
     PADDING: '0.5rem',
     
     // Font size of the footer text
     FONT_SIZE: '1.25rem',
     
     // Z-index (controls stacking order - higher numbers appear on top)
     Z_INDEX: 10
   },
   ```
3. Change `BOTTOM: '20px'` to adjust the vertical position (increase to move up, decrease to move down)
4. Save the file and refresh your app

## Example: Increasing Logo Size on Desktop

1. Open `src/utils/desktop-layout.js`
2. Find the LOGO section:
   ```js
   LOGO: {
     // Logo height (controls the size of the logo)
     HEIGHT: '120px',
     
     // Absolute position from the left edge
     LEFT: '2rem',
     
     // Absolute position from the top edge
     TOP: '2rem',
     
     // Z-index (controls stacking order - higher numbers appear on top)
     Z_INDEX: 20
   },
   ```
3. Change `HEIGHT: '120px'` to `HEIGHT: '150px'` to make it larger
4. Save the file and refresh your app

## Available UI Elements

You can adjust the following UI elements:

### Header
- Vertical position (TOP)
- Horizontal position (LEFT, RIGHT)
- Internal padding (PADDING)
- Z-index (Z_INDEX)

### Logo
- Size (HEIGHT)
- Horizontal position (LEFT)
- Vertical position (TOP)
- Z-index (Z_INDEX)

### Chat Container
- Width (WIDTH)
- Maximum width (MAX_WIDTH)
- Vertical position (TOP)
- Horizontal position (LEFT, RIGHT)
- Border radius (BORDER_RADIUS)
- Z-index (Z_INDEX)

### Chat Messages
- Height, maximum height, minimum height
- Internal padding

### Footer
- Vertical position (BOTTOM)
- Horizontal position (LEFT, RIGHT)
- Internal padding (PADDING)
- Font size (FONT_SIZE)
- Z-index (Z_INDEX)

### Main Container
- Overall padding
- Maximum width
- Base font size

## How It Works

The layout system uses a simple and direct approach:

1. `src/utils/mobile-layout.js` - Controls mobile layout (includes very small mobile overrides)
2. `src/utils/desktop-layout.js` - Controls desktop layout
3. `src/utils/layout-manager.js` - Connects the layout files and applies the styles directly to the elements

All UI elements are positioned absolutely, which means:
- You can move elements freely without affecting other elements
- Changes in one element's position won't push other elements around
- You have precise control over the exact position of each element

## Best Practices

1. Make small adjustments and test frequently
2. Keep mobile and desktop layouts in sync for a consistent experience
3. Use the comments in the layout files to understand what each value controls
4. Remember that some values use relative units (rem, vh, etc.) which scale with the device
5. When adjusting positions, consider how they will look on different screen sizes