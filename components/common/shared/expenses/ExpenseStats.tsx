"use client";

import { DollarSign, TrendingUp, Calendar } from "lucide-react";

interface ExpenseStatsProps {
  totalExpenses: number;
  avgMonthly: number;
  thisMonth: number;
}

export default function ExpenseStats({ totalExpenses, avgMonthly, thisMonth }: ExpenseStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card rounded-xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
            <h3 className="text-2xl font-bold text-foreground">Rs. {totalExpenses.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-error/20 to-transparent flex items-center justify-center text-error">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Monthly Average</p>
            <h3 className="text-2xl font-bold text-foreground">Rs. {avgMonthly.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning/20 to-transparent flex items-center justify-center text-warning">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <h3 className="text-2xl font-bold text-foreground">Rs. {thisMonth.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-info/20 to-transparent flex items-center justify-center text-info">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}