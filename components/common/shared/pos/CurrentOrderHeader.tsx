"use client";

import { User, ShoppingBag } from "lucide-react";

interface CurrentOrderHeaderProps {
  customerName: string;
  itemCount: number;
}

export default function CurrentOrderHeader({ customerName, itemCount }: CurrentOrderHeaderProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Current Order</p>
            <p className="font-semibold text-sm sm:text-base text-foreground">{itemCount} items</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-muted-foreground">Customer</p>
            <p className="font-semibold text-sm sm:text-base text-foreground">{customerName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}