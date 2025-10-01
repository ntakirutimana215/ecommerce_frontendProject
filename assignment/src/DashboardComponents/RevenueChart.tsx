import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardService, type RevenueData } from "../services/dashboardService";

export default function RevenueChart() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const data = await dashboardService.getRevenueAnalytics();
        setRevenueData(data);
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
        // Fallback to empty data
        setRevenueData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Revenue Analytics</h3>
          <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">Last 8 Days</button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Revenue Analytics</h3>
        <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">Last 8 Days</button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={revenueData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#fcd34d" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
