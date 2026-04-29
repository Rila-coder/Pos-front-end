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
import { Tags, Save, LayoutGrid, Building2, Globe } from "lucide-react";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: any;
  onSave: (data: any) => void;
  showBranchField?: boolean;
  branches?: Array<{ id: string; name: string }>;
}

const defaultBranches = [
  { id: "all", name: "All Branches (Global)" },
  { id: "main", name: "Main Branch" },
  { id: "kandy", name: "Kandy Branch" },
  { id: "galle", name: "Galle Branch" },
];

export default function AddCategoryDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
  showBranchField = false,
  branches = defaultBranches,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const [assignedBranch, setAssignedBranch] = useState("all");
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAssignedBranch(initialData.branch || "all");
    } else {
      setName("");
      setAssignedBranch("all");
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }
    if (showBranchField && !assignedBranch) {
      alert("Please select a branch assignment");
      return;
    }
    onSave({ ...initialData, name, branch: assignedBranch });
    onOpenChange(false);
  };

  const getBranchIcon = () => {
    if (assignedBranch === "all") {
      return <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />;
    }
    return <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />;
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

          {/* Branch Assignment Field - Only for Super Admin */}
          {showBranchField && (
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                Assign to Branch *
              </Label>
              <Select value={assignedBranch} onValueChange={setAssignedBranch}>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <div className="flex items-center gap-2">
                    {getBranchIcon()}
                    <SelectValue placeholder="Select branch assignment" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      <div className="flex items-center gap-2">
                        {branch.id === "all" ? (
                          <Globe className="w-3.5 h-3.5" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5" />
                        )}
                        {branch.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[8px] sm:text-[9px] text-muted-foreground uppercase font-medium italic flex items-center gap-1">
                {assignedBranch === "all" ? (
                  <>
                    <Globe className="w-3 h-3" /> This category will be available across ALL branches
                  </>
                ) : (
                  <>
                    <Building2 className="w-3 h-3" /> This category will only be available for the selected branch
                  </>
                )}
              </p>
            </div>
          )}

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