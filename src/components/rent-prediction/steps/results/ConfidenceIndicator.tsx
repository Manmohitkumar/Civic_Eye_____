
import React from 'react';
import { ThumbsUp, Info, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConfidenceIndicatorProps {
  confidence: string;
}

const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ confidence }) => {
  const getConfidenceColor = (confidence: string): string => {
    switch (confidence) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getConfidenceText = (confidence: string): string => {
    switch (confidence) {
      case 'high':
        return 'High Confidence';
      case 'medium':
        return 'Medium Confidence';
      case 'low':
        return 'Low Confidence';
      default:
        return 'Unknown Confidence';
    }
  };

  return (
    <>
      <div className="flex items-center mt-6 gap-2">
        <div className={`h-3 w-3 rounded-full ${getConfidenceColor(confidence)}`}></div>
        <span className="text-sm font-medium text-gray-600">
          {getConfidenceText(confidence)}
        </span>
      </div>
      
      {/* Feedback link */}
      <div className="mt-5 text-sm text-center">
        <Link to="/contact-us" className="text-blue-500 hover:underline">
          Something doesn't seem right? Give us feedback
        </Link>
      </div>
    </>
  );
};

export default ConfidenceIndicator;
