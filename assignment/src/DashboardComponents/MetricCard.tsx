import type{ Metric } from "../types";

export default function MetricCard({ title, value, change, isPositive }: Metric) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "+" : ""}{change}% vs last week
      </div>
    </div>
  );
}
