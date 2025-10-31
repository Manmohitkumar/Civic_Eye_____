import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  Search,
  BarChart3,
  Home,
  MapPin,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: FileText, label: "📋 Register Complaint", path: "/register-complaint", highlight: true },
    { icon: Search, label: "🔍 Track Complaints", path: "/track-complaints" },
    { icon: MapPin, label: "🗺️ Live Map", path: "/live-map" },
    { icon: MapPin, label: "🧭 Complaint Status", path: "/" },
    { icon: BarChart3, label: "📈 Analytics", path: "/reports" },
    { icon: User, label: "👤 Profile", path: "/profile" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen sticky top-16 h-[calc(100vh-4rem)]">
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
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium",
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : item.highlight
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Overview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-semibold text-yellow-600">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Resolved</span>
              <span className="font-semibold text-green-600">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold text-red-600">8</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
