"use client";

import { useState } from "react";
import { Building2, Plus, Tags } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import CategoryTable from "@/components/common/shared/categories/CategoryTable";
import AddCategoryDialog from "@/components/common/shared/categories/AddCategoryDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";

// Mock data with branch assignment
const initialGlobalCategories = [
  { id: 1, name: "Beverages", branch: "all", productCount: 150, branchName: "All Branches" },
  { id: 2, name: "Medicine", branch: "kandy", productCount: 85, branchName: "Kandy Branch" },
  { id: 3, name: "Electronics", branch: "main", productCount: 45, branchName: "Main Branch" },
  { id: 4, name: "Bakery", branch: "all", productCount: 120, branchName: "All Branches" },
];

const branches = [
  { id: "all", name: "All Branches (Global)" },
  { id: "main", name: "Main Branch" },
  { id: "kandy", name: "Kandy Branch" },
  { id: "galle", name: "Galle Branch" },
];

export default function SuperAdminCategoriesPage() {
  const [categories, setCategories] = useState(initialGlobalCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [branchFilter, setBranchFilter] = useState("all");

  const handleSave = (data: any) => {
    if (data.id) {
      // Update existing category
      setCategories(prev => prev.map(c => {
        if (c.id === data.id) {
          const branchInfo = branches.find(b => b.id === data.branch);
          return { 
            ...c, 
            name: data.name, 
            branch: data.branch,
            branchName: branchInfo?.name || (data.branch === "all" ? "All Branches" : "Unknown Branch")
          };
        }
        return c;
      }));
    } else {
      // Add new category
      const branchInfo = branches.find(b => b.id === data.branch);
      setCategories([...categories, { 
        id: Date.now(), 
        name: data.name, 
        branch: data.branch,
        branchName: branchInfo?.name || (data.branch === "all" ? "All Branches" : "Unknown Branch"),
        productCount: 0 
      }]);
    }
  };

  const filteredCategories = categories.filter(cat => {
    if (branchFilter === "all") return true;
    return cat.branch === branchFilter;
  });

  const getBranchDisplayName = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    return branch?.name || (branchId === "all" ? "All Branches" : branchId);
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
        <p className="text-[10px] sm:text-xs font-black uppercase text-muted-foreground tracking-widest px-2">Filter by Branch</p>
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full sm:w-64 h-10 sm:h-11 font-bold text-sm">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🌍 All Branches (Global)</SelectItem>
            <SelectItem value="main">🏢 Main Branch</SelectItem>
            <SelectItem value="kandy">🏢 Kandy Branch</SelectItem>
            <SelectItem value="galle">🏢 Galle Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CategoryTable 
        categories={filteredCategories} 
        role="super-admin" 
        onEdit={(cat: any) => { 
          setEditingCategory(cat); 
          setIsDialogOpen(true); 
        }} 
        onDelete={(id: any) => setCategories(prev => prev.filter(c => c.id !== id))}
        branches={branches}
      />

      <AddCategoryDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        initialData={editingCategory} 
        onSave={handleSave}
        showBranchField={true}
        branches={branches}
      />
    </div>
  );
}