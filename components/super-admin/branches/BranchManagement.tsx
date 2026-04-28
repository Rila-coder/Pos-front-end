"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Label } from "@/components/common/ui/Label";
import { Badge } from "@/components/common/ui/Badge";
import { 
  Building2, 
  Plus, 
  MapPin, 
  Phone, 
  Trash2, 
  Save, 
  Store, 
  Fingerprint,
  Users
} from "lucide-react";

interface Branch {
  id: number;
  name: string;
  location: string;
  phone: string;
  code: string;
  manager?: string;
  cashiers?: number;
}

export function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: "Main Branch", location: "123 Main Street, Colombo 03", phone: "+94 11 234 5678", code: "HQ-COL-01", manager: "Nihmath (Owner)", cashiers: 5 },
    { id: 2, name: "Kandy Branch", location: "Peradeniya Rd, Kandy", phone: "0812345678", code: "KB-02", manager: "Kamal Perera", cashiers: 3 },
    { id: 3, name: "Galle Branch", location: "Matara Rd, Galle", phone: "0912345678", code: "GB-03", manager: "Sunil Silva", cashiers: 2 },
  ]);

  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    location: "",
    phone: "",
    manager: ""
  });

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.code) {
      const branch: Branch = {
        id: branches.length + 1,
        name: newBranch.name,
        location: newBranch.location || "Location TBD",
        phone: newBranch.phone || "N/A",
        code: newBranch.code,
        manager: newBranch.manager || "Unassigned",
        cashiers: 0
      };
      setBranches([...branches, branch]);
      setNewBranch({ name: "", code: "", location: "", phone: "", manager: "" });
    }
  };

  const handleDeleteBranch = (id: number) => {
    if (id === 1) return;
    setBranches(branches.filter(b => b.id !== id));
  };

  const mainBranch = branches.find(b => b.id === 1);
  const subBranches = branches.filter(b => b.id !== 1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      
      {/* COLUMN 1: MAIN BRANCH (HEADQUARTERS) */}
      <div className="space-y-4 sm:space-y-6">
        <Card className="border-border shadow-lg bg-card">
          <CardHeader className="border-b border-border/50 pb-4 sm:pb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-primary rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
                <Store className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black tracking-tight uppercase text-foreground">Main Branch</CardTitle>
                <CardDescription className="text-[10px] sm:text-xs">Primary Business Headquarters (HQ)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-8 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Branch Name</Label>
                <Input 
                  defaultValue={mainBranch?.name} 
                  className="h-10 sm:h-12 bg-muted/30 border-input font-bold text-sm" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Internal Code</Label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  <Input 
                    defaultValue={mainBranch?.code} 
                    className="pl-9 sm:pl-10 h-10 sm:h-12 bg-muted/30 border-input font-mono text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Physical Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  <Input 
                    defaultValue={mainBranch?.location} 
                    className="pl-9 sm:pl-10 h-10 sm:h-12 bg-muted/30 border-input text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Contact</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  <Input 
                    defaultValue={mainBranch?.phone} 
                    className="pl-9 sm:pl-10 h-10 sm:h-12 bg-muted/30 border-input text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Manager In-Charge</Label>
                <Input 
                  defaultValue={mainBranch?.manager} 
                  className="h-10 sm:h-12 bg-muted/30 border-input text-sm" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cashier Count</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  <Input 
                    defaultValue={mainBranch?.cashiers} 
                    readOnly 
                    className="pl-9 sm:pl-10 h-10 sm:h-12 bg-muted/30 border-input text-sm" 
                  />
                </div>
              </div>
            </div>
            <Button className="w-full h-12 sm:h-14 bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-xl hover:bg-primary-hover active:scale-95 transition-all text-xs sm:text-sm">
              <Save className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Save HQ Configuration
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* COLUMN 2: SUB-BRANCHES (CREATE & LIST) */}
      <div className="space-y-6 sm:space-y-8">
        {/* Create Sub-Branch */}
        <Card className="border-border shadow-md bg-muted/20 border-dashed border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-foreground">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> 
              Register New Branch
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Branch Name</Label>
              <Input 
                placeholder="Galle Branch" 
                className="h-9 sm:h-10 border-input text-sm"
                value={newBranch.name}
                onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Branch Code</Label>
              <Input 
                placeholder="GB-03" 
                className="h-9 sm:h-10 border-input text-sm"
                value={newBranch.code}
                onChange={(e) => setNewBranch({...newBranch, code: e.target.value})}
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Address</Label>
              <Input 
                placeholder="Branch address" 
                className="h-9 sm:h-10 border-input text-sm"
                value={newBranch.location}
                onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Contact</Label>
              <Input 
                placeholder="Phone number" 
                className="h-9 sm:h-10 border-input text-sm"
                value={newBranch.phone}
                onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Manager</Label>
              <Input 
                placeholder="Manager name" 
                className="h-9 sm:h-10 border-input text-sm"
                value={newBranch.manager}
                onChange={(e) => setNewBranch({...newBranch, manager: e.target.value})}
              />
            </div>
            <Button 
              className="sm:col-span-2 bg-primary text-primary-foreground hover:bg-primary-hover font-bold transition-all text-xs sm:text-sm h-10 sm:h-11"
              onClick={handleAddBranch}
            >
              Initialize Branch
            </Button>
          </CardContent>
        </Card>

        {/* Branch List */}
        <div className="space-y-3 sm:space-y-4">
          <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
            Current Branch Network
          </Label>
          {subBranches.map((branch) => (
            <div 
              key={branch.id} 
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-muted rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base flex flex-wrap items-center gap-2 text-foreground">
                    {branch.name} 
                    <Badge variant="secondary" className="text-[8px] sm:text-[9px] font-black uppercase leading-none px-1.5 py-0.5 sm:px-2 sm:py-0.5">
                      {branch.code}
                    </Badge>
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted-foreground flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {branch.location}</span>
                    <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {branch.phone}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-2">
                    <Badge variant="outline" className="text-[7px] sm:text-[8px] text-foreground">
                      Manager: {branch.manager}
                    </Badge>
                    <Badge variant="outline" className="text-[7px] sm:text-[8px] text-foreground">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> {branch.cashiers} cashiers
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8"
                onClick={() => handleDeleteBranch(branch.id)}
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}