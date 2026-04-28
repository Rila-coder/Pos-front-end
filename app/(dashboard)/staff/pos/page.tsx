"use client";

import { useState, useEffect } from "react";
// Import from SHARED folder
import ProductGrid from "@/components/common/shared/pos/ProductGrid";
import Cart from "@/components/common/shared/pos/Cart";
import PaymentSection from "@/components/common/shared/pos/PaymentSection";
import CategoryFilter from "@/components/common/shared/pos/CategoryFilter";
import CurrentOrderHeader from "@/components/common/shared/pos/CurrentOrderHeader";
import { CartItem } from "@/components/common/shared/pos/Cart";

export default function StaffPOSRegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tender, setTender] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Customer");
  const [selectedStaff, setSelectedStaff] = useState("Not Selected");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Staff Member";
    setSelectedStaff(name);
  }, []);

  // Tax Logic (Shared)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const vat = taxableAmount * 0.18;
  const sscl = taxableAmount * 0.025;
  const total = taxableAmount + vat + sscl;

  const addToCart = (product: any, manualPrice?: number) => {
    const finalPrice = manualPrice !== undefined ? manualPrice : product.price;
    const existing = cart.find((item) => item.id === product.id && item.price === finalPrice);
    if (existing) {
      setCart(cart.map((item) => item.id === product.id && item.price === finalPrice ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, price: finalPrice, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, price: number, delta: number) => {
    setCart(cart.map((item) => {
        if (item.id === id && item.price === price) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">POS Register</h1>
        <div className="text-xs sm:text-sm font-medium text-muted-foreground">Date: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <CategoryFilter 
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
          />
          <ProductGrid selectedCategory={selectedCategory} searchQuery={searchQuery} onAddToCart={addToCart} />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <CurrentOrderHeader customerName={selectedCustomer} itemCount={itemCount} />
          <Cart 
            cart={cart} onUpdateQuantity={updateQuantity} 
            onRemoveFromCart={(id, p) => setCart(cart.filter(i => !(i.id === id && i.price === p)))}
            onClearCart={() => setCart([])}
            subtotal={subtotal} discount={discount} discountAmount={discountAmount} tax={vat + sscl} total={total}
          />
          <PaymentSection 
            cart={cart} total={total} discount={discount} setDiscount={setDiscount}
            tender={tender} setTender={setTender}
            selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}
            selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff}
            onSaleComplete={() => { setCart([]); setTender(""); setDiscount(0); }}
          />
        </div>
      </div>
    </div>
  );
}