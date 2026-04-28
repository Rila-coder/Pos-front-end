"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/common/ui/Badge";
import { Package, Layers } from "lucide-react";
import { PaginationWithItems } from "@/components/common/ui/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";

const products = [
  { id: 1, name: "Coca Cola", price: 150, category: "Beverages", stock: 45, image: "🥤", prices: [150, 180] }, 
  { id: 2, name: "Bread", price: 120, category: "Food", stock: 30, image: "🍞" },
  { id: 3, name: "Headphones", price: 2500, category: "Electronics", stock: 12, image: "🎧" },
  { id: 4, name: "Paracetamol", price: 50, category: "Medicine", stock: 100, image: "💊" },
  { id: 5, name: "T-Shirt", price: 1200, category: "Clothes", stock: 25, image: "👕" },
  { id: 6, name: "Mineral Water", price: 80, category: "Beverages", stock: 60, image: "💧" },
  { id: 7, name: "Rice 1kg", price: 250, category: "Food", stock: 50, image: "🌾", prices: [250, 275] },
  { id: 8, name: "USB Cable", price: 350, category: "Electronics", stock: 20, image: "🔌" },
  { id: 9, name: "Milk 1L", price: 180, category: "Beverages", stock: 35, image: "🥛" },
  { id: 10, name: "Eggs (12)", price: 480, category: "Food", stock: 25, image: "🥚" },
  { id: 11, name: "Mouse", price: 850, category: "Electronics", stock: 15, image: "🖱️" },
  { id: 12, name: "Cough Syrup", price: 320, category: "Medicine", stock: 40, image: "💊" },
  { id: 13, name: "Orange Juice", price: 220, category: "Beverages", stock: 28, image: "🧃" },
  { id: 14, name: "Butter 500g", price: 650, category: "Food", stock: 18, image: "🧈" },
  { id: 15, name: "Keyboard", price: 1500, category: "Electronics", stock: 10, image: "⌨️" },
  { id: 16, name: "Vitamin C", price: 450, category: "Medicine", stock: 55, image: "💊" },
  { id: 17, name: "Jeans", price: 2500, category: "Clothes", stock: 22, image: "👖" },
  { id: 18, name: "Soda", price: 120, category: "Beverages", stock: 65, image: "🥤" },
  { id: 19, name: "Flour 2kg", price: 380, category: "Food", stock: 32, image: "🌾" },
  { id: 20, name: "Monitor", price: 45000, category: "Electronics", stock: 5, image: "🖥️" },
];

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  onAddToCart: (product: any, manualPrice?: number) => void;
}

export default function ProductGrid({
  selectedCategory,
  searchQuery,
  onAddToCart,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-border bg-muted/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-foreground">Product Catalog</h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
          Showing {currentProducts.length} of {filteredProducts.length} items
        </p>
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 min-h-[400px] sm:min-h-[450px]">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group relative p-2 sm:p-3 border border-border rounded-xl cursor-pointer hover:border-primary hover:shadow-xl transition-all bg-card flex flex-col justify-between"
            >
              {product.stock <= 10 && (
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
                  <Badge variant="destructive" className="text-[8px] sm:text-[10px] px-1 py-0 uppercase">
                    Low
                  </Badge>
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 grayscale group-hover:grayscale-0 transition-all">{product.image}</div>
                <h4 className="font-bold text-[9px] sm:text-[10px] md:text-[11px] text-foreground mb-1 truncate w-full text-center">
                  {product.name}
                </h4>
              </div>

              <div className="mt-2 space-y-2">
                {product.prices ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full bg-primary/10 text-primary py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] md:text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary/20 transition-colors">
                        <Layers className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" /> Select Price
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-32 sm:w-36 md:w-40">
                      {product.prices.map((p) => (
                        <DropdownMenuItem key={p} onClick={() => onAddToCart(product, p)} className="font-bold text-[10px] sm:text-xs">
                          Rs. {p.toLocaleString()}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full text-center py-1 sm:py-1.5 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors border border-transparent"
                  >
                     <p className="text-[10px] sm:text-xs md:text-sm font-black text-primary group-hover:text-primary-foreground">Rs. {product.price}</p>
                  </button>
                )}

                <div className="flex items-center justify-center gap-1 text-[7px] sm:text-[8px] md:text-[9px] font-bold text-muted-foreground uppercase bg-muted/50 py-0.5 sm:py-1 rounded-md">
                  <Package className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  <span>{product.stock} Stock</span>
                </div>
              </div>
            </div>
          ))}
          
          {currentProducts.length < itemsPerPage &&
            Array.from({ length: itemsPerPage - currentProducts.length }).map((_, index) => (
              <div key={`empty-${index}`} className="invisible" />
            ))}
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
            <PaginationWithItems
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={[12, 24, 36]}
              showFirstLast={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}