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
import { UserPlus, User, Phone, Mail, Save } from "lucide-react";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
}

export default function AddCustomerDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
}: AddCustomerDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({ name: "", phone: "", email: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in required fields (Name & Phone)");
      return;
    }
    onSave({ ...initialData, ...formData });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            {isEdit ? <User className="text-primary w-4 h-4 sm:w-5 sm:h-5" /> : <UserPlus className="text-primary w-4 h-4 sm:w-5 sm:h-5" />}
            {isEdit ? "Update Customer" : "Register New Customer"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Ex: John Doe"
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="077-XXXXXXX"
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="customer@email.com"
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {!isEdit && (
             <div className="p-2 sm:p-3 bg-primary/5 rounded-lg border border-dashed border-primary/20">
                <p className="text-[8px] sm:text-[9px] text-primary font-black uppercase text-center leading-tight">
                  New customers will start with 0 loyalty points and 0 credit.
                </p>
             </div>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="uppercase font-bold text-[9px] sm:text-xs">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-black uppercase text-[9px] sm:text-xs px-6 sm:px-8 h-9 sm:h-11">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {isEdit ? "Update Details" : "Register Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}