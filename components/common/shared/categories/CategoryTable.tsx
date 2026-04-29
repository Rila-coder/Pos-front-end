"use client";

import { useState } from "react";
import { Search, Edit, Trash2, LayoutGrid, Building2, Package, Globe } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";

export default function CategoryTable({ 
  categories, 
  role, 
  onEdit, 
  onDelete,
  branches = []
}: any) {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c: any) => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getBranchIcon = (branchId: string) => {
    if (branchId === "all") {
      return <Globe className="w-3 h-3 text-primary" />;
    }
    return <Building2 className="w-3 h-3 text-primary" />;
  };

  const getBranchDisplay = (category: any) => {
    if (category.branch === "all") {
      return "All Branches (Global)";
    }
    if (category.branchName) {
      return category.branchName;
    }
    return category.branch || "Unknown";
  };

  return (
    <Card className="shadow-lg border-border bg-card">
      <CardHeader className="pb-0 border-b bg-muted/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl font-black uppercase tracking-tighter flex items-center gap-2 text-foreground">
            <LayoutGrid className="text-primary w-4 h-4 sm:w-5 sm:h-5"/> 
            {role === 'super-admin' ? "Global Categories" : "Product Categories"}
          </CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 sm:pl-9 h-9 sm:h-10 bg-muted/20 border-border text-[10px] sm:text-xs font-bold"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-border">
                <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Category Name</TableHead>
                {role === "super-admin" && (
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Branch Assignment
                    </div>
                  </TableHead>
                )}
                <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-center text-foreground">Linked Products</TableHead>
                <TableHead className="text-right font-bold text-[9px] sm:text-[10px] uppercase px-4 sm:px-6 text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cat: any) => (
                <TableRow key={cat.id} className="hover:bg-muted/10 border-border transition-colors">
                  <TableCell>
                    <span className="font-black text-foreground uppercase text-xs sm:text-sm tracking-tight">{cat.name}</span>
                  </TableCell>
                  {role === "super-admin" && (
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold">
                        {getBranchIcon(cat.branch)}
                        <span className={cat.branch === "all" ? "text-primary" : "text-muted-foreground uppercase"}>
                          {getBranchDisplay(cat)}
                        </span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-black text-[8px] sm:text-[10px] uppercase">
                      <Package className="w-2 h-2 sm:w-2.5 sm:h-2.5 mr-1" /> {cat.productCount} Items
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-3 sm:px-6">
                    {role !== "staff" ? (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-info hover:bg-info/10" onClick={() => onEdit(cat)}>
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:bg-destructive/10" onClick={() => onDelete(cat.id)}>
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-[7px] sm:text-[8px] uppercase font-bold opacity-50">View Only</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}