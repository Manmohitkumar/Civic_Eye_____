
import React, { useEffect } from 'react';
import { useRentPrediction } from '../RentPredictionContext';
import { 
  useLocalities, 
  useSocieties
} from '@/services/rentPredictionApi';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import CityNotice from './location/CityNotice';
import LocationSelectors from './location/LocationSelectors';
import StandaloneNote from './location/StandaloneNote';
import ErrorDisplay from './location/ErrorDisplay';

// List of cities where prediction is available
const SUPPORTED_CITIES = ["Hyderabad"];
// Currently we're assuming all localities are in Hyderabad
const CURRENT_CITY = "Hyderabad";

const LocationStep: React.FC = () => {
  const { 
    propertyDetails, 
    updatePropertyDetails, 
    setStep 
  } = useRentPrediction();
  
  const { error: localitiesError } = useLocalities();
  const { error: societiesError } = useSocieties();

  // Set default building type to Highrise when component mounts
  useEffect(() => {
    updatePropertyDetails({ buildingType: 'Highrise' });
  }, []);

  const handleNext = () => {
    if (!propertyDetails.locality || !propertyDetails.society) {
      toast.error("Please select both locality and society to continue");
      return;
    }
    
    // Check if the current city is supported
    if (!SUPPORTED_CITIES.includes(CURRENT_CITY)) {
      toast.error(`Currently, we only support predictions for ${SUPPORTED_CITIES.join(", ")}`);
      return;
    }
    
    setStep('features');
  };

  if (localitiesError || societiesError) {
    return <ErrorDisplay onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight theme-primary-text">Where is your property located?</h2>
        <p className="text-gray-500">
          Start by selecting the locality and society of your property.
        </p>
      </div>

      {/* Notices in the same line */}
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <CityNotice />
        <StandaloneNote />
      </div>

      {/* Location selectors */}
      <LocationSelectors />

      <div className="text-right mt-8">
        <Button 
          onClick={handleNext} 
          disabled={!propertyDetails.locality || !propertyDetails.society}
          className="px-8"
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;
