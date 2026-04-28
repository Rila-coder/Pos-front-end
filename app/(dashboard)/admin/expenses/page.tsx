"use client";

import { useState } from "react";
import { Plus, Wallet, TrendingDown, Calendar } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import ExpenseCharts from "@/components/common/shared/expenses/ExpenseCharts";
import RecentExpensesTable from "@/components/common/shared/expenses/RecentExpensesTable";
import AddExpenseDialog from "@/components/common/shared/expenses/AddExpenseDialog";

// FULL MOCK DATA RESTORED
const initialExpenses = [
  { id: 1, date: "2026-03-12", category: "Electricity", description: "Monthly bill - March", amount: 12000, status: "paid" },
  { id: 5, date: "2026-03-01", category: "Salaries", description: "Staff salaries - February", amount: 85000, status: "pending" },
];

const expenseCategories = [
  { name: "Rent", amount: 45000 },
  { name: "Electricity", amount: 12000 },
  { name: "Suppliers", amount: 125000 },
  { name: "Transport", amount: 8500 },
  { name: "Salaries", amount: 85000 },
];

const monthlyExpenses = [
  { month: "Jan", total: 245000 },
  { month: "Feb", total: 268000 },
  { month: "Mar", total: 275500 },
];

export default function AdminExpensesPage() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const handleSave = (data: any) => {
    if (data.id) setExpenses(prev => prev.map(e => e.id === data.id ? data : e));
    else setExpenses([...expenses, { ...data, id: Date.now() }]);
  };

  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tighter">
            Expenses
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">
            Manage Branch Operating Costs
          </p>
        </div>
        <Button 
          onClick={() => { setSelectedExpense(null); setIsDialogOpen(true); }} 
          className="bg-primary hover:bg-primary-hover font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-8 shadow-xl shadow-primary/20"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Expense
        </Button>
      </div>

      {/* RESTORED YOUR ORIGINAL STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <StatCard
          title="Total Volume"
          value="Rs. 275k"
          icon={<Wallet />}
          color="text-destructive"
        />
        <StatCard
          title="Avg Monthly"
          value="Rs. 262k"
          icon={<TrendingDown />}
          color="text-primary"
        />
        <StatCard
          title="Due Soon"
          value="Rs. 85k"
          icon={<Calendar />}
          color="text-warning"
        />
      </div>

      <ExpenseCharts
        expenseCategories={expenseCategories}
        monthlyExpenses={monthlyExpenses}
        variant="admin"
      />

      <RecentExpensesTable 
        expenses={expenses} 
        onEdit={handleEdit} 
        onDelete={(id) => setExpenses(prev => prev.filter(e => e.id !== id))} 
      />

      <AddExpenseDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        initialData={selectedExpense} 
        onSave={handleSave} 
      />
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">
          {title}
        </p>
        <h3 className={`text-xl sm:text-2xl font-black mt-1 ${color}`}>{value}</h3>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl bg-muted ${color}`}>{icon}</div>
    </div>
  );
}