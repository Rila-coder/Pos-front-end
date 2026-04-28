"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import CustomerList from "@/components/common/shared/customers/CustomerList";
import CustomerDetails from "@/components/common/shared/customers/CustomerDetails";
import CustomerStats from "@/components/common/shared/customers/CustomerStats";
import AddCustomerDialog from "@/components/common/shared/customers/AddCustomerDialog";

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", phone: "077-1234567", email: "john@example.com", purchases: 45000, points: 450, credit: 0 },
    { id: 2, name: "Jane Smith", phone: "077-9876543", email: "jane@example.com", purchases: 32000, points: 320, credit: 2500 },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);

  const handleUpdateCustomer = (updatedData: any) => {
    setCustomers(prev => prev.map(c => c.id === updatedData.id ? updatedData : c));
    setSelectedCustomer(updatedData);
  };

  const handleAddCustomer = (newData: any) => {
    const newCustomer = {
      ...newData,
      id: Date.now(),
      purchases: 0,
      points: 0,
      credit: 0
    };
    setCustomers([...customers, newCustomer]);
    setSelectedCustomer(newCustomer);
  };

  const filteredCustomers = customers.filter((c) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2 uppercase tracking-tighter text-foreground">
          <Users className="text-primary w-6 h-6 sm:w-8 sm:h-8" /> Customers
        </h1>
        <Button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary-hover font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 px-4 sm:px-8 shadow-xl">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> New Customer
        </Button>
      </div>

      <CustomerStats customers={customers} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-auto lg:h-[calc(100vh-250px)]">
        <div className="lg:col-span-1 h-full">
          <CustomerList customers={filteredCustomers} selectedCustomer={selectedCustomer} onSelectCustomer={setSelectedCustomer} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        <div className="lg:col-span-2 h-full">
          <CustomerDetails 
            customer={selectedCustomer} 
            role="admin" 
            onUpdateCustomer={handleUpdateCustomer}
            onCreditSettled={(id: any, amt: any) => {
              const updated = {...selectedCustomer, credit: Math.max(0, selectedCustomer.credit - amt)};
              handleUpdateCustomer(updated);
            }} 
          />
        </div>
      </div>

      <AddCustomerDialog open={isAddOpen} onOpenChange={setIsAddOpen} onSave={handleAddCustomer} />
    </div>
  );
}