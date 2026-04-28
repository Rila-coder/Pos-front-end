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
import { Building2, User, Phone, Mail, MapPin, Save } from "lucide-react";

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
}

export default function AddSupplierDialog({ open, onOpenChange, initialData, onSave }: AddSupplierDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        contact: initialData.contact || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
      });
    } else {
      setFormData({ name: "", contact: "", phone: "", email: "", address: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.phone) {
      alert("Please fill in required fields (Company, Contact Person, and Phone)");
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
            <Building2 className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
            {isEdit ? "Edit Supplier" : "Register New Supplier"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Company Name *</Label>
            <Input
              placeholder="Ex: ABC Distributors"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-10 sm:h-11 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Contact Person *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
                placeholder="Ex: John Smith"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Phone *</Label>
              <Input
                placeholder="011-XXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-10 sm:h-11 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Email</Label>
              <Input
                type="email"
                placeholder="vendor@abc.lk"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-10 sm:h-11 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-sm"
                placeholder="City or Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="uppercase font-bold text-[9px] sm:text-xs">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-black uppercase text-[9px] sm:text-xs px-6 sm:px-8 h-9 sm:h-11">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {isEdit ? "Update Supplier" : "Add Supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}