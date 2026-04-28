"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { 
  ArrowRightLeft, 
  MoveRight, 
  Building2, 
  Package, 
  History,
  CheckCircle2,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import { Badge } from "@/components/common/ui/Badge";

// Complete mock data for transfer history
const MOCK_TRANSFERS = [
  { id: "GTN-105", item: "Coca Cola", qty: 30, from: "Main Branch", to: "Kandy Branch", status: "completed", date: "2026-04-18" },
  { id: "GTN-104", item: "Rice 5kg", qty: 15, from: "Main Branch", to: "Galle Branch", status: "completed", date: "2026-04-17" },
  { id: "GTN-103", item: "Headphones", qty: 5, from: "Main Branch", to: "Kandy Branch", status: "pending", date: "2026-04-16" },
  { id: "GTN-102", item: "T-Shirt", qty: 10, from: "Main Branch", to: "Kandy Branch", status: "completed", date: "2026-04-15" },
  { id: "GTN-101", item: "Mineral Water", qty: 20, from: "Main Branch", to: "Galle Branch", status: "pending", date: "2026-04-14" },
];

export default function StockTransfer() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transfers] = useState(MOCK_TRANSFERS);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Stock Transfer Requested (GTN-106)");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      
      {/* Transfer Form */}
      <Card className="border-border shadow-lg lg:col-span-1 h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground">
            <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            New Stock Transfer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer} className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">Select Product</Label>
              <Select>
                <SelectTrigger className="h-10 sm:h-12 bg-muted/20 border-border text-sm">
                  <SelectValue placeholder="Search Product..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coke">Coca Cola (45 in stock)</SelectItem>
                  <SelectItem value="bread">Bread (30 in stock)</SelectItem>
                  <SelectItem value="tshirt">T-Shirt (5 in stock)</SelectItem>
                  <SelectItem value="water">Mineral Water (0 in stock)</SelectItem>
                  <SelectItem value="rice">Rice 5kg (8 in stock)</SelectItem>
                  <SelectItem value="headphones">Headphones (15 in stock)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">From Branch</Label>
                <Select defaultValue="main">
                  <SelectTrigger className="h-10 sm:h-12 bg-muted/20 border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Branch (Warehouse)</SelectItem>
                    <SelectItem value="kandy">Kandy Branch</SelectItem>
                    <SelectItem value="galle">Galle Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center -my-2">
                <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                  <MoveRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">To Branch</Label>
                <Select>
                  <SelectTrigger className="h-10 sm:h-12 bg-muted/20 border-border text-sm">
                    <SelectValue placeholder="Select Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kandy">Kandy Branch</SelectItem>
                    <SelectItem value="galle">Galle Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">Quantity to Move</Label>
              <Input 
                type="number" 
                placeholder="0" 
                className="h-10 sm:h-12 bg-muted/20 border-border text-base sm:text-lg font-bold text-foreground" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">Reason (Optional)</Label>
              <Input 
                type="text" 
                placeholder="e.g., Stock redistribution" 
                className="h-10 sm:h-12 bg-muted/20 border-border text-sm text-foreground" 
              />
            </div>

            <Button 
              disabled={isProcessing}
              className="w-full h-10 sm:h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:bg-primary-hover text-xs sm:text-sm"
            >
              {isProcessing ? "Processing..." : "Initiate Transfer"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Transfer History / Recent Transfers */}
      <Card className="border-border shadow-lg lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground">
            <History className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            Recent GTN (Transfer Notes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {transfers.length === 0 ? (
              <div className="text-center py-8 sm:py-12 text-muted-foreground">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No transfer history found</p>
              </div>
            ) : (
              transfers.map((t) => (
                <div 
                  key={t.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-border bg-muted/5 transition-all hover:bg-muted/20"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-card rounded-xl border border-border shadow-sm">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">{t.item} ({t.qty} units)</h4>
                      <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase font-mono tracking-tighter">
                        {t.id} • {t.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-8">
                    <div className="hidden md:flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-bold text-muted-foreground">
                        <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {t.from} 
                        <MoveRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> 
                        <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {t.to}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {t.status === 'completed' ? (
                        <>
                          <Badge variant="default" className="bg-success text-success-foreground text-[9px] sm:text-[10px]">
                            Completed
                          </Badge>
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                        </>
                      ) : (
                        <>
                          <Badge variant="outline" className="text-warning border-warning text-[9px] sm:text-[10px]">
                            Pending
                          </Badge>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-warning" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}