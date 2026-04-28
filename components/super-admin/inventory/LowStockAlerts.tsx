"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { AlertTriangle, Package, Building2 } from "lucide-react";

// Complete mock data for Super Admin Low Stock Alerts (All Branches)
const MOCK_GLOBAL_LOW_STOCK = [
  { id: 1, name: "T-Shirt", sku: "SKU005", branch: "Main Branch", stock: 5, minStock: 10, status: "low" },
  { id: 2, name: "Rice 5kg", sku: "SKU008", branch: "Main Branch", stock: 8, minStock: 15, status: "low" },
  { id: 3, name: "Mineral Water", sku: "SKU006", branch: "Main Branch", stock: 0, minStock: 20, status: "out" },
  { id: 4, name: "T-Shirt", sku: "SKU005", branch: "Kandy Branch", stock: 5, minStock: 10, status: "low" },
  { id: 5, name: "Mineral Water", sku: "SKU006", branch: "Kandy Branch", stock: 0, minStock: 20, status: "out" },
  { id: 6, name: "Rice 5kg", sku: "SKU008", branch: "Kandy Branch", stock: 8, minStock: 15, status: "low" },
  { id: 7, name: "Headphones", sku: "SKU007", branch: "Galle Branch", stock: 15, minStock: 10, status: "normal" },
  { id: 8, name: "Rice 5kg", sku: "SKU008", branch: "Galle Branch", stock: 25, minStock: 15, status: "normal" },
];

interface LowStockAlertsProps {
  inventory?: any[];
}

export default function LowStockAlerts({ inventory = MOCK_GLOBAL_LOW_STOCK }: LowStockAlertsProps) {
  const lowStockItems = inventory.filter((item) => item.status !== "normal");

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
          Low Stock Alerts Across All Branches ({lowStockItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lowStockItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-muted-foreground">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No low stock items found in any branch</p>
            </div>
          ) : (
            lowStockItems.map((item, index) => (
              <div
                key={`${item.id}-${item.branch}-${index}`}
                className="p-3 sm:p-4 bg-muted/30 rounded-lg border-l-4 border-warning hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">SKU: {item.sku}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{item.branch}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={item.status === "low" ? "outline" : "destructive"}
                    className="rounded-md text-[9px] sm:text-[10px]"
                  >
                    {item.status === "low" ? "Low Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <span className="text-muted-foreground">
                    Current: <span className="font-semibold text-destructive">{item.stock}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Minimum: <span className="font-semibold text-foreground">{item.minStock}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Required:{" "}
                    <span className="font-semibold text-warning">
                      {Math.max(0, item.minStock - item.stock)}
                    </span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}