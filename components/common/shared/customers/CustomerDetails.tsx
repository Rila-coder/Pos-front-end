"use client";

import { useState } from "react";
import { Phone, Mail, Award, Wallet, History, TrendingUp, CheckCircle, Edit } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/common/ui/Dialog";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import AddCustomerDialog from "./AddCustomerDialog";

export default function CustomerDetails({ customer, role, onCreditSettled, onUpdateCustomer }: any) {
  const [showSettle, setShowSettle] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [amount, setAmount] = useState("");

  if (!customer) return <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">Select a customer...</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="shadow-lg border-border">
        <CardHeader className="bg-muted/20 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl sm:text-2xl font-black border border-primary/20">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">{customer.name}</h2>
                <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 text-muted-foreground font-medium uppercase text-[9px] sm:text-[10px]">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-primary" /> {customer.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-primary" /> {customer.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {role !== "staff" && (
                <Button variant="outline" size="icon" onClick={() => setShowEdit(true)} className="h-9 w-9 sm:h-10 sm:w-10 border-border hover:bg-muted">
                  <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              )}
              {role !== "staff" && customer.credit > 0 && (
                <Button onClick={() => setShowSettle(true)} className="bg-error hover:bg-error/90 text-white font-black uppercase text-[9px] sm:text-xs h-9 sm:h-10 px-3 sm:px-4">
                  <Wallet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Settle
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-primary/5 p-3 sm:p-4 rounded-2xl border border-primary/10">
              <p className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-tighter">Loyalty Points</p>
              <h3 className="text-base sm:text-xl font-black text-foreground mt-1 flex items-center gap-2"><Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> {customer.points}</h3>
            </div>
            <div className="bg-success/5 p-3 sm:p-4 rounded-2xl border border-success/10">
              <p className="text-[9px] sm:text-[10px] font-black text-success uppercase tracking-tighter">Total Purchases</p>
              <h3 className="text-base sm:text-xl font-black text-foreground mt-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" /> Rs.{customer.purchases.toLocaleString()}</h3>
            </div>
            <div className="bg-error/5 p-3 sm:p-4 rounded-2xl border border-error/10">
              <p className="text-[9px] sm:text-[10px] font-black text-error uppercase tracking-tighter">Outstanding</p>
              <h3 className="text-base sm:text-xl font-black text-error mt-1 flex items-center gap-2"><Wallet className="w-4 h-4 sm:w-5 sm:h-5" /> Rs.{customer.credit.toLocaleString()}</h3>
            </div>
          </div>

          <Tabs defaultValue="history">
            <TabsList className="bg-muted/50 p-1 mb-4">
              <TabsTrigger value="history" className="uppercase font-bold text-[9px] sm:text-[10px]">Purchase History</TabsTrigger>
              <TabsTrigger value="ledger" className="uppercase font-bold text-[9px] sm:text-[10px]">Credit Ledger</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Invoice</TableHead>
                      <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Date</TableHead>
                      <TableHead className="text-right text-[9px] sm:text-[10px] font-black uppercase">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold text-[10px] sm:text-xs">INV-001</TableCell>
                      <TableCell className="text-[10px] sm:text-xs">2026-03-10</TableCell>
                      <TableCell className="text-right font-black text-[10px] sm:text-xs">Rs. 1,250</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="ledger">
               {customer.credit === 0 ? (
                 <div className="text-center py-8 sm:py-10 opacity-30 flex flex-col items-center">
                    <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-2 text-success"/>
                    <p className="font-black uppercase text-[10px] sm:text-xs">All Dues Settled</p>
                 </div>
               ) : (
                 <div className="overflow-x-auto">
                   <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Date</TableHead>
                          <TableHead className="text-[9px] sm:text-[10px] font-black uppercase">Status</TableHead>
                          <TableHead className="text-right text-[9px] sm:text-[10px] font-black uppercase">Remaining</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-[10px] sm:text-xs">2026-03-18</TableCell>
                          <TableCell><Badge className="bg-warning/10 text-warning border-none text-[8px] sm:text-[9px] uppercase">Pending</Badge></TableCell>
                          <TableCell className="text-right font-black text-error text-[10px] sm:text-xs">Rs. {customer.credit}</TableCell>
                        </TableRow>
                      </TableBody>
                   </Table>
                 </div>
               )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddCustomerDialog 
        open={showEdit} 
        onOpenChange={setShowEdit} 
        initialData={customer} 
        onSave={onUpdateCustomer} 
      />

      <Dialog open={showSettle} onOpenChange={setShowSettle}>
        <DialogContent className="border-border">
          <DialogHeader>
            <DialogTitle className="uppercase font-black tracking-tighter text-foreground text-base sm:text-lg">Settle Customer Debt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-center">
            <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">Remaining Balance</p>
            <p className="text-3xl sm:text-4xl font-black text-error tracking-tighter">Rs. {customer.credit.toLocaleString()}</p>
            <div className="text-left space-y-2 mt-4">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase">Payment Received (Rs.)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-10 sm:h-12 text-base sm:text-lg font-bold border-border" autoFocus />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettle(false)} className="uppercase font-bold text-[9px] sm:text-xs">Cancel</Button>
            <Button onClick={() => { onCreditSettled(customer.id, parseFloat(amount)); setShowSettle(false); setAmount(""); }} className="bg-primary uppercase font-black text-[9px] sm:text-xs">Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}