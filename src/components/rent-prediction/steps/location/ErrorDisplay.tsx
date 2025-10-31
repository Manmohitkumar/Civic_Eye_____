
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorDisplayProps {
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ onRetry }) => {
  return (
    <Card className="p-6 bg-red-50 border-red-200">
      <div className="text-center text-red-600">
        <p className="text-lg font-semibold">Error loading data</p>
        <p className="mt-2">We couldn't load the location data. Please try again later.</p>
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    </Card>
  );
};

export default ErrorDisplay;
