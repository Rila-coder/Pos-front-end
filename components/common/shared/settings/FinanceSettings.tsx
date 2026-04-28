"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Switch } from "@/components/common/ui/Switch";
import { Button } from "@/components/common/ui/Button";
import { Label } from "@/components/common/ui/Label";
import { CreditCard, Banknote, Percent, Landmark } from "lucide-react";

export function FinanceSettings() {
  const [taxes, setTaxes] = useState([
    { name: "VAT", rate: "18", enabled: true },
    { name: "SSCL", rate: "2.5", enabled: true },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <Card className="shadow-lg border-border bg-card">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
            <Percent className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4"/> Tax Compliance (SL)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 sm:pt-6">
          {taxes.map((tax) => (
            <div key={tax.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-muted/20 rounded-xl border border-border">
              <span className="font-bold text-xs sm:text-sm text-foreground">{tax.name} (%)</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <Input className="w-14 sm:w-16 h-9 sm:h-10 font-bold text-sm" value={tax.rate} readOnly />
                <Switch checked={tax.enabled} />
              </div>
            </div>
          ))}
          <Button className="w-full font-black uppercase text-[10px] sm:text-xs h-10 sm:h-12 bg-primary">Save Finance Rules</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border bg-card">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
            <Landmark className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4"/> Store Currency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 sm:pt-6">
          <div className="space-y-1">
            <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Currency Symbol</Label>
            <Input defaultValue="Rs." className="h-10 sm:h-11 font-bold text-sm" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl">
            <Label className="text-xs sm:text-sm font-medium text-foreground">Show Tax on Receipt</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}