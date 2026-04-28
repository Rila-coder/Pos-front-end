"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Building2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";
import AddEmployeeDialog from "./AddEmployeeDialog";

export default function EmployeeTable({ employees, searchQuery, onSearchChange, showBranch = false, onUpdate, onDelete }: any) {
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (emp: any) => {
    setEditingEmployee(emp);
    setIsEditOpen(true);
  };

  return (
    <>
      <Card className="shadow-lg border-border bg-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl font-black uppercase tracking-tighter text-foreground">Staff Directory</CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 sm:pl-9 h-10 sm:h-11 bg-muted/20 border-border text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-border">
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Name</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Role</TableHead>
                  {showBranch && <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Branch</TableHead>}
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Sales (Count)</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Total Volume</TableHead>
                  <TableHead className="font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Status</TableHead>
                  <TableHead className="text-right font-bold text-[9px] sm:text-[10px] uppercase text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee: any) => (
                  <TableRow key={employee.id} className="hover:bg-muted/10 border-border transition-colors">
                    <TableCell className="font-bold text-foreground text-xs sm:text-sm">{employee.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[8px] sm:text-[9px] uppercase font-black tracking-widest border-primary/30 text-primary">
                        {employee.role}
                      </Badge>
                    </TableCell>
                    {showBranch && (
                      <TableCell className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">
                        <div className="flex items-center gap-1"><Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> {employee.branch}</div>
                      </TableCell>
                    )}
                    <TableCell className="font-medium text-xs sm:text-sm">{employee.salesCount} Sales</TableCell>
                    <TableCell className="font-black text-foreground text-xs sm:text-sm">Rs. {employee.totalSales.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={employee.status === "active" ? "bg-success/10 text-success border-none text-[8px] sm:text-[9px] uppercase" : "bg-destructive/10 text-destructive border-none text-[8px] sm:text-[9px] uppercase"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(employee)} className="h-7 w-7 sm:h-8 sm:w-8 text-info hover:bg-info/10">
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDelete(employee.id)} className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddEmployeeDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        initialData={editingEmployee} 
        onSave={onUpdate}
        showBranchField={showBranch}
      />
    </>
  );
}