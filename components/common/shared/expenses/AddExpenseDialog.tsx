"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import { Landmark, Calendar, FileText, BadgeDollarSign, Save, Building2 } from "lucide-react";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
  showBranchField?: boolean;
}

// RESTORED MOCK BRANCH DATA
const branches = ["Main Branch", "Kandy Branch", "Galle Branch", "Negombo Branch"];

export default function AddExpenseDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
  showBranchField = false,
}: AddExpenseDialogProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
    status: "paid",
    branch: "Main Branch",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        category: initialData.category,
        description: initialData.description,
        amount: initialData.amount.toString(),
        status: initialData.status,
        branch: initialData.branch || "Main Branch",
      });
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        category: "",
        description: "",
        amount: "",
        status: "paid",
        branch: "Main Branch",
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.description || (showBranchField && !formData.branch)) {
      alert("Please fill in all required fields including Branch");
      return;
    }
    onSave({ ...initialData, ...formData, amount: parseFloat(formData.amount) });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            <BadgeDollarSign className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
            {isEdit ? "Update Expense" : "Record New Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
                <Input type="date" className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Suppliers">Suppliers</SelectItem>
                  <SelectItem value="Salaries">Salaries</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showBranchField && (
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Target Branch</Label>
              <Select value={formData.branch} onValueChange={(v) => setFormData({ ...formData, branch: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <SelectValue placeholder="Select Branch" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Description</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm" placeholder="Reason for expense" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Amount (Rs.)</Label>
              <Input type="number" className="h-10 sm:h-11 font-black text-primary text-sm" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Payment Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="uppercase font-bold text-[9px] sm:text-[10px]">Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-black uppercase text-[9px] sm:text-[10px] px-6 sm:px-8 h-10 sm:h-11 shadow-lg shadow-primary/20">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {isEdit ? "Update Record" : "Save Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}