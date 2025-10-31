
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const StandaloneNote: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full py-1.5 px-3">
      <HelpCircle className="text-amber-500 shrink-0" size={14} />
      <p className="text-xs font-medium text-amber-700">Can't find your home?</p>
      <Link to="/" className="text-xs font-medium text-blue-600 hover:underline ml-1">
        Contact Us
      </Link>
    </div>
  );
};

export default StandaloneNote;
