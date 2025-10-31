
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface IncomeCardsProps {
  propicoMonthlyIncome: number;
  propicoNetIncome: number;
  traditionalMonthlyIncome: number;
  traditionalNetIncome: number;
  formatCurrency: (value: number) => string;
}

export const IncomeCards = ({ 
  propicoMonthlyIncome, 
  propicoNetIncome, 
  traditionalMonthlyIncome, 
  traditionalNetIncome,
  formatCurrency
}: IncomeCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <Card className="border-green-100">
        <CardContent className="p-4">
          <h4 className="text-base font-semibold text-green-700 mb-1">With Propico</h4>
          <p className="text-2xl font-bold text-green-800">{formatCurrency(propicoMonthlyIncome)}</p>
          <p className="text-xs text-gray-600">Monthly Effective Income</p>
          <p className="text-sm mt-2 text-green-700">Annual: {formatCurrency(propicoNetIncome)}</p>
        </CardContent>
      </Card>
      
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <h4 className="text-base font-semibold text-gray-700 mb-1">Traditional Rental</h4>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(traditionalMonthlyIncome)}</p>
          <p className="text-xs text-gray-600">Monthly Effective Income</p>
          <p className="text-sm mt-2 text-gray-700">Annual: {formatCurrency(traditionalNetIncome)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
