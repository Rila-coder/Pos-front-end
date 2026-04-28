"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Mon", sales: 4000, revenue: 2400 },
  { name: "Tue", sales: 3000, revenue: 1398 },
  { name: "Wed", sales: 2000, revenue: 9800 },
  { name: "Thu", sales: 2780, revenue: 3908 },
  { name: "Fri", sales: 1890, revenue: 4800 },
  { name: "Sat", sales: 2390, revenue: 3800 },
  { name: "Sun", sales: 3490, revenue: 4300 },
];

export default function SalesChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Daily Sales Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}