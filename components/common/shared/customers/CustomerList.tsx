"use client";

import { Search, Phone, User } from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Badge } from "@/components/common/ui/Badge";

export default function CustomerList({ 
  customers, 
  selectedCustomer, 
  onSelectCustomer, 
  searchQuery, 
  onSearchChange 
}: any) {
  return (
    <Card className="shadow-lg border-border h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground">Directory</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            placeholder="Name or Phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 sm:pl-9 h-9 sm:h-10 bg-muted/20 border-border text-sm"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto px-3 sm:px-4">
        <div className="space-y-2">
          {customers.map((customer: any) => (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all border-2 ${
                selectedCustomer.id === customer.id
                  ? "bg-primary/10 border-primary shadow-md"
                  : "bg-muted/30 hover:bg-muted/50 border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-foreground truncate text-sm sm:text-base">{customer.name}</h4>
                  <p className="text-[8px] sm:text-[10px] font-medium text-muted-foreground flex items-center gap-1 mt-1 uppercase">
                    <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {customer.phone}
                  </p>
                </div>
                {customer.credit > 0 && (
                  <Badge variant="destructive" className="text-[8px] sm:text-[9px] uppercase animate-pulse">
                    Due
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}