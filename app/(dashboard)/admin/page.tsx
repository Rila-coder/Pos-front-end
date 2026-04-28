"use client";

import KPICards, { KPIDataItem } from "@/components/common/shared/dashboard/KPICards";
import SalesChart from "@/components/common/shared/dashboard/SalesChart";
import TopProductsChart from "@/components/common/shared/dashboard/TopProductsChart";
import PaymentPieChart from "@/components/common/shared/dashboard/PaymentPieChart";
import RecentTransactions from "@/components/common/shared/dashboard/RecentTransactions";
import { DollarSign, TrendingUp, TrendingDown, ShoppingBag, Users, AlertCircle, Clock } from "lucide-react";

// MOCK DATA - Replace this with your API call later
const adminKPIs: KPIDataItem[] = [
  { title: "Today's Sales", value: "Rs. 85,450", change: "+8%", trend: "up", icon: DollarSign, color: "text-primary" },
  { title: "Revenue", value: "Rs. 1,25,000", change: "+12%", trend: "up", icon: TrendingUp, color: "text-success" },
  { title: "Profit", value: "Rs. 32,500", change: "+5%", trend: "up", icon: TrendingUp, color: "text-info" },
  { title: "Expenses", value: "Rs. 12,400", change: "-3%", trend: "down", icon: TrendingDown, color: "text-warning" },
  { title: "Transactions", value: "124", change: "+15", trend: "up", icon: ShoppingBag, color: "text-primary" },
  { title: "Customers", value: "98", change: "+8", trend: "up", icon: Users, color: "text-info" },
  { title: "Low Stock", value: "8 items", change: "Alert", trend: "alert", icon: AlertCircle, color: "text-error" },
  { title: "Pending Orders", value: "12", change: "Review", trend: "alert", icon: Clock, color: "text-warning" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Branch overview and performance.</p>
      </div>

      <KPICards data={adminKPIs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <SalesChart />
        <TopProductsChart />
        <PaymentPieChart />
        <RecentTransactions />
      </div>
    </div>
  );
}