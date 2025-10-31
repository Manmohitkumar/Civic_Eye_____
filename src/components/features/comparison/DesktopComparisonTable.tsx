
import React from 'react';
import { CreditCard, Shield, Clock, Home, DollarSign, Users, BarChart } from "lucide-react";

const DesktopComparisonTable = () => {
  return (
    <>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8">
        <div className="grid grid-cols-4">
          {/* Headers */}
          <div className="bg-gray-50 py-5 px-6 font-bold text-lg border-b border-gray-200">
            Features
          </div>
          <div className="bg-[#f5f0ff] py-5 px-6 font-bold text-lg text-[var(--theme-primary)] border-b border-gray-200">
            Propico
          </div>
          <div className="bg-white py-5 px-6 font-bold text-lg border-b border-gray-200">
            Traditional PMS
          </div>
          <div className="bg-white py-5 px-6 font-bold text-lg border-b border-gray-200">
            Self Management
          </div>

          {/* Income during vacancies */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <CreditCard className="w-5 h-5 text-[#ff6b6b]" />
            <span>Income during vacancies</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            Guaranteed full payment
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            No income
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            No income
          </div>

          {/* Financial risk bearer */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <Shield className="w-5 h-5 text-[#ff6b6b]" />
            <span>Financial risk bearer</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            Propico takes all risk
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Owner takes all risks
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Owner takes all risks
          </div>

          {/* Owner time required */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <Clock className="w-5 h-5 text-[#ff6b6b]" />
            <span>Owner time required</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            &lt;1 hour monthly
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            3-5 hours
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            6-8 hours
          </div>

          {/* Property Condition */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <Home className="w-5 h-5 text-[#ff6b6b]" />
            <span>Property Condition</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            Propico guarantee
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            No guarantee
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            No protection
          </div>

          {/* Payment reliability */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <DollarSign className="w-5 h-5 text-[#ff6b6b]" />
            <span>Payment reliability</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            Fixed date, every month
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Depends on tenant
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Depends on tenant
          </div>

          {/* Tenant Screening */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <Users className="w-5 h-5 text-[#ff6b6b]" />
            <span>Tenant Screening</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            Comprehensive
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Basic checks
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            Limited
          </div>

          {/* Annual net returns */}
          <div className="bg-white py-4 px-6 flex items-center gap-3 border-b border-gray-200">
            <BarChart className="w-5 h-5 text-[#ff6b6b]" />
            <span>Annual net returns*</span>
          </div>
          <div className="bg-[#f5f0ff] py-4 px-6 font-medium text-[var(--theme-primary)] border-b border-gray-200">
            5.4L
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            2.7L
          </div>
          <div className="bg-white py-4 px-6 border-b border-gray-200">
            3.1L
          </div>
        </div>
      </div>

      {/* Footnote */}
      <p className="text-sm text-gray-600 text-center mb-12">
        *Based on a property with 50k monthly rent. Net returns accounts for vacancies, maintenance, and time value
      </p>
    </>
  );
};

export default DesktopComparisonTable;
