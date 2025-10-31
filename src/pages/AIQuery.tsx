import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AIQueryBoard from "@/components/dashboard/AIQueryBoard";

const AIQuery = () => {
  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">AI Query Board</h1>
            <AIQueryBoard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIQuery;
