import { useEffect, useState } from "react";
import EarthbarLogo from "./assets/earthbar-filled.png";
import ChatWidget from "./ChatWidget";
import {
  getDeviceInfo,
  getContainerStyles,
  getBackgroundStyles,
  getLogoStyles,
  getFooterStyles,
  getLayout
} from "./utils/layout-manager";

export default function App() {
  // Initialize device info state
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());
  
  // Debug device detection
  console.log("Device detection:", JSON.stringify(deviceInfo));

  // Update device info on resize
  useEffect(() => {
    const handleResize = () => {
      const newDeviceInfo = getDeviceInfo();
      setDeviceInfo(newDeviceInfo);
      console.log("Resize detected:", JSON.stringify(newDeviceInfo));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log("window.innerHeight:", window.innerHeight);
    console.log("safe-area-inset-bottom:", window.getComputedStyle(document.documentElement).getPropertyValue('safe-area-inset-bottom'));
  }, []);

  // Generate styles using utility functions
  const containerStyles = getContainerStyles(deviceInfo);
  const backgroundStyles = getBackgroundStyles();
  const logoStyles = getLogoStyles(deviceInfo);
  const footerStyles = getFooterStyles(deviceInfo);

  return (
    <>
      {/* Background layers */}
      <div style={backgroundStyles.primary} />
      <div style={backgroundStyles.gradient} />
      <div style={backgroundStyles.bottom} />
      {/* Main container with flexbox layout */}
      <div style={containerStyles}>
        {/* Logo positioned fixed to avoid scrolling with content */}
        <img
          src={EarthbarLogo}
          alt="Earthbar Logo"
          style={{
            ...logoStyles,
            position: 'fixed',
            top: getLayout(deviceInfo).APP_LOGO.TOP_OFFSET,
            left: getLayout(deviceInfo).APP_LOGO.LEFT_MARGIN,
            zIndex: 20, // Higher than other elements to ensure visibility
            pointerEvents: 'none' // Prevent interaction with the logo
          }}
        />
        
        {/* Content container with chat widget */}
        <div className="content-container">
          <ChatWidget />
        </div>
        
        {/* Footer fixed at the bottom */}
        <p style={{
          ...footerStyles,
          position: 'fixed',
          bottom: getLayout(deviceInfo).FOOTER.BOTTOM,
          left: getLayout(deviceInfo).FOOTER.LEFT,
          right: getLayout(deviceInfo).FOOTER.RIGHT,
          zIndex: getLayout(deviceInfo).FOOTER.Z_INDEX,
          pointerEvents: 'none' // Prevent interaction with the footer
        }}>
          Be more than well.
        </p>
      </div>
    </>
  );
}
