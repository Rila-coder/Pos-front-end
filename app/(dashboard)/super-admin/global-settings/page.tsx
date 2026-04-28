"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Label } from "@/components/common/ui/Label";
import { Switch } from "@/components/common/ui/Switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { ShieldAlert, Server, Settings, Globe, Lock } from "lucide-react";
import { FinanceSettings } from "@/components/common/shared/settings/FinanceSettings";

export default function SuperAdminGlobalSettings() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3">
        <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-foreground">Global Settings</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-bold uppercase">System-wide configuration</p>
        </div>
      </div>

      <Tabs defaultValue="tax" className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-muted/50 p-1 w-max min-w-full sm:min-w-0">
            <TabsTrigger value="tax" className="uppercase font-bold text-[9px] sm:text-[10px]">💰 Tax & Finance</TabsTrigger>
            <TabsTrigger value="security" className="uppercase font-bold text-[9px] sm:text-[10px]">🔒 Security</TabsTrigger>
            <TabsTrigger value="system" className="uppercase font-bold text-[9px] sm:text-[10px]">⚙️ System</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tax">
          <FinanceSettings />
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="bg-muted/10 border-b">
                <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
                  <Lock className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4"/> Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl bg-muted/20">
                  <Label className="text-[11px] sm:text-sm font-medium text-foreground">Require 2FA for Admin Login</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl">
                  <Label className="text-[11px] sm:text-sm font-medium text-foreground">Session Timeout (Minutes)</Label>
                  <Input type="number" defaultValue="60" className="w-20 sm:w-24 h-9 sm:h-10 text-sm" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl bg-muted/20">
                  <Label className="text-[11px] sm:text-sm font-medium text-foreground">Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" className="w-20 sm:w-24 h-9 sm:h-10 text-sm" />
                </div>
                <Button className="w-full bg-primary uppercase font-black text-[10px] sm:text-xs h-10 sm:h-12 shadow-lg">Save Security Settings</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="bg-muted/10 border-b">
                <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
                  <ShieldAlert className="text-destructive w-3.5 h-3.5 sm:w-4 sm:h-4"/> Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl bg-muted/20">
                  <Label className="text-[11px] sm:text-sm font-medium text-foreground">Auto Backup Database</Label>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Backup Schedule</Label>
                  <select className="w-full p-3 rounded-xl border border-border bg-background text-sm text-foreground">
                    <option>Daily at 2:00 AM</option>
                    <option>Weekly on Sunday</option>
                    <option>Manual Only</option>
                  </select>
                </div>
                <Button className="w-full bg-primary uppercase font-black text-[10px] sm:text-xs h-10 sm:h-12 shadow-lg">Configure Backup</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="bg-muted/10 border-b">
                <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
                  <Server className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4"/> System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6">
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">System Name</Label>
                  <Input defaultValue="Smart POS Enterprise" className="h-10 sm:h-11 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Default Currency</Label>
                  <Input defaultValue="Sri Lankan Rupee (LKR)" className="h-10 sm:h-11 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Time Zone</Label>
                  <Input defaultValue="Asia/Colombo" className="h-10 sm:h-11 text-sm" />
                </div>
                <Button className="w-full bg-primary uppercase font-black text-[10px] sm:text-xs h-10 sm:h-12 shadow-lg">Save System Config</Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border bg-card">
              <CardHeader className="bg-muted/10 border-b">
                <CardTitle className="flex items-center gap-2 text-xs sm:text-sm uppercase font-black text-foreground">
                  <Globe className="text-primary w-3.5 h-3.5 sm:w-4 sm:h-4"/> Localization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6">
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Date Format</Label>
                  <select className="w-full p-3 rounded-xl border border-border bg-background text-sm text-foreground">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Language</Label>
                  <select className="w-full p-3 rounded-xl border border-border bg-background text-sm text-foreground">
                    <option>English</option>
                    <option>Sinhala</option>
                    <option>Tamil</option>
                  </select>
                </div>
                <Button className="w-full bg-primary uppercase font-black text-[10px] sm:text-xs h-10 sm:h-12 shadow-lg">Save Localization</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}