"use client";

import { useState } from "react";
import { Plus, Users, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import SupplierTable from "@/components/common/shared/suppliers/SupplierTable";
import AddSupplierDialog from "@/components/common/shared/suppliers/AddSupplierDialog";

const mockSuppliers = [
  { id: 1, name: "ABC Distributors", contact: "John Smith", phone: "011-2345678", email: "john@abc.lk", address: "Colombo 03", products: 45, totalPurchases: 450000, balance: 25000 },
  { id: 2, name: "XYZ Wholesale", contact: "Jane Doe", phone: "011-8765432", email: "jane@xyz.lk", address: "Kandy", products: 32, totalPurchases: 320000, balance: 0 },
];

export default function AdminSuppliersPage() {
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [suppliers, setSuppliers] = useState(mockSuppliers);

  const handleUpdate = (updated: any) => {
    setSuppliers(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleAdd = (newData: any) => {
    setSuppliers([...suppliers, { ...newData, id: Date.now(), totalPurchases: 0, balance: 0, products: 0 }]);
  };

  const totalPayable = suppliers.reduce((sum, s) => sum + s.balance, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
          <Users className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Suppliers
        </h1>
        <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary-hover font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-8">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> New Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <StatCard title="Total Vendors" value={suppliers.length} icon={<Users />} color="text-primary" />
        <StatCard title="Total Volume" value={`Rs. 770k`} icon={<ShoppingCart />} color="text-success" />
        <StatCard title="Outstanding" value={`Rs. ${totalPayable.toLocaleString()}`} icon={<CreditCard />} color="text-error" />
      </div>

      <SupplierTable 
        suppliers={suppliers} searchQuery={query} onSearchChange={setQuery} role="admin" 
        onUpdateSupplier={handleUpdate} onDeleteSupplier={(id: any) => setSuppliers(prev => prev.filter(s => s.id !== id))} 
      />
      
      <AddSupplierDialog open={isAddOpen} onOpenChange={setIsAddOpen} onSave={handleAdd} />
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">{title}</p>
        <h3 className={`text-lg sm:text-2xl font-black mt-1 ${color}`}>{value}</h3>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl bg-muted ${color}`}>{icon}</div>
    </div>
  );
}