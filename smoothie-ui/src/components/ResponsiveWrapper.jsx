import { useState, useEffect } from "react";
import { getDeviceInfo } from "../utils/responsive";

/**
 * ResponsiveWrapper
 * 
 * A higher-order component that provides device information and responsive
 * styling capabilities to its children. This standardizes the approach
 * to responsive design across the application.
 * 
 * Usage:
 * ```jsx
 * <ResponsiveWrapper>
 *   {(deviceInfo) => (
 *     <YourComponent deviceInfo={deviceInfo} />
 *   )}
 * </ResponsiveWrapper>
 * ```
 */
export default function ResponsiveWrapper({ children, className = "" }) {
  // Initialize device info state
  const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());
  
  // Update device info on resize
  useEffect(() => {
    const handleResize = () => {
      const newDeviceInfo = getDeviceInfo();
      setDeviceInfo(newDeviceInfo);
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate responsive class names
  const getResponsiveClassName = (baseClass) => {
    const { isMobile, isVerySmallMobile, isLandscape } = deviceInfo;
    
    let classes = baseClass ? [baseClass] : [];
    
    if (isVerySmallMobile) classes.push("very-small-mobile");
    else if (isMobile) classes.push("mobile");
    
    if (isLandscape) classes.push("landscape");
    
    return classes.join(" ");
  };

  return (
    <div className={getResponsiveClassName(className)}>
      {typeof children === 'function' ? children(deviceInfo) : children}
    </div>
  );
}

/**
 * Example of how to create a responsive component using this wrapper:
 * 
 * ```jsx
 * import ResponsiveWrapper from './components/ResponsiveWrapper';
 * 
 * function MyComponent() {
 *   return (
 *     <ResponsiveWrapper className="my-component">
 *       {(deviceInfo) => (
 *         <div style={{ 
 *           fontSize: deviceInfo.isVerySmallMobile ? '0.8rem' : '1rem',
 *           padding: deviceInfo.isMobile ? '0.5rem' : '1rem'
 *         }}>
 *           This content adapts to device size!
 *         </div>
 *       )}
 *     </ResponsiveWrapper>
 *   );
 * }
 * ```
 */