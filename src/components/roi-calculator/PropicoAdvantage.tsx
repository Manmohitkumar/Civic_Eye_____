
import React from "react";
import { Button } from "@/components/ui/button";

interface PropicoAdvantageProps {
  annualDifference: number;
  formatCurrency: (value: number) => string;
}

export const PropicoAdvantage = ({ annualDifference, formatCurrency }: PropicoAdvantageProps) => {
  const monthlyDifference = annualDifference / 12;

  const scrollToPropertyForm = () => {
    const element = document.getElementById('property-inquiry-form');
    if (element) {
      const headerOffset = 100; // Adjust this value based on your navbar height plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="font-medium text-sm text-gray-800 mb-2 sm:mb-0">Your Propico Advantage:</p>
          <p className="font-bold text-lg text-green-600">{formatCurrency(annualDifference)} Added Annual Income</p>
        </div>
        <p className="text-center mt-2 text-green-700 font-medium">
          That's {formatCurrency(monthlyDifference)} more in your pocket every month!
        </p>
      </div>
      
      <div className="mt-4">
        <Button size="sm" className="w-full" variant="accent" onClick={scrollToPropertyForm}>
          See Your Property's Potential
        </Button>
      </div>
    </>
  );
};
