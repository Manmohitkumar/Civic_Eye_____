
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GuaranteedRentCTA: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-[var(--theme-primary-light)] to-white rounded-lg border border-[var(--theme-primary-light)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-[var(--theme-primary)] text-white mt-1">
            <Check size={16} />
          </div>
          <div>
            <h3 className="font-semibold theme-primary-text">Looking for stable rental income?</h3>
            <p className="text-sm text-gray-600">
              Get a guaranteed monthly rent without hassles, regardless of vacancies or tenant issues.
            </p>
          </div>
        </div>
        
        <Link to="/list-property">
          <Button className="whitespace-nowrap">
            Get Guaranteed Rent
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GuaranteedRentCTA;
