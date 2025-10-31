
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, InfoIcon } from "lucide-react";

interface AssumptionsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Assumptions = ({ isOpen, setIsOpen }: AssumptionsProps) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-4 space-y-2"
    >
      <CollapsibleTrigger className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center border border-orange-200 bg-orange-50 rounded-md px-2 py-1 transition-colors">
        <InfoIcon className="mr-1 h-3 w-3" />
        {isOpen ? "Hide assumptions" : "Show calculation assumptions"}
        <ArrowRight className={`ml-1 h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 rounded-lg border border-purple-100 bg-purple-50 text-xs">
        <ul className="space-y-1 text-gray-700">
          <li>• Average 45 days vacancy per year (1.5 months rent)</li>
          <li>• Propico Management Fee (10% of rent)</li>
          <li>• Broker fee (50% of monthly rent)</li>
          <li>• Property damage cost (50% of monthly rent)</li>
          <li>• Time value (₹1,350/hr × 6 hrs/month = ₹97,200/year)</li>
          <li>• Maintenance, legal & admin (₹50,000 flat)</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
