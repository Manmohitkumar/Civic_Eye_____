
import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const TenantSavingsCalculator = () => {
  const [rentAmount, setRentAmount] = useState<number>(25000);
  const [membershipType, setMembershipType] = useState<string>("premium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate traditional security deposit (3 months rent)
  const securityDeposit = rentAmount * 3;
  
  // Calculate 5% interest on top of principal
  const interestAmount = securityDeposit * 0.05;
  
  // Calculate unfair deductions (20% of deposit)
  const unfairDeductions = securityDeposit * 0.2;
  
  // Calculate monthly fee based on membership type
  const monthlyFee = membershipType === "basic" ? 499 : 
                     membershipType === "premium" ? 999 : 1499;
  
  // Calculate immediate savings (including interest and avoiding unfair deductions)
  const immediateSavings = securityDeposit + interestAmount + unfairDeductions - monthlyFee;
  
  // Calculate annual rewards points
  const pointsMultiplier = membershipType === "basic" ? 1 : 
                          membershipType === "premium" ? 2 : 3;
  const annualPoints = 12 * 500 * pointsMultiplier;
  
  // Estimate rewards value (1000 points = ₹100 value)
  const estimatedRewardsValue = Math.round(annualPoints / 1000) * 100;

  const handleApplyNow = () => {
    setIsSubmitting(true);
    
    // Auto-scroll to application form section
    const formElement = document.getElementById('tenant-application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show toast notification
    toast({
      title: "Application Started",
      description: `Selected plan: ${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} (₹${monthlyFee}/month)`,
    });
    
    // Reset submission state after a slight delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
              Savings Calculator
            </h2>
            <div className="accent-line mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              See how much you could save by moving into a Propico home.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Calculator Inputs */}
              <div className="p-8 md:p-10 bg-purple-50">
                <div className="flex items-center mb-6">
                  <Calculator className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-2xl font-bold theme-primary-text">Calculate Your Savings</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Monthly Rent (₹)
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-500">₹10,000</span>
                      <span className="font-medium text-purple-600">₹{rentAmount.toLocaleString()}</span>
                      <span className="text-gray-500">₹100,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Membership Plan
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        className={`py-2 px-4 rounded-md text-center border transition-colors ${
                          membershipType === "basic"
                            ? "bg-blue-100 border-blue-300 text-blue-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setMembershipType("basic")}
                      >
                        Basic
                      </button>
                      <button
                        type="button"
                        className={`py-2 px-4 rounded-md text-center border transition-colors ${
                          membershipType === "premium"
                            ? "bg-purple-100 border-purple-300 text-purple-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setMembershipType("premium")}
                      >
                        Premium
                      </button>
                      <button
                        type="button"
                        className={`py-2 px-4 rounded-md text-center border transition-colors ${
                          membershipType === "luxury"
                            ? "bg-amber-100 border-amber-300 text-amber-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setMembershipType("luxury")}
                      >
                        Luxury
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold theme-primary-text mb-6">Your Savings Summary</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-gray-600 text-sm">Traditional Deposit (3 months)</div>
                      <div className="text-xl font-bold text-gray-800">₹{securityDeposit.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-gray-600 text-sm">Propico Fee</div>
                      <div className="text-xl font-bold text-purple-600">₹{monthlyFee.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Immediate Capital Saved</span>
                      <span className="text-xl font-bold text-green-600">₹{securityDeposit.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">5% Interest Saved</span>
                      <span className="text-lg font-bold text-green-600">₹{interestAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avoided Unfair Deductions (20%)</span>
                      <span className="text-lg font-bold text-green-600">₹{unfairDeductions.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Annual Rewards Points</span>
                      <span className="text-lg font-bold theme-primary-text">{annualPoints.toLocaleString()} pts</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Estimated Rewards Value</span>
                      <span className="text-lg font-bold text-green-600">₹{estimatedRewardsValue.toLocaleString()}</span>
                    </div>
                    
                    <div className="text-gray-700 border-t border-gray-200 pt-4 space-y-2 text-sm">
                      <p>Avoid the hassle of security deposit refund procedures and endless follow-ups.</p>
                      <p>Why lock up your capital in deposits when you could invest it or use it for your priorities?</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-2xl font-bold theme-primary-text">Total First Year Benefit</div>
                      <div className="text-3xl font-bold text-green-600 mt-1">
                        ₹{(immediateSavings + estimatedRewardsValue).toLocaleString()}
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white group w-full sm:w-auto"
                      onClick={handleApplyNow}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Apply Now"}
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute -top-20 right-0 w-72 h-72 bg-purple-200 opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default TenantSavingsCalculator;
