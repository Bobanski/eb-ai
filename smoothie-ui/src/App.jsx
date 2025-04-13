import { useEffect } from "react";
import EarthbarLogo from "./assets/earthbar-filled.png";
import ChatWidget from "./ChatWidget";
export default function App() {
  // Determine if we're on a mobile device using media query and orientation
  const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                  (window.matchMedia("(max-height: 480px)").matches && window.matchMedia("(orientation: landscape)").matches);
  const isVerySmallMobile = window.matchMedia("(max-width: 375px)").matches ||
                           (window.matchMedia("(max-height: 375px)").matches && window.matchMedia("(orientation: landscape)").matches);
  
  
  // Debug mobile detection
  console.log("Mobile detection:", JSON.stringify({
    isMobile,
    isVerySmallMobile,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  }));

  // Add resize listener to update mobile detection
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                      (window.matchMedia("(max-height: 480px)").matches && window.matchMedia("(orientation: landscape)").matches);
      const isVerySmallMobile = window.matchMedia("(max-width: 375px)").matches ||
                               (window.matchMedia("(max-height: 375px)").matches && window.matchMedia("(orientation: landscape)").matches);
      console.log("Resize detected:", JSON.stringify({
        isMobile,
        isVerySmallMobile,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Separate styles for mobile and desktop to preserve desktop experience
  const mobileContainerStyle = {
    minHeight: "100dvh", // Use dynamic viewport height for better iOS support
    paddingTop: "env(safe-area-inset-top, 0)",
    paddingBottom: "env(safe-area-inset-bottom, 0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, #e8f3ff, #c7e0ff)",
    position: "relative", // Use relative positioning instead of fixed
    overflow: "hidden", // Prevent scroll bounce on iOS
    width: "100%",
    boxSizing: "border-box",
    fontSize: isVerySmallMobile ? "0.85rem" : "0.9rem", // Smaller base font size on mobile devices
  };

  // Original desktop style
  const desktopContainerStyle = {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(to bottom, #e8f3ff, #c7e0ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    overflow: "hidden",
  };

  // Use the appropriate style based on device type
  const outerContainerStyle = isMobile ? mobileContainerStyle : desktopContainerStyle;

  return (
    <div style={outerContainerStyle}
    >
      <img
        src={EarthbarLogo}
        alt="Earthbar Logo"
        style={{
          position: "absolute",
          top: isVerySmallMobile ? "calc(env(safe-area-inset-top, 0) + 2px)" : (isMobile ? "calc(env(safe-area-inset-top, 0) + 5px)" : "20px"),
          left: isVerySmallMobile ? "2px" : (isMobile ? "5px" : "20px"),
          width: isVerySmallMobile ? "18px" : (isMobile ? "22px" : "120px"), // Make logo much smaller on mobile
          zIndex: "10",
          opacity: "0.7", // Further reduce opacity on mobile for better visual integration
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "95%" : "600px", // Slightly wider on mobile
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Center content vertically
          margin: "0 auto",
          padding: isVerySmallMobile ? "0 0.5rem" : (isMobile ? "0 0.75rem" : "0 1rem"),
          overflowX: "hidden", // Prevent horizontal scrolling
          overflowY: "auto", // Allow vertical scrolling if needed
          boxSizing: "border-box",
        }}
      >
        <ChatWidget />
        {/* Footer text inside the main container */}
        <div style={{
          width: "100%",
          textAlign: "center",
          marginTop: "auto", // Push to bottom of flex container
          paddingTop: "1rem",
          paddingBottom: isMobile ? "env(safe-area-inset-bottom, 0.5rem)" : "0.5rem",
        }}>
          <p style={{
            color: "black",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            fontSize: isVerySmallMobile ? "0.8rem" : (isMobile ? "0.9rem" : "1.2rem"), // Smaller text on mobile
            margin: 0,
            padding: 0,
          }}>
            Be more than well.
          </p>
        </div>
      </div>
    </div>
  );
}
