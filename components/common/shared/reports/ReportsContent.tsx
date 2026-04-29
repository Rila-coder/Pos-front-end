"use client";

import { useState } from "react";
import { FileText, Download, Printer, FileSpreadsheet, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { Label } from "@/components/common/ui/Label";
import { Input } from "@/components/common/ui/Input";

const adminReports = [
  { name: "Daily Sales Report", description: "View daily sales transactions", icon: FileText, color: "text-primary" },
  { name: "Product Sales Report", description: "Analyze top selling products", icon: FileText, color: "text-info" },
  { name: "Profit Analysis", description: "Detailed margins and costs", icon: FileText, color: "text-success" },
  { name: "Tax Report", description: "VAT and SSCL calculations", icon: FileText, color: "text-warning" },
];

const superAdminReports = [
  { name: "Branch-wise Comparison", description: "Compare sales across all branches", icon: FileText, color: "text-primary" },
  { name: "Global Profit Analysis", description: "Consolidated profit margins", icon: FileText, color: "text-success" },
  { name: "Consolidated Tax Report", description: "All branches tax summary", icon: FileText, color: "text-warning" },
];

export default function ReportsContent({ role }: { role: "admin" | "super-admin" }) {
  const reports = role === "super-admin" ? [...adminReports, ...superAdminReports] : adminReports;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {role === "super-admin" ? "Global Reports" : "Reports"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">
          {role === "super-admin" ? "Consolidated business analytics" : "Branch performance analytics"}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Total Revenue" value="Rs. 1.2M" change="+12%" icon={<TrendingUp />} color="text-primary" />
        <StatCard title="Net Profit" value="Rs. 325k" change="+8%" icon={<DollarSign />} color="text-success" />
        <StatCard title="Expenses" value="Rs. 75k" change="+3%" icon={<Package />} color="text-destructive" />
        <StatCard title="Transactions" value="1,245" change="+15%" icon={<Users />} color="text-info" />
      </div>

      {/* Generator Section */}
      <Card className="shadow-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="uppercase font-black text-[10px] sm:text-sm tracking-widest text-muted-foreground">Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Report Type</Label>
              <Select>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((r) => <SelectItem key={r.name} value={r.name}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">From Date</Label>
              <Input type="date" className="h-10 sm:h-11 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">To Date</Label>
              <Input type="date" className="h-10 sm:h-11 text-sm" />
            </div>
            <Button className="bg-primary uppercase font-black h-10 sm:h-11 text-xs">Generate</Button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <ExportButton icon={<Download className="text-destructive w-4 h-4"/>} label="PDF" />
            <ExportButton icon={<FileSpreadsheet className="text-success w-4 h-4"/>} label="Excel" />
            <ExportButton icon={<Printer className="text-info w-4 h-4"/>} label="Print" />
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {reports.map((report) => (
          <Card key={report.name} className="hover:border-primary transition-all cursor-pointer group">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted mx-auto mb-3 sm:mb-4 flex items-center justify-center ${report.color}`}>
                <report.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm uppercase mb-1 text-foreground">{report.name}</h3>
              <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase">{report.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border p-3 sm:p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">{title}</p>
        <h3 className={`text-base sm:text-xl font-black mt-1 ${color}`}>{value}</h3>
        <p className="text-[8px] sm:text-[9px] text-success font-bold">{change} vs last month</p>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl bg-muted ${color}`}>{icon}</div>
    </div>
  );
}

function ExportButton({ icon, label }: any) {
  return (
    <Button variant="outline" className="flex flex-col h-12 sm:h-16 gap-1 border-dashed">
      {icon}
      <span className="text-[8px] sm:text-[10px] font-bold uppercase">Export {label}</span>
    </Button>
  );
}