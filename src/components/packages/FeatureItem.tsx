
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureItemProps {
  text: string;
  tooltip?: string | null;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const FeatureItem = ({ text, tooltip, icon, highlighted = false }: FeatureItemProps) => {
  return (
    <li className={`flex items-start ${highlighted ? 'bg-[#E5DEFF] bg-opacity-40 rounded-md px-3 py-2 -mx-3' : ''}`}>
      {icon}
      <span className={highlighted ? 'font-medium' : ''}>{text}</span>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-1.5 inline-flex">
                <Info className="h-4 w-4 text-gray-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </li>
  );
};

export default FeatureItem;
