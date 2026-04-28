"use client";

import { useState } from "react";
import { Plus, ShieldCheck, Search } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import EmployeeTable from "@/components/common/shared/employees/EmployeeTable";
import AddEmployeeDialog from "@/components/common/shared/employees/AddEmployeeDialog";
import { Input } from "@/components/common/ui/Input";

const initialGlobal = [
  { id: 1, name: "Kamal Perera", role: "Manager", branch: "Main Branch", status: "active", salesCount: 145, totalSales: 125000 },
  { id: 3, name: "Sunil Silva", role: "Manager", branch: "Kandy Branch", status: "active", salesCount: 76, totalSales: 62000 },
];

// MOCK BRANCHES FOR DROPDOWN
const branches = ["Main Branch", "Kandy Branch", "Galle Branch", "Negombo Branch"];

export default function SuperAdminEmployeesPage() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(initialGlobal);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("all");

  const handleUpdate = (updated: any) => setEmployees(prev => prev.map(e => e.id === updated.id ? updated : e));
  const handleAdd = (newData: any) => setEmployees([...employees, { ...newData, id: Date.now(), salesCount: 0, totalSales: 0 }]);

  const filtered = employees.filter(e => 
    (selectedBranch === "all" || e.branch === selectedBranch) &&
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 uppercase tracking-tighter text-foreground">
          <ShieldCheck className="text-primary w-6 h-6 sm:w-8 sm:h-8"/> Global Staffing
        </h1>
        <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary-hover font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 shadow-xl shadow-primary/20">
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/> New Employee
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground"/>
          <Input placeholder="Search staff across all branches..." className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map(b => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <EmployeeTable 
        employees={filtered} 
        searchQuery={search} 
        onSearchChange={setSearch} 
        showBranch={true} 
        onUpdate={handleUpdate} 
        onDelete={(id: any) => setEmployees(prev => prev.filter(e => e.id !== id))} 
      />
      
      <AddEmployeeDialog 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onSave={handleAdd} 
        showBranchField={true} 
      />
    </div>
  );
}