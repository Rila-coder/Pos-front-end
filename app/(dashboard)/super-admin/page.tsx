"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import {
  Building2,
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Mock data for all branches
const allBranches = [
  {
    id: 1,
    name: "Main Branch",
    location: "Colombo 03",
    sales: 125000,
    expenses: 75500,
    profit: 49500,
    employees: 8,
    customers: 156,
  },
  {
    id: 2,
    name: "Kandy Branch",
    location: "Kandy",
    sales: 85000,
    expenses: 52000,
    profit: 33000,
    employees: 5,
    customers: 98,
  },
  {
    id: 3,
    name: "Galle Branch",
    location: "Galle",
    sales: 62000,
    expenses: 38000,
    profit: 24000,
    employees: 4,
    customers: 67,
  },
];

// Monthly sales data for chart
const monthlySalesData = [
  { month: "Jan", main: 98000, kandy: 65000, galle: 48000 },
  { month: "Feb", main: 105000, kandy: 72000, galle: 52000 },
  { month: "Mar", main: 125000, kandy: 85000, galle: 62000 },
];

// Sales by category data with original colors
const categoryData = [
  { name: "Beverages", value: 85000, color: "#10B981" },
  { name: "Food", value: 72000, color: "#6366F1" },
  { name: "Electronics", value: 55000, color: "#F59E0B" },
  { name: "Medicine", value: 38000, color: "#EF4444" },
  { name: "Clothes", value: 32000, color: "#7C3AED" },
];

const totalSales = allBranches.reduce((sum, b) => sum + b.sales, 0);
const totalExpenses = allBranches.reduce((sum, b) => sum + b.expenses, 0);
const totalProfit = allBranches.reduce((sum, b) => sum + b.profit, 0);
const totalEmployees = allBranches.reduce((sum, b) => sum + b.employees, 0);

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Super Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Manage all branches and global operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Branches"
          value={allBranches.length.toString()}
          icon={<Building2 className="w-5 h-5" />}
        />
        <StatCard
          title="Global Sales"
          value={`Rs. ${totalSales.toLocaleString()}`}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Total Expenses"
          value={`Rs. ${totalExpenses.toLocaleString()}`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Total Profit"
          value={`Rs. ${totalProfit.toLocaleString()}`}
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <StatCard
          title="Total Staff"
          value={totalEmployees.toString()}
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Comparison</CardTitle>
            <p className="text-xs text-muted-foreground">
              Sales trend across all branches
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                  />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="main"
                    name="Main Branch"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="kandy"
                    name="Kandy Branch"
                    fill="#6366F1"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="galle"
                    name="Galle Branch"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <p className="text-xs text-muted-foreground">
              Product category distribution
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => {
                      if (percent !== undefined) {
                        return `${name} ${(percent * 100).toFixed(0)}%`;
                      } else {
                        return name;
                      }
                    }}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Branch
                  </th>
                  <th className="text-left py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Location
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Sales
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Expenses
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Profit
                  </th>
                  <th className="text-center py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Employees
                  </th>
                  <th className="text-center py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Customers
                  </th>
                  <th className="text-center py-3 px-3 sm:px-4 font-bold text-foreground text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBranches.map((branch) => (
                  <tr
                    key={branch.id}
                    className="border-b border-border hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3 px-3 sm:px-4 font-semibold text-foreground text-sm">
                      {branch.name}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-muted-foreground text-sm">
                      {branch.location}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right text-success font-medium text-sm">
                      Rs. {branch.sales.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right text-warning font-medium text-sm">
                      Rs. {branch.expenses.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-right text-info font-medium text-sm">
                      Rs. {branch.profit.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center text-foreground text-sm">
                      {branch.employees}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center text-foreground text-sm">
                      {branch.customers}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center">
                      <Link href={`/super-admin/branches/${branch.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-3 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground tracking-wider">
            {title}
          </p>
          <h3 className="text-sm sm:text-base md:text-xl font-black mt-1 text-foreground">{value}</h3>
        </div>
        <div className="p-1.5 sm:p-2 rounded-lg bg-muted text-primary">{icon}</div>
      </div>
    </div>
  );
}