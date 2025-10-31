
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PriceRangeVisualizationProps {
  lowerBound: number;
  midpoint: number;
  upperBound: number;
  formatCurrency: (amount: number) => string;
}

const PriceRangeVisualization: React.FC<PriceRangeVisualizationProps> = ({
  lowerBound,
  midpoint,
  upperBound,
  formatCurrency
}) => {
  const isMobile = useIsMobile();

  // Position calculation for markers - using fixed positions at 0%, 50%, and 100%
  const getPosition = (value: number) => {
    if (value === lowerBound) {
      return 0; // Position at 0% from left (left edge)
    } else if (value === upperBound) {
      return 100; // Position at 100% from left (right edge)
    } else if (value === midpoint) {
      return 50; // Position at center (50%)
    }
    
    // For any other values (shouldn't be needed in this component)
    return 50;
  };

  const mobileTextSize = {
    smaller: 'text-sm',
    medium: 'text-xl',
    larger: 'text-3xl'
  };

  return (
    <div className="w-full max-w-2xl mt-2">
      <div className="relative h-28">
        {/* Price markers - with values ABOVE the line with increased font sizes and vertically centered */}
        <div className="absolute" style={{ left: `${getPosition(lowerBound)}%`, transform: 'translateX(0)' }}>
          <div className={`mb-4 ${isMobile ? mobileTextSize.smaller : 'text-2xl'} font-medium text-gray-700 flex items-center h-12`}>
            {formatCurrency(lowerBound)}
          </div>
          <div className="w-px h-3 bg-gray-400 ml-2"></div>
        </div>
        
        <div className="absolute" style={{ left: `${getPosition(midpoint)}%`, transform: 'translateX(-50%)' }}>
          <div className={`mb-4 ${isMobile ? mobileTextSize.larger : 'text-5xl'} font-semibold theme-primary-text flex items-center justify-center h-12`}>
            {formatCurrency(midpoint)}
          </div>
          <div className="w-1 h-4 rounded-full bg-[var(--theme-primary)] mx-auto"></div>
        </div>
        
        <div className="absolute" style={{ left: `${getPosition(upperBound)}%`, transform: 'translateX(-100%)' }}>
          <div className={`mb-4 ${isMobile ? mobileTextSize.smaller : 'text-2xl'} font-medium text-gray-700 flex items-center justify-end h-12`}>
            {formatCurrency(upperBound)}
          </div>
          <div className="w-px h-3 bg-gray-400 mr-2 ml-auto"></div>
        </div>

        {/* Price gradient bar */}
        <div className="absolute w-full h-2 bottom-10 rounded-full bg-gradient-to-r from-red-500 via-green-400 to-red-500"></div>
        
        {/* Text labels BELOW the line */}
        <div className="absolute" style={{ left: `${getPosition(lowerBound)}%`, bottom: '0', transform: 'translateX(0)' }}>
          <div className={`${isMobile ? 'text-xs' : 'text-xl'} text-gray-500 font-medium mt-1 whitespace-nowrap`}>Rents Faster</div>
        </div>
        
        <div className="absolute" style={{ left: `${getPosition(upperBound)}%`, bottom: '0', transform: 'translateX(-100%)' }}>
          <div className={`${isMobile ? 'text-xs' : 'text-xl'} text-gray-500 font-medium mt-1 whitespace-nowrap`}>Rents Slower</div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeVisualization;

