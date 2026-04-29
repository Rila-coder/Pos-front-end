"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/Tabs";
import EmployeeTable from "@/components/common/shared/employees/EmployeeTable";
import CommissionTable from "@/components/common/shared/employees/CommissionTable";
import EmployeeStats from "@/components/common/shared/employees/EmployeeStats";
import AddEmployeeDialog from "@/components/common/shared/employees/AddEmployeeDialog";

const initialEmployees = [
  {
    id: 1,
    name: "Staff Member 1",
    role: "Manager",
    status: "active",
    salesCount: 145,
    totalSales: 125000,
  },
  {
    id: 2,
    name: "Staff Member 2",
    role: "Cashier",
    status: "active",
    salesCount: 98,
    totalSales: 85000,
  },
];

const initialCommission = [
  {
    id: 1,
    name: "Staff Member 1",
    customers: 40,
    sales: 45000,
    commission: 2250,
    rate: 5,
    baseSalary: 45000,
    paymentStatus: "Paid",
  },
  {
    id: 2,
    name: "Staff Member 2",
    customers: 30,
    sales: 32000,
    commission: 1600,
    rate: 5,
    baseSalary: 35000,
    paymentStatus: "Pending",
  },
];

export default function AdminEmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState(initialEmployees);
  const [commissions, setCommissions] = useState(initialCommission);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleUpdate = (updated: any) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e)),
    );
  };

  const handleAdd = (newData: any) => {
    setEmployees([
      ...employees,
      { ...newData, id: Date.now(), salesCount: 0, totalSales: 0 },
    ]);
  };

  const handleMarkPaid = (id: number) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, paymentStatus: "Paid" } : c)),
    );
  };

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Team Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">
            Staff performance and payroll
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-primary hover:bg-primary-hover font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 shadow-xl shadow-primary/20"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Staff
          Member
        </Button>
      </div>

      <EmployeeStats
        totalEmployees={employees.length}
        activeEmployees={employees.filter((e) => e.status === "active").length}
        totalSales={210000}
        totalCommission={3850}
      />

      <Tabs defaultValue="employees" className="space-y-4">
        <div className="flex justify-start">
          <TabsList className="bg-muted/50 p-1 inline-flex w-auto">
            <TabsTrigger
              value="employees"
              className="uppercase font-bold text-[9px] sm:text-[10px] whitespace-nowrap"
            >
              Staff Directory
            </TabsTrigger>
            <TabsTrigger
              value="commission"
              className="uppercase font-bold text-[9px] sm:text-[10px] whitespace-nowrap"
            >
              Payroll & Commission
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="employees">
          <EmployeeTable
            employees={filtered}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onUpdate={handleUpdate}
            onDelete={(id: any) =>
              setEmployees((prev) => prev.filter((e) => e.id !== id))
            }
          />
        </TabsContent>
        <TabsContent value="commission">
          <CommissionTable
            commissionData={commissions}
            totalCommission={3850}
            onMarkPaid={handleMarkPaid}
          />
        </TabsContent>
      </Tabs>

      <AddEmployeeDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleAdd}
      />
    </div>
  );
}
