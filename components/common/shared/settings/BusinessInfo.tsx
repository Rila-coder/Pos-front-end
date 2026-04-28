"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Button } from "@/components/common/ui/Button";
import { Building2, Phone, Mail, MapPin, Landmark } from "lucide-react";

export function BusinessInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="lg:col-span-1 bg-primary/5 border-none shadow-sm p-4 sm:p-6 text-center">
        <Building2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary mb-3 sm:mb-4" />
        <h3 className="font-bold text-base sm:text-lg uppercase text-foreground">Store Profile</h3>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Public info for receipts</p>
      </Card>

      <Card className="lg:col-span-2 border-border shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-xs sm:text-sm uppercase font-black text-foreground">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] sm:text-xs font-medium text-foreground">Store Name</Label>
              <Input defaultValue="Smart Retail Store" className="h-10 sm:h-11 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] sm:text-xs font-medium text-foreground">BR Number</Label>
              <Input defaultValue="PV-123456" className="h-10 sm:h-11 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] sm:text-xs font-medium text-foreground">Phone</Label>
              <Input defaultValue="+94 11..." className="h-10 sm:h-11 text-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] sm:text-xs font-medium text-foreground">Email</Label>
              <Input defaultValue="info@store.lk" className="h-10 sm:h-11 text-sm" />
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-1">
              <Label className="text-[10px] sm:text-xs font-medium text-foreground">Address</Label>
              <Input defaultValue="Colombo, Sri Lanka" className="h-10 sm:h-11 text-sm" />
            </div>
          </div>
          <Button className="bg-primary uppercase font-bold w-full sm:w-auto px-6 sm:px-8 h-10 sm:h-11 text-xs">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}