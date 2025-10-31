
import React, { createContext, useContext, useState } from 'react';
import { FurnishingStatus, PropertyDetails, PredictionResponse } from '@/services/rentPredictionApi';

type FormStep = 'location' | 'features' | 'details' | 'result';

// Extend PropertyDetails to include the name fields and building type
interface ExtendedPropertyDetails extends PropertyDetails {
  localityName?: string;
  societyName?: string;
  buildingType?: 'Highrise' | 'Standalone';
}

interface RentPredictionContextType {
  step: FormStep;
  setStep: (step: FormStep) => void;
  propertyDetails: Partial<ExtendedPropertyDetails>;
  updatePropertyDetails: (details: Partial<ExtendedPropertyDetails>) => void;
  predictionResult: PredictionResponse | null;
  setPredictionResult: (result: PredictionResponse | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const defaultContext: RentPredictionContextType = {
  step: 'location',
  setStep: () => {},
  propertyDetails: {},
  updatePropertyDetails: () => {},
  predictionResult: null,
  setPredictionResult: () => {},
  isSubmitting: false,
  setIsSubmitting: () => {},
};

const RentPredictionContext = createContext<RentPredictionContextType>(defaultContext);

export const useRentPrediction = () => useContext(RentPredictionContext);

export const RentPredictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<FormStep>('location');
  const [propertyDetails, setPropertyDetails] = useState<Partial<ExtendedPropertyDetails>>({
    buildingType: 'Highrise' // Default to Highrise
  });
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePropertyDetails = (details: Partial<ExtendedPropertyDetails>) => {
    setPropertyDetails(prev => ({
      ...prev,
      ...details
    }));
  };

  return (
    <RentPredictionContext.Provider
      value={{
        step,
        setStep,
        propertyDetails,
        updatePropertyDetails,
        predictionResult,
        setPredictionResult,
        isSubmitting,
        setIsSubmitting
      }}
    >
      {children}
    </RentPredictionContext.Provider>
  );
};
