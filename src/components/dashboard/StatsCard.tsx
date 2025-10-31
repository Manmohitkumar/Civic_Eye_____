import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  iconBgColor?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, iconBgColor = "bg-blue-100" }: StatsCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            {trend && (
              <p className="text-sm text-green-600 mt-2">{trend}</p>
            )}
          </div>
          <div className={`${iconBgColor} p-4 rounded-lg`}>
            <Icon size={28} className="text-[var(--theme-primary)]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
