"use client";

import { useState } from "react";
import { History, Download, Building2, Search } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { Label } from "@/components/common/ui/Label";

// SHARED COMPONENTS
import SalesHistoryTable, {
  Sale,
} from "@/components/common/shared/sales-history/SalesHistoryTable";
import SalesSummary from "@/components/common/shared/sales-history/SalesSummary";
import ReturnExchangeModal from "@/components/common/shared/sales-history/ReturnExchangeModal";

export default function SuperAdminGlobalSalesPage() {
  const [search, setSearch] = useState("");

  // MODAL STATES
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [settleAmount, setSettleAmount] = useState("");

  const globalSales: Sale[] = [
    {
      id: "INV-HQ-001",
      date: "2026-03-19 11:00 AM",
      customer: "Global Client",
      cashier: "Admin",
      branch: "Colombo HQ",
      items: [
        { id: 10, name: "Bulk Item", price: 5000, quantity: 1, total: 5000 },
      ],
      subtotal: 5000,
      tax: 1000,
      total: 6000,
      amountPaid: 6000,
      creditAmount: 0,
      paymentMethod: "Bank Transfer",
      status: "completed",
      returnable: true,
    },
    {
      id: "INV-KN-002",
      date: "2026-03-19 12:00 PM",
      customer: "Kandy Local",
      cashier: "Staff B",
      branch: "Kandy Branch",
      items: [
        { id: 11, name: "Food Item", price: 200, quantity: 2, total: 400 },
      ],
      subtotal: 400,
      tax: 80,
      total: 480,
      amountPaid: 0,
      creditAmount: 480,
      paymentMethod: "Credit",
      status: "credit_pending",
      returnable: true,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
            <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Global
            Sales History
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">
            Consolidated monitoring across branch network
          </p>
        </div>
        <Button
          variant="default"
          className="bg-primary text-white font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-6"
        >
          <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Global Report
        </Button>
      </div>

      <SalesSummary sales={globalSales} />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            placeholder="Search all branches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[200px] h-10 sm:h-11">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="colombo">Colombo HQ</SelectItem>
            <SelectItem value="kandy">Kandy Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SalesHistoryTable
        sales={globalSales}
        role="super-admin"
        onSettleCredit={(s) => {
          setSelectedSale(s);
          setSettleAmount(s.creditAmount?.toString() || "");
          setSettleModalOpen(true);
        }}
        onReturn={(s) => {
          setSelectedSale(s);
          setReturnModalOpen(true);
        }}
        onExchange={(s) => {
          setSelectedSale(s);
          setExchangeModalOpen(true);
        }}
      />

      {/* GLOBAL SETTLEMENT MODAL */}
      <Dialog open={settleModalOpen} onOpenChange={setSettleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-black uppercase">
              Global Credit Settlement
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-center">
            <div className="bg-muted p-4 rounded-xl">
              <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">
                Outstanding at {selectedSale?.branch}
              </p>
              <p className="text-2xl sm:text-3xl font-black text-destructive tracking-tighter">
                Rs. {selectedSale?.creditAmount}
              </p>
            </div>
            <div className="text-left space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase">
                Settlement Amount
              </Label>
              <Input
                type="number"
                value={settleAmount}
                onChange={(e) => setSettleAmount(e.target.value)}
                className="h-10 sm:h-12 text-base sm:text-lg font-bold"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSettleModalOpen(false)}
              className="uppercase font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Global payment recorded!");
                setSettleModalOpen(false);
              }}
              className="bg-primary uppercase font-black"
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SHARED RETURN/EXCHANGE COMPONENTS */}
      <ReturnExchangeModal
        open={returnModalOpen}
        onOpenChange={setReturnModalOpen}
        sale={selectedSale}
        type="return"
      />
      <ReturnExchangeModal
        open={exchangeModalOpen}
        onOpenChange={setExchangeModalOpen}
        sale={selectedSale}
        type="exchange"
      />
    </div>
  );
}
