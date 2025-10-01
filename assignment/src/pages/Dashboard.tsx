import { useEffect, useState } from "react";
import MetricCard from "../DashboardComponents/MetricCard";
import RevenueChart from "../DashboardComponents/RevenueChart";
import MonthlyTarget from "../DashboardComponents/MonthlyTarget";
import ActiveUsers from "../DashboardComponents/ActiveUsers";
import ConversionRate from "../DashboardComponents/ConversionRate";
import { dashboardService, type DashboardStats } from "../services/dashboardService";

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </main>
    );
  }

  const metrics = stats ? [
    { 
      title: "Total Sales", 
      value: `$${stats.totalSales.toLocaleString()}`, 
      change: 3.34, 
      isPositive: true, 
      icon: "dollar-sign" 
    },
    { 
      title: "Total Orders", 
      value: stats.totalOrders.toLocaleString(), 
      change: -2.89, 
      isPositive: false, 
      icon: "shopping-cart" 
    },
    { 
      title: "Total Users", 
      value: stats.totalUsers.toLocaleString(), 
      change: 8.02, 
      isPositive: true, 
      icon: "users" 
    },
  ] : [];

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <MonthlyTarget />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ActiveUsers />
        <div className="col-span-2">
          <ConversionRate />
        </div>
      </div>
    </main>
  );
}
