"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { Label } from "@/components/common/ui/Label";
import { Badge } from "@/components/common/ui/Badge";
import { Building2, Plus, MapPin, Phone, Trash2, Save, Store, Fingerprint, Users, X, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateBranchCredentials from "@/components/common/shared/settings/AddBranchWizard";

interface Branch {
  id: number;
  name: string;
  location: string;
  phone: string;
  code: string;
  manager?: string;
  cashiers?: number;
  adminEmail?: string;
  adminName?: string;
  credentialsSet?: boolean;
}

export default function SuperAdminBranchesPage() {
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: "Main Branch", location: "123 Main Street, Colombo 03", phone: "+94 11 234 5678", code: "HQ-COL-01", manager: "Owner", cashiers: 5, credentialsSet: true },
    { id: 2, name: "Kandy Branch", location: "Peradeniya Rd, Kandy", phone: "0812345678", code: "KB-02", manager: "Pending", cashiers: 0, credentialsSet: false },
    { id: 3, name: "Galle Branch", location: "Matara Rd, Galle", phone: "0912345678", code: "GB-03", manager: "Pending", cashiers: 0, credentialsSet: false },
  ]);

  const [newBranch, setNewBranch] = useState({ name: "", code: "", location: "", phone: "", manager: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [pendingBranch, setPendingBranch] = useState<Branch | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load branches from localStorage on mount
  useEffect(() => {
    const savedBranches = JSON.parse(localStorage.getItem("branches") || "[]");
    if (savedBranches.length > 0) {
      const existingIds = branches.map(b => b.id);
      const newBranches = savedBranches.filter((b: Branch) => !existingIds.includes(b.id));
      if (newBranches.length > 0) {
        setBranches([...branches, ...newBranches]);
      }
    }
  }, []);

  // Save branches to localStorage whenever they change
  useEffect(() => {
    const branchesToSave = branches.filter(b => b.id !== 1);
    localStorage.setItem("branches", JSON.stringify(branchesToSave));
  }, [branches]);

  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.code) {
      alert("Please fill branch name and code");
      return;
    }
    if (!newBranch.location) {
      alert("Please enter branch address");
      return;
    }

    const branch: Branch = {
      id: Date.now(),
      name: newBranch.name,
      code: newBranch.code,
      location: newBranch.location,
      phone: newBranch.phone || "TBD",
      manager: newBranch.manager || "Pending",
      cashiers: 0,
      credentialsSet: false
    };

    setBranches([...branches, branch]);
    setPendingBranch(branch);
    setShowCredentialModal(true);
    setNewBranch({ name: "", code: "", location: "", phone: "", manager: "" });
    setShowAdd(false);
  };

  const handleSetupCredentials = (branch: Branch) => {
    setPendingBranch(branch);
    setShowCredentialModal(true);
  };

  const handleDeleteBranch = (branchId: number) => {
    if (branchId === 1) {
      alert("Cannot delete Main Branch");
      return;
    }
    if (confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter(b => b.id !== branchId));
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleCredentialComplete = () => {
    if (pendingBranch) {
      const updatedBranches = branches.map(b => 
        b.id === pendingBranch.id ? { ...b, credentialsSet: true, manager: pendingBranch.manager || "Assigned" } : b
      );
      setBranches(updatedBranches);
    }
    setShowCredentialModal(false);
    setPendingBranch(null);
    setRefreshKey(prev => prev + 1);
  };

  const mainBranch = branches.find(b => b.id === 1);
  const subBranches = branches.filter(b => b.id !== 1);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-foreground flex items-center gap-2 sm:gap-3">
            <Building2 className="text-primary h-6 w-6 sm:h-8 sm:w-8" /> Branch Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage all business locations</p>
        </div>
        <Button 
          onClick={() => setShowAdd(!showAdd)} 
          className="bg-primary hover:bg-primary-hover font-black uppercase text-[9px] sm:text-xs h-10 sm:h-12 px-4 sm:px-6 shadow-xl shadow-primary/20"
        >
          <Plus className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Add New Branch
        </Button>
      </div>

      {/* Add Branch Form */}
      {showAdd && (
        <Card className="border-primary/20 bg-muted/20 animate-in fade-in slide-in-from-top-4">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1">
                <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Branch Name *</Label>
                <Input 
                  placeholder="e.g., Negombo Branch" 
                  value={newBranch.name} 
                  onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Branch Code *</Label>
                <Input 
                  placeholder="e.g., NB-04" 
                  value={newBranch.code} 
                  onChange={(e) => setNewBranch({...newBranch, code: e.target.value})}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-1">
                <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Address *</Label>
                <Input 
                  placeholder="Full address" 
                  value={newBranch.location} 
                  onChange={(e) => setNewBranch({...newBranch, location: e.target.value})}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Phone</Label>
                <Input 
                  placeholder="Contact number" 
                  value={newBranch.phone} 
                  onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] sm:text-[10px] font-bold uppercase text-muted-foreground">Manager Name</Label>
                <Input 
                  placeholder="Branch manager" 
                  value={newBranch.manager} 
                  onChange={(e) => setNewBranch({...newBranch, manager: e.target.value})}
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <Button className="col-span-1 sm:col-span-2 bg-primary font-bold uppercase mt-2 text-xs h-10 sm:h-11" onClick={handleAddBranch}>
                Create Branch & Setup Admin
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Branch Card */}
      <Card className="border-border shadow-lg bg-card">
        <CardHeader className="border-b border-border/50 pb-4 sm:pb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-primary rounded-2xl text-primary-foreground shadow-lg shadow-primary/20">
              <Store className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">Main Branch</CardTitle>
              <CardDescription className="text-[10px] sm:text-xs">Primary Business Headquarters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-8 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Branch Name</Label>
              <Input defaultValue={mainBranch?.name} className="h-10 sm:h-12 bg-muted/30 font-bold text-sm" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Internal Code</Label>
              <Input defaultValue={mainBranch?.code} className="h-10 sm:h-12 bg-muted/30 font-mono text-sm" readOnly />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Address</Label>
              <Input defaultValue={mainBranch?.location} className="h-10 sm:h-12 bg-muted/30 text-sm" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Phone</Label>
              <Input defaultValue={mainBranch?.phone} className="h-10 sm:h-12 bg-muted/30 text-sm" readOnly />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Manager</Label>
              <Input defaultValue={mainBranch?.manager} className="h-10 sm:h-12 bg-muted/30 text-sm" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-Branches List */}
      <div className="space-y-3 sm:space-y-4">
        <Label className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">
          Current Branch Network
        </Label>
        {subBranches.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-muted-foreground border-2 border-dashed rounded-xl">
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 opacity-30" />
            <p className="text-xs sm:text-sm">No sub-branches added yet</p>
            <p className="text-[10px] sm:text-xs">Click "Add New Branch" to expand your business</p>
          </div>
        ) : (
          subBranches.map((branch) => (
            <div key={branch.id} className="p-3 sm:p-4 bg-card border border-border/50 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 group hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base flex flex-wrap items-center gap-2 text-foreground">
                    {branch.name} 
                    <Badge variant="secondary" className="text-[8px] sm:text-[9px] uppercase">{branch.code}</Badge>
                    {branch.credentialsSet ? (
                      <Badge className="bg-success/10 text-success text-[7px] sm:text-[8px]">Active</Badge>
                    ) : (
                      <Badge className="bg-warning/10 text-warning text-[7px] sm:text-[8px] animate-pulse">Setup Pending</Badge>
                    )}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase mt-1 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3"/> {branch.location}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">
                    Manager: {branch.manager || "Pending"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!branch.credentialsSet && (
                  <Button 
                    size="sm" 
                    className="bg-primary text-white text-[8px] sm:text-[10px] font-bold uppercase h-8 sm:h-9"
                    onClick={() => handleSetupCredentials(branch)}
                  >
                    <Rocket className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> Setup Now
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8" 
                  onClick={() => handleDeleteBranch(branch.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 sm:h-8 sm:w-8 text-info"
                  onClick={() => router.push(`/super-admin/branches/${branch.id}`)}
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Credential Modal */}
      {pendingBranch && (
        <CreateBranchCredentials
          isOpen={showCredentialModal}
          onClose={() => {
            setShowCredentialModal(false);
            setPendingBranch(null);
          }}
          branchData={pendingBranch}
          onComplete={handleCredentialComplete}
        />
      )}
    </div>
  );
}