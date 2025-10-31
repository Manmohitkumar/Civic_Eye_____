import { Link, useLocation } from "react-router-dom";
import { 
  FileText, 
  Search, 
  BarChart3, 
  Settings, 
  Home,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Register Complaint", path: "/register-complaint" },
    { icon: Search, label: "Track Complaints", path: "/track-complaints" },
    { icon: MapPin, label: "Status Overview", path: "/status-overview" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-[var(--theme-primary)] text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
