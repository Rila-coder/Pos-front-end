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
import { UserPlus, User, Building2, Save } from "lucide-react";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
  showBranchField?: boolean;
}

const branches = ["Main Branch", "Kandy Branch", "Galle Branch", "Negombo Branch"];

export default function AddEmployeeDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
  showBranchField = false,
}: AddEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    branch: "",
    status: "active",
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        role: initialData.role || "",
        branch: initialData.branch || "",
        status: initialData.status || "active",
      });
    } else {
      setFormData({ name: "", role: "", branch: "", status: "active" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || (showBranchField && !formData.branch)) {
      alert("Please fill in all required fields");
      return;
    }
    onSave({ ...initialData, ...formData });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            {isEdit ? <User className="text-primary w-4 h-4 sm:w-5 sm:h-5" /> : <UserPlus className="text-primary w-4 h-4 sm:w-5 sm:h-5" />}
            {isEdit ? "Update Staff" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase text-muted-foreground">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Ex: Kamal Perera"
                className="pl-9 sm:pl-9 h-10 sm:h-11 text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Role *</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {showBranchField && (
            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-muted-foreground">Assign Branch *</Label>
              <Select value={formData.branch} onValueChange={(v) => setFormData({ ...formData, branch: v })}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Branch" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="uppercase font-bold text-[10px] sm:text-xs">Cancel</Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-black uppercase text-[10px] sm:text-xs px-6 sm:px-8 h-10 sm:h-11">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {isEdit ? "Update" : "Add Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}