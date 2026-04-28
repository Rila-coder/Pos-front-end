"use client";

import { Search, TrendingUp, TrendingDown, Building2 } from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";

// Complete mock data for Stock Levels
const MOCK_INVENTORY = [
  { id: 1, name: "Coca Cola", sku: "SKU001", branch: "Main Branch", stock: 45, unit: "Bottle", minStock: 20, status: "normal", movement: "+15", lastUpdated: "2026-04-18" },
  { id: 2, name: "Bread", sku: "SKU002", branch: "Main Branch", stock: 30, unit: "Loaf", minStock: 25, status: "normal", movement: "-5", lastUpdated: "2026-04-17" },
  { id: 3, name: "T-Shirt", sku: "SKU005", branch: "Main Branch", stock: 5, unit: "Pcs", minStock: 10, status: "low", movement: "-8", lastUpdated: "2026-04-16" },
  { id: 4, name: "Mineral Water", sku: "SKU006", branch: "Main Branch", stock: 0, unit: "Bottle", minStock: 20, status: "out", movement: "-12", lastUpdated: "2026-04-15" },
  { id: 5, name: "Headphones", sku: "SKU007", branch: "Main Branch", stock: 15, unit: "Pcs", minStock: 10, status: "normal", movement: "+5", lastUpdated: "2026-04-18" },
  { id: 6, name: "Rice 5kg", sku: "SKU008", branch: "Main Branch", stock: 8, unit: "Bag", minStock: 15, status: "low", movement: "-7", lastUpdated: "2026-04-17" },
  { id: 7, name: "Coca Cola", sku: "SKU001", branch: "Kandy Branch", stock: 80, unit: "Bottle", minStock: 20, status: "normal", movement: "+10", lastUpdated: "2026-04-18" },
  { id: 8, name: "Bread", sku: "SKU002", branch: "Kandy Branch", stock: 40, unit: "Loaf", minStock: 25, status: "normal", movement: "-3", lastUpdated: "2026-04-17" },
  { id: 9, name: "T-Shirt", sku: "SKU005", branch: "Kandy Branch", stock: 5, unit: "Pcs", minStock: 10, status: "low", movement: "-8", lastUpdated: "2026-04-16" },
  { id: 10, name: "Mineral Water", sku: "SKU006", branch: "Kandy Branch", stock: 0, unit: "Bottle", minStock: 20, status: "out", movement: "-20", lastUpdated: "2026-04-14" },
  { id: 11, name: "Rice 5kg", sku: "SKU008", branch: "Kandy Branch", stock: 8, unit: "Bag", minStock: 15, status: "low", movement: "-7", lastUpdated: "2026-04-17" },
  { id: 12, name: "Coca Cola", sku: "SKU001", branch: "Galle Branch", stock: 60, unit: "Bottle", minStock: 20, status: "normal", movement: "+8", lastUpdated: "2026-04-18" },
  { id: 13, name: "Bread", sku: "SKU002", branch: "Galle Branch", stock: 30, unit: "Loaf", minStock: 25, status: "normal", movement: "-2", lastUpdated: "2026-04-17" },
  { id: 14, name: "Headphones", sku: "SKU007", branch: "Galle Branch", stock: 15, unit: "Pcs", minStock: 10, status: "normal", movement: "+3", lastUpdated: "2026-04-18" },
  { id: 15, name: "Rice 5kg", sku: "SKU008", branch: "Galle Branch", stock: 25, unit: "Bag", minStock: 15, status: "normal", movement: "-4", lastUpdated: "2026-04-17" },
];

interface StockLevelsTableProps {
  inventory?: any[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function StockLevelsTable({ 
  inventory = MOCK_INVENTORY, 
  searchQuery = "", 
  onSearchChange 
}: StockLevelsTableProps) {
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">Current Stock Records</CardTitle>
          {onSearchChange && (
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 sm:pl-9 h-10 sm:h-11 bg-muted/20 border-border text-sm"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Product</TableHead>
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Branch</TableHead>
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Inventory</TableHead>
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Min. Level</TableHead>
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Status</TableHead>
                <TableHead className="font-bold text-[10px] sm:text-xs text-foreground">Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => (
                  <TableRow key={`${item.id}-${item.branch}`} className="hover:bg-muted/10 border-border">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-xs sm:text-sm">{item.name}</span>
                        <span className="text-[8px] sm:text-[10px] text-muted-foreground font-mono">{item.sku}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-muted-foreground">
                        <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {item.branch}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-base sm:text-lg font-black text-foreground">{item.stock}</span>
                      <span className="text-[8px] sm:text-[10px] ml-1 font-bold text-muted-foreground uppercase">{item.unit || 'units'}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium text-xs sm:text-sm">{item.minStock}</TableCell>
                    <TableCell>
                      <Badge className={
                        item.status === "normal" ? "bg-success/10 text-success border-none text-[9px] sm:text-[10px]" : 
                        item.status === "low" ? "bg-warning/10 text-warning border-none text-[9px] sm:text-[10px]" : 
                        "bg-destructive/10 text-destructive border-none text-[9px] sm:text-[10px]"
                      }>
                        {item.status === "normal" ? "NORMAL" : item.status === "low" ? "LOW STOCK" : "OUT OF STOCK"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`text-[10px] sm:text-xs font-bold ${item.movement?.startsWith("+") ? "text-success" : "text-destructive"}`}>
                        {item.movement || "--"}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-muted-foreground">{item.lastUpdated || "--"}</div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}