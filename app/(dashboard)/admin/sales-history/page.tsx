"use client";

import { useState } from "react";
import { History, Filter, Download, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/common/ui/Dialog";
import { Label } from "@/components/common/ui/Label";

// SHARED COMPONENTS
import SalesHistoryTable, { Sale } from "@/components/common/shared/sales-history/SalesHistoryTable";
import SalesSummary from "@/components/common/shared/sales-history/SalesSummary";
import ReturnExchangeModal from "@/components/common/shared/sales-history/ReturnExchangeModal";

// MOCK DATA
const mockSales: Sale[] = [
  {
    id: "INV-2026-001",
    date: "2026-03-19 10:30 AM",
    customer: "John Doe",
    cashier: "Kamal (Cashier)",
    branch: "Main Branch",
    items: [
      { id: 1, name: "Coca Cola", price: 150, quantity: 2, total: 300 },
      { id: 2, name: "Bread", price: 120, quantity: 1, total: 120 },
    ],
    subtotal: 420,
    tax: 86.1,
    total: 506.1,
    amountPaid: 506.1,
    creditAmount: 0,
    paymentMethod: "Cash",
    status: "completed",
    returnable: true,
  },
  {
    id: "INV-2026-003",
    date: "2026-03-18 04:45 PM",
    customer: "Bob Wilson",
    cashier: "Sarah (Sales)",
    branch: "Main Branch",
    items: [{ id: 5, name: "T-Shirt", price: 1200, quantity: 2, total: 2400 }],
    subtotal: 2400,
    tax: 492,
    total: 2892,
    amountPaid: 2000,
    creditAmount: 892,
    paymentMethod: "Mixed",
    status: "credit_pending",
    returnable: true,
  },
];

export default function AdminSalesHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [settleAmount, setSettleAmount] = useState("");

  const filteredSales = mockSales.filter((sale) =>
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
  <History className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Sales History
</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-tighter">Branch Audit & Returns</p>
        </div>
        <Button variant="outline" className="font-bold uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-6">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" /> Export Log
        </Button>
      </div>

      <SalesSummary sales={mockSales} />

      <Card className="border-border shadow-sm bg-card">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
               <Input
                  placeholder="Search Invoice or Customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 sm:pl-9 bg-muted/20 text-sm"
                />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-45 h-10 sm:h-11">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="credit_pending">Credit Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="all" className="uppercase font-bold text-[9px] sm:text-[10px]">All Transactions</TabsTrigger>
          <TabsTrigger value="credit" className="uppercase font-bold text-[9px] sm:text-[10px]">Credit Sales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <SalesHistoryTable
            sales={filteredSales}
            role="admin"
            onViewDetails={(s: Sale) => { setSelectedSale(s); setViewModalOpen(true); }}
            onReturn={(s: Sale) => { setSelectedSale(s); setReturnModalOpen(true); }}
            onExchange={(s: Sale) => { setSelectedSale(s); setExchangeModalOpen(true); }}
            onSettleCredit={(s: Sale) => { 
              setSelectedSale(s); 
              setSettleAmount(s.creditAmount?.toString() || ""); 
              setSettleModalOpen(true); 
            }}
          />
        </TabsContent>

        <TabsContent value="credit">
          <SalesHistoryTable
            sales={filteredSales.filter(s => s.status === "credit_pending")}
            role="admin"
            onViewDetails={(s: Sale) => { setSelectedSale(s); setViewModalOpen(true); }}
            onSettleCredit={(s: Sale) => { 
              setSelectedSale(s); 
              setSettleAmount(s.creditAmount?.toString() || ""); 
              setSettleModalOpen(true); 
            }}
          />
        </TabsContent>
      </Tabs>

      {/* VIEW DETAILS MODAL */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-black uppercase">Order Summary - {selectedSale?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6 py-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm font-bold uppercase text-muted-foreground">
                <div>Customer: <span className="text-foreground">{selectedSale?.customer}</span></div>
                <div>Cashier: <span className="text-foreground">{selectedSale?.cashier}</span></div>
                <div>Date: <span className="text-foreground">{selectedSale?.date}</span></div>
                <div>Payment: <span className="text-foreground">{selectedSale?.paymentMethod}</span></div>
             </div>
             <div className="space-y-2 border-t pt-4">
                {selectedSale?.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between font-bold text-xs sm:text-sm bg-muted/20 p-2 rounded-lg">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs. {item.total}</span>
                  </div>
                ))}
             </div>
             <div className="text-right border-t pt-4">
                <p className="text-xl sm:text-2xl font-black text-primary uppercase">Total: Rs. {selectedSale?.total}</p>
             </div>
          </div>
          <Button onClick={() => setViewModalOpen(false)} className="w-full uppercase font-black">Close Details</Button>
        </DialogContent>
      </Dialog>

      {/* Settlement Modal */}
      <Dialog open={settleModalOpen} onOpenChange={setSettleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-black uppercase">Settle Credit - {selectedSale?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-center">
            <div className="bg-warning/10 p-4 rounded-lg font-black text-xl sm:text-2xl text-warning">Rs. {selectedSale?.creditAmount}</div>
            <div className="text-left space-y-1">
              <Label className="text-[10px] font-black uppercase">Amount to Pay</Label>
              <Input 
                type="number" 
                value={settleAmount} 
                onChange={(e) => setSettleAmount(e.target.value)} 
                className="h-10 sm:h-11"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettleModalOpen(false)}>Cancel</Button>
            <Button onClick={() => { alert("Settled!"); setSettleModalOpen(false); }}>Confirm Settlement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ReturnExchangeModal open={returnModalOpen} onOpenChange={setReturnModalOpen} sale={selectedSale} type="return" />
      <ReturnExchangeModal open={exchangeModalOpen} onOpenChange={setExchangeModalOpen} sale={selectedSale} type="exchange" />
    </div>
  );
}