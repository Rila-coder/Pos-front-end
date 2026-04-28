"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/Button";
import { Progress } from "@/components/common/ui/Progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/common/ui/Dialog";
import { Building2, Mail, Lock, User, Fingerprint, RefreshCcw, ShieldCheck, CheckCircle2, AlertCircle, X } from "lucide-react";

interface BranchData {
  id: number;
  name: string;
  code: string;
  location: string;
  phone: string;
  manager?: string;
}

interface CreateBranchCredentialsProps {
  isOpen: boolean;
  onClose: () => void;
  branchData: BranchData;
  onComplete?: () => void;
}

export default function CreateBranchCredentials({ isOpen, onClose, branchData, onComplete }: CreateBranchCredentialsProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  
  // Form data
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Progress simulation
  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(5), 800);
            return 100;
          }
          if (prev < 25) setLoadingText("Creating branch admin account...");
          else if (prev < 50) setLoadingText("Setting up branch permissions...");
          else if (prev < 75) setLoadingText("Configuring branch inventory...");
          else setLoadingText("Finalizing branch setup...");
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [step]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
  };

  const validateStep2 = () => {
    if (!adminData.fullName.trim()) {
      alert("Please enter branch manager name");
      return false;
    }
    if (!validateEmail(adminData.email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    if (adminData.password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      return false;
    }
    setPasswordError("");
    if (adminData.password !== adminData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateStep3 = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      alert("Please enter the 6-digit verification code");
      return false;
    }
    return true;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value && !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`branch-otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`branch-otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleResendOtp = () => {
    alert("A new verification code has been sent to " + adminData.email);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    
    // Save branch admin credentials to localStorage
    const branches = JSON.parse(localStorage.getItem("branches") || "[]");
    const updatedBranches = branches.map((b: any) => {
      if (b.id === branchData.id) {
        return {
          ...b,
          adminEmail: adminData.email,
          adminName: adminData.fullName,
          status: "active",
          credentialsSet: true
        };
      }
      return b;
    });
    localStorage.setItem("branches", JSON.stringify(updatedBranches));
    
    // Also store branch admin login credentials
    const branchAdmins = JSON.parse(localStorage.getItem("branchAdmins") || "[]");
    branchAdmins.push({
      branchId: branchData.id,
      branchName: branchData.name,
      email: adminData.email,
      password: adminData.password,
      name: adminData.fullName,
      role: "admin"
    });
    localStorage.setItem("branchAdmins", JSON.stringify(branchAdmins));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      if (onComplete) onComplete();
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (step === 1 || step === 2 || step === 3) {
      if (confirm("Are you sure you want to cancel branch creation? All progress will be lost.")) {
        onClose();
        setStep(1);
        setAdminData({ fullName: "", email: "", password: "", confirmPassword: "" });
        setOtp(["", "", "", "", "", ""]);
      }
    } else {
      onClose();
      setStep(1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[500px] p-0 overflow-hidden bg-card border-border shadow-2xl z-50">
        {/* Header */}
        <DialogHeader className="p-3 sm:p-4 border-b border-border bg-muted/30">
          <div className="flex flex-row justify-between items-center">
            <DialogTitle className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-foreground">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              Setup Branch: {branchData.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-4 sm:p-6 bg-card">
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="text-center space-y-4 sm:space-y-6 animate-in fade-in zoom-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter text-foreground">Branch Setup</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Create admin credentials for {branchData.name}
                </p>
              </div>
              <div className="bg-muted/20 p-3 sm:p-4 rounded-xl text-left space-y-2 border border-border">
                <p className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">Branch Details:</p>
                <p className="text-xs sm:text-sm text-foreground"><span className="text-muted-foreground">Name:</span> {branchData.name}</p>
                <p className="text-xs sm:text-sm text-foreground"><span className="text-muted-foreground">Code:</span> {branchData.code}</p>
                <p className="text-xs sm:text-sm text-foreground"><span className="text-muted-foreground">Location:</span> {branchData.location}</p>
              </div>
              <Button onClick={() => setStep(2)} className="w-full h-10 sm:h-12 font-black uppercase bg-primary text-primary-foreground hover:bg-primary-hover text-xs">
                Continue to Credentials
              </Button>
            </div>
          )}

          {/* STEP 2: BRANCH ADMIN CREDENTIALS */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-5 animate-in slide-in-from-right-8">
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h3 className="font-bold uppercase text-xs sm:text-sm text-foreground">Branch Manager Account</h3>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <Input
                      className="pl-9 sm:pl-10 h-10 sm:h-11 bg-input-background border-border text-foreground focus:border-ring text-sm"
                      placeholder="e.g., Kamal Perera"
                      value={adminData.fullName}
                      onChange={(e) => setAdminData({ ...adminData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <Input
                      className="pl-9 sm:pl-10 h-10 sm:h-11 bg-input-background border-border text-foreground focus:border-ring text-sm"
                      type="email"
                      placeholder="branchmanager@store.lk"
                      value={adminData.email}
                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    />
                  </div>
                  {emailError && <p className="text-[10px] sm:text-xs text-destructive mt-1">{emailError}</p>}
                </div>

                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <Input
                      className="pl-9 sm:pl-10 h-10 sm:h-11 bg-input-background border-border text-foreground focus:border-ring text-sm"
                      type="password"
                      placeholder="••••••••"
                      value={adminData.password}
                      onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    <Input
                      className="pl-9 sm:pl-10 h-10 sm:h-11 bg-input-background border-border text-foreground focus:border-ring text-sm"
                      type="password"
                      placeholder="••••••••"
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                    />
                  </div>
                  {passwordError && <p className="text-[10px] sm:text-xs text-destructive mt-1">{passwordError}</p>}
                </div>
              </div>

              <Button onClick={() => { if (validateStep2()) setStep(3); }} className="w-full h-10 sm:h-12 font-black uppercase bg-primary text-primary-foreground hover:bg-primary-hover text-xs">
                Continue to Verification
              </Button>
            </div>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {step === 3 && (
            <div className="text-center space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Fingerprint className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter text-foreground">Verify Identity</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Enter the 6-digit code sent to <span className="font-bold text-foreground">{adminData.email}</span>
                </p>
              </div>
              <div className="flex justify-center gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`branch-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-9 h-11 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold bg-muted/30 border-2 border-border rounded-xl focus:border-primary outline-none text-foreground"
                  />
                ))}
              </div>
              <div className="space-y-3 sm:space-y-4">
                <Button onClick={() => { if (validateStep3()) setStep(4); }} className="w-full h-10 sm:h-12 font-black uppercase bg-primary text-primary-foreground hover:bg-primary-hover text-xs">
                  Verify & Create Branch
                </Button>
                <button onClick={handleResendOtp} className="text-[10px] sm:text-xs font-bold text-muted-foreground hover:text-primary flex items-center justify-center gap-1 mx-auto transition-colors">
                  <RefreshCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Resend Code
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: INSTALLATION PROGRESS */}
          {step === 4 && (
            <div className="text-center space-y-6 sm:space-y-8 py-6 sm:py-8">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                <div className="relative bg-card border-2 border-primary rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-widest text-foreground text-xs sm:text-sm">{loadingText}</h3>
                <Progress value={progress} className="h-2 mt-3 sm:mt-4 bg-muted" />
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-3 sm:mt-4">Please do not close this window</p>
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION */}
          {step === 5 && (
            <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 animate-in zoom-in">
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-success" />
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter text-foreground">Branch Created!</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {branchData.name} has been successfully configured
                </p>
              </div>
              <div className="bg-muted/20 p-3 sm:p-4 rounded-xl text-left space-y-2 border border-border">
                <p className="text-[10px] sm:text-xs font-bold uppercase text-muted-foreground">Branch Admin Credentials:</p>
                <p className="text-xs sm:text-sm text-foreground"><span className="text-muted-foreground">Email:</span> {adminData.email}</p>
                <p className="text-xs sm:text-sm text-foreground"><span className="text-muted-foreground">Password:</span> ••••••••</p>
                <p className="text-[10px] sm:text-xs text-warning mt-2 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Share these credentials with the branch manager
                </p>
              </div>
              <Button onClick={handleComplete} disabled={isSubmitting} className="w-full h-10 sm:h-12 font-black uppercase bg-primary text-primary-foreground hover:bg-primary-hover text-xs">
                {isSubmitting ? "Processing..." : "Go to Dashboard"}
              </Button>
            </div>
          )}

          {/* Success Toast */}
          {showSuccess && (
            <div className="fixed bottom-4 right-4 bg-success text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold animate-in slide-in-from-bottom-4 z-50 shadow-lg">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Branch created successfully!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}