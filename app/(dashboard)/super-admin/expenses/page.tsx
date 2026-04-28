"use client";

import { useState } from "react";
import { Plus, Building2, Search, Download } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import ExpenseCharts from "@/components/common/shared/expenses/ExpenseCharts";
import RecentExpensesTable from "@/components/common/shared/expenses/RecentExpensesTable";
import AddExpenseDialog from "@/components/common/shared/expenses/AddExpenseDialog";

// FULL MOCK DATA RESTORED
const initialGlobal = [
  { id: 1, date: "2026-03-12", category: "Electricity", description: "HQ Monthly bill", amount: 45000, branch: "Main Branch", status: "paid" },
  { id: 2, date: "2026-03-08", category: "Rent", description: "Warehouse Rent", amount: 120000, branch: "Main Branch", status: "paid" },
  { id: 3, date: "2026-03-05", category: "Transport", description: "Stock Delivery", amount: 15000, branch: "Kandy Branch", status: "paid" },
  { id: 4, date: "2026-03-02", category: "Marketing", description: "Local Ad Campaign", amount: 25000, branch: "Galle Branch", status: "pending" },
];

const globalCategories = [
  { name: "Main Branch", amount: 450000 },
  { name: "Kandy Branch", amount: 280000 },
  { name: "Galle Branch", amount: 150000 },
];

const globalMonthlyTrends = [
  { month: "Jan", total: 650000 },
  { month: "Feb", total: 720000 },
  { month: "Mar", total: 880000 },
];

export default function SuperAdminExpensesPage() {
  const [expenses, setExpenses] = useState(initialGlobal);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [search, setSearch] = useState("");

  const handleSave = (data: any) => {
    if (data.id) setExpenses(prev => prev.map(e => e.id === data.id ? data : e));
    else setExpenses([...expenses, { ...data, id: Date.now() }]);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Global Expenses
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">
            Consolidated expenditure tracking across all branches
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="font-bold uppercase text-[9px] sm:text-[10px] h-10 sm:h-12 flex-1 sm:flex-none">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Export
          </Button>
          <Button 
            onClick={() => { setSelectedExpense(null); setIsDialogOpen(true); }} 
            className="bg-primary hover:bg-primary-hover font-black uppercase text-[9px] sm:text-[10px] h-10 sm:h-12 px-4 sm:px-6 shadow-xl shadow-primary/20 flex-1 sm:flex-none"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Expense
          </Button>
        </div>
      </div>

      <ExpenseCharts
        expenseCategories={globalCategories}
        monthlyExpenses={globalMonthlyTrends}
        variant="super-admin"
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            placeholder="Search global expenses by description or branch..."
            className="pl-8 sm:pl-9 h-10 sm:h-11 bg-muted/20 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11 border-border">
            <SelectValue placeholder="Filter by Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch</SelectItem>
            <SelectItem value="kandy">Kandy Branch</SelectItem>
            <SelectItem value="galle">Galle Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <RecentExpensesTable 
        expenses={expenses} 
        showBranch={true} 
        onEdit={(e) => { setSelectedExpense(e); setIsDialogOpen(true); }} 
        onDelete={(id) => setExpenses(prev => prev.filter(e => e.id !== id))} 
      />

      <AddExpenseDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        initialData={selectedExpense} 
        onSave={handleSave} 
        showBranchField={true} 
      />
    </div>
  );
}