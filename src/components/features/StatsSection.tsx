
import { LightbulbIcon, CoinsIcon, Clock3Icon, ShieldCheckIcon } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="mt-16 bg-primary-light rounded-xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--theme-primary)]">Our Commitment to Excellence</h3>
        <p className="text-gray-600 mt-2">What we guarantee to every property owner</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center mb-3">
            <ShieldCheckIcon className="h-8 w-8 text-[var(--theme-primary)]" />
          </div>
          <p className="text-xl font-bold theme-primary-text">100%</p>
          <p className="text-sm text-gray-600">Tenant Screening</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center mb-3">
            <Clock3Icon className="h-8 w-8 text-[var(--theme-primary)]" />
          </div>
          <p className="text-xl font-bold theme-primary-text">24/7</p>
          <p className="text-sm text-gray-600">Support Available</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center mb-3">
            <CoinsIcon className="h-8 w-8 text-[var(--theme-primary)]" />
          </div>
          <p className="text-xl font-bold theme-primary-text">0</p>
          <p className="text-sm text-gray-600">Financial Risk</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center mb-3">
            <LightbulbIcon className="h-8 w-8 text-[var(--theme-primary)]" />
          </div>
          <p className="text-xl font-bold theme-primary-text">100</p>
          <p className="text-sm text-gray-600">Hours Saved Annually</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
