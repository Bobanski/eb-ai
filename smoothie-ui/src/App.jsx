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

  return (
    <div
      style={{
        position: "relative", // Use relative positioning instead of fixed
        minHeight: "100vh", // Use viewport height for full screen
        background: "linear-gradient(to bottom, #e8f3ff, #c7e0ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isVerySmallMobile ? "0.85rem" : (isMobile ? "0.9rem" : "1rem"), // Smaller base font size on mobile devices
        paddingTop: isMobile ? "env(safe-area-inset-top, 2rem)" : "0", // Use safe area inset for top padding
        paddingBottom: isMobile ? "env(safe-area-inset-bottom, 0.5rem)" : "0", // Use safe area inset for bottom padding
        overflowX: "hidden", // Prevent horizontal scrolling
        overflowY: "auto", // Allow vertical scrolling if needed
        width: "100%",
        boxSizing: "border-box",
      }}
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
