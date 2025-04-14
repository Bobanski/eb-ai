# Layout System Documentation

This document explains how to use the new layout system to easily adjust positioning and sizing of UI elements across the application.

## Overview

The layout system provides a single source of truth for positioning and sizing elements, making it easier to maintain consistent spacing and alignment throughout the application. It consists of:

1. **JavaScript Constants** (`src/utils/layout.js`) - For use in React components and JavaScript files
2. **CSS Variables** (`src/layout.css`) - For use in CSS files and inline styles

## Using the Layout System

### For JavaScript/React Components

Import the layout utilities in your component:

```jsx
import { getLayout } from './utils/layout';

function MyComponent({ deviceInfo }) {
  // Get the appropriate layout based on device type
  const layout = getLayout(deviceInfo);
  
  // Use layout constants in your component
  const styles = {
    padding: layout.PADDING.CONTAINER,
    fontSize: layout.SIZE.FONT_BASE,
    marginTop: layout.MARGIN.HEADER_TOP,
  };
  
  return <div style={styles}>My Component</div>;
}
```

### For CSS Files

Use the CSS variables defined in `layout.css`:

```css
.my-component {
  padding: var(--container-padding);
  font-size: var(--font-size-base);
  margin-top: var(--header-margin-top);
}
```

## Adjusting the Layout

### To Adjust Desktop Layout

1. Open `src/utils/layout.js`
2. Modify values in the `DESKTOP` object
3. Changes will automatically apply to both JavaScript and CSS

Example:
```js
// Desktop layout configuration
export const DESKTOP = {
  // Spacing
  PADDING: {
    CONTAINER: '3rem', // Changed from 2rem to 3rem
    // ...
  },
  // ...
};
```

### To Adjust Mobile Layout

1. Open `src/utils/layout.js`
2. Modify values in the `MOBILE` object
3. Changes will automatically apply to both JavaScript and CSS

Example:
```js
// Mobile layout configuration
export const MOBILE = {
  // Spacing
  PADDING: {
    CONTAINER: '1.5rem', // Changed from 1rem to 1.5rem
    // ...
  },
  // ...
};
```

### To Adjust Very Small Mobile Layout

1. Open `src/utils/layout.js`
2. Modify values in the `VERY_SMALL_MOBILE` object
3. Changes will automatically apply to both JavaScript and CSS

## Layout Categories

The layout system organizes values into these categories:

### Padding

Controls the internal spacing of elements:

- `PADDING.CONTAINER` - Main container padding
- `PADDING.HEADER` - Header padding
- `PADDING.CONTENT` - Content area padding
- `PADDING.FOOTER` - Footer padding

### Margins

Controls the spacing between elements:

- `MARGIN.HEADER_TOP` - Space above the header
- `MARGIN.HEADER_BOTTOM` - Space below the header
- `MARGIN.LOGO_TOP` - Space above the logo
- `MARGIN.LOGO_BOTTOM` - Space below the logo
- `MARGIN.CHAT_TOP` - Space above the chat container
- `MARGIN.CHAT_BOTTOM` - Space below the chat container
- `MARGIN.FOOTER_TOP` - Space above the footer
- `MARGIN.FOOTER_BOTTOM` - Space below the footer

### Sizes

Controls dimensions and font sizes:

- `SIZE.LOGO_HEIGHT` - Logo height
- `SIZE.LOGO_WIDTH` - Logo width
- `SIZE.CONTAINER_MAX_WIDTH` - Maximum width of the main container
- `SIZE.CHAT_MAX_WIDTH` - Maximum width of the chat container
- `SIZE.FONT_BASE` - Base font size
- `SIZE.FONT_TITLE` - Title font size
- `SIZE.FONT_SUBTITLE` - Subtitle font size
- `SIZE.FONT_FOOTER` - Footer font size

### Border Radius

Controls the roundness of corners:

- `BORDER_RADIUS.CHAT_CONTAINER` - Chat container border radius
- `BORDER_RADIUS.MESSAGE` - Message bubble border radius
- `BORDER_RADIUS.INPUT` - Input field border radius
- `BORDER_RADIUS.BUTTON` - Button border radius

## Best Practices

1. **Always use the layout system** instead of hardcoding values
2. **Update the layout.js file** when you need to adjust positioning or sizing
3. **Use the getLayout function** in JavaScript to get the appropriate layout based on device type
4. **Use CSS variables** in CSS files for consistent styling
5. **Refer to this documentation** when you need to make layout adjustments