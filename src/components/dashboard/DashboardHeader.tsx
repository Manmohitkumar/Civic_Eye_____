import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/7b314dd5-c766-4046-8e2f-02a35e9e67c2.png" 
              alt="Logo" 
              className="h-8 w-12"
            />
            <span className="text-xl font-bold text-[var(--theme-primary)]">
              Smart Complaint Portal
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" icon="🏠">Dashboard</NavLink>
            <NavLink to="/live-map" icon="🗺">Live Map</NavLink>
            <NavLink to="/reports" icon="📊">Reports</NavLink>
            <NavLink to="/ai-query" icon="🤖">AI Query Board</NavLink>
            <NavLink to="/feedback" icon="💬">Feedback</NavLink>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
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
                <div className="p-2 font-semibold border-b">Notifications</div>
                <DropdownMenuItem>New complaint response received</DropdownMenuItem>
                <DropdownMenuItem>Your complaint has been resolved</DropdownMenuItem>
                <DropdownMenuItem>System maintenance scheduled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/User */}
            <Button 
              variant="default" 
              className="gap-2"
              onClick={() => navigate('/auth')}
            >
              <LogIn size={18} />
              <span>Login / Sign Up</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ 
  to, 
  icon, 
  children 
}: { 
  to: string; 
  icon: string; 
  children: React.ReactNode;
}) => (
  <Link 
    to={to}
    className="flex items-center gap-2 text-gray-700 hover:text-[var(--theme-primary)] transition-colors font-medium"
  >
    <span>{icon}</span>
    <span>{children}</span>
  </Link>
);

export default DashboardHeader;
