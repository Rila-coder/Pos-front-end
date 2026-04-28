"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Badge } from "@/components/common/ui/Badge";
import { 
  Search, 
  Receipt, 
  RefreshCcw, 
  Printer, 
  Calendar, 
  User, 
  ArrowUpRight,
  Eye
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/Table";

const mockSales = [
  { id: "INV-1024", time: "10:30 AM", customer: "John Doe", items: 3, total: 1250.00, method: "Cash", status: "Completed" },
  { id: "INV-1025", time: "11:15 AM", customer: "Walk-in", items: 1, total: 450.00, method: "LANKAQR", status: "Completed" },
  { id: "INV-1026", time: "11:45 AM", customer: "Jane Smith", items: 5, total: 8900.00, method: "Card", status: "Returned" },
  { id: "INV-1027", time: "12:10 PM", customer: "Walk-in", items: 2, total: 1100.00, method: "Cash", status: "Completed" },
];

export default function SalesHistory() {
  const [search, setSearch] = useState("");

  return (
    <Card className="shadow-lg border-border overflow-hidden">
      <CardHeader className="bg-muted/20 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-black uppercase tracking-tight">Recent Transactions</CardTitle>
              <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">Today's Sales Records</p>
            </div>
          </div>
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <Input 
              placeholder="Search Invoice # or Customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 sm:pl-9 bg-background border-border h-9 sm:h-10 text-xs"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Invoice #</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Time</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Customer</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Payment</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase text-right">Total Amount</TableHead>
                <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Status</TableHead>
                <TableHead className="text-right text-[9px] sm:text-[10px] font-black uppercase">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSales.map((sale) => (
                <TableRow key={sale.id} className="hover:bg-muted/20 transition-colors group">
                  <TableCell className="font-bold text-[10px] sm:text-xs">{sale.id}</TableCell>
                  <TableCell className="text-muted-foreground text-[10px] sm:text-xs">{sale.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs font-medium">
                      <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary/60" /> {sale.customer}
                    </div>
                  </TableCell>
                  <TableCell className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground italic">
                    {sale.method}
                  </TableCell>
                  <TableCell className="text-right font-black text-xs sm:text-sm">
                    Rs. {sale.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-[8px] sm:text-[9px] uppercase font-bold border-none ${
                      sale.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 hover:text-primary">
                        <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-warning/10 hover:text-warning">
                        <RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* DAY SUMMARY FOOTER */}
        <div className="p-3 sm:p-4 bg-muted/10 border-t flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex gap-4">
            <div>
              <p className="text-[8px] sm:text-[9px] font-black text-muted-foreground uppercase">Cash Total</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">Rs. 2,350.00</p>
            </div>
            <div>
              <p className="text-[8px] sm:text-[9px] font-black text-muted-foreground uppercase">Card Total</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">Rs. 8,900.00</p>
            </div>
          </div>
          <Button className="h-8 sm:h-9 bg-primary font-black text-[9px] sm:text-[10px] uppercase tracking-widest">
            View Detailed Report <ArrowUpRight className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}