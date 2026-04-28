"use client";

import { useState } from "react";
import { Search, Eye, Edit, Trash2, Tag, Building2, Package, Landmark } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/common/ui/Table";
import { PaginationWithItems } from "@/components/common/ui/Pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/ui/Dialog";
import AddProductDialog from "./AddProductDialog";

export default function ProductTable({ products, role }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleView = (product: any) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
  };

  return (
    <>
      <Card className="shadow-lg border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Product</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Category</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Price (Rs.)</TableHead>
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Stock</TableHead>
                  {role === "super-admin" && <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Branch</TableHead>}
                  <TableHead className="font-black uppercase text-[9px] sm:text-[10px] text-foreground">Status</TableHead>
                  <TableHead className="text-right font-black uppercase text-[9px] sm:text-[10px] text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p: any) => (
                  <TableRow key={p.id} className="hover:bg-muted/10 border-border">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs sm:text-sm text-foreground uppercase">{p.name}</span>
                        <span className="text-[8px] sm:text-[10px] font-mono text-muted-foreground">{p.sku}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[8px] sm:text-[9px] uppercase border-border">{p.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-black text-primary text-xs sm:text-sm">Rs. {p.price.toLocaleString()}</span>
                        {p.discount && <span className="text-[8px] sm:text-[9px] text-success font-bold flex items-center gap-0.5"><Tag className="w-2 h-2"/> {p.discount}% OFF</span>}
                      </div>
                    </TableCell>
                    <TableCell className={`font-bold text-xs sm:text-sm ${p.stock <= 5 ? "text-error" : "text-foreground"}`}>{p.stock}</TableCell>
                    {role === "super-admin" && <TableCell className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">{p.branch}</TableCell>}
                    <TableCell>
                       <Badge className={p.status === "active" ? "bg-success/10 text-success border-none text-[8px] sm:text-[9px]" : "bg-warning/10 text-warning border-none text-[8px] sm:text-[9px]"}>
                        {p.status.toUpperCase()}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-0.5 sm:gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleView(p)} className="h-7 w-7 sm:h-8 sm:w-8 text-info hover:bg-info/10">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4"/>
                        </Button>
                        {role !== "staff" && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-7 w-7 sm:h-8 sm:w-8 text-primary hover:bg-primary/10">
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-error hover:bg-error/10">
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4"/>
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-3 sm:p-4 border-t border-border">
            <PaginationWithItems 
              currentPage={currentPage} 
              totalPages={totalPages} 
              totalItems={products.length} 
              itemsPerPage={itemsPerPage} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </CardContent>
      </Card>

      {/* EDIT DIALOG REUSED */}
      <AddProductDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        role={role} 
        initialData={selectedProduct} 
      />

      {/* VIEW DETAILS MODAL */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md border-border">
          <DialogHeader>
            <DialogTitle className="font-black uppercase tracking-tighter text-foreground text-base sm:text-lg">Product Specifications</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-5 sm:space-y-6 py-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-2xl border border-border">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center text-2xl sm:text-3xl">📦</div>
                <div>
                  <h3 className="font-black text-base sm:text-lg uppercase text-foreground">{selectedProduct.name}</h3>
                  <p className="text-[10px] sm:text-xs font-mono text-muted-foreground">{selectedProduct.sku}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-card border border-border rounded-xl">
                  <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase">Selling Price</p>
                  <p className="font-black text-primary text-xs sm:text-sm">Rs. {selectedProduct.price}</p>
                </div>
                <div className="p-2 sm:p-3 bg-card border border-border rounded-xl">
                  <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase">Cost Price</p>
                  <p className="font-black text-foreground text-xs sm:text-sm">Rs. {selectedProduct.cost || 'N/A'}</p>
                </div>
                <div className="p-2 sm:p-3 bg-card border border-border rounded-xl">
                  <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase">Current Stock</p>
                  <p className={`font-black text-xs sm:text-sm ${selectedProduct.stock <= 5 ? "text-error" : "text-foreground"}`}>{selectedProduct.stock} Units</p>
                </div>
                <div className="p-2 sm:p-3 bg-card border border-border rounded-xl">
                  <p className="text-[8px] sm:text-[10px] font-black text-muted-foreground uppercase">Fixed Discount</p>
                  <p className="font-black text-success text-xs sm:text-sm">{selectedProduct.discount || 0}%</p>
                </div>
              </div>
              <Button onClick={() => setIsViewOpen(false)} className="w-full font-black uppercase h-10 sm:h-11 text-xs sm:text-sm">Close Preview</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}