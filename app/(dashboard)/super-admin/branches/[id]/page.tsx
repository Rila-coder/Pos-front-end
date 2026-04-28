"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { ArrowLeft, Building2, DollarSign, Users, TrendingUp, TrendingDown, ShoppingBag, Package, Calendar } from "lucide-react";
import Link from "next/link";

// Mock data for branches
const branchData: Record<number, {
  id: number;
  name: string;
  location: string;
  sales: number;
  expenses: number;
  profit: number;
  employees: number;
  customers: number;
  manager: string;
  phone: string;
  email: string;
}> = {
  1: {
    id: 1,
    name: "Main Branch (Colombo)",
    location: "Colombo 03",
    sales: 125000,
    expenses: 75500,
    profit: 49500,
    employees: 8,
    customers: 156,
    manager: "Nihmath",
    phone: "+94 11 234 5678",
    email: "main@pos.com",
  },
  2: {
    id: 2,
    name: "Kandy Branch",
    location: "Kandy",
    sales: 85000,
    expenses: 52000,
    profit: 33000,
    employees: 5,
    customers: 98,
    manager: "Kamal Perera",
    phone: "0812345678",
    email: "kandy@pos.com",
  },
  3: {
    id: 3,
    name: "Galle Branch",
    location: "Galle",
    sales: 62000,
    expenses: 38000,
    profit: 24000,
    employees: 4,
    customers: 67,
    manager: "Sunil Silva",
    phone: "0912345678",
    email: "galle@pos.com",
  },
};

export default function BranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = parseInt(params.id as string);
  const branch = branchData[branchId];

  if (!branch) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Branch not found</h2>
        <Button onClick={() => router.push("/super-admin")} className="mt-4 text-sm">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9 sm:h-10 sm:w-10">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{branch.name}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{branch.location}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild size="sm" className="text-xs sm:text-sm">
            <Link href={`/super-admin/pos?branch=${branch.id}`}>
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> POS
            </Link>
          </Button>
          <Button variant="outline" asChild size="sm" className="text-xs sm:text-sm">
            <Link href="/super-admin/branches">
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> All Branches
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-card rounded-xl border border-border p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground">Total Sales</p>
              <h3 className="text-lg sm:text-2xl font-bold text-success mt-1">Rs. {branch.sales.toLocaleString()}</h3>
            </div>
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-success opacity-50" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground">Total Expenses</p>
              <h3 className="text-lg sm:text-2xl font-bold text-warning mt-1">Rs. {branch.expenses.toLocaleString()}</h3>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-warning opacity-50" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground">Net Profit</p>
              <h3 className="text-lg sm:text-2xl font-bold text-info mt-1">Rs. {branch.profit.toLocaleString()}</h3>
            </div>
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-info opacity-50" />
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground">Customers</p>
              <h3 className="text-lg sm:text-2xl font-bold text-primary mt-1">{branch.customers}</h3>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary opacity-50" />
          </div>
        </div>
      </div>

      {/* Branch Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Branch Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Branch Name</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Location</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.location}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Manager</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.manager}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Phone</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.phone}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Email</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Staff & Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Total Employees</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.employees}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 border-b border-border gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Total Customers</span>
              <span className="font-medium text-sm sm:text-base text-foreground">{branch.customers}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between py-2 gap-1">
              <span className="text-xs sm:text-sm text-muted-foreground">Profit Margin</span>
              <span className="font-medium text-success text-sm sm:text-base">{Math.round((branch.profit / branch.sales) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <Button variant="outline" className="h-auto py-3 sm:py-4 flex flex-col gap-1 sm:gap-2" asChild>
              <Link href={`/super-admin/pos?branch=${branch.id}`}>
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs">POS Billing</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 sm:py-4 flex flex-col gap-1 sm:gap-2" asChild>
              <Link href={`/super-admin/inventory?branch=${branch.id}`}>
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs">Inventory</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 sm:py-4 flex flex-col gap-1 sm:gap-2" asChild>
              <Link href={`/super-admin/employees?branch=${branch.id}`}>
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs">Staff</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-3 sm:py-4 flex flex-col gap-1 sm:gap-2" asChild>
              <Link href={`/super-admin/reports?branch=${branch.id}`}>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs">Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}