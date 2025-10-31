
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  glowColor?: string;
  badgeColor?: string;
}

const ValueCard = ({ 
  icon: Icon, 
  title, 
  description, 
  bgColor, 
  borderColor,
  glowColor = "shadow-gray-200",
  badgeColor = "bg-[var(--theme-primary)]" 
}: ValueCardProps) => {
  return (
    <div className={cn(
      `${bgColor} rounded-xl p-6 shadow-md border-2 ${borderColor}`,
      "h-full transform transition-all duration-300 hover:scale-[1.03]",
      `hover:${glowColor} relative overflow-hidden`
    )}>
      {/* Subtle diagonal background stripe */}
      <div className={`absolute top-0 right-0 h-32 w-32 -mr-10 -mt-10 rotate-45 opacity-10 ${badgeColor}`}></div>
      
      <div className="flex flex-col items-center text-center mb-4 relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300", 
          "bg-white/80 border border-gray-200 shadow-sm"
        )}>
          <Icon className="theme-primary-text" size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-center mt-2 mb-2 theme-primary-text">{title}</h3>
        <div className={`h-1 w-16 ${badgeColor} rounded-full mt-1 mb-4`}></div>
      </div>
      <p className="text-gray-700 text-center relative z-10">
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
