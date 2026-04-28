"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/Table";
import { ArrowRightLeft, Package, Building2 } from "lucide-react";

// Complete mock data for Stock Movements
const MOCK_MOVEMENTS = [
  { id: 1, date: "2026-04-18", product: "Coca Cola", type: "in", quantity: 50, reference: "PO-001", from: "Supplier ABC", to: "Main Branch" },
  { id: 2, date: "2026-04-18", product: "Bread", type: "out", quantity: 20, reference: "SALE-125", from: "Main Branch", to: "Customer" },
  { id: 3, date: "2026-04-17", product: "T-Shirt", type: "transfer", quantity: 8, reference: "GTN-101", from: "Main Branch", to: "Kandy Branch" },
  { id: 4, date: "2026-04-17", product: "Headphones", type: "in", quantity: 15, reference: "PO-002", from: "Supplier XYZ", to: "Main Branch" },
  { id: 5, date: "2026-04-16", product: "Mineral Water", type: "out", quantity: 12, reference: "SALE-126", from: "Kandy Branch", to: "Customer" },
  { id: 6, date: "2026-04-16", product: "Rice 5kg", type: "transfer", quantity: 10, reference: "GTN-102", from: "Main Branch", to: "Galle Branch" },
  { id: 7, date: "2026-04-15", product: "Coca Cola", type: "out", quantity: 30, reference: "SALE-127", from: "Main Branch", to: "Customer" },
  { id: 8, date: "2026-04-15", product: "Bread", type: "in", quantity: 40, reference: "PO-003", from: "Supplier ABC", to: "Kandy Branch" },
];

interface StockMovementsTableProps {
  movements?: any[];
}

export default function StockMovementsTable({ movements = MOCK_MOVEMENTS }: StockMovementsTableProps) {
  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Stock Movement History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-foreground font-semibold text-[10px] sm:text-xs">Date</TableHead>
                <TableHead className="text-foreground font-semibold text-[10px] sm:text-xs">Product</TableHead>
                <TableHead className="text-foreground font-semibold text-[10px] sm:text-xs">Type</TableHead>
                <TableHead className="text-foreground font-semibold text-[10px] sm:text-xs">Movement</TableHead>
                <TableHead className="text-foreground font-semibold text-[10px] sm:text-xs">Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No movement records found
                  </TableCell>
                </TableRow>
              ) : (
                movements.map((movement) => (
                  <TableRow key={movement.id} className="hover:bg-muted/10 transition-colors border-border">
                    <TableCell className="text-foreground text-xs sm:text-sm">{movement.date}</TableCell>
                    <TableCell className="font-medium text-foreground text-xs sm:text-sm">{movement.product}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          movement.type === "in" ? "default" : 
                          movement.type === "out" ? "destructive" : 
                          "outline"
                        }
                        className="rounded-md px-2 py-0.5 text-[9px] sm:text-xs"
                      >
                        {movement.type === "in" ? "Stock In" : 
                         movement.type === "out" ? "Stock Out" : 
                         "Transfer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
                          <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                          <span className="text-foreground truncate max-w-[80px] sm:max-w-none">{movement.from}</span>
                          <ArrowRightLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                          <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                          <span className="text-foreground truncate max-w-[80px] sm:max-w-none">{movement.to}</span>
                        </div>
                        <span className={`text-[10px] sm:text-sm font-bold ${
                          movement.type === "in" ? "text-success" : 
                          movement.type === "out" ? "text-destructive" : 
                          "text-primary"
                        }`}>
                          {movement.type === "in" ? "+" : 
                           movement.type === "out" ? "-" : 
                           "⇄"} {movement.quantity} units
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-[10px] sm:text-sm text-muted-foreground">{movement.reference}</span>
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