
import React from 'react';
import { useRentPrediction } from '../RentPredictionContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Bed, Bath, ArrowUpDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

const FeatureCounter: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}> = ({ icon, label, value = 1, onChange, min, max, step }) => {
  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-gray-700 font-medium">{label}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={decrement}
        >
          <span className="text-xl font-bold">-</span>
        </button>
        
        <span className="text-3xl font-bold theme-primary-text">
          {value}
        </span>
        
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={increment}
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
};

const FeaturesStep: React.FC = () => {
  const { propertyDetails, updatePropertyDetails, setStep } = useRentPrediction();
  
  // Set default values if they don't exist
  React.useEffect(() => {
    const defaults: Record<string, number> = {
      bedrooms: 2,
      bathrooms: 2,
      builtUpArea: 1200
    };
    
    // Apply defaults for any undefined values
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      if (propertyDetails[key as keyof typeof propertyDetails] === undefined) {
        updatePropertyDetails({ [key]: defaultValue });
      }
    });
  }, []);
  
  const handleNext = () => {
    // Ensure defaults are set before proceeding
    if (!propertyDetails.bedrooms) updatePropertyDetails({ bedrooms: 2 });
    if (!propertyDetails.bathrooms) updatePropertyDetails({ bathrooms: 2 });
    if (!propertyDetails.builtUpArea || propertyDetails.builtUpArea <= 0) {
      updatePropertyDetails({ builtUpArea: 1200 });
    }
    
    setStep('details');
  };

  const handleBack = () => {
    setStep('location');
  };

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight theme-primary-text">Tell us about your property</h2>
        <p className="text-gray-500">
          Enter the basic features of your property for an accurate rent prediction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCounter
          icon={<Bed size={20} className="theme-accent-text" />}
          label="Bedrooms"
          value={propertyDetails.bedrooms || 2}
          onChange={(value) => updatePropertyDetails({ bedrooms: value })}
          min={1}
          max={7}
          step={0.5}
        />
        
        <FeatureCounter
          icon={<Bath size={20} className="theme-accent-text" />}
          label="Bathrooms"
          value={propertyDetails.bathrooms || 2}
          onChange={(value) => updatePropertyDetails({ bathrooms: value })}
          min={1}
          max={7}
          step={1}
        />
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpDown size={20} className="theme-accent-text" />
            <span className="text-gray-700 font-medium">Built-up Area (sq ft)</span>
          </div>
          
          <input
            type="number"
            className="w-full text-3xl font-bold theme-primary-text bg-transparent border-b border-gray-200 focus:outline-none focus:border-primary py-1"
            placeholder="Enter area"
            value={propertyDetails.builtUpArea || 1200}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                updatePropertyDetails({ builtUpArea: value });
              } else if (e.target.value === '') {
                updatePropertyDetails({ builtUpArea: 1200 });
              }
            }}
            min={100}
            step={50}
          />
          <p className="text-xs text-gray-500 mt-2">Enter the total built-up area in square feet</p>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          className="px-8"
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturesStep;
