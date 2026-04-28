"use client";

import { DollarSign, ShoppingBag, Wallet, TrendingUp } from "lucide-react";

interface SalesSummaryProps {
  sales: any[];
}

export default function SalesSummary({ sales }: SalesSummaryProps) {
  const todaySales = sales.filter(s => s.date.startsWith("2026-03-19"));
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0);
  const todayCount = todaySales.length;

  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
  
  const creditSales = sales.filter(s => s.status === "credit_pending");
  const totalCredit = creditSales.reduce((sum, s) => sum + (s.creditAmount || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-card rounded-xl border border-border p-3 sm:p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Today's Sales
            </p>
            <h3 className="text-lg sm:text-2xl font-black mt-1 text-foreground">
              Rs. {todayTotal.toFixed(2)}
            </h3>
            <p className="text-[8px] sm:text-xs text-muted-foreground mt-1">
              {todayCount} transactions
            </p>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-3 sm:p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Total Sales
            </p>
            <h3 className="text-lg sm:text-2xl font-black mt-1 text-foreground">
              Rs. {totalSales.toFixed(2)}
            </h3>
            <p className="text-[8px] sm:text-xs text-muted-foreground mt-1">
              {sales.length} transactions
            </p>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-success/10">
            <DollarSign className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-success" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-3 sm:p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Credit Pending
            </p>
            <h3 className="text-lg sm:text-2xl font-black mt-1 text-warning">
              Rs. {totalCredit.toFixed(2)}
            </h3>
            <p className="text-[8px] sm:text-xs text-muted-foreground mt-1">
              {creditSales.length} invoices
            </p>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-warning/10">
            <Wallet className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-warning" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-3 sm:p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground tracking-wider">
              Avg. Transaction
            </p>
            <h3 className="text-lg sm:text-2xl font-black mt-1 text-info">
              Rs. {(totalSales / (sales.length || 1)).toFixed(2)}
            </h3>
            <p className="text-[8px] sm:text-xs text-muted-foreground mt-1">
              Per sale average
            </p>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-info/10">
            <ShoppingBag className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-info" />
          </div>
        </div>
      </div>
    </div>
  );
}