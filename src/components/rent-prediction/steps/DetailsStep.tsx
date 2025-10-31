import React, { useState, useEffect } from 'react';
import { useRentPrediction } from '../RentPredictionContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Clock, Rows, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { FurnishingStatus, predictRent } from '@/services/rentPredictionApi';

// List of supported cities
const SUPPORTED_CITIES = ["Hyderabad"];
// Currently we're always in Hyderabad
const CURRENT_CITY = "Hyderabad";

const DetailsStep: React.FC = () => {
  const { 
    propertyDetails, 
    updatePropertyDetails, 
    setStep,
    setPredictionResult,
    setIsSubmitting
  } = useRentPrediction();
  
  const [isPreloading, setIsPreloading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Local state for input values to handle empty strings
  const [floorInput, setFloorInput] = useState<string>('');
  const [totalFloorsInput, setTotalFloorsInput] = useState<string>('');

  const furnishingOptions: { label: string; value: FurnishingStatus }[] = [
    { label: "Unfurnished", value: "Unfurnished" },
    { label: "Semi-Furnished", value: "Semi-Furnished" },
    { label: "Furnished", value: "Furnished" }
  ];

  const buildingAgeOptions = [
    { label: "<5 yrs", value: 3 },
    { label: "5-10 yrs", value: 8 },
    { label: "10+ yrs", value: 15 }
  ];
  
  // Set default values if they don't exist and initialize local input state
  useEffect(() => {
    const defaults = {
      furnishingStatus: "Semi-Furnished" as FurnishingStatus,
      floorNo: 2,
      totalFloors: 5,
      buildingAge: 8
    };
    
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      if (propertyDetails[key as keyof typeof propertyDetails] === undefined) {
        updatePropertyDetails({ [key]: defaultValue });
      }
    });
    
    // Initialize local input state with current values or empty
    setFloorInput(propertyDetails.floorNo?.toString() || '');
    setTotalFloorsInput(propertyDetails.totalFloors?.toString() || '');
  }, []);

  const handleBack = () => {
    setStep('features');
  };

  const handleFloorChange = (value: string) => {
    setFloorInput(value);
    if (value === '') {
      // Don't update propertyDetails when empty, let user type
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      updatePropertyDetails({ floorNo: numValue });
    }
  };

  const handleTotalFloorsChange = (value: string) => {
    setTotalFloorsInput(value);
    if (value === '') {
      // Don't update propertyDetails when empty, let user type
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      updatePropertyDetails({ totalFloors: numValue });
    }
  };

  const handleSubmit = async () => {
    // Apply defaults for any missing values before submission
    const finalFloorNo = floorInput === '' ? 2 : parseInt(floorInput) || 2;
    const finalTotalFloors = totalFloorsInput === '' ? 5 : parseInt(totalFloorsInput) || 5;
    
    // Update with final values
    updatePropertyDetails({ 
      floorNo: finalFloorNo,
      totalFloors: finalTotalFloors
    });
    
    // Use default values if necessary
    if (propertyDetails.furnishingStatus === undefined) {
      updatePropertyDetails({ furnishingStatus: "Semi-Furnished" });
    }
    if (propertyDetails.buildingAge === undefined) {
      updatePropertyDetails({ buildingAge: 8 });
    }
    
    // Validate city and building type before making the API call
    if (!SUPPORTED_CITIES.includes(CURRENT_CITY)) {
      toast.error(`Sorry, rent prediction is currently only available for ${SUPPORTED_CITIES.join(", ")}`);
      setApiError(`Rent prediction is not yet available for your city. Currently, we only support ${SUPPORTED_CITIES.join(", ")}.`);
      return;
    }

    if (propertyDetails.buildingType !== "Highrise") {
      toast.error("Sorry, rent prediction is currently only available for highrise buildings");
      setApiError("Rent prediction is not yet available for standalone buildings. Currently, we only support highrise buildings.");
      return;
    }
    
    // Reset any previous errors
    setApiError(null);
    
    // Set loading state
    setIsSubmitting(true);
    setIsPreloading(true);
    
    try {
      // Simulate preloading for visual effect
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Make API call to predict rent
      const result = await predictRent(propertyDetails as any);
      
      if (!result.success && result.error) {
        console.error("Prediction API returned an error:", result.error);
        setApiError(result.error);
        toast.error(result.message || "Failed to predict rent");
      } else {
        setPredictionResult(result);
        setStep('result');
      }
    } catch (error) {
      console.error('Prediction failed:', error);
      setApiError(error instanceof Error ? error.message : "Unknown error occurred");
      toast.error("Failed to predict rent. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsPreloading(false);
    }
  };

  // Check for unsupported building type warning
  const showBuildingTypeWarning = propertyDetails.buildingType && propertyDetails.buildingType !== "Highrise";

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight theme-primary-text">Additional Property Details</h2>
        <p className="text-gray-500">
          These final details help us provide the most accurate rent prediction
        </p>
      </div>

      {/* Show warning for unsupported building types */}
      {showBuildingTypeWarning && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6 flex items-start gap-3">
            <Info className="text-amber-500 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-medium text-amber-700">Unsupported Building Type</p>
              <p className="text-sm text-amber-600">
                Our prediction model currently only supports highrise/apartment buildings. 
                Predictions for standalone houses will be available soon.
              </p>
              <Button
                variant="outline"
                className="mt-3 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => setStep('location')}
              >
                Go Back and Change Building Type
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" size={18} />
          <div>
            <p className="font-medium text-red-700">Error</p>
            <p className="text-sm text-red-600">{apiError}</p>
            <p className="text-xs mt-2 text-gray-600">Try again later or contact support if the issue persists.</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Furnishing Status */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building size={18} className="theme-accent-text" />
            <label className="text-sm font-medium">Furnishing Status</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {furnishingOptions.map((option) => (
              <Card 
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  propertyDetails.furnishingStatus === option.value 
                    ? 'ring-2 ring-[var(--theme-primary)] bg-[var(--theme-primary-light)]' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => updatePropertyDetails({ furnishingStatus: option.value })}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-medium">{option.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Building Age */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="theme-accent-text" />
            <label className="text-sm font-medium">Building Age</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {buildingAgeOptions.map((option) => (
              <Card 
                key={option.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  propertyDetails.buildingAge === option.value 
                    ? 'ring-2 ring-[var(--theme-primary)] bg-[var(--theme-primary-light)]' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => updatePropertyDetails({ buildingAge: option.value })}
              >
                <CardContent className="p-4 text-center">
                  <div className="font-medium">{option.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Floor Details */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Rows size={18} className="theme-accent-text" />
                <label className="text-sm font-medium">Floor Details</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Floor Number</label>
                  <input
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="e.g. 3"
                    value={floorInput}
                    onChange={(e) => handleFloorChange(e.target.value)}
                    min={0}
                  />
                </div>
                
                <div>
                  <label className="text-xs text-gray-500">Total Floors</label>
                  <input
                    type="number"
                    className="w-full mt-1 p-2 border rounded-md"
                    placeholder="e.g. 10"
                    value={totalFloorsInput}
                    onChange={(e) => handleTotalFloorsChange(e.target.value)}
                    min={1}
                  />
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <p>For ground floor, enter 0 as floor number</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8 gap-2">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="flex-1 md:flex-none"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={isPreloading || showBuildingTypeWarning}
          className="flex-1 md:flex-none"
        >
          {isPreloading ? (
            <>
              <span className="mr-2">Calculating...</span>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </>
          ) : (
            <>
              Estimate Rent
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DetailsStep;
