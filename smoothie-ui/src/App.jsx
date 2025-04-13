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
        position: "fixed",
        inset: 0,
        background: "linear-gradient(to bottom, #e8f3ff, #c7e0ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isVerySmallMobile ? "0.85rem" : (isMobile ? "0.9rem" : "1rem"), // Smaller base font size on mobile devices
        overflow: "hidden", // Prevent outer container from scrolling
      }}
    >
      <img
        src={EarthbarLogo}
        alt="Earthbar Logo"
        style={{
          position: "absolute",
          top: isVerySmallMobile ? "3px" : (isMobile ? "8px" : "20px"),
          left: isVerySmallMobile ? "3px" : (isMobile ? "8px" : "20px"),
          width: isVerySmallMobile ? "25px" : (isMobile ? "35px" : "120px"), // Shrink logo more on very small screens
          zIndex: "10",
          opacity: "0.8", // Further reduce opacity on mobile for better visual integration
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          padding: isVerySmallMobile ? "0 0.5rem" : (isMobile ? "0 0.75rem" : "0 1rem"),
          overflow: "hidden", // Prevent this container from scrolling
        }}
      >
        <ChatWidget />
        <p style={{
          color: "black",
          marginTop: isVerySmallMobile ? "0.5rem" : (isMobile ? "0.75rem" : "1.5rem"),
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          fontSize: isVerySmallMobile ? "0.8rem" : (isMobile ? "0.9rem" : "1.2rem"), // Smaller text on mobile
          marginBottom: 0
        }}>
          Be more than well.
        </p>
      </div>
    </div>
  );
}
