
import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RentInput } from "./roi-calculator/RentInput";
import { Assumptions } from "./roi-calculator/Assumptions";
import { IncomeCards } from "./roi-calculator/IncomeCards";
import { CostComparison } from "./roi-calculator/CostComparison";
import { PropicoAdvantage } from "./roi-calculator/PropicoAdvantage";
import { IncomeComparisonChart } from "./roi-calculator/IncomeComparisonChart";
import { calculateROI, formatCurrency } from "./roi-calculator/calculatorUtils";

const ROICalculator = () => {
  const [monthlyRent, setMonthlyRent] = useState(50000);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailedCosts, setShowDetailedCosts] = useState(true); // Start with costs visible
  
  // Calculation variables
  const [propicoNetIncome, setPropicoNetIncome] = useState(0);
  const [traditionalNetIncome, setTraditionalNetIncome] = useState(0);
  const [annualDifference, setAnnualDifference] = useState(0);
  const [propicoMonthlyIncome, setPropicoMonthlyIncome] = useState(0);
  const [traditionalMonthlyIncome, setTraditionalMonthlyIncome] = useState(0);
  const [traditionalExpenses, setTraditionalExpenses] = useState({
    vacancyLoss: 0,
    brokerFees: 0,
    propertyDamage: 0,
    timeValue: 90000,
    maintenanceAndAdmin: 50000,
    total: 0
  });
  const [managementFee, setManagementFee] = useState(0);

  useEffect(() => {
    const results = calculateROI(monthlyRent);
    
    setPropicoNetIncome(results.propicoNetIncome);
    setTraditionalNetIncome(results.traditionalNetIncome);
    setAnnualDifference(results.annualDifference);
    setPropicoMonthlyIncome(results.propicoMonthlyIncome);
    setTraditionalMonthlyIncome(results.traditionalMonthlyIncome);
    setTraditionalExpenses(results.traditionalExpenses);
    setManagementFee(results.managementFee);
  }, [monthlyRent]);

  return (
    <section id="roi-calculator" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="mr-2 h-7 w-7 theme-accent-text" />
              <h2 className="text-2xl md:text-3xl font-bold theme-primary-text">
                Propico Calculator
              </h2>
            </div>
            <p className="text-base text-gray-600">
              See How Much More You Actually Earn With Guaranteed Rent
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Input section - 1/3 width on desktop */}
              <div className="bg-gray-50 p-5 border-r border-gray-100">
                <h3 className="text-lg font-bold theme-primary-text mb-4">Your Property</h3>
                
                <RentInput 
                  monthlyRent={monthlyRent} 
                  setMonthlyRent={setMonthlyRent} 
                />
                
                <Assumptions 
                  isOpen={isOpen} 
                  setIsOpen={setIsOpen} 
                />
              </div>
              
              {/* Results section - 2/3 width on desktop */}
              <div className="md:col-span-2 p-5">
                <h3 className="text-lg font-bold theme-primary-text mb-4 hidden md:block">
                  Rental Income Analysis for {formatCurrency(monthlyRent)}/month
                </h3>
                
                <IncomeCards 
                  propicoMonthlyIncome={propicoMonthlyIncome}
                  propicoNetIncome={propicoNetIncome}
                  traditionalMonthlyIncome={traditionalMonthlyIncome}
                  traditionalNetIncome={traditionalNetIncome}
                  formatCurrency={formatCurrency}
                />
                
                <IncomeComparisonChart 
                  propicoNetIncome={propicoNetIncome}
                  traditionalNetIncome={traditionalNetIncome}
                  formatCurrency={formatCurrency}
                />
                
                <CostComparison 
                  showDetailedCosts={showDetailedCosts}
                  setShowDetailedCosts={setShowDetailedCosts}
                  traditionalExpenses={traditionalExpenses}
                  formatCurrency={formatCurrency}
                  managementFee={managementFee}
                  monthlyRent={monthlyRent}
                />
                
                <PropicoAdvantage 
                  annualDifference={annualDifference}
                  formatCurrency={formatCurrency}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
