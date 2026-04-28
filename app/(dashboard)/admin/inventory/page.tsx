"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { MapPin, Package, AlertTriangle, IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";

// SHARED COMPONENTS
import StockLevelsTable from "@/components/common/shared/inventory/StockLevelsTable";
import StockMovementsTable from "@/components/admin/inventory/StockMovementsTable";
import LowStockAlerts from "@/components/admin/inventory/LowStockAlerts";
import StockTransferRequest from "@/components/admin/inventory/StockTransferRequest";
import StockTransferReceive from "@/components/admin/inventory/StockTransferReceive";
import StockTransfer from "@/components/admin/inventory/StockTransfer";

// Mock data for Admin Inventory Page
const ADMIN_INVENTORY = [
  { id: 1, name: "Coca Cola", sku: "SKU001", branch: "Main Branch", stock: 45, unit: "Bottle", minStock: 20, status: "normal", movement: "+15", lastUpdated: "2026-04-18" },
  { id: 2, name: "Bread", sku: "SKU002", branch: "Main Branch", stock: 30, unit: "Loaf", minStock: 25, status: "normal", movement: "-5", lastUpdated: "2026-04-17" },
  { id: 3, name: "T-Shirt", sku: "SKU005", branch: "Main Branch", stock: 5, unit: "Pcs", minStock: 10, status: "low", movement: "-8", lastUpdated: "2026-04-16" },
  { id: 4, name: "Mineral Water", sku: "SKU006", branch: "Main Branch", stock: 0, unit: "Bottle", minStock: 20, status: "out", movement: "-12", lastUpdated: "2026-04-15" },
  { id: 5, name: "Headphones", sku: "SKU007", branch: "Main Branch", stock: 15, unit: "Pcs", minStock: 10, status: "normal", movement: "+5", lastUpdated: "2026-04-18" },
  { id: 6, name: "Rice 5kg", sku: "SKU008", branch: "Main Branch", stock: 8, unit: "Bag", minStock: 15, status: "low", movement: "-7", lastUpdated: "2026-04-17" },
];

export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const branchName = "Main Branch";

  const filteredInventory = ADMIN_INVENTORY.filter(item => 
    (selectedBranch === "all" || item.branch.toLowerCase().includes(selectedBranch.toLowerCase())) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tighter">Inventory Hub</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-tighter">Branch Stock Management</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <MapPin className="text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
          <Select onValueChange={(v) => setSelectedBranch(v)} defaultValue="main">
            <SelectTrigger className="w-[160px] sm:w-[200px] bg-card h-10 sm:h-11">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="main">Main Branch</SelectItem>
              <SelectItem value="kandy">Kandy Branch</SelectItem>
              <SelectItem value="galle">Galle Branch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Total Stock" value="850" color="text-primary" icon={<Package />} />
        <StatCard title="Low Stock" value="3" color="text-warning" icon={<AlertTriangle />} />
        <StatCard title="Out of Stock" value="1" color="text-destructive" icon={<AlertTriangle />} />
        <StatCard title="Value" value="Rs. 2.5M" color="text-primary" icon={<IndianRupee />} />
      </div>

      <Tabs defaultValue="levels" className="space-y-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-muted/50 p-1 w-max min-w-full sm:min-w-0">
            <TabsTrigger value="levels" className="uppercase font-bold text-[9px] sm:text-[10px]">Stock Levels</TabsTrigger>
            <TabsTrigger value="movements" className="uppercase font-bold text-[9px] sm:text-[10px]">Movements</TabsTrigger>
            <TabsTrigger value="request" className="uppercase font-bold text-[9px] sm:text-[10px]">Request Stock</TabsTrigger>
            <TabsTrigger value="receive" className="uppercase font-bold text-[9px] sm:text-[10px]">Receive & Ship</TabsTrigger>
            <TabsTrigger value="transfer" className="uppercase font-bold text-[9px] sm:text-[10px]">Direct Transfer</TabsTrigger>
            <TabsTrigger value="alerts" className="uppercase font-bold text-[9px] sm:text-[10px]">Alerts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="levels">
          <StockLevelsTable inventory={filteredInventory} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </TabsContent>

        <TabsContent value="movements">
          <StockMovementsTable />
        </TabsContent>

        <TabsContent value="request">
          <StockTransferRequest branchName={branchName} />
        </TabsContent>

        <TabsContent value="receive">
          <StockTransferReceive branchName={branchName} />
        </TabsContent>

        <TabsContent value="transfer">
          <StockTransfer />
        </TabsContent>

        <TabsContent value="alerts">
          <LowStockAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border p-3 sm:p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">{title}</p>
        <h3 className={`text-lg sm:text-2xl font-black mt-1 ${color}`}>{value}</h3>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl bg-muted ${color}`}>{icon}</div>
    </div>
  );
}