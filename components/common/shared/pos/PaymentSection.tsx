"use client";

import { useState } from "react";
import {
  User,
  UserPlus,
  Clock,
  Tag,
  Banknote,
  CreditCard,
  Smartphone,
  ChevronDown,
  Award,
  Search,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Tabs, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { CartItem } from "./Cart";

// Mock Customer List with credit balances
const customerList = [
  { id: "c1", name: "Walk-in Customer", phone: "-", credit: 0 },
  { id: "c2", name: "John Doe", phone: "0771234567", credit: 2500 },
  { id: "c3", name: "Jane Smith", phone: "0779876543", credit: 0 },
  { id: "c4", name: "Bob Wilson", phone: "0712223334", credit: 1200 },
];

const staffList = [
  "Kamal (Cashier)",
  "Nimal (Sales)",
  "Sunil (Manager)",
  "Sarah (Sales)",
];

interface PaymentSectionProps {
  cart: CartItem[];
  discount: number;
  setDiscount: (discount: number) => void;
  tender: string;
  setTender: (tender: string) => void;
  total: number;
  selectedCustomer: string;
  setSelectedCustomer: (customer: string) => void;
  selectedStaff?: string;
  setSelectedStaff?: (staff: string) => void;
  hideStaffSelection?: boolean;
  onSaleComplete?: (saleData: any) => void;
}

export default function PaymentSection({
  cart,
  discount,
  setDiscount,
  tender,
  setTender,
  total,
  selectedCustomer,
  setSelectedCustomer,
  selectedStaff = "",
  setSelectedStaff = () => {},
  hideStaffSelection = false,
  onSaleComplete,
}: PaymentSectionProps) {
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);

  const parsedTender = parseFloat(tender) || 0;
  const change = parsedTender > total ? parsedTender - total : 0;
  const remainingAmount = total - parsedTender;
  const isCreditSale = parsedTender < total && parsedTender > 0;
  const selectedCustomerData = customerList.find(
    (c) => c.name === selectedCustomer,
  );
  const hasOutstandingCredit = (selectedCustomerData?.credit || 0) > 0;

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (isCreditSale && selectedCustomer === "Walk-in Customer") {
      alert("Please select or add a customer for credit sales");
      setShowCreditModal(true);
      return;
    }

    if (isCreditSale) {
      setCreditAmount(remainingAmount);
      setShowCreditModal(true);
      return;
    }

    completeSale();
  };

  const completeSale = (customerName?: string, customerPhone?: string) => {
    const saleData = {
      items: cart,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      discount,
      discountAmount:
        (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
          discount) /
        100,
      total,
      amountPaid: parsedTender,
      change,
      creditAmount: isCreditSale ? remainingAmount : 0,
      customer: customerName || selectedCustomer,
      customerPhone: customerPhone || selectedCustomerData?.phone || "",
      staff: selectedStaff,
      paymentMethod: "mixed",
      date: new Date().toISOString(),
    };

    console.log("Sale Completed:", saleData);

    let message = `✅ Sale Complete!\n\n`;
    message += `Customer: ${saleData.customer}\n`;
    message += `Total: Rs. ${saleData.total.toFixed(2)}\n`;
    message += `Paid: Rs. ${saleData.amountPaid.toFixed(2)}\n`;
    if (saleData.change > 0) {
      message += `Change: Rs. ${saleData.change.toFixed(2)}\n`;
    }
    if (saleData.creditAmount > 0) {
      message += `⚠️ CREDIT: Rs. ${saleData.creditAmount.toFixed(2)} due\n`;
    }

    alert(message);

    if (onSaleComplete) {
      onSaleComplete(saleData);
    }

    setShowCreditModal(false);
    setTender("");
    setDiscount(0);
  };

  const handleAddCustomerAndComplete = () => {
    if (!newCustomerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (!newCustomerPhone.trim()) {
      alert("Please enter customer phone number");
      return;
    }
    setSelectedCustomer(newCustomerName);
    completeSale(newCustomerName, newCustomerPhone);
  };

  return (
    <>
      <Card className="shadow-lg border-border overflow-hidden">
        <CardContent className="p-3 sm:p-4 space-y-4 sm:space-y-5">
          {/* Outstanding Credit Alert */}
          {hasOutstandingCredit && !hideStaffSelection && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-warning" />
                <span className="text-xs font-bold text-warning">
                  Outstanding Credit: Rs.{" "}
                  {selectedCustomerData?.credit.toLocaleString()}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full text-xs border-warning/50 text-warning hover:bg-warning/20"
              >
                Settle Credit (Rs. {selectedCustomerData?.credit})
              </Button>
            </div>
          )}

          {/* CUSTOMER SELECTION DROPDOWN */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Select Customer{" "}
              {isCreditSale && (
                <span className="text-warning">* Required for Credit</span>
              )}
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-between h-10 sm:h-11 border-border bg-muted/10 ${isCreditSale ? "border-warning" : ""}`}
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-bold text-xs text-foreground">
                      {selectedCustomer}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[260px] sm:min-w-[280px]">
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search phone or name..."
                      className="h-8 pl-8 text-xs bg-muted/50 border-border"
                    />
                  </div>
                </div>
                {customerList.map((c) => (
                  <DropdownMenuItem
                    key={c.id}
                    onClick={() => setSelectedCustomer(c.name)}
                    className="flex justify-between"
                  >
                    <div>
                      <span className="font-medium text-foreground text-sm">
                        {c.name}
                      </span>
                      {c.credit > 0 && (
                        <span className="ml-2 text-[8px] bg-warning/20 text-warning px-1 rounded">
                          Due: Rs.{c.credit}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {c.phone}
                    </span>
                  </DropdownMenuItem>
                ))}
                <div className="p-1 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-8 text-xs text-primary font-bold"
                    onClick={() => setShowCreditModal(true)}
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-2" />
                    Add New Customer
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* STAFF ATTRIBUTION */}
          {!hideStaffSelection && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Sales Rep (Commission)
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-10 sm:h-11 border-border bg-muted/10"
                  >
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-bold text-xs text-foreground">
                        {selectedStaff || "Select Staff"}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[200px]">
                  {staffList.map((s) => (
                    <DropdownMenuItem
                      key={s}
                      onClick={() => setSelectedStaff(s)}
                    >
                      {s}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Promo
              </Label>
              <Button
                variant={discount > 0 ? "default" : "outline"}
                size="sm"
                className="w-full h-10 sm:h-11 font-bold text-xs uppercase"
                onClick={() => setDiscount(discount === 10 ? 0 : 10)}
              >
                <Tag className="w-3 h-3 mr-1" />{" "}
                {discount > 0 ? `${discount}% OFF` : "Discount"}
              </Button>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Hold Order
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-10 sm:h-11 font-bold text-xs uppercase"
              >
                <Clock className="w-3 h-3 mr-1" /> Save Draft
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Payment Method
            </Label>
            <Tabs defaultValue="cash" className="w-full">
              <TabsList className="grid grid-cols-3 gap-2 h-auto bg-transparent p-0">
                <TabsTrigger
                  value="cash"
                  className="flex flex-col py-2 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl text-[10px] sm:text-xs"
                >
                  <Banknote className="w-4 h-4 mb-1" />
                  <span className="font-bold">CASH</span>
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="flex flex-col py-2 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl text-[10px] sm:text-xs"
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <span className="font-bold">CARD</span>
                </TabsTrigger>
                <TabsTrigger
                  value="qr"
                  className="flex flex-col py-2 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl text-[10px] sm:text-xs"
                >
                  <Smartphone className="w-4 h-4 mb-1" />
                  <span className="font-bold">LANKAQR</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Amount Received
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-primary text-sm">
                Rs.
              </span>
              <Input
                type="number"
                value={tender}
                onChange={(e) => setTender(e.target.value)}
                className={`pl-11 sm:pl-12 text-xl sm:text-2xl font-black h-14 sm:h-16 border-border shadow-inner bg-muted/30 text-foreground ${isCreditSale ? "border-warning" : ""}`}
                placeholder="0"
              />
            </div>
          </div>

          {/* Credit Warning */}
          {isCreditSale && (
            <div className="p-3 bg-warning/10 rounded-xl border border-warning/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-warning" />
                <span className="text-xs font-bold text-warning">
                  Remaining Balance: Rs. {remainingAmount.toFixed(2)} will be recorded as CREDIT
                </span>
              </div>
              <p className="text-[10px] text-warning/70 mt-1">
                Customer name and phone number are required for credit sales
              </p>
            </div>
          )}

          {parsedTender > 0 && !isCreditSale && change > 0 && (
            <div className="p-3 sm:p-4 bg-success/10 rounded-xl border border-success/20 flex justify-between items-center">
              <span className="text-xs font-black text-success uppercase">
                Balance Change
              </span>
              <span className="text-xl sm:text-2xl font-black text-success">
                Rs. {change.toLocaleString()}
              </span>
            </div>
          )}

          <Button
            className="w-full h-14 sm:h-16 flex flex-col items-center justify-center bg-primary text-primary-foreground hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all"
            disabled={cart.length === 0}
            onClick={handleCompleteSale}
          >
            <span className="text-sm font-black uppercase tracking-widest">
              Complete Sale
            </span>
            {isCreditSale && (
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-md mt-1 font-bold animate-pulse">
                CREDIT: Rs.{" "}
                {remainingAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Credit / Add Customer Modal */}
      <Dialog open={showCreditModal} onOpenChange={setShowCreditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-warning" />
              {creditAmount > 0 ? "Credit Sale" : "Add New Customer"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {creditAmount > 0 && (
              <div className="bg-warning/10 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Remaining Balance
                </p>
                <p className="text-2xl font-black text-warning">
                  Rs. {creditAmount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This amount will be added to customer's credit
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>
                Customer Name{" "}
                {creditAmount > 0 && <span className="text-warning">*</span>}
              </Label>
              <Input
                placeholder="Enter full name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Phone Number{" "}
                {creditAmount > 0 && <span className="text-warning">*</span>}
              </Label>
              <Input
                type="tel"
                placeholder="077-1234567"
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
              />
            </div>

            {creditAmount > 0 && (
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Total Bill:</span>
                  <span className="font-bold">Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Amount Paid:</span>
                  <span className="font-bold">
                    Rs. {parsedTender.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t mt-2">
                  <span className="text-warning">Credit Amount:</span>
                  <span className="font-bold text-warning">
                    Rs. {creditAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreditModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCustomerAndComplete}
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              {creditAmount > 0
                ? "Confirm Credit Sale"
                : "Add Customer & Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}