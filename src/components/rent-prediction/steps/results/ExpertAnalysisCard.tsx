
import React from 'react';
import { ThumbsUp, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface ExpertAnalysisCardProps {
  confidence: string;
}

const ExpertAnalysisCard: React.FC<ExpertAnalysisCardProps> = ({ confidence }) => {
  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <ThumbsUp className="text-green-500" />;
      case 'medium':
        return <Info className="text-yellow-500" />;
      case 'low':
        return <AlertCircle className="text-red-500" />;
      default:
        return <Info className="text-gray-500" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-white shadow-sm">
            {getConfidenceIcon(confidence)}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Expert Analysis</h3>
            <p className="text-sm text-gray-700">
              Our analysis shows this is a {confidence} confidence prediction based on recent market data and property characteristics.
            </p>
            
            <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm font-medium theme-primary-text">Propico Guaranteed Rent Program</p>
              <p className="text-xs text-gray-600 mt-1">
                Get on a call with a Propico expert today to discuss prompt listing and receive guaranteed rent for the entirety of your lease, starting as early as tomorrow.
              </p>
              <Link to="/list-property" className="mt-2 inline-block text-xs theme-primary-text font-medium hover:underline">
                Schedule your consultation →
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertAnalysisCard;
