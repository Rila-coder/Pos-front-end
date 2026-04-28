"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const paymentMethods = [
  { name: "Cash", value: 45 },
  { name: "Card", value: 30 },
  { name: "QR", value: 15 },
  { name: "Credit", value: 10 },
];

const COLORS = ["#10B981", "#6366F1", "#F59E0B", "#EF4444"];

export default function PaymentPieChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Payment Methods Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => {
                  if (percent !== undefined) {
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                  }
                  return "";
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethods.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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
  );
}