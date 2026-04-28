"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/common/ui/Card";

// Define the type for our KPI items
export type KPIDataItem = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "alert";
  icon: any;
  color: string;
};

interface KPICardsProps {
  data: KPIDataItem[];
}

export default function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {data.map((kpi, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow border-border bg-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2">{kpi.value}</h3>
                <div className="flex items-center space-x-1">
                  {kpi.trend === "up" && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />}
                  {kpi.trend === "down" && <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-error" />}
                  {kpi.trend === "alert" && <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-warning" />}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      kpi.trend === "up" ? "text-success" : kpi.trend === "down" ? "text-error" : "text-warning"
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}