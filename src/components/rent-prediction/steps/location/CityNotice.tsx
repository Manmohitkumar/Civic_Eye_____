
import React from 'react';
import { AlertCircle } from 'lucide-react';

const CityNotice: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs bg-blue-50 border border-blue-100 rounded-full py-1.5 px-3">
      <AlertCircle className="text-blue-500 shrink-0" size={14} />
      <p className="font-medium text-blue-700">Currently available only for Hyderabad</p>
    </div>
  );
};

export default CityNotice;
