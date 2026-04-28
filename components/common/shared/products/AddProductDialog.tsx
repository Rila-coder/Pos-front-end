"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/common/ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { ImagePlus, X, Save } from "lucide-react";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: "admin" | "super-admin" | "staff";
  initialData?: any; // Added to support Editing
}

export default function AddProductDialog({ open, onOpenChange, role, initialData }: AddProductDialogProps) {
  const [image, setImage] = useState<string | null>(null);
  const isEdit = !!initialData;

  // Reset image when dialog opens/closes
  useEffect(() => {
    if (initialData?.image) setImage(initialData.image);
    else setImage(null);
  }, [initialData, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl font-black uppercase tracking-tight text-foreground">
            {isEdit ? `Edit Product: ${initialData.name}` : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Product Image</Label>
            <div className="border-2 border-dashed border-border rounded-xl aspect-square flex flex-col items-center justify-center relative overflow-hidden group bg-muted/20">
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <Button 
                    variant="destructive" size="icon" 
                    className="absolute top-2 right-2 h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setImage(null)}
                  >
                    <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <ImagePlus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase">Upload Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1 col-span-2">
              <Label htmlFor="name" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Product Name *</Label>
              <Input id="name" defaultValue={initialData?.name} placeholder="Ex: Coca Cola 500ml" className="h-9 sm:h-10 text-sm" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="sku" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">SKU / Code</Label>
              <Input id="sku" defaultValue={initialData?.sku} placeholder="Auto-generated" className="h-9 sm:h-10 font-mono text-xs" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Category</Label>
              <Select defaultValue={initialData?.category}>
                <SelectTrigger className="h-9 sm:h-10">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="cost" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Cost Price (Rs.)</Label>
              <Input id="cost" type="number" defaultValue={initialData?.cost || 0} placeholder="0.00" className="h-9 sm:h-10 text-sm" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="price" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Selling Price *</Label>
              <Input id="price" type="number" defaultValue={initialData?.price} placeholder="0.00" className="h-9 sm:h-10 font-black text-primary text-sm" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="discount" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Fixed Discount (%)</Label>
              <Input id="discount" type="number" defaultValue={initialData?.discount || 0} className="h-9 sm:h-10 text-sm" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="stock" className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Stock Level</Label>
              <Input id="stock" type="number" defaultValue={initialData?.stock} className="h-9 sm:h-10 text-sm" />
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-border pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="font-bold uppercase text-[9px] sm:text-[10px]">Cancel</Button>
          <Button className="bg-primary text-primary-foreground font-black uppercase text-[9px] sm:text-[10px] px-6 sm:px-8 h-9 sm:h-11">
            <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-2" /> {isEdit ? "Update Product" : "Save Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}