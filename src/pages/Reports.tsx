import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";

const Reports = () => {
  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Complaint Reports & Analytics</h1>
            <AnalyticsChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
