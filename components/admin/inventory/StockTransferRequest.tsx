"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Textarea } from "@/components/common/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import { Calendar, Send, Package, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/common/ui/Alert";

// Mock products low stock for this branch
const MOCK_LOW_STOCK_PRODUCTS = [
  { id: 1, name: "Coca Cola", sku: "SKU001", currentStock: 5, minStock: 20, unit: "Bottle", required: 15 },
  { id: 2, name: "Bread", sku: "SKU002", currentStock: 8, minStock: 25, unit: "Loaf", required: 17 },
  { id: 3, name: "Rice 5kg", sku: "SKU008", currentStock: 3, minStock: 15, unit: "Bag", required: 12 },
  { id: 4, name: "T-Shirt", sku: "SKU005", currentStock: 2, minStock: 10, unit: "Pcs", required: 8 },
  { id: 5, name: "Mineral Water", sku: "SKU006", currentStock: 0, minStock: 20, unit: "Bottle", required: 20 },
];

interface StockTransferRequestProps {
  branchName: string;
  onRequestSent?: (request: any) => void;
}

export default function StockTransferRequest({ branchName, onRequestSent }: StockTransferRequestProps) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [requiredByDate, setRequiredByDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedProductData = MOCK_LOW_STOCK_PRODUCTS.find(p => p.id.toString() === selectedProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }
    if (!quantity || parseInt(quantity) <= 0) {
      alert("Please enter valid quantity");
      return;
    }
    if (!reason.trim()) {
      alert("Please provide a reason for the request");
      return;
    }

    setIsSubmitting(true);

    const request = {
      id: `REQ-${Date.now()}`,
      requestedBy: localStorage.getItem("userName") || "Branch Admin",
      requestedBranch: branchName,
      requestedDate: new Date().toISOString(),
      requiredByDate: requiredByDate || new Date().toISOString(),
      productId: selectedProductData?.id,
      productName: selectedProductData?.name,
      productSku: selectedProductData?.sku,
      quantity: parseInt(quantity),
      unit: selectedProductData?.unit,
      currentStock: selectedProductData?.currentStock,
      reason: reason,
      status: "pending_approval",
      history: [{
        id: `hist-${Date.now()}`,
        date: new Date().toISOString(),
        action: "Request Submitted",
        performedBy: localStorage.getItem("userName") || "Branch Admin",
        role: "admin",
        comment: reason,
        branch: branchName
      }]
    };

    const existingRequests = JSON.parse(localStorage.getItem("stockTransferRequests") || "[]");
    existingRequests.push(request);
    localStorage.setItem("stockTransferRequests", JSON.stringify(existingRequests));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setSelectedProduct("");
    setQuantity("");
    setReason("");
    setRequiredByDate("");
    
    if (onRequestSent) onRequestSent(request);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-foreground">
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Request Stock Transfer
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Request stock from other branches when you're running low
        </p>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert className="mb-4 bg-success/10 border-success/20">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
            <AlertDescription className="text-success text-xs sm:text-sm">
              Request sent successfully! Super Admin will review and assign a source branch.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Low Stock Warning */}
          {MOCK_LOW_STOCK_PRODUCTS.length > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <p className="text-[10px] sm:text-xs font-bold text-warning mb-2">⚠️ Low Stock Alert - Need to Request</p>
              <div className="space-y-1">
                {MOCK_LOW_STOCK_PRODUCTS.map(p => (
                  <div key={p.id} className="text-[9px] sm:text-xs flex justify-between">
                    <span>{p.name}</span>
                    <span className="font-bold text-warning">Stock: {p.currentStock} / Min: {p.minStock}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
              Select Product <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="h-10 sm:h-12 bg-muted/20 border-border text-sm">
                <SelectValue placeholder="Choose product to request" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_LOW_STOCK_PRODUCTS.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} - Current Stock: {product.currentStock} {product.unit} (Need: {product.required})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProductData && (
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <span className="text-muted-foreground">Current Stock:</span>
                <span className="font-bold text-warning">{selectedProductData.currentStock} {selectedProductData.unit}</span>
                <span className="text-muted-foreground">Minimum Required:</span>
                <span className="font-bold">{selectedProductData.minStock} {selectedProductData.unit}</span>
                <span className="text-muted-foreground">Shortage:</span>
                <span className="font-bold text-destructive">{selectedProductData.required} {selectedProductData.unit}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
              Quantity Needed <span className="text-destructive">*</span>
            </Label>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-10 sm:h-12 bg-muted/20 border-border text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
              Required By Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
              <Input
                type="date"
                value={requiredByDate}
                onChange={(e) => setRequiredByDate(e.target.value)}
                className="pl-9 sm:pl-10 h-10 sm:h-12 bg-muted/20 border-border text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">
              Reason for Request <span className="text-destructive">*</span>
            </Label>
            <Textarea
              placeholder="e.g., High demand, Supplier delay, Seasonal increase..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="bg-muted/20 border-border text-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 sm:h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs sm:text-sm"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            {isSubmitting ? "Sending Request..." : "Send Request to Super Admin"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}