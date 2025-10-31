import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ComplaintMap from "@/components/dashboard/ComplaintMap";
import ComplaintTable from "@/components/dashboard/ComplaintTable";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import AIQueryBoard from "@/components/dashboard/AIQueryBoard";
import { supabase } from "@/integrations/supabase/client";
import { FileText, CheckCircle, Clock, Timer } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    avgResolutionTime: "0",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("complaints")
        .select("status, resolution_time_hours");

      if (error) throw error;

      const total = data?.length || 0;
      const resolved = data?.filter((c: any) => c.status === "resolved").length || 0;
      const pending = data?.filter((c: any) => c.status === "pending").length || 0;

      const resolvedWithTime = data?.filter((c: any) => c.resolution_time_hours != null) || [];
      const avgTime = resolvedWithTime.length > 0
        ? (resolvedWithTime.reduce((sum: number, c: any) => sum + (c.resolution_time_hours || 0), 0) / resolvedWithTime.length).toFixed(1)
        : "0";

      setStats({
        total,
        resolved,
        pending,
        avgResolutionTime: avgTime,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Complaints"
                value={stats.total}
                icon={FileText}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Resolved Complaints"
                value={stats.resolved}
                icon={CheckCircle}
                iconBgColor="bg-green-50"
                iconColor="text-green-600"
                trend="+12% from last month"
              />
              <StatsCard
                title="Pending Complaints"
                value={stats.pending}
                icon={Clock}
                iconBgColor="bg-red-50"
                iconColor="text-red-600"
              />
              <StatsCard
                title="Avg Resolution Time"
                value={`${stats.avgResolutionTime}h`}
                icon={Timer}
                iconBgColor="bg-amber-50"
                iconColor="text-amber-600"
              />
            </div>

            {/* Live Map */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Live Complaint Map</h2>
              <ComplaintMap />
            </div>

            {/* Complaint Table */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
              <ComplaintTable />
            </div>

            {/* Analytics and AI Query */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart />
              <AIQueryBoard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
