"use client";

import { useState } from "react";
import { Building2, Plus, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import CustomerList from "@/components/common/shared/customers/CustomerList";
import CustomerDetails from "@/components/common/shared/customers/CustomerDetails";
import CustomerStats from "@/components/common/shared/customers/CustomerStats";

const globalMockCustomers = [
  { id: 1, name: "John Doe", phone: "077-1234567", email: "john@example.com", purchases: 45000, points: 450, credit: 0, branch: "Main Branch" },
  { id: 2, name: "Jane Smith", phone: "077-9876543", email: "jane@example.com", purchases: 32000, points: 320, credit: 2500, branch: "Kandy Branch" },
];

export default function SuperAdminCustomersPage() {
  const [customers, setCustomers] = useState(globalMockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
          <Building2 className="text-primary w-6 h-6 sm:w-8 sm:h-8"/> Global Customers
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48 h-10 sm:h-11">
              <SelectValue placeholder="All Branches" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="main">Main Branch</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary uppercase font-black text-[10px] sm:text-xs h-10 sm:h-11 px-4 sm:px-6">
            <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4"/> New Global Customer
          </Button>
        </div>
      </div>

      <CustomerStats customers={customers} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <CustomerList customers={customers} selectedCustomer={selectedCustomer} onSelectCustomer={setSelectedCustomer} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        <div className="lg:col-span-2">
          <CustomerDetails customer={selectedCustomer} role="super-admin" onCreditSettled={(id: any, amt: any) => { setCustomers(prev => prev.map(c => c.id === id ? {...c, credit: Math.max(0, c.credit - amt)} : c)); setSelectedCustomer((prev: any) => ({...prev, credit: Math.max(0, prev.credit - amt)})); }}/>
        </div>
      </div>
    </div>
  );
}