
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureItem from "./FeatureItem";
import PackageHeader from "./PackageHeader";

interface PremiumPackageProps {
  standardFeatures: Array<{ text: string; tooltip: string | null }>;
  premiumFeatures: Array<{ text: string; tooltip: string | null }>;
  onGetStarted?: () => void;
}

const PremiumPackage = ({ 
  standardFeatures, 
  premiumFeatures,
  onGetStarted
}: PremiumPackageProps) => {
  return (
    <div className="border-2 theme-primary-border rounded-xl overflow-hidden shadow-lg relative bg-blue-50 bg-opacity-30">
      <div className="absolute top-0 right-0 theme-primary-bg text-white py-1 px-4 rounded-bl-lg font-semibold text-sm">
        RECOMMENDED
      </div>
      
      {/* Social proof stat - moved to top left */}
      <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 py-1 px-3 rounded-br-lg text-xs font-medium">
        Chosen by 80% of our landlords
      </div>
      
      <PackageHeader
        title="Premium Guaranteed"
        description="Full management with income and vacancy guarantees"
        price="9%"
        pricePeriod="of monthly rent"
        additionalInfo="+ preferred brokerage (50% of one month's rent)"
      />
      
      <div className="p-6">
        <ul className="space-y-4">
          {standardFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              text={feature.text}
              tooltip={feature.tooltip}
              icon={<CheckCircle2 className="w-5 h-5 theme-primary-text mr-3 flex-shrink-0 mt-0.5" />}
            />
          ))}
          
          {premiumFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              text={feature.text}
              tooltip={feature.tooltip}
              icon={<CheckCircle2 className="w-5 h-5 theme-accent-text mr-3 flex-shrink-0 mt-0.5" />}
              highlighted={true}
            />
          ))}
        </ul>
        
        <div className="mt-8 text-center">
          <Button 
            variant="accent"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPackage;

