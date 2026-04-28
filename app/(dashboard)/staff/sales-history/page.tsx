"use client";

import { useState } from "react";
import { History, Download, Eye } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/ui/Dialog";

// SHARED COMPONENTS
import SalesHistoryTable from "@/components/common/shared/sales-history/SalesHistoryTable";
import SalesSummary from "@/components/common/shared/sales-history/SalesSummary";

export default function StaffSalesHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);

  const staffSales: any[] = [
    {
      id: "INV-2026-001",
      date: "2026-03-19 10:30 AM",
      customer: "John Doe",
      cashier: "Staff Member",
      items: [{ id: 1, name: "Coca Cola", price: 150, quantity: 2, total: 300 }],
      subtotal: 300, tax: 60, total: 360, amountPaid: 360, creditAmount: 0,
      paymentMethod: "Cash", status: "completed", returnable: false,
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <History className="w-6 h-6 sm:w-8 sm:h-8 text-primary" /> My Sales History
        </h1>
        <Button variant="outline" size="sm" className="text-[10px] sm:text-xs h-9 sm:h-10">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Export My Log
        </Button>
      </div>

      <SalesSummary sales={staffSales} />

      <Input 
        placeholder="Search my transactions..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="max-w-md text-sm"
      />

      <SalesHistoryTable 
        sales={staffSales} 
        role="staff" 
        onViewDetails={(s) => { setSelectedSale(s); setViewModalOpen(true); }} 
      />

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-black uppercase">Transaction Details - {selectedSale?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
             {selectedSale?.items.map((item: any) => (
               <div key={item.id} className="flex justify-between border-b py-2 text-xs sm:text-sm">
                 <span>{item.name} x {item.quantity}</span>
                 <span className="font-bold">Rs. {item.total}</span>
               </div>
             ))}
             <div className="text-right font-black text-lg sm:text-xl text-primary">Total: Rs. {selectedSale?.total}</div>
          </div>
          <Button className="w-full mt-4 font-black uppercase" onClick={() => setViewModalOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}