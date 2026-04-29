"use client";

import { useState } from "react";
import { Building2, Plus, Tags } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import CategoryTable from "@/components/common/shared/categories/CategoryTable";
import AddCategoryDialog from "@/components/common/shared/categories/AddCategoryDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";

const initialGlobal = [
  { id: 1, name: "Beverages", branch: "Main Branch", productCount: 150 },
  { id: 2, name: "Medicine", branch: "Kandy Branch", productCount: 85 },
];

export default function SuperAdminCategoriesPage() {
  const [categories, setCategories] = useState(initialGlobal);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleSave = (data: any) => {
    if (data.id) {
      setCategories(prev => prev.map(c => c.id === data.id ? { ...c, name: data.name } : c));
    } else {
      setCategories([...categories, { id: Date.now(), name: data.name, branch: "Main Branch", productCount: 0 }]);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
            <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8"/> Global Categories
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-tighter">Master list of system-wide categories</p>
        </div>
        <Button onClick={() => { setEditingCategory(null); setIsDialogOpen(true); }} className="bg-primary uppercase font-black text-[10px] sm:text-xs px-4 sm:px-6 h-10 sm:h-12 shadow-xl shadow-primary/20">
          <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/> New Global Category
        </Button>
      </div>

      <div className="bg-card p-3 sm:p-4 rounded-2xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
        <p className="text-[10px] sm:text-xs font-black uppercase text-muted-foreground tracking-widest px-2">Filter Network</p>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-64 h-10 sm:h-11 font-bold text-sm">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch (Colombo)</SelectItem>
            <SelectItem value="kandy">Kandy Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CategoryTable 
        categories={categories} 
        role="super-admin" 
        onEdit={(cat: any) => { setEditingCategory(cat); setIsDialogOpen(true); }} 
        onDelete={(id: any) => setCategories(prev => prev.filter(c => c.id !== id))} 
      />

      <AddCategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} initialData={editingCategory} onSave={handleSave} />
    </div>
  );
}