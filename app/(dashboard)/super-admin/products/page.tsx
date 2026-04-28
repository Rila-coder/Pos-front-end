"use client";

import { useState } from "react";
import { Plus, Search, Building2, PackageCheck } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import ProductTable from "@/components/common/shared/products/ProductTable";
import AddProductDialog from "@/components/common/shared/products/AddProductDialog";

const globalMockProducts = [
  { id: 1, sku: "SKU001", name: "Coca Cola", category: "Beverages", price: 150, stock: 45, branch: "Main Branch", status: "active", discount: 5 },
  { id: 2, sku: "SKU003", name: "Headphones", category: "Electronics", price: 2500, stock: 12, branch: "Kandy Branch", status: "active" },
];

export default function SuperAdminProductsPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2">
            <PackageCheck className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Global Inventory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Managing stock across all business branches</p>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary-hover font-bold uppercase text-[10px] sm:text-xs shadow-lg shadow-primary/20 h-9 sm:h-11 px-4 sm:px-6">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Global Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input placeholder="Search all products..." className="pl-8 sm:pl-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch</SelectItem>
            <SelectItem value="kandy">Kandy Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductTable products={globalMockProducts} role="super-admin" />
      <AddProductDialog open={open} onOpenChange={setOpen} role="super-admin" />
    </div>
  );
}