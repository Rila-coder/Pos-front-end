"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import CustomerList from "@/components/common/shared/customers/CustomerList";
import CustomerDetails from "@/components/common/shared/customers/CustomerDetails";

const mockCustomers = [
  { id: 1, name: "John Doe", phone: "077-1234567", email: "john@example.com", purchases: 45000, points: 450, credit: 0 },
  { id: 2, name: "Jane Smith", phone: "077-9876543", email: "jane@example.com", purchases: 32000, points: 320, credit: 2500 },
];

export default function StaffCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-foreground">
        <Users className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Customer Directory
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <CustomerList customers={mockCustomers} selectedCustomer={selectedCustomer} onSelectCustomer={setSelectedCustomer} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        <div className="lg:col-span-2">
          <CustomerDetails customer={selectedCustomer} role="staff" />
        </div>
      </div>
    </div>
  );
}