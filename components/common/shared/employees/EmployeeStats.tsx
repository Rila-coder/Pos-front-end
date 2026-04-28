"use client";

import { Users, DollarSign, TrendingUp } from "lucide-react";

interface EmployeeStatsProps {
  totalEmployees: number;
  activeEmployees: number;
  totalSales: number;
  totalCommission: number;
}

export default function EmployeeStats({
  totalEmployees,
  activeEmployees,
  totalSales,
  totalCommission,
}: EmployeeStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-sm text-muted-foreground mb-1">Total Employees</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{totalEmployees}</h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-sm text-muted-foreground mb-1">Active Staff</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{activeEmployees}</h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-success/20 to-transparent flex items-center justify-center text-success">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-sm text-muted-foreground mb-1">Total Sales</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Rs. {totalSales.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-info/20 to-transparent flex items-center justify-center text-info">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-sm text-muted-foreground mb-1">Total Commission</p>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Rs. {totalCommission.toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-warning/20 to-transparent flex items-center justify-center text-warning">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}