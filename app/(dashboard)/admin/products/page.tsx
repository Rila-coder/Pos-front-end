"use client";

import { useState } from "react";
import { Plus, Search, Package } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent } from "@/components/common/ui/Card";
import ProductTable from "@/components/common/shared/products/ProductTable";
import AddProductDialog from "@/components/common/shared/products/AddProductDialog";

// FULL MOCK DATA INCLUDED
const adminMockProducts = [
  {
    id: 1,
    sku: "SKU001",
    name: "Coca Cola 500ml",
    category: "Beverages",
    price: 150,
    stock: 45,
    status: "active",
    discount: 5,
  },
  {
    id: 2,
    sku: "SKU002",
    name: "White Bread",
    category: "Food",
    price: 120,
    stock: 30,
    status: "active",
  },
  {
    id: 3,
    sku: "SKU003",
    name: "Gaming Headphones",
    category: "Electronics",
    price: 2500,
    stock: 12,
    status: "active",
  },
  {
    id: 4,
    sku: "SKU004",
    name: "Paracetamol 10mg",
    category: "Medicine",
    price: 50,
    stock: 100,
    status: "active",
  },
  {
    id: 5,
    sku: "SKU005",
    name: "Cotton T-Shirt",
    category: "Clothes",
    price: 1200,
    stock: 5,
    status: "low stock",
  },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = adminMockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Package className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Products
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your branch inventory and pricing
          </p>
        </div>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white font-bold uppercase text-[10px] sm:text-xs px-4 sm:px-6 h-9 sm:h-11"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Product
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-9 bg-muted/20 border-border text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shared Table Component */}
      <ProductTable products={filteredProducts} role="admin" />

      {/* Shared Dialog Component */}
      <AddProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        role="admin"
      />
    </div>
  );
}
