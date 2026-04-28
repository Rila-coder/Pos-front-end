"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Phone, Mail, MapPin, Wallet, Eye, Building2, User, Package } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/common/ui/Dialog";
import { Label } from "@/components/common/ui/Label";
import AddSupplierDialog from "./AddSupplierDialog";

export default function SupplierTable({ 
  suppliers, 
  searchQuery, 
  onSearchChange, 
  role, 
  onUpdateSupplier, 
  onDeleteSupplier 
}: any) {
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [settleAmount, setSettleAmount] = useState("");

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsEditOpen(true);
  };

  const handleView = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsViewOpen(true);
  };

  const handleSettleClick = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSettleAmount(supplier.balance?.toString() || "0");
    setSettleModalOpen(true);
  };

  const handleConfirmSettle = () => {
    const updated = { ...selectedSupplier, balance: Math.max(0, selectedSupplier.balance - parseFloat(settleAmount)) };
    onUpdateSupplier(updated);
    setSettleModalOpen(false);
    alert("Vendor Balance Updated Successfully");
  };

  return (
    <>
      <Card className="shadow-lg border-border overflow-hidden bg-card">
        <CardHeader className="pb-2 sm:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <CardTitle className="text-base sm:text-xl font-black uppercase tracking-tighter text-foreground">
              {role === "super-admin" ? "Global Supplier Directory" : "Supplier Directory"}
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input 
                placeholder="Search vendor..." 
                value={searchQuery} 
                onChange={(e) => onSearchChange(e.target.value)} 
                className="pl-8 sm:pl-9 bg-muted/20 border-border h-9 sm:h-11 text-sm" 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30">
                  <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-foreground">Company</TableHead>
                  <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-foreground">Contact Info</TableHead>
                  {role === "super-admin" && <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-foreground">Branch</TableHead>}
                  <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-center text-foreground">Items</TableHead>
                  {role !== "staff" && (
                    <>
                      <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-right text-foreground">Volume</TableHead>
                      <TableHead className="font-black text-[9px] sm:text-[10px] uppercase text-right text-foreground">Balance</TableHead>
                    </>
                  )}
                  <TableHead className="text-right font-black text-[9px] sm:text-[10px] uppercase text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier: any) => (
                  <TableRow key={supplier.id} className="hover:bg-muted/10 transition-colors border-border">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-xs sm:text-sm uppercase">{supplier.name}</span>
                        <span className="text-[8px] sm:text-[10px] text-muted-foreground font-medium">{supplier.contact}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 sm:gap-1">
                        <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-bold"><Phone className="w-2 h-2 sm:w-3 sm:h-3 text-primary" /> {supplier.phone}</div>
                        <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-muted-foreground"><Mail className="w-2 h-2 sm:w-3 sm:h-3" /> {supplier.email}</div>
                      </div>
                    </TableCell>
                    {role === "super-admin" && (
                      <TableCell><Badge variant="outline" className="text-[8px] sm:text-[9px] uppercase font-bold text-primary border-border">{supplier.branch || "Main"}</Badge></TableCell>
                    )}
                    <TableCell className="text-center"><Badge className="font-black bg-secondary text-foreground text-[10px] sm:text-xs">{supplier.products}</Badge></TableCell>
                    {role !== "staff" && (
                      <>
                        <TableCell className="text-right text-[10px] sm:text-xs font-bold text-foreground">Rs.{supplier.totalPurchases?.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-black">
                          <span className={supplier.balance > 0 ? "text-error" : "text-success"}>{supplier.balance > 0 ? `Rs.${supplier.balance?.toLocaleString()}` : "Cleared"}</span>
                        </TableCell>
                      </>
                    )}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-0.5 sm:gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleView(supplier)} className="h-7 w-7 sm:h-8 sm:w-8 text-info"><Eye className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                        {role !== "staff" && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(supplier)} className="h-7 w-7 sm:h-8 sm:w-8 text-primary"><Edit className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                            {supplier.balance > 0 && (
                               <Button variant="ghost" size="icon" onClick={() => handleSettleClick(supplier)} className="h-7 w-7 sm:h-8 sm:w-8 text-warning"><Wallet className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => onDeleteSupplier(supplier.id)} className="h-7 w-7 sm:h-8 sm:w-8 text-error"><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddSupplierDialog open={isEditOpen} onOpenChange={setIsEditOpen} initialData={selectedSupplier} onSave={onUpdateSupplier} />

      {/* VIEW DETAILS MODAL */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md border-border">
          <DialogHeader>
            <DialogTitle className="font-black uppercase tracking-tighter text-foreground text-base sm:text-lg">Vendor Profile</DialogTitle>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4 sm:space-y-6 py-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-2xl border border-border">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl sm:text-2xl font-black">
                  {selectedSupplier.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg uppercase text-foreground">{selectedSupplier.name}</h3>
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase"><User className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> {selectedSupplier.contact}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <DetailBox icon={<Phone className="w-3 h-3 sm:w-4 sm:h-4"/>} label="Phone" value={selectedSupplier.phone} />
                <DetailBox icon={<Mail className="w-3 h-3 sm:w-4 sm:h-4"/>} label="Email" value={selectedSupplier.email} />
                <DetailBox icon={<MapPin className="w-3 h-3 sm:w-4 sm:h-4"/>} label="Address" value={selectedSupplier.address} />
                <DetailBox icon={<Package className="w-3 h-3 sm:w-4 sm:h-4"/>} label="Items Supplied" value={`${selectedSupplier.products} items`} />
              </div>
              <Button onClick={() => setIsViewOpen(false)} className="w-full uppercase font-black h-10 sm:h-12 text-xs sm:text-sm">Close Details</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SETTLE MODAL */}
      <Dialog open={settleModalOpen} onOpenChange={setSettleModalOpen}>
        <DialogContent className="max-w-md border-border">
          <DialogHeader>
            <DialogTitle className="font-black uppercase text-base sm:text-lg text-foreground">Settle Vendor Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-error/5 p-3 sm:p-4 rounded-xl text-center border border-error/10">
              <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Amount Owed</p>
              <p className="text-2xl sm:text-3xl font-black text-error tracking-tighter">Rs. {selectedSupplier?.balance?.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Payment Amount (Rs.)</Label>
              <Input type="number" value={settleAmount} onChange={(e) => setSettleAmount(e.target.value)} className="h-10 sm:h-12 text-base sm:text-lg font-black border-border" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSettleModalOpen(false)} className="font-bold uppercase text-[9px] sm:text-xs">Cancel</Button>
            <Button onClick={handleConfirmSettle} className="bg-primary font-black uppercase text-white text-[9px] sm:text-xs">Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DetailBox({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-card border border-border rounded-xl">
      <div className="p-1.5 sm:p-2 bg-muted rounded-lg text-primary">{icon}</div>
      <div>
        <p className="text-[8px] sm:text-[9px] font-black uppercase text-muted-foreground">{label}</p>
        <p className="text-xs sm:text-sm font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}