"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/Select";
import { Printer, ScanLine, Settings2, MonitorSmartphone } from "lucide-react";

function Label({ children, className }: any) {
  return <label className={`block font-medium ${className}`}>{children}</label>;
}

export function HardwareConfig() {
  return (
    <Card className="border-border shadow-lg bg-card">
      <CardHeader className="bg-muted/10 border-b">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-black uppercase tracking-tighter text-foreground">
          <Settings2 className="text-primary w-4 h-4 sm:w-5 sm:h-5" /> Peripheral Terminals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 sm:space-y-6 pt-5 sm:pt-6">
        <div className="space-y-2">
          <Label className="text-[9px] sm:text-[10px] font-bold uppercase flex items-center gap-2 text-foreground">
            <Printer className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" /> Receipt Printer (80mm Thermal)
          </Label>
          <Select defaultValue="usb">
            <SelectTrigger className="h-10 sm:h-11 text-sm">
              <SelectValue placeholder="Printer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usb">USB Wired</SelectItem>
              <SelectItem value="net">Network/Ethernet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[9px] sm:text-[10px] font-bold uppercase flex items-center gap-2 text-foreground">
            <ScanLine className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" /> Barcode Scanner Mode
          </Label>
          <Select defaultValue="auto">
            <SelectTrigger className="h-10 sm:h-11 text-sm">
              <SelectValue placeholder="Scanner type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-Detect HID</SelectItem>
              <SelectItem value="manual">Manual COM Port</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-[9px] sm:text-[10px] font-bold uppercase flex items-center gap-2 text-foreground">
            <MonitorSmartphone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" /> Customer Display (Secondary)
          </Label>
          <Select defaultValue="none">
            <SelectTrigger className="h-10 sm:h-11 text-sm">
              <SelectValue placeholder="Display Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Disabled</SelectItem>
              <SelectItem value="hdmi">HDMI/Second Monitor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}