"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Building2, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/Table";

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: string;
  branch?: string;
}

interface RecentExpensesTableProps {
  expenses: Expense[];
  showBranch?: boolean;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: number) => void;
}

export default function RecentExpensesTable({ 
  expenses, 
  showBranch = false, 
  onEdit, 
  onDelete 
}: RecentExpensesTableProps) {
  return (
    <Card className="shadow-lg border-border bg-card">
      <CardHeader>
        <CardTitle className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-muted-foreground">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-border">
                <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Date</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Category</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Description</TableHead>
                {showBranch && <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Branch</TableHead>}
                <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Amount</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-bold uppercase text-foreground">Status</TableHead>
                <TableHead className="text-right text-[9px] sm:text-[10px] font-bold uppercase text-foreground px-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-muted/10 border-border transition-colors">
                  <TableCell className="text-[10px] sm:text-xs font-medium text-foreground">{expense.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[8px] sm:text-[9px] uppercase font-bold border-primary/20 text-primary">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[10px] sm:text-xs text-foreground">{expense.description}</TableCell>
                  {showBranch && (
                    <TableCell className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">
                      <div className="flex items-center gap-1"><Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {expense.branch}</div>
                    </TableCell>
                  )}
                  <TableCell className="text-destructive font-black text-xs sm:text-sm">Rs. {expense.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={expense.status === "paid" ? "bg-success/10 text-success border-none text-[8px] sm:text-[9px] uppercase font-bold" : "bg-warning/10 text-warning border-none text-[8px] sm:text-[9px] uppercase font-bold"}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-4">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 text-info hover:bg-info/10" onClick={() => onEdit?.(expense)}>
                        <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 text-destructive hover:bg-destructive/10" onClick={() => onDelete?.(expense.id)}>
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5"/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}