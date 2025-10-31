import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsChart = () => {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from("complaints")
        .select("created_at, status, category");

      if (error) throw error;

      // Process weekly data (last 7 days)
      const weekly = processDataByDay(data || [], 7);
      setWeeklyData(weekly);

      // Process monthly data (last 30 days)
      const monthly = processDataByDay(data || [], 30);
      setMonthlyData(monthly);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const processDataByDay = (data: any[], days: number) => {
    const result: Record<string, any> = {};
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      result[dateStr] = { date: dateStr, total: 0, resolved: 0, pending: 0, in_progress: 0 };
    }

    data.forEach((complaint) => {
      const dateStr = complaint.created_at.split("T")[0];
      if (result[dateStr]) {
        result[dateStr].total++;
        result[dateStr][complaint.status]++;
      }
    });

    return Object.values(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#1976D2" name="Total" />
                <Bar dataKey="resolved" fill="#4CAF50" name="Resolved" />
                <Bar dataKey="pending" fill="#F44336" name="Pending" />
                <Bar dataKey="in_progress" fill="#FBC02D" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#1976D2" name="Total" />
                <Bar dataKey="resolved" fill="#4CAF50" name="Resolved" />
                <Bar dataKey="pending" fill="#F44336" name="Pending" />
                <Bar dataKey="in_progress" fill="#FBC02D" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
