"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/ui/Button";
import { Progress } from "@/components/common/ui/Progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/common/ui/Card";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import {
  Store,
  CheckCircle2,
  Cpu,
  Key,
  Fingerprint,
  RefreshCcw,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [licenseCode, setLicenseCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Form data
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [branchData, setBranchData] = useState({
    name: "",
    location: "",
    phone: "",
    brNo: "",
  });

  const validateLicense = () => {
    if (licenseCode === "WEBSTAR-2026") {
      setStep(1);
    } else {
      alert("Invalid License Code. Please contact Webstar Solutions.");
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value && !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  useEffect(() => {
    if (step === 5) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(6), 800);
            return 100;
          }
          if (prev < 30) setLoadingText("Registering System License...");
          else if (prev < 60) setLoadingText("Configuring Main Branch...");
          else setLoadingText("Securing Owner Credentials...");
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleComplete = () => {
    // 1. Mark system as configured
    localStorage.setItem("systemConfigured", "true");

    // 2. Save the setup data for login validation
    localStorage.setItem("userRole", "admin"); // Redirecting to Admin because it's a single shop initially
    localStorage.setItem("ownerName", adminData.fullName);
    localStorage.setItem("ownerEmail", adminData.email);
    localStorage.setItem("ownerPassword", adminData.password);

    // 3. Clear setup temp states and redirect to root login
    router.replace("/");
  };

  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-[480px]">
        {/* Navigation Back Button (Visible from Step 1 to 4) */}
        {step > 0 && step < 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            className="mb-4 text-muted-foreground hover:text-foreground group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to previous step
          </Button>
        )}

        <Card className="shadow-2xl border-primary/20 bg-card overflow-hidden">
          {/* STEP 0: LICENSE VERIFICATION */}
          {step === 0 && (
            <div className="p-8 text-center space-y-6 animate-in fade-in zoom-in">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                <Key className="w-8 h-8" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground">
                  Activate SmartPOS
                </CardTitle>
                <CardDescription>
                  Enter the license code provided by Webstar
                </CardDescription>
              </CardHeader>
              <Input
                className="text-center h-14 text-xl font-mono tracking-widest border-2 uppercase bg-muted/20"
                placeholder="WEBSTAR-XXXX"
                value={licenseCode}
                onChange={(e) => setLicenseCode(e.target.value)}
              />
              <Button
                onClick={validateLicense}
                className="w-full h-14 font-black uppercase tracking-widest shadow-lg"
              >
                Verify License
              </Button>
            </div>
          )}

          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <div className="p-8 text-center space-y-6 animate-in slide-in-from-right-8">
              <Store className="w-16 h-16 mx-auto text-primary" />
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-foreground">
                  Welcome
                </CardTitle>
                <CardDescription>
                  License Validated. Let's create your account.
                </CardDescription>
              </CardHeader>
              <Button
                onClick={() => setStep(2)}
                className="w-full h-14 font-bold uppercase tracking-widest"
              >
                Begin Account Setup
              </Button>
            </div>
          )}

          {/* STEP 2: OWNER CREDS */}
          {step === 2 && (
            <div className="p-8 space-y-4 animate-in slide-in-from-right-8">
              <h2 className="text-xl font-bold uppercase text-primary tracking-tighter flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Owner Account
              </h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Nihmath"
                    value={adminData.fullName}
                    onChange={(e) =>
                      setAdminData({ ...adminData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="owner@store.lk"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({ ...adminData, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep(3)}
                className="w-full mt-4 h-12 uppercase font-black"
              >
                Next: Security Verify
              </Button>
            </div>
          )}

          {/* STEP 3: 2-STEP VERIFICATION */}
          {step === 3 && (
            <div className="p-8 text-center space-y-8 animate-in slide-in-from-right-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                <Fingerprint className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight uppercase">
                  Identity Verification
                </h2>
                <p className="text-xs text-muted-foreground mt-2 uppercase font-bold">
                  Enter the 6-digit code sent to {adminData.email}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-10 md:w-12 h-14 text-center text-xl font-bold bg-muted/50 border-2 border-border rounded-xl focus:border-primary outline-none transition-all text-foreground"
                  />
                ))}
              </div>
              <div className="space-y-4">
                <Button
                  onClick={() => setStep(4)}
                  className="w-full h-12 font-bold uppercase"
                >
                  Verify & Continue
                </Button>
                <button className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center justify-center gap-1 mx-auto">
                  <RefreshCcw className="w-3 h-3" /> Resend Code
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: STORE INFO */}
          {step === 4 && (
            <div className="p-8 space-y-4 animate-in slide-in-from-right-8">
              <h2 className="text-xl font-bold uppercase text-primary tracking-tighter">
                Branch Details
              </h2>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    Store Name
                  </Label>
                  <Input
                    placeholder="My Smart Store"
                    value={branchData.name}
                    onChange={(e) =>
                      setBranchData({ ...branchData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    Address
                  </Label>
                  <Input
                    placeholder="No. 12, Galle Road"
                    value={branchData.location}
                    onChange={(e) =>
                      setBranchData({ ...branchData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] uppercase font-bold">
                    BR Number
                  </Label>
                  <Input
                    placeholder="PV-XXXXXX"
                    value={branchData.brNo}
                    onChange={(e) =>
                      setBranchData({ ...branchData, brNo: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => setStep(5)}
                className="w-full mt-4 h-14 bg-primary font-black uppercase tracking-widest shadow-xl"
              >
                Complete Installation
              </Button>
            </div>
          )}

          {/* STEP 5: PROGRESS */}
          {step === 5 && (
            <div className="p-12 text-center space-y-6">
              <Cpu className="w-12 h-12 mx-auto animate-pulse text-primary" />
              <h3 className="font-bold uppercase tracking-widest text-sm text-foreground">
                {loadingText}
              </h3>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* STEP 6: READY */}
          {step === 6 && (
            <div className="p-10 text-center space-y-6 animate-in zoom-in">
              <CheckCircle2 className="w-20 h-20 mx-auto text-success" />
              <h2 className="text-3xl font-black uppercase tracking-tighter text-foreground">
                Setup Finished!
              </h2>
              <p className="text-muted-foreground text-sm uppercase font-bold">
                Configuration complete for {adminData.fullName}
              </p>
              <Button
                onClick={handleComplete}
                className="w-full h-14 font-black uppercase shadow-2xl"
              >
                Enter POS Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
