import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define NavTab component first
const NavTab = ({ 
  to, 
  icon, 
  children 
}: { 
  to: string; 
  icon: string; 
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

const DashboardHeader = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/7b314dd5-c766-4046-8e2f-02a35e9e67c2.png" 
              alt="Logo" 
              className="h-8 w-12"
            />
            <span className="text-xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              Smart Complaint Portal
            </span>
          </Link>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavTab to="/" icon="🏠">Dashboard</NavTab>
            <NavTab to="/live-map" icon="🗺">Live Map</NavTab>
            <NavTab to="/reports" icon="📊">Reports</NavTab>
            <NavTab to="/ai-query" icon="🤖">AI Query Board</NavTab>
            <NavTab to="/feedback" icon="💬">Feedback</NavTab>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notification Center */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 font-semibold border-b">Notification Center</div>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">Complaint #1234 Resolved</div>
                    <div className="text-sm text-gray-500">2 hours ago</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">New Response Received</div>
                    <div className="text-sm text-gray-500">5 hours ago</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">System Update</div>
                    <div className="text-sm text-gray-500">1 day ago</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/User */}
            <Button 
              variant="default" 
              className="gap-2"
              onClick={() => navigate('/auth')}
            >
              <User size={18} />
              <span className="hidden sm:inline">Login / Sign In</span>
              <span className="sm:hidden">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
