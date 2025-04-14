/**
 * INITIAL VIEW MANAGER
 * 
 * This utility manages storing and restoring the initial view state,
 * ensuring users return to the same view they see when first loading the app.
 */

// Store the initial view state (position of header relative to viewport)
let initialHeaderTop = null;
let initialHeaderPosition = null;
let initialHeaderVisibility = null;
let headerElement = null;

/**
 * Captures the initial view state when the app first loads
 * This should be called once during initial component mounting
 */
export const captureInitialViewState = () => {
  // Find the header element
  headerElement = document.querySelector(".title-with-logo");
  if (!headerElement) return false;
  
  // Store its initial position
  initialHeaderTop = headerElement.getBoundingClientRect().top;
  initialHeaderPosition = headerElement.getBoundingClientRect();
  initialHeaderVisibility = headerElement.offsetParent !== null;
  
  console.log("Initial header position captured:", initialHeaderTop);
  return true;
};

/**
 * Restores the view to match what users see when they first load the app
 * Specifically targets making the header with logo visible in the same position
 */
export const restoreInitialView = () => {
  if (!headerElement || initialHeaderTop === null) {
    // If we don't have reference data, fall back to standard scroll to top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    return false;
  }
  
  // Get current position
  const currentHeaderTop = headerElement.getBoundingClientRect().top;
  
  // If current position matches initial position, nothing to do
  if (Math.abs(currentHeaderTop - initialHeaderTop) < 5) {
    return true;
  }
  
  // Calculate the adjustment needed to restore the header to its initial position
  const scrollAdjustment = window.scrollY + (currentHeaderTop - initialHeaderTop);
  
  // Apply the scroll adjustment
  window.scrollTo({
    top: scrollAdjustment,
    behavior: 'auto'
  });
  
  // Double-check and fine-tune (iOS sometimes needs multiple attempts)
  setTimeout(() => {
    const newHeaderTop = headerElement.getBoundingClientRect().top;
    if (Math.abs(newHeaderTop - initialHeaderTop) > 5) {
      const fineAdjustment = window.scrollY + (newHeaderTop - initialHeaderTop);
      window.scrollTo({
        top: fineAdjustment,
        behavior: 'auto'
      });
    }
  }, 50);
  
  return true;
};

/**
 * Checks if the current view matches the initial view state
 * Returns true if they match, false otherwise
 */
export const isAtInitialView = () => {
  if (!headerElement || initialHeaderTop === null) return false;
  
  const currentHeaderTop = headerElement.getBoundingClientRect().top;
  return Math.abs(currentHeaderTop - initialHeaderTop) < 5;
};