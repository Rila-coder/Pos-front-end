"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";

const transactions = [
  { id: "TXN-001", customer: "John Doe", amount: "Rs. 1,250", time: "2 mins ago", status: "completed" },
  { id: "TXN-002", customer: "Jane Smith", amount: "Rs. 850", time: "15 mins ago", status: "completed" },
  { id: "TXN-003", customer: "Bob Wilson", amount: "Rs. 2,100", time: "1 hour ago", status: "pending" },
  { id: "TXN-004", customer: "Alice Brown", amount: "Rs. 675", time: "2 hours ago", status: "completed" },
];

export default function RecentTransactions() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm sm:text-base">{txn.customer}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {txn.id} • {txn.time}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-semibold text-foreground text-sm sm:text-base">{txn.amount}</p>
                <span
                  className={`text-[10px] sm:text-xs px-2 py-1 rounded-full inline-block ${
                    txn.status === "completed"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}