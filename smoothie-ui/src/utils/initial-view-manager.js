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
  console.log("restoreInitialView called", {
    activeElement: document.activeElement ? document.activeElement.tagName : 'none',
    activeElementHasFocus: document.activeElement &&
                          (document.activeElement.tagName === 'INPUT' ||
                           document.activeElement.tagName === 'TEXTAREA'),
    hadFullKeyboardShown: document.activeElement ? document.activeElement.dataset.hadFullKeyboardShown : 'N/A'
  });

  // CRITICAL: Don't restore view if the keyboard is being shown for the first time
  // This is likely causing the view to reset after the keyboard appears
  if (document.activeElement &&
      (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
      !document.activeElement.dataset.hadFullKeyboardShown) {
    console.log("CRITICAL: Blocking restoreInitialView during first keyboard appearance");
    return false;
  }

  if (!headerElement || initialHeaderTop === null) {
    // If we don't have reference data, fall back to standard scroll to top
    
    // But DO NOT scroll to top if an input field has keyboard focus for the first time
    if (!(document.activeElement &&
         (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
         !document.activeElement.dataset.hadFullKeyboardShown)) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    return false;
  }
  
  // Get current position
  const currentHeaderTop = headerElement.getBoundingClientRect().top;
  
  // If current position matches initial position, nothing to do
  if (Math.abs(currentHeaderTop - initialHeaderTop) < 5) {
    return true;
  }
  
  // CRITICAL: Don't adjust position if keyboard is showing for first time
  if (document.activeElement &&
      (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
      !document.activeElement.dataset.hadFullKeyboardShown) {
    console.log("CRITICAL: Preventing initial view restoration during keyboard appearance");
    return false;
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
    // Check again to ensure an input hasn't been focused since we started
    if (document.activeElement &&
        (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') &&
        !document.activeElement.dataset.hadFullKeyboardShown) {
      console.log("CRITICAL: Canceling fine-tune adjustment during keyboard appearance");
      return;
    }
    
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