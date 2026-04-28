"use client";

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

const topProducts = [
  { name: "Product A", sales: 4000 },
  { name: "Product B", sales: 3000 },
  { name: "Product C", sales: 2000 },
  { name: "Product D", sales: 2780 },
  { name: "Product E", sales: 1890 },
];

export default function TopProductsChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Bar dataKey="sales" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}