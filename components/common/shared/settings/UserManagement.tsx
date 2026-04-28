"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Badge } from "@/components/common/ui/Badge";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { KeyRound, CreditCard, Trash2, UserCheck, UserX, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";

export function UserManagement() {
  const [cashiers, setCashiers] = useState([
    { id: 1, name: "Kamal Perera", email: "kamal@pos.com", branch: "Main Branch", terminal: "Counter 01", status: "online", employeeId: "EMP-001" },
    { id: 2, name: "Sunil Silva", email: "sunil@pos.com", branch: "Kandy Branch", terminal: "Counter 02", status: "offline", employeeId: "EMP-042" },
  ]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
      <Card className="xl:col-span-1 h-fit border-border shadow-md bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-black uppercase tracking-tighter text-foreground">
            <KeyRound className="text-primary w-4 h-4 sm:w-5 sm:h-5"/> Assign POS Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Select Staff Member</Label>
            <Select>
              <SelectTrigger className="h-10 sm:h-11 text-sm">
                <SelectValue placeholder="Search Employee..." />
              </SelectTrigger>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Assign Branch</Label>
              <Select>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Assign Counter</Label>
              <Select>
                <SelectTrigger className="h-10 sm:h-11 text-sm">
                  <SelectValue placeholder="Terminal" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-primary font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12">Authorize Billing Access</Button>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2 border-border shadow-md bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-black uppercase tracking-tighter text-foreground">
            <CreditCard className="text-primary w-4 h-4 sm:w-5 sm:h-5"/> Active Operators
          </CardTitle>
          <Badge variant="outline" className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-foreground">{cashiers.length} Cashiers</Badge>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          <div className="space-y-3">
            {cashiers.map((c) => (
              <div key={c.id} className="p-3 sm:p-4 rounded-2xl border bg-muted/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${c.status === 'online' ? 'bg-success/10 border-success/20 text-success' : 'bg-muted border-muted/50 text-muted-foreground'}`}>
                    {c.status === 'online' ? <UserCheck className="w-4 h-4 sm:w-5 sm:h-5"/> : <UserX className="w-4 h-4 sm:w-5 sm:h-5"/>}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase">{c.name}</h4>
                    <p className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase">{c.branch} • {c.terminal}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8" onClick={() => setCashiers(cashiers.filter(u => u.id !== c.id))}>
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4"/>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}