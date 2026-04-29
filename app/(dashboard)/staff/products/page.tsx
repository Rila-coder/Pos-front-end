"use client";

import { useState } from "react";
import { Search, PackageSearch } from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent } from "@/components/common/ui/Card";
import ProductTable from "@/components/common/shared/products/ProductTable";

// FULL MOCK DATA INCLUDED
const staffMockProducts = [
  {
    id: 1,
    sku: "SKU001",
    name: "Coca Cola 500ml",
    category: "Beverages",
    price: 150,
    stock: 45,
    status: "active",
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
    id: 5,
    sku: "SKU005",
    name: "Cotton T-Shirt",
    category: "Clothes",
    price: 1200,
    stock: 5,
    status: "low stock",
  },
];

export default function StaffProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = staffMockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <PackageSearch className="text-primary w-6 h-6 sm:w-8 sm:h-8" />{" "}
          Inventory Lookup
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Check stock availability and product details
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-3 sm:p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <Input
              placeholder="Quick search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-9 bg-muted/20 border-border text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shared Table Component - Using "staff" role hides delete/edit buttons */}
      <ProductTable products={filteredProducts} role="staff" />
    </div>
  );
}
