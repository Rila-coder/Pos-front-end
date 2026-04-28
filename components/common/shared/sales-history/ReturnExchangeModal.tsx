"use client";

import { useState } from "react";
import { RotateCcw, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/ui/Table";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";
import { Alert, AlertDescription } from "@/components/common/ui/Alert";

interface ReturnExchangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale: any;
  type: "return" | "exchange";
}

export default function ReturnExchangeModal({
  open,
  onOpenChange,
  sale,
  type,
}: ReturnExchangeModalProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [returnMethod, setReturnMethod] = useState("original");
  const [reason, setReason] = useState("");

  if (!sale) return null;

  const handleToggleItem = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const calculateReturnAmount = () => {
    return sale.items
      .filter((item: any) => selectedItems.includes(item.id))
      .reduce((sum: number, item: any) => sum + item.total, 0);
  };

  const handleSubmit = () => {
    // Process return/exchange
    console.log({
      type,
      saleId: sale.id,
      items: selectedItems,
      returnMethod,
      reason,
      amount: calculateReturnAmount(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-black uppercase text-base sm:text-lg">
            {type === "return" ? (
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
            ) : (
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            )}
            {type === "return" ? "Process Return" : "Exchange Items"} - {sale.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          {/* Customer & Sale Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase">Customer</p>
              <p className="font-medium text-sm sm:text-base text-foreground">{sale.customer}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase">Cashier</p>
              <p className="font-medium text-sm sm:text-base text-foreground">{sale.cashier}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase">Date</p>
              <p className="font-medium text-sm sm:text-base text-foreground">{sale.date}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase">Payment Method</p>
              <p className="font-medium text-sm sm:text-base text-foreground">{sale.paymentMethod}</p>
            </div>
          </div>

          {/* Items Selection */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm mb-2 text-foreground">Select Items to {type}:</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="text-[10px] sm:text-xs font-black uppercase">Item</TableHead>
                    <TableHead className="text-[10px] sm:text-xs font-black uppercase">Price</TableHead>
                    <TableHead className="text-[10px] sm:text-xs font-black uppercase">Qty</TableHead>
                    <TableHead className="text-[10px] sm:text-xs font-black uppercase">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleToggleItem(item.id)}
                          className="rounded border-border"
                        />
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-foreground">{item.name}</TableCell>
                      <TableCell className="text-xs sm:text-sm">Rs. {item.price}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{item.quantity}</TableCell>
                      <TableCell className="text-xs sm:text-sm font-bold">Rs. {item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Return Method (for returns) */}
          {type === "return" && (
            <div className="space-y-2">
              <Label className="text-[10px] sm:text-xs font-black uppercase">Return Method</Label>
              <Select value={returnMethod} onValueChange={setReturnMethod}>
                <SelectTrigger className="h-10 sm:h-11">
                  <SelectValue placeholder="Select return method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Refund to Original Payment</SelectItem>
                  <SelectItem value="cash">Cash Refund</SelectItem>
                  <SelectItem value="credit">Store Credit</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Exchange Note (for exchanges) */}
          {type === "exchange" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                Exchange will be processed as a return of selected items and new sale for replacement items.
                Please proceed to POS to add replacement items.
              </AlertDescription>
            </Alert>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label className="text-[10px] sm:text-xs font-black uppercase">Reason for {type === "return" ? "Return" : "Exchange"}</Label>
            <Input
              placeholder="e.g., Damaged product, Wrong size, Customer satisfaction..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Summary */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Selected Items:</span>
              <span className="font-medium text-foreground">{selectedItems.length}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Original Sale Total:</span>
              <span className="font-medium text-foreground">Rs. {sale.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold pt-2 border-t border-border">
              <span>{type === "return" ? "Refund Amount:" : "Exchange Value:"}</span>
              <span className={type === "return" ? "text-warning" : "text-primary"}>
                Rs. {calculateReturnAmount().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className={type === "return" ? "bg-warning hover:bg-warning/90 text-white" : "bg-primary hover:bg-primary-hover"}
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
          >
            {type === "return" ? "Process Return" : "Continue Exchange"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}