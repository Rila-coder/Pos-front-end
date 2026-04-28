"use client";

import { Search, Scan } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent } from "@/components/common/ui/Card";

const categories = ["All", "Food", "Beverages", "Electronics", "Medicine", "Clothes"];

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: CategoryFilterProps) {
  return (
    <Card className="shadow-lg border-border">
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search or Scan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-10 h-10 sm:h-11 bg-background border-border text-sm"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
          >
            <Scan className="w-4 h-4 text-primary" />
          </Button>
        </div>
        
        {/* Responsive Category Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3 text-[11px] uppercase font-bold shrink-0 ${
                selectedCategory === cat ? "bg-primary text-primary-foreground" : "border-border"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}