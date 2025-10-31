
import React from 'react';
import { useRentPrediction } from './RentPredictionContext';
import { MapPin, Building, Settings, Check } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const { step } = useRentPrediction();

  const steps = [
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'features', label: 'Features', icon: Building },
    { id: 'details', label: 'Details', icon: Settings },
    { id: 'result', label: 'Results', icon: Check },
  ];

  const currentIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {steps.map((s, index) => {
          const isActive = index <= currentIndex;
          const Icon = s.icon;
          
          return (
            <React.Fragment key={s.id}>
              {/* Step circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-[var(--theme-primary)] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    isActive ? 'text-[var(--theme-primary)]' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={`h-full ${
                      index < currentIndex
                        ? 'bg-[var(--theme-primary)]'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
