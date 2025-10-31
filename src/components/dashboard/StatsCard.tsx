import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  iconBgColor?: string;
  iconColor?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600"
}: StatsCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
            {trend && (
              <p className="text-xs text-green-600 font-medium">{trend}</p>
            )}
          </div>
          <div className={`${iconBgColor} p-4 rounded-2xl`}>
            <Icon size={28} className={iconColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
