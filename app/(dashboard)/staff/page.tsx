"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Users, DollarSign, Package, Truck } from "lucide-react";
import Link from "next/link";
import KPICards, { KPIDataItem } from "@/components/common/shared/dashboard/KPICards";
import RecentTransactions from "@/components/common/shared/dashboard/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 1. MOCK DATA - Move these to an API fetch later
const staffKPIs: KPIDataItem[] = [
  { title: "Today's Sales", value: "Rs. 85,450", change: "+8%", trend: "up", icon: DollarSign, color: "text-primary" },
  { title: "Transactions", value: "24", change: "+2", trend: "up", icon: ShoppingBag, color: "text-success" },
  { title: "Customers Served", value: "12", change: "Today", trend: "up", icon: Users, color: "text-info" },
  { title: "Low Stock Items", value: "3", change: "Alert", trend: "alert", icon: Package, color: "text-error" },
];

const weeklySales = [
  { day: "Mon", sales: 28000 },
  { day: "Tue", sales: 31000 },
  { day: "Wed", sales: 29000 },
  { day: "Thu", sales: 35000 },
  { day: "Fri", sales: 38000 },
  { day: "Sat", sales: 42000 },
  { day: "Sun", sales: 31000 },
];

export default function StaffDashboard() {
  const [userName, setUserName] = useState("Staff Member");

  useEffect(() => {
    // Get user name from local storage (set during login)
    const name = localStorage.getItem("userName") || "Staff Member";
    setUserName(name);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Your daily sales and activities overview</p>
      </div>

      {/* KPI Section using Shared Component */}
      <KPICards data={staffKPIs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Weekly Sales Chart - Takes 2 columns on large screens */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Weekly Sales Trend</CardTitle>
            <p className="text-xs text-muted-foreground">Your sales performance this week</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs.${value/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'hsl(var(--muted)/0.4)'}}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} 
                  />
                  <Bar dataKey="sales" name="Sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Takes 1 column */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-foreground px-1">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <QuickActionButton
              href="/staff/pos"
              icon={<ShoppingBag className="w-5 h-5" />}
              title="Start New Sale"
              color="bg-primary/10 text-primary border-primary/20"
            />
            <QuickActionButton
              href="/staff/customers"
              icon={<Users className="w-5 h-5" />}
              title="Add Customer"
              color="bg-info/10 text-info border-info/20"
            />
            <QuickActionButton
              href="/staff/products"
              icon={<Package className="w-5 h-5" />}
              title="Check Inventory"
              color="bg-success/10 text-success border-success/20"
            />
            <QuickActionButton
              href="/staff/suppliers"
              icon={<Truck className="w-5 h-5" />}
              title="Suppliers List"
              color="bg-warning/10 text-warning border-warning/20"
            />
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <RecentTransactions />
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Today's Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <ActivityItem time="10:30 AM" action="Sale completed" amount="Rs. 1,250" customer="John Doe" />
              <ActivityItem time="11:15 AM" action="Sale completed" amount="Rs. 450" customer="Walk-in" />
              <ActivityItem time="11:45 AM" action="New customer" amount="" customer="Jane Smith" />
              <ActivityItem time="12:10 PM" action="Restocked" amount="" customer="Coca Cola" />
              <ActivityItem time="12:30 PM" action="Sale completed" amount="Rs. 2,400" customer="Bob Wilson" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Helper Components ---

function QuickActionButton({ href, icon, title, color }: { href: string; icon: React.ReactNode; title: string; color: string }) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] ${color}`}>
        <div className="p-2 rounded-lg bg-background/50">
          {icon}
        </div>
        <span className="font-bold text-sm sm:text-base">{title}</span>
      </div>
    </Link>
  );
}

function ActivityItem({ time, action, amount, customer }: { time: string; action: string; amount: string; customer: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-muted/20 rounded-lg border border-transparent hover:border-border transition-colors">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-xs font-medium text-muted-foreground w-16">{time}</span>
        <div>
          <p className="text-sm font-semibold text-foreground">{action}</p>
          <p className="text-xs text-muted-foreground">{customer}</p>
        </div>
      </div>
      {amount && <span className="font-bold text-primary text-sm sm:text-base">{amount}</span>}
    </div>
  );
}