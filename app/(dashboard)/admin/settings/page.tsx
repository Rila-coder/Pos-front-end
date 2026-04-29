"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/common/ui/Tabs";
import { BusinessInfo } from "@/components/common/shared/settings/BusinessInfo";
import { UserManagement } from "@/components/common/shared/settings/UserManagement";
import { FinanceSettings } from "@/components/common/shared/settings/FinanceSettings";
import { HardwareConfig } from "@/components/common/shared/settings/HardwareConfig";
import { BranchManagement } from "@/components/common/shared/settings/BranchManagement";
import CreateBranchCredentials from "@/components/common/shared/settings/AddBranchWizard";
import { Settings, Rocket } from "lucide-react";
import { Button } from "@/components/common/ui/Button";

interface Branch {
  id: number;
  name: string;
  code: string;
  location: string;
  phone: string;
  manager?: string;
  credentialsSet?: boolean;
}

export default function SettingsPage() {
  const [branchCount, setBranchCount] = useState(0);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [pendingBranch, setPendingBranch] = useState<Branch | null>(null);
  const [activeTab, setActiveTab] = useState("business");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const savedBranches = JSON.parse(localStorage.getItem("branches") || "[]");
    setBranchCount(savedBranches.length);
  }, [refreshKey]);

  const handleBranchCreated = (branch: Branch) => {
    setPendingBranch(branch);
    setShowCredentialModal(true);
  };

  const handleSetupCredentials = (branch: Branch) => {
    setPendingBranch(branch);
    setShowCredentialModal(true);
  };

  const handleCredentialComplete = () => {
    if (pendingBranch) {
      const branches = JSON.parse(localStorage.getItem("branches") || "[]");
      const updatedBranches = branches.map((b: Branch) => 
        b.id === pendingBranch.id ? { ...b, credentialsSet: true, manager: pendingBranch.manager } : b
      );
      localStorage.setItem("branches", JSON.stringify(updatedBranches));
    }
    
    setShowCredentialModal(false);
    setPendingBranch(null);
    setRefreshKey(prev => prev + 1);
    
    alert(`Branch "${pendingBranch?.name}" credentials have been set up successfully!`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase">Configure your local station</p>
          </div>
        </div>
        
        <Button 
          className="bg-primary hover:bg-primary-hover font-black uppercase text-[9px] sm:text-[10px] h-10 sm:h-12 px-4 sm:px-6 shadow-lg"
          onClick={() => setActiveTab("branches")}
        >
          <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Add New Branch
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="bg-muted/50 p-1 w-max min-w-full sm:min-w-0">
            <TabsTrigger value="business" className="uppercase font-bold text-[9px] sm:text-[10px]">Store Profile</TabsTrigger>
            <TabsTrigger value="users" className="uppercase font-bold text-[9px] sm:text-[10px]">User Access</TabsTrigger>
            <TabsTrigger value="finance" className="uppercase font-bold text-[9px] sm:text-[10px]">Tax & Finance</TabsTrigger>
            <TabsTrigger value="hardware" className="uppercase font-bold text-[9px] sm:text-[10px]">Hardware</TabsTrigger>
            <TabsTrigger value="branches" className="uppercase font-bold text-[9px] sm:text-[10px] bg-primary/20 text-primary">
              🏢 Branches
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="business"><BusinessInfo /></TabsContent>
        <TabsContent value="users"><UserManagement /></TabsContent>
        <TabsContent value="finance"><FinanceSettings /></TabsContent>
        <TabsContent value="hardware"><div className="max-w-md"><HardwareConfig /></div></TabsContent>
        <TabsContent value="branches" key={refreshKey}>
          <BranchManagement 
            onBranchCreated={handleBranchCreated}
            onSetupCredentials={handleSetupCredentials}
          />
        </TabsContent>
      </Tabs>

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