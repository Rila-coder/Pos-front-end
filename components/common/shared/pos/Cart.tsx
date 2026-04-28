"use client";

import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card, CardContent } from "@/components/common/ui/Card";
import { Separator } from "@/components/common/ui/Separator";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, price: number, delta: number) => void;
  onRemoveFromCart: (id: number, price: number) => void;
  onClearCart: () => void;
  subtotal: number;
  discount: number;
  discountAmount: number;
  tax: number;
  total: number;
}

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  subtotal,
  discount,
  discountAmount,
  tax,
  total,
}: CartProps) {
  return (
    <Card className="shadow-lg border-border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="bg-primary/5 px-3 sm:px-4 py-3 rounded-t-xl flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-tighter text-foreground">Current Cart</span>
          </div>
          {cart.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearCart} className="h-7 text-[10px] font-black uppercase hover:text-destructive">
              Clear All
            </Button>
          )}
        </div>

        <div className="px-3 sm:px-4 py-3 h-[320px] sm:h-[380px] overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 sm:py-20 opacity-20">
              <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
              <p className="text-xs font-black uppercase">Cart is Empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.price}`} className="flex items-center gap-2 sm:gap-3 p-2 bg-muted/40 rounded-xl border border-transparent hover:border-primary/20 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-black text-primary shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[10px] sm:text-xs text-foreground truncate uppercase">{item.name}</p>
                  <p className="text-[8px] sm:text-[10px] font-black text-primary">Rs. {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 bg-background rounded-lg p-0.5 border border-border shadow-sm">
                  <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-6 sm:w-6" onClick={() => onUpdateQuantity(item.id, item.price, -1)}>
                    <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Button>
                  <span className="w-5 sm:w-6 text-center text-[10px] sm:text-xs font-black">{item.quantity}</span>
                  <Button size="icon" variant="ghost" className="h-5 w-5 sm:h-6 sm:w-6" onClick={() => onUpdateQuantity(item.id, item.price, 1)}>
                    <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Button>
                </div>
                <Button size="icon" variant="ghost" className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground hover:text-destructive" onClick={() => onRemoveFromCart(item.id, item.price)}>
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-2 bg-muted/20 border-t border-border">
            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold uppercase text-primary">
              <span>Discount ({discount}%)</span>
              <span>- Rs. {discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">
              <span>Total Taxes (20.5%)</span>
              <span>Rs. {tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <Separator className="my-1 opacity-50" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Grand Total</span>
              <span className="text-xl sm:text-2xl font-black text-primary">Rs. {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}