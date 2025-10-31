
import React from 'react';

interface MobileFeatureRowProps {
  icon: React.ReactNode;
  feature: string;
  value: string;
  isPropico?: boolean;
  isBetterValue?: boolean;
}

const MobileFeatureRow = ({ icon, feature, value, isPropico, isBetterValue }: MobileFeatureRowProps) => {
  return (
    <div className="flex py-4 px-4">
      <div className="flex gap-3 w-1/2 pr-2">
        <span className="flex-shrink-0 mt-0.5">
          {icon}
        </span>
        <span className="text-sm font-medium break-words">{feature}</span>
      </div>
      <div className={`w-1/2 text-sm font-medium text-left break-words flex items-center
        ${isPropico && isBetterValue ? 'text-[var(--theme-primary)]' : ''}`}>
        {value}
      </div>
    </div>
  );
};

export default MobileFeatureRow;
