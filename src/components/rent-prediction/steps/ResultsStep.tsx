
import React from 'react';
import { useRentPrediction } from '../RentPredictionContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Import extracted components
import PropertySummaryCard from './results/PropertySummaryCard';
import PriceRangeVisualization from './results/PriceRangeVisualization';
import ConfidenceIndicator from './results/ConfidenceIndicator';
import ExpertAnalysisCard from './results/ExpertAnalysisCard';
import GuaranteedRentCTA from './results/GuaranteedRentCTA';

const ResultsStep: React.FC = () => {
  const { predictionResult, setStep, propertyDetails } = useRentPrediction();
  const isMobile = useIsMobile();
  
  if (!predictionResult) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No prediction result available. Please fill out the form first.</p>
        <Button onClick={() => setStep('location')} className="ml-2">
          Start Over
        </Button>
      </div>
    );
  }

  // Use the estimated_rent from the API response as the midpoint
  const midpoint = Math.round(predictionResult.estimated_rent);
  
  // Calculate the bounds (5% on either side)
  const lowerBound = Math.round(midpoint * 0.95);
  const upperBound = Math.round(midpoint * 1.05);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleBack = () => {
    setStep('details');
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 py-4">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight theme-primary-text">Your Rent Estimate</h2>
          <p className="text-gray-500">
            Based on the property details you provided, here's our <span className="text-[var(--theme-accent)]">initial</span> estimate
          </p>
        </div>

        {/* Property Summary Card */}
        <PropertySummaryCard propertyDetails={propertyDetails} />

        <div className="flex flex-col items-center justify-center py-8">
          {/* Main price display with range */}
          <div className="text-lg font-medium text-gray-600 mb-1">Estimated Monthly Rent</div>
          <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold theme-accent-text mb-2 px-4 text-center`}>
            {formatCurrency(lowerBound)} - {formatCurrency(upperBound)}
          </div>

          {/* All-inclusive label with tooltip */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              All-Inclusive
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-blue-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-sm">
                  These numbers are <strong>all-inclusive</strong> and include all maintenance charges, 
                  society fees, and other property-related costs. This is the total amount tenants 
                  would pay monthly.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Added breathing room above the slider with message */}
          <div className="mt-2 mb-8 text-sm text-gray-500 max-w-md text-center">
            We are 100% aligned with our landlords to maximize your rental income and minimize vacancy.
            This range represents the estimated market rent for your property type and location.
          </div>

          {/* Price range visualization */}
          <PriceRangeVisualization
            lowerBound={lowerBound}
            midpoint={midpoint}
            upperBound={upperBound}
            formatCurrency={formatCurrency}
          />
          
          {/* Confidence indicator */}
          <ConfidenceIndicator 
            confidence={predictionResult.confidence} 
          />
        </div>

        {/* Expert Analysis Card */}
        <ExpertAnalysisCard confidence={predictionResult.confidence} />

        {/* Guaranteed Rent CTA */}
        <GuaranteedRentCTA />

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
            onClick={() => setStep('location')}
            variant="secondary"
            className="flex-1 md:flex-none"
          >
            Start New Estimate
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ResultsStep;
