import type{ Metric, UserByCountry, ConversionStep } from "./types";

export const metrics: Metric[] = [
  { title: "Total Sales", value: "$983,410", change: 3.34, isPositive: true, icon: "dollar-sign" },
  { title: "Total Orders", value: "58,375", change: -2.89, isPositive: false, icon: "shopping-cart" },
  { title: "Total Visitors", value: "237,782", change: 8.02, isPositive: true, icon: "users" },
];

export const revenueData = [
  { date: "12 Aug", revenue: 8000, order: 4000 },
  { date: "13 Aug", revenue: 9500, order: 5000 },
  { date: "14 Aug", revenue: 10500, order: 6000 },
  { date: "15 Aug", revenue: 11500, order: 7000 },
  { date: "16 Aug", revenue: 14521, order: 7500 },
  { date: "17 Aug", revenue: 12000, order: 7200 },
  { date: "18 Aug", revenue: 13000, order: 6900 },
  { date: "19 Aug", revenue: 12500, order: 7100 },
];

export const activeUsers: UserByCountry[] = [
  { country: "United States", percentage: 36 },
  { country: "United Kingdom", percentage: 24 },
  { country: "Indonesia", percentage: 17.5 },
  { country: "Russia", percentage: 15 },
];

export const conversionRate: ConversionStep[] = [
  { label: "Product Views", value: 25000, change: 9, isPositive: true },
  { label: "Add to Cart", value: 12000, change: 6, isPositive: true },
  { label: "Proceed to Checkout", value: 8500, change: 4, isPositive: true },
  { label: "Completed Purchases", value: 6200, change: 7, isPositive: true },
  { label: "Abandoned Carts", value: 3000, change: -5, isPositive: false },
];
