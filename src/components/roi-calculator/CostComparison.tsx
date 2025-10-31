
import React from "react";
import { ChevronDown } from "lucide-react";

interface TraditionalExpenses {
  vacancyLoss: number;
  brokerFees: number;
  propertyDamage: number;
  timeValue: number;
  maintenanceAndAdmin: number;
  total: number;
}

interface CostComparisonProps {
  showDetailedCosts: boolean;
  setShowDetailedCosts: (show: boolean) => void;
  traditionalExpenses: TraditionalExpenses;
  formatCurrency: (value: number) => string;
  managementFee: number;
  monthlyRent: number; // Add monthly rent as a prop
}

export const CostComparison = ({ 
  showDetailedCosts, 
  setShowDetailedCosts, 
  traditionalExpenses,
  formatCurrency,
  managementFee,
  monthlyRent
}: CostComparisonProps) => {
  // Calculate the broker fee as 50% of one month's rent
  const brokerFee = monthlyRent * 0.5; // 50% of one month's rent
  
  // Total Propico cost
  const totalPropicoCost = managementFee + brokerFee;
  
  return (
    <div className="mb-5">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Cost Comparison</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Propico side */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <div className="flex justify-between items-center mb-1">
            <h5 className="font-medium text-green-800">Propico Costs</h5>
            <p className="text-xl font-bold text-green-800">{formatCurrency(totalPropicoCost)}</p>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Propico Management Fee:</span>
              <span className="font-medium text-green-700">{formatCurrency(managementFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Broker Fees (50%):</span>
              <span className="font-medium text-green-700">{formatCurrency(brokerFee)}</span>
            </div>
          </div>
          
          <p className="text-xs text-green-600 mt-3">Zero hidden costs. Zero hassles.</p>
          <p className="text-xs text-green-600">Complete peace of mind</p>
        </div>
        
        {/* Traditional side */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <h5 className="font-medium text-gray-800">Traditional Costs</h5>
            <p className="text-xl font-bold text-gray-800">{formatCurrency(traditionalExpenses.total)}</p>
          </div>
          
          <button 
            onClick={() => setShowDetailedCosts(!showDetailedCosts)}
            className="text-xs text-purple-600 hover:text-purple-800 flex items-center mt-1"
          >
            {showDetailedCosts ? "Hide breakdown" : "Show cost breakdown"}
            <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showDetailedCosts ? "rotate-180" : ""}`} />
          </button>
          
          {showDetailedCosts && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Vacancy Loss (45 days/year):</span>
                <span className="font-medium text-gray-700">{formatCurrency(traditionalExpenses.vacancyLoss)}</span>
              </div>
              <div className="flex justify-between">
                <span>Broker Fees:</span>
                <span className="font-medium text-gray-700">{formatCurrency(traditionalExpenses.brokerFees)}</span>
              </div>
              <div className="flex justify-between">
                <span>Property Damage:</span>
                <span className="font-medium text-gray-700">{formatCurrency(traditionalExpenses.propertyDamage)}</span>
              </div>
              <div className="flex justify-between">
                <span>Your Time Value:</span>
                <span className="font-medium text-gray-700">{formatCurrency(traditionalExpenses.timeValue)}</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance & Admin:</span>
                <span className="font-medium text-gray-700">{formatCurrency(traditionalExpenses.maintenanceAndAdmin)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
