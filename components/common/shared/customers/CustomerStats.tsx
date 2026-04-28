"use client";

import { Users, CreditCard, Award, TrendingUp, Wallet } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  purchases: number;
  points: number;
  credit: number;
}

interface CustomerStatsProps {
  customers: Customer[];
}

export default function CustomerStats({ customers }: CustomerStatsProps) {
  const totalCustomers = customers.length;
  const totalCredit = customers.reduce((sum, c) => sum + c.credit, 0);
  const totalPoints = customers.reduce((sum, c) => sum + c.points, 0);
  const totalPurchases = customers.reduce((sum, c) => sum + c.purchases, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <StatCard 
        title="Total Customers" 
        value={totalCustomers} 
        icon={<Users />} 
        color="text-primary" 
        bgColor="bg-primary/10" 
      />
      <StatCard 
        title="Total Revenue" 
        value={`Rs. ${totalPurchases.toLocaleString()}`} 
        icon={<TrendingUp />} 
        color="text-success" 
        bgColor="bg-success/10" 
      />
      <StatCard 
        title="Reward Points" 
        value={totalPoints.toLocaleString()} 
        icon={<Award />} 
        color="text-info" 
        bgColor="bg-info/10" 
      />
      <StatCard 
        title="Total Receivables" 
        value={`Rs. ${totalCredit.toLocaleString()}`} 
        icon={<Wallet />} 
        color="text-error" 
        bgColor="bg-error/10" 
      />
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  bgColor 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color: string; 
  bgColor: string;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div>
        <p className="text-[9px] sm:text-xs font-bold uppercase text-muted-foreground tracking-widest">{title}</p>
        <h3 className={`text-base sm:text-2xl font-black mt-1 ${color}`}>{value}</h3>
      </div>
      <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${bgColor} ${color}`}>
        {icon}
      </div>
    </div>
  );
}