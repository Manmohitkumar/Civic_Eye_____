import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ComplaintTable from "@/components/dashboard/ComplaintTable";

const TrackComplaints = () => {
  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Track Your Complaints</h1>
            <ComplaintTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrackComplaints;
