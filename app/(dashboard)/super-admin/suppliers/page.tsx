"use client";

import { useState } from "react";
import { Building2, Plus, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import SupplierTable from "@/components/common/shared/suppliers/SupplierTable";
import AddSupplierDialog from "@/components/common/shared/suppliers/AddSupplierDialog";

const globalMockSuppliers = [
  { id: 1, name: "ABC Distributors", contact: "John Smith", phone: "011-2345678", email: "john@abc.lk", address: "Colombo", products: 45, totalPurchases: 450000, balance: 25000, branch: "Main Branch" },
  { id: 2, name: "XYZ Wholesale", contact: "Jane Doe", phone: "011-8765432", email: "jane@xyz.lk", address: "Kandy", products: 32, totalPurchases: 320000, balance: 0, branch: "Kandy Branch" },
];

export default function SuperAdminSuppliersPage() {
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [suppliers, setSuppliers] = useState(globalMockSuppliers);

  const handleUpdate = (updated: any) => {
    setSuppliers(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleAdd = (newData: any) => {
    setSuppliers([...suppliers, { 
      ...newData, 
      id: Date.now(), 
      totalPurchases: 0, 
      balance: 0, 
      products: 0, 
      branch: "Main Branch"
    }]);
  };

  const handleDelete = (id: number) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 uppercase tracking-tighter text-foreground">
            <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8"/> Global Suppliers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">Manage vendors across all branches</p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-primary hover:bg-primary-hover uppercase font-black text-[10px] sm:text-xs px-4 sm:px-6 h-10 sm:h-12 shadow-xl shadow-primary/20"
        >
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/> Add Global Vendor
        </Button>
      </div>

      <SupplierTable 
        suppliers={suppliers} 
        searchQuery={query} 
        onSearchChange={setQuery} 
        role="super-admin"
        onUpdateSupplier={handleUpdate}
        onDeleteSupplier={handleDelete}
      />

      <AddSupplierDialog 
        open={isAddOpen} 
        onOpenChange={setIsAddOpen} 
        onSave={handleAdd} 
      />
    </div>
  );
}