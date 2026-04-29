"use client";

import { useState } from "react";
import { Tags, Search } from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent } from "@/components/common/ui/Card";
import CategoryTable from "@/components/common/shared/categories/CategoryTable";

// MOCK DATA (Matches the Admin list for consistency)
const mockCategories = [
  { id: 1, name: "Beverages", productCount: 45 },
  { id: 2, name: "Bakery", productCount: 12 },
  { id: 3, name: "Electronics", productCount: 8 },
  { id: 4, name: "Medicine", productCount: 100 },
  { id: 5, name: "Clothes", productCount: 25 },
];

export default function StaffCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering logic for the search bar
  const filteredCategories = mockCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <Tags className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Category Directory
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-tighter">
          Browse available product groups
        </p>
      </div>

      {/* SEARCH CARD */}
      <Card className="border-border shadow-sm bg-card">
        <CardContent className="p-3 sm:p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
            <Input
              placeholder="Quick search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-9 bg-muted/20 border-border h-10 sm:h-11 text-[10px] sm:text-xs font-bold"
            />
          </div>
        </CardContent>
      </Card>

      {/* SHARED TABLE COMPONENT */}
      {/* role="staff" automatically hides Edit/Delete buttons in the shared table */}
      <CategoryTable 
        categories={filteredCategories} 
        role="staff" 
      />

      {/* FOOTER NOTE */}
      <div className="p-3 sm:p-4 bg-muted/30 rounded-xl border border-dashed text-center">
        <p className="text-[8px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-widest">
          Contact Admin to request new categories or changes
        </p>
      </div>
    </div>
  );
}