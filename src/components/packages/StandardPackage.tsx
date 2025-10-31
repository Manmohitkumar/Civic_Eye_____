
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureItem from "./FeatureItem";
import PackageHeader from "./PackageHeader";

interface StandardPackageProps {
  standardFeatures: Array<{ text: string; tooltip: string | null }>;
  missingFeatures: Array<{ text: string; tooltip: string | null }>;
  onLearnMore: () => void;
}

const StandardPackage = ({ 
  standardFeatures, 
  missingFeatures, 
  onLearnMore 
}: StandardPackageProps) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50">
      <PackageHeader
        title="Standard Property Management"
        description="Professional management without income guarantees"
        price="5%"
        pricePeriod="of monthly rent"
        additionalInfo="+ standard brokerage (one month's rent)"
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
          
          {missingFeatures.map((feature, index) => (
            <FeatureItem
              key={index}
              text={feature.text}
              tooltip={feature.tooltip}
              icon={<X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />}
            />
          ))}
        </ul>
        
        <div className="mt-8 text-center">
          <Button 
            variant="secondary" 
            onClick={onLearnMore}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StandardPackage;

