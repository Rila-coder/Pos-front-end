"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { Package, AlertTriangle, Building2, Search } from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";

// SHARED COMPONENTS
import StockLevelsTable from "@/components/common/shared/inventory/StockLevelsTable";
import StockTransferApproval from "@/components/super-admin/inventory/StockTransferApproval";
import LowStockAlerts from "@/components/super-admin/inventory/LowStockAlerts";
import StockMovementsTable from "@/components/super-admin/inventory/StockMovementsTable";
import StockTransfer from "@/components/super-admin/inventory/StockTransfer";

// Complete mock data for Super Admin (All Branches)
const GLOBAL_INVENTORY = [
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

export default function SuperAdminInventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");

  const filteredInventory = GLOBAL_INVENTORY.filter(item =>
    (branchFilter === "all" || item.branch.toLowerCase().includes(branchFilter.toLowerCase())) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const lowStockCount = GLOBAL_INVENTORY.filter(i => i.status === "low" || i.status === "out").length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
          <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8"/> Global Inventory
        </h1>
        {lowStockCount > 0 && (
          <div className="flex items-center gap-2 bg-warning/10 text-warning px-2 sm:px-3 py-1.5 sm:py-2 rounded-full">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{lowStockCount} Low Stock Alerts</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground"/>
          <Input 
            placeholder="Search all products across branches..." 
            className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11">
            <SelectValue placeholder="All Branches"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch</SelectItem>
            <SelectItem value="kandy">Kandy Branch</SelectItem>
            <SelectItem value="galle">Galle Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="stock" className="space-y-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-muted/50 p-1 w-max min-w-full sm:min-w-0">
            <TabsTrigger value="stock" className="uppercase font-bold text-[9px] sm:text-[10px]">Stock Overview</TabsTrigger>
            <TabsTrigger value="movements" className="uppercase font-bold text-[9px] sm:text-[10px]">Movements</TabsTrigger>
            <TabsTrigger value="transfer" className="uppercase font-bold text-[9px] sm:text-[10px]">Direct Transfer</TabsTrigger>
            <TabsTrigger value="approvals" className="uppercase font-bold text-[9px] sm:text-[10px]">Transfer Approvals</TabsTrigger>
            <TabsTrigger value="alerts" className="uppercase font-bold text-[9px] sm:text-[10px]">Alerts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="stock">
          <StockLevelsTable inventory={filteredInventory} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </TabsContent>

        <TabsContent value="movements">
          <StockMovementsTable />
        </TabsContent>

        <TabsContent value="transfer">
          <StockTransfer />
        </TabsContent>

        <TabsContent value="approvals">
          <StockTransferApproval />
        </TabsContent>

        <TabsContent value="alerts">
          <LowStockAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}