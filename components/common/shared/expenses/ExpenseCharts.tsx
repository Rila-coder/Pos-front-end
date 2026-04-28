"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

const COLORS = ["#10B981", "#6366F1", "#F59E0B", "#EF4444", "#7C3AED"];

export default function ExpenseCharts({
  expenseCategories,
  monthlyExpenses,
  variant = "admin",
}: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card className="shadow-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="uppercase font-black text-[10px] sm:text-sm tracking-widest text-muted-foreground">
            {variant === "super-admin"
              ? "Global Distribution"
              : "Category Breakdown"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={variant === "super-admin" ? 60 : 0}
                  outerRadius={80}
                  paddingAngle={variant === "super-admin" ? 5 : 0}
                  dataKey="amount"
                  label={({ name, percent }: PieLabelRenderProps) => {
                    if (percent !== undefined) {
                      return `${name} ${(percent * 100).toFixed(0)}%`;
                    }
                    return name;
                  }}
                >
                  {expenseCategories.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="uppercase font-black text-[10px] sm:text-sm tracking-widest text-muted-foreground">
            Expense Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted)/0.3)" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Bar
                  dataKey="total"
                  fill={variant === "super-admin" ? "#6366F1" : "#EF4444"}
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}