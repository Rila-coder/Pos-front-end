"use client";

import { useState } from "react";
import { Plus, Tags } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import CategoryTable from "@/components/common/shared/categories/CategoryTable";
import AddCategoryDialog from "@/components/common/shared/categories/AddCategoryDialog";

const mockCategories = [
  { id: 1, name: "Beverages", productCount: 45 },
  { id: 2, name: "Bakery", productCount: 12 },
  { id: 3, name: "Electronics", productCount: 8 },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleSave = (data: any) => {
    if (data.id) {
      setCategories(prev => prev.map(c => c.id === data.id ? { ...c, name: data.name } : c));
    } else {
      setCategories([...categories, { id: Date.now(), name: data.name, productCount: 0 }]);
    }
  };

  const openEdit = (cat: any) => {
    setEditingCategory(cat);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
            <Tags className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Categories
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-tighter">Organize products for POS filtering</p>
        </div>
        <Button 
          onClick={() => { setEditingCategory(null); setIsDialogOpen(true); }}
          className="bg-primary hover:bg-primary-hover text-white font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-8 shadow-xl"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add Category
        </Button>
      </div>

      <CategoryTable 
        categories={categories} 
        role="admin" 
        onEdit={openEdit} 
        onDelete={(id: number) => setCategories(prev => prev.filter(c => c.id !== id))} 
      />

      <AddCategoryDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        initialData={editingCategory} 
        onSave={handleSave} 
      />
    </div>
  );
}