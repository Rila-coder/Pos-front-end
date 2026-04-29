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
import { Tags, Save, LayoutGrid } from "lucide-react";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
    } else {
      setName("");
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }
    onSave({ ...initialData, name });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            <Tags className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
            {isEdit ? "Edit Category" : "New Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 py-3 sm:py-4">
          <div className="space-y-2">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
              Category Name *
            </Label>
            <div className="relative">
              <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Ex: Beverages, Bakery, etc."
                className="pl-8 sm:pl-9 h-10 sm:h-11 text-xs sm:text-sm font-bold border-2 focus:border-primary transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <p className="text-[8px] sm:text-[9px] text-muted-foreground uppercase font-medium italic">
              This name will appear on the POS filter and Product forms.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="uppercase font-bold text-[9px] sm:text-[10px]">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground font-black uppercase text-[9px] sm:text-[10px] px-6 sm:px-8 h-10 sm:h-11 shadow-lg">
              <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {isEdit ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}