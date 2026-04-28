"use client";
import React, { useState } from 'react';
import { Eye, RotateCcw, RefreshCw, ChevronDown, ChevronUp, Building2, Wallet, Printer, X, Receipt } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/ui/Dialog";
import ReceiptPrinter from "@/components/common/ui/PrintModel"; 

export interface SaleItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Sale {
  id: string;
  date: string;
  customer: string;
  cashier: string;
  branch?: string;
  items: SaleItem[];
  subtotal: number;
  discount?: number;
  discountAmount?: number;
  tax: number;
  total: number;
  amountPaid?: number;
  creditAmount?: number;
  paymentMethod: string;
  status: "completed" | "credit_pending" | "returned" | "partially_returned";
  returnable: boolean;
}

interface SalesHistoryTableProps {
  sales: Sale[];
  role?: "admin" | "staff" | "super-admin";
  onViewDetails?: (sale: Sale) => void;
  onReturn?: (sale: Sale) => void;
  onExchange?: (sale: Sale) => void;
  onSettleCredit?: (sale: Sale) => void;
}

export default function SalesHistoryTable({ 
  sales, 
  role = "admin", 
  onViewDetails, 
  onReturn, 
  onExchange, 
  onSettleCredit 
}: SalesHistoryTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [previewSale, setPreviewSale] = useState<Sale | null>(null);
  const [viewSale, setViewSale] = useState<Sale | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":      return <Badge className="bg-success/10 text-success border-none text-[9px] sm:text-[10px] font-bold">Completed</Badge>;
      case "credit_pending": return <Badge className="bg-warning/10 text-warning border-none text-[9px] sm:text-[10px] font-bold">Credit Pending</Badge>;
      case "returned":       return <Badge variant="destructive" className="text-[9px] sm:text-[10px]">Returned</Badge>;
      default:               return <Badge variant="outline" className="text-[9px] sm:text-[10px]">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="border-border shadow-lg overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-8"></TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Invoice & Branch</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Date</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Customer / Staff</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Total</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground text-center">Paid / Credit</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Status</TableHead>
                  <TableHead className="text-right font-black uppercase text-[9px] sm:text-[10px] text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <React.Fragment key={sale.id}>
                    <TableRow className="hover:bg-muted/5 border-b border-border/50">
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8" onClick={() => setExpandedRow(expandedRow === sale.id ? null : sale.id)}>
                          {expandedRow === sale.id ? <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-primary font-mono tracking-tight text-[10px] sm:text-xs">{sale.id}</span>
                          <span className="text-[8px] sm:text-[9px] flex items-center gap-1 text-muted-foreground uppercase font-bold">
                            <Building2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> {sale.branch || "Main Branch"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[10px] sm:text-[11px] font-medium text-foreground">{sale.date}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-[10px] sm:text-xs text-foreground">{sale.customer}</span>
                          <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase">{sale.cashier}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-xs sm:text-sm text-foreground">Rs. {sale.total.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        {sale.creditAmount && sale.creditAmount > 0 ? (
                          <div className="flex flex-col items-center">
                            <span className="text-[9px] sm:text-[10px] text-success font-bold">Paid: {sale.amountPaid}</span>
                            <span className="text-[9px] sm:text-[10px] text-error font-black uppercase">Due: {sale.creditAmount}</span>
                          </div>
                        ) : (
                          <Badge className="bg-success/10 text-success border-none text-[8px] sm:text-[9px] font-bold">PAID FULL</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(sale.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-0.5 sm:gap-1">
                          {/* VIEW ACTION */}
                          <Button variant="ghost" size="icon" onClick={() => setViewSale(sale)} className="h-7 w-7 sm:h-8 sm:w-8 text-info">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          
                          <ReceiptPrinter 
                            sale={sale} 
                            trigger={
                              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary" title="Print Receipt">
                                <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            }
                          />
                          
                          {role !== "staff" && sale.status === "credit_pending" && onSettleCredit && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-warning" onClick={() => onSettleCredit(sale)}>
                              <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          )}
                          
                          {role !== "staff" && sale.returnable && (
                            <>
                              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-warning" onClick={() => onReturn?.(sale)}>
                                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-primary" onClick={() => onExchange?.(sale)}>
                                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {expandedRow === sale.id && (
                      <TableRow className="bg-muted/10 border-l-4 border-primary">
                        <TableCell colSpan={8} className="p-3 sm:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                            <div className="space-y-2 sm:space-y-3">
                              <h4 className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground tracking-widest">Purchased Items</h4>
                              {sale.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-2 sm:p-3 bg-card rounded-lg border border-border shadow-sm">
                                  <span className="font-bold text-[11px] sm:text-sm text-foreground">
                                    {item.name} <span className="text-muted-foreground ml-1 sm:ml-2">x{item.quantity}</span>
                                  </span>
                                  <span className="font-black text-primary text-xs sm:text-sm">Rs. {item.total.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            <div className="bg-card p-4 sm:p-6 rounded-2xl border border-dashed flex flex-col justify-center space-y-2">
                              <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
                                <span>Subtotal</span><span>Rs. {sale.subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase text-primary">
                                <span>Total Taxes (20.5%)</span><span>Rs. {sale.tax.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-base sm:text-xl font-black pt-2 border-t border-border mt-2">
                                <span>Grand Total</span><span className="text-primary">Rs. {sale.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* SHARED VIEW DETAILS MODAL */}
      <Dialog open={!!viewSale} onOpenChange={() => setViewSale(null)}>
        <DialogContent className="max-w-2xl border-border shadow-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
              <Receipt className="text-primary" /> Invoice Summary
            </DialogTitle>
          </DialogHeader>
          {viewSale && (
            <div className="space-y-4 sm:space-y-6 py-4 uppercase">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 bg-muted/20 p-3 sm:p-4 rounded-xl border border-border">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground">Invoice ID</p>
                  <p className="font-bold text-primary font-mono text-xs sm:text-sm">{viewSale.id}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground">Transaction Date</p>
                  <p className="font-bold text-foreground text-xs sm:text-sm">{viewSale.date}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground">Customer</p>
                  <p className="font-bold text-foreground text-xs sm:text-sm">{viewSale.customer}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground">Cashier / Staff</p>
                  <p className="font-bold text-foreground text-xs sm:text-sm">{viewSale.cashier}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground tracking-widest">Item Details</p>
                <div className="border rounded-xl overflow-hidden">
                  <Table>
                    <TableBody>
                      {viewSale.items.map((item) => (
                        <TableRow key={item.id} className="bg-card">
                          <TableCell className="font-bold text-xs sm:text-sm text-foreground">{item.name}</TableCell>
                          <TableCell className="text-center font-medium text-xs sm:text-sm">Qty: {item.quantity}</TableCell>
                          <TableCell className="text-right font-black text-primary text-xs sm:text-sm">Rs. {item.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-end border-t pt-4">
                <div className="space-y-1">
                   <Badge variant="outline" className="font-bold text-[9px] sm:text-[10px]">{viewSale.paymentMethod}</Badge>
                   <p className="text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase">Payment Method</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground">Final Amount</p>
                  <p className="text-2xl sm:text-4xl font-black text-primary tracking-tighter">Rs. {viewSale.total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
          <Button onClick={() => setViewSale(null)} className="w-full font-black uppercase h-10 sm:h-12 shadow-lg">Close Details</Button>
        </DialogContent>
      </Dialog>

      {/* Receipt Preview Dialog */}
      <Dialog open={!!previewSale} onOpenChange={() => setPreviewSale(null)}>
        <DialogContent className="max-w-[400px] bg-white text-black p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="bg-muted p-4 border-b">
            <DialogTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Receipt Preview</DialogTitle>
          </DialogHeader>
          <div className="p-6 font-mono text-xs space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-black">SMART POS</h2>
              <p className="uppercase font-bold">Premium Retail Store</p>
              <p>No. 123, Galle Road, Colombo 03</p>
              <p>Tel: +94 11 234 5678</p>
            </div>
            <div className="border-y border-dashed border-black py-2 space-y-1 uppercase font-bold text-[10px]">
              <div className="flex justify-between"><span>Invoice:</span><span>{previewSale?.id}</span></div>
              <div className="flex justify-between"><span>Date:</span><span>{previewSale?.date}</span></div>
              <div className="flex justify-between"><span>Customer:</span><span>{previewSale?.customer}</span></div>
            </div>
            <div className="space-y-1">
              {previewSale?.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-black pt-2 space-y-1">
              <div className="flex justify-between font-black text-lg border-t border-black mt-2 pt-2 uppercase">
                <span>Total</span><span>Rs. {previewSale?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted border-t flex gap-2">
            <Button variant="outline" className="flex-1 font-bold uppercase" onClick={() => setPreviewSale(null)}>Cancel</Button>
            <ReceiptPrinter 
              sale={previewSale!} 
              trigger={<Button className="flex-1 bg-primary text-white font-black uppercase"><Printer className="w-4 h-4 mr-2" /> Print</Button>}
              onPrintComplete={() => setPreviewSale(null)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}