
import { Check, X } from "lucide-react";

const TenantMembershipPlans = () => {

  return (
    <section id="membership-plans" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">Membership Plans</h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best suits your rental needs and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan - Updated with consistent styling */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h3 className="text-xl font-bold text-center mb-2 theme-primary-text">Basic</h3>
              <p className="text-center text-gray-600">For budget-conscious or first-time renters</p>
              <div className="text-center mt-4">
                <span className="text-3xl font-bold theme-primary-text">2%</span>
                <span className="text-gray-600 ml-2">of monthly rent</span>
              </div>
              <p className="text-center text-xs text-gray-500 mt-1">(inclusive of GST)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center font-semibold text-gray-900">1 month refundable deposit</p>
                <p className="text-center text-xs text-gray-500 mt-1">with Propico</p>
                <p className="text-center font-semibold text-gray-900 mt-3 pt-3 border-t border-gray-200">Brokerage (if we find your property)</p>
                <p className="text-center text-sm text-gray-600 mt-1">50% of monthly rent (incl. GST)</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic maintenance (24-hour response)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Standard rewards (1x points)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Move-out cleaning coordination</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Preventive maintenance</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Concierge</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Premium Plan - Updated with consistent styling */}
          <div className="border-2 theme-primary-border rounded-xl overflow-hidden shadow-lg relative bg-white transform scale-105 z-10">
            <div className="absolute top-0 right-0 theme-primary-bg text-white py-1 px-4 rounded-bl-lg font-semibold text-sm">
              POPULAR
            </div>
            
            <div className="p-6 border-b border-gray-200 bg-white">
              <h3 className="text-xl font-bold text-center mb-2 theme-primary-text">Premium</h3>
              <p className="text-center text-gray-600">For working professionals who want convenience</p>
              <div className="text-center mt-4">
                <span className="text-3xl font-bold theme-primary-text">6%</span>
                <span className="text-gray-600 ml-2">of monthly rent</span>
              </div>
              <p className="text-center text-xs text-gray-500 mt-1">(inclusive of GST)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center font-semibold text-gray-900">15-day refundable deposit</p>
                <p className="text-center text-xs text-gray-500 mt-1">with Propico</p>
                <p className="text-center font-semibold text-gray-900 mt-3 pt-3 border-t border-gray-200">Brokerage (if we find your property)</p>
                <p className="text-center text-sm text-gray-600 mt-1">50% of monthly rent (incl. GST)</p>
              </div>
            </div>
            
            <div className="p-6 theme-primary-light-bg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority maintenance</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Standard rewards (1x points)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Quarterly property check-in</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-primary-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Deposit refund guarantee in 3 days</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>24/7 VIP maintenance</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Concierge/relationship manager</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Luxury Plan - Updated with consistent styling */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h3 className="text-xl font-bold text-center mb-2 theme-primary-text">Luxury</h3>
              <p className="text-center text-gray-600">For executives, expats, and families</p>
              <div className="text-center mt-4">
                <span className="text-3xl font-bold theme-primary-text">10%</span>
                <span className="text-gray-600 ml-2">of monthly rent</span>
              </div>
              <p className="text-center text-xs text-gray-500 mt-1">(inclusive of GST)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-center font-semibold theme-accent-text text-lg">Zero security deposit</p>
                <p className="text-center font-semibold text-gray-900 mt-3 pt-3 border-t border-gray-200">Brokerage (if we find your property)</p>
                <p className="text-center text-sm text-gray-600 mt-1">50% of monthly rent (incl. GST)</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <p className="font-semibold theme-accent-text mb-4">All Premium features +</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>VIP maintenance (24/7, 2-hour response)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Deep cleaning + pack-and-leave (premium exit)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Furniture upgrade service</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Elite rewards (2x points)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Exclusive lifestyle perks</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 theme-accent-text mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dedicated manager</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantMembershipPlans;
