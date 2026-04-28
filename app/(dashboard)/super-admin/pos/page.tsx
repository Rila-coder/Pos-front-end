"use client";

import { useState } from "react";
import ProductGrid from "@/components/common/shared/pos/ProductGrid";
import Cart from "@/components/common/shared/pos/Cart";
import PaymentSection from "@/components/common/shared/pos/PaymentSection";
import CategoryFilter from "@/components/common/shared/pos/CategoryFilter";
import CurrentOrderHeader from "@/components/common/shared/pos/CurrentOrderHeader";
import { Building2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { CartItem } from "@/components/common/shared/pos/Cart";

const branches = [
  { id: "main", name: "Main Branch (Colombo)" },
  { id: "kandy", name: "Kandy Branch" },
  { id: "galle", name: "Galle Branch" },
];

export default function SuperAdminPOSPage() {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tender, setTender] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("Walk-in Customer");

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - (subtotal * discount / 100); 
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Global POS</h1>
        <div className="flex items-center gap-2 bg-card border border-border px-3 py-2 rounded-lg">
          <Building2 className="w-4 h-4 text-primary" />
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-36 sm:w-44 border-none shadow-none p-0 h-auto text-sm">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          <ProductGrid 
            selectedCategory={selectedCategory} 
            searchQuery={searchQuery} 
            onAddToCart={(product, price) => {
                const finalPrice = price ?? product.price;
                setCart([...cart, {...product, price: finalPrice, quantity: 1}]);
            }} 
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <CurrentOrderHeader customerName={selectedCustomer} itemCount={itemCount} />
          <Cart 
            cart={cart} subtotal={subtotal} discount={discount} 
            discountAmount={(subtotal * discount / 100)} tax={0} total={total} 
            onUpdateQuantity={() => {}} onRemoveFromCart={() => {}} onClearCart={() => setCart([])}
          />
          <PaymentSection 
            cart={cart} total={total} discount={discount} setDiscount={setDiscount}
            tender={tender} setTender={setTender}
            selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}
            hideStaffSelection={true}
          />
        </div>
      </div>
    </div>
  );
}