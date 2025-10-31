
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PropertySummaryCardProps {
  propertyDetails: {
    societyName?: string;
    localityName?: string;
    bedrooms?: number;
    bathrooms?: number;
    builtUpArea?: number;
    furnishingStatus?: string;
  };
}

const PropertySummaryCard: React.FC<PropertySummaryCardProps> = ({ propertyDetails }) => {
  return (
    <Card className="bg-slate-50 border border-slate-200">
      <CardContent className="pt-6">
        <h3 className="text-2xl font-semibold text-slate-700 mb-2">
          {propertyDetails.societyName || 'Property'} 
        </h3>
        <p className="text-slate-600 mb-4">{propertyDetails.localityName || 'Location'}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div>
            <p className="text-sm text-slate-500">Bedrooms</p>
            <p className="font-medium">{propertyDetails.bedrooms}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Bathrooms</p>
            <p className="font-medium">{propertyDetails.bathrooms}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Area</p>
            <p className="font-medium">{propertyDetails.builtUpArea} sq.ft.</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Furnishing</p>
            <p className="font-medium">{propertyDetails.furnishingStatus}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySummaryCard;
