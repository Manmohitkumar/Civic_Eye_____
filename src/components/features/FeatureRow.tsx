
import { CheckCircle2, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureRowProps {
  feature: string;
  description: string;
  us: boolean;
  brokers: boolean;
  managers: boolean;
  highlight?: boolean;
  note?: string;
}

const FeatureRow = ({
  feature,
  description,
  us,
  brokers,
  managers,
  highlight = false,
  note
}: FeatureRowProps) => {
  return (
    <tr className={`border-b ${highlight ? 'bg-blue-50' : ''}`}>
      <td className="py-4 px-6 text-left font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center cursor-help">
                {feature}
                <Info className="h-4 w-4 ml-1 text-gray-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {note && <span className="text-xs block text-gray-500">{note}</span>}
      </td>
      <td className="py-4 px-6 text-center">
        {us ? <CheckCircle2 className="text-green-500 mx-auto" size={20} /> : <div className="w-5 h-0.5 bg-red-500 mx-auto rounded-full"></div>}
      </td>
      <td className="py-4 px-6 text-center">
        {brokers ? <CheckCircle2 className="text-green-500 mx-auto" size={20} /> : <div className="w-5 h-0.5 bg-red-500 mx-auto rounded-full"></div>}
      </td>
      <td className="py-4 px-6 text-center">
        {managers ? <CheckCircle2 className="text-green-500 mx-auto" size={20} /> : <div className="w-5 h-0.5 bg-red-500 mx-auto rounded-full"></div>}
      </td>
    </tr>
  );
};

export default FeatureRow;
