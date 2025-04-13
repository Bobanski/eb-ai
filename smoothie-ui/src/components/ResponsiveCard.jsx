import React from 'react';
import ResponsiveWrapper from './ResponsiveWrapper';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../utils/theme';

/**
 * ResponsiveCard Component
 * 
 * An example component that demonstrates the new responsive design system.
 * This component uses all aspects of the system:
 * - ResponsiveWrapper for device detection
 * - Theme tokens for styling
 * - Responsive style generation
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @param {string} props.imageSrc - Image source URL
 * @param {React.ReactNode} props.children - Additional content to render
 */
function ResponsiveCard({ title, description, imageSrc, children }) {
  // Style generator functions that take device info and return appropriate styles
  const getCardStyles = (deviceInfo) => ({
    backgroundColor: COLORS.UI.BACKGROUND,
    borderRadius: BORDER_RADIUS.MEDIUM,
    boxShadow: SHADOWS.MEDIUM,
    overflow: 'hidden',
    width: deviceInfo.isMobile ? '100%' : '350px',
    margin: deviceInfo.isMobile 
      ? `${SPACING.XS}rem 0` 
      : `${SPACING.MD}rem`,
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
    }
  });

  const getImageStyles = (deviceInfo) => ({
    width: '100%',
    height: deviceInfo.isVerySmallMobile ? '120px' : '180px',
    objectFit: 'cover',
  });

  const getContentStyles = (deviceInfo) => ({
    padding: deviceInfo.isVerySmallMobile 
      ? `${SPACING.XS}rem ${SPACING.SM}rem`
      : `${SPACING.MD}rem ${SPACING.LG}rem`,
  });

  const getTitleStyles = (deviceInfo) => ({
    fontSize: deviceInfo.isVerySmallMobile 
      ? TYPOGRAPHY.FONT_SIZE.MEDIUM 
      : TYPOGRAPHY.FONT_SIZE.LARGE,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
    color: COLORS.TEXT.PRIMARY,
    marginBottom: SPACING.XXS + 'rem',
  });

  const getDescriptionStyles = (deviceInfo) => ({
    fontSize: deviceInfo.isVerySmallMobile 
      ? TYPOGRAPHY.FONT_SIZE.SMALL 
      : TYPOGRAPHY.FONT_SIZE.REGULAR,
    color: COLORS.TEXT.SECONDARY,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.RELAXED,
  });

  return (
    <ResponsiveWrapper>
      {(deviceInfo) => (
        <div style={getCardStyles(deviceInfo)}>
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt={title} 
              style={getImageStyles(deviceInfo)} 
            />
          )}
          
          <div style={getContentStyles(deviceInfo)}>
            <h3 style={getTitleStyles(deviceInfo)}>{title}</h3>
            <p style={getDescriptionStyles(deviceInfo)}>{description}</p>
            {children}
          </div>
        </div>
      )}
    </ResponsiveWrapper>
  );
}

export default ResponsiveCard;

/**
 * Example Usage:
 * 
 * ```jsx
 * import ResponsiveCard from './components/ResponsiveCard';
 * 
 * function ProductDisplay() {
 *   return (
 *     <div className="products-container">
 *       <ResponsiveCard
 *         title="Blueberry Bliss Smoothie"
 *         description="A refreshing blend of blueberries, banana, and almond milk."
 *         imageSrc="/images/BlueberryBliss.jpg"
 *       >
 *         <button className="order-button">Order Now</button>
 *       </ResponsiveCard>
 *     </div>
 *   );
 * }
 * ```
 */