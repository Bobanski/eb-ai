import { useEffect, useState } from "react";
import EarthbarLogo from "./assets/earthbar-filled.png";
import ChatWidget from "./ChatWidget";
import {
  getDeviceInfo,
  getContainerStyles,
  getBackgroundStyles,
  getLogoStyles,
  getFooterStyles
} from "./utils/responsive";

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
      {/* Primary background div */}
      <div style={backgroundStyles.primary} />
      
      {/* Gradient layer */}
      <div style={backgroundStyles.gradient} />

      {/* Additional bottom coverage layer */}
      <div style={backgroundStyles.bottom} />
      <div style={containerStyles}>
        <img
          src={EarthbarLogo}
          alt="Earthbar Logo"
          style={logoStyles}
        />
        <div className="content-container">
          <ChatWidget />
          {/* Footer text inside the main container */}
          <div style={footerStyles.container}>
            <p style={footerStyles.text(deviceInfo)}>
              Be more than well.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
