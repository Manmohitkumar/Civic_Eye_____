
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface RentInputProps {
  monthlyRent: number;
  setMonthlyRent: (value: number) => void;
}

export const RentInput = ({ monthlyRent, setMonthlyRent }: RentInputProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="monthly-rent" className="text-sm font-medium text-gray-700 mb-1">
          Monthly Rent (₹)
        </Label>
        <Slider
          id="monthly-rent"
          min={10000}
          max={200000}
          step={1000}
          value={[monthlyRent]}
          onValueChange={(value) => setMonthlyRent(value[0])}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-500">₹10,000</span>
          <span className="font-medium text-purple-600">{formatCurrency(monthlyRent)}</span>
          <span className="text-gray-500">₹200,000</span>
        </div>
      </div>
    </div>
  );
};
