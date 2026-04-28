"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import SupplierTable from "@/components/common/shared/suppliers/SupplierTable";

const staffSuppliers = [
  { id: 1, name: "ABC Distributors", contact: "John Smith", phone: "011-2345678", email: "john@abc.lk", address: "Colombo 03", products: 45 },
  { id: 2, name: "XYZ Wholesale", contact: "Jane Doe", phone: "011-8765432", email: "jane@xyz.lk", address: "Kandy", products: 32 },
];

export default function StaffSuppliersPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 uppercase tracking-tighter text-foreground">
        <Users className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Supplier Contacts
      </h1>
      <SupplierTable suppliers={staffSuppliers} searchQuery={query} onSearchChange={setQuery} role="staff" />
    </div>
  );
}