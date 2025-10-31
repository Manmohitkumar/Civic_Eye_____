export const calculateROI = (monthlyRent: number) => {
  // For Propico calculation
  const brokerFee = monthlyRent * 0.5; // 50% of one month's rent
  const managementFee = monthlyRent * 0.1 * 12; // 10% of yearly rent
  const propicoAnnualIncome = (monthlyRent * 12) - managementFee - brokerFee;
  const propicoExpenses = 0; // No additional expenses with Propico
  const propicoNet = propicoAnnualIncome;
  
  // For Traditional calculation
  const marketRent = monthlyRent;
  const traditionalAnnualIncome = marketRent * 12;
  
  // Expenses based on updated assumptions
  const vacancyLoss = marketRent * 1.5; // 45 days vacancy (1.5 months)
  const traditionalBrokerFees = marketRent * 1.0; // Standard broker fee (1 month rent)
  const propertyDamage = marketRent * 0.5; // 50% of monthly rent for property damage
  const timeValue = 97200; // 1350/hr and 6 hours/month = 97,200 per year
  const maintenanceAndAdmin = 50000; // Flat 50k for maintenance, legal and admin combined
  
  // Total traditional expenses
  const totalTraditionalExpenses = vacancyLoss + traditionalBrokerFees + propertyDamage + 
                           timeValue + maintenanceAndAdmin;
  
  const traditionalExpenses = {
    vacancyLoss,
    brokerFees: traditionalBrokerFees,
    propertyDamage,
    timeValue,
    maintenanceAndAdmin,
    total: totalTraditionalExpenses
  };
  
  const traditionalNet = traditionalAnnualIncome - totalTraditionalExpenses;
  
  // Final calculations
  return {
    propicoNetIncome: propicoNet,
    traditionalNetIncome: traditionalNet,
    annualDifference: propicoNet - traditionalNet,
    propicoMonthlyIncome: propicoNet / 12,
    traditionalMonthlyIncome: traditionalNet / 12,
    traditionalExpenses,
    managementFee: managementFee // Annual management fee (10% of yearly rent)
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return `${Math.round(value * 100)}%`;
};
