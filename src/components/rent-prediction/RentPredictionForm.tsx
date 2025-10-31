
import React from 'react';
import { RentPredictionProvider } from './RentPredictionContext';
import ProgressTracker from './ProgressTracker';
import LocationStep from './steps/LocationStep';
import FeaturesStep from './steps/FeaturesStep';
import DetailsStep from './steps/DetailsStep';
import ResultsStep from './steps/ResultsStep';
import { useRentPrediction } from './RentPredictionContext';

const StepRenderer: React.FC = () => {
  const { step } = useRentPrediction();

  switch (step) {
    case 'location':
      return <LocationStep />;
    case 'features':
      return <FeaturesStep />;
    case 'details':
      return <DetailsStep />;
    case 'result':
      return <ResultsStep />;
    default:
      return <LocationStep />;
  }
};

const RentPredictionFormContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border overflow-hidden">
      <div className="px-6 py-4 border-b">
        <ProgressTracker />
      </div>
      <div className="p-6">
        <StepRenderer />
      </div>
    </div>
  );
};

const RentPredictionForm: React.FC = () => {
  return (
    <RentPredictionProvider>
      <RentPredictionFormContent />
    </RentPredictionProvider>
  );
};

export default RentPredictionForm;
