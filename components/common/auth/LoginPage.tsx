"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { Checkbox } from "@/components/common/ui/CheckBox";
import { ShoppingCart, Lock, Mail, Building2, UserCircle2, Sun, Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/Select";

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [branch, setBranch] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const isDark = theme === "dark";

  const config = {
    bgImage: isDark ? "/Images/Dark Mood.png" : "/Images/Light Mood.png",
    accent: isDark ? "#F07F6D" : "#10B981",
    leftOverlay: isDark
      ? "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)"
      : "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%)",
    leftText: "text-white",
    leftSub: isDark ? "text-gray-400" : "text-gray-200",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo credentials for testing
    if (role === "super-admin" && email === "superadmin@pos.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "super-admin");
      localStorage.setItem("userName", "Super Admin");
      router.push("/super-admin");
      return;
    }
    if (role === "admin" && email === "admin@pos.com" && password === "1234") {
      if (!branch) {
        alert("Please select a branch");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userBranch", branch);
      localStorage.setItem("userName", `Admin (${branch})`);
      router.push("/admin");
      return;
    }
    if (role === "staff" && email === "staff@pos.com" && password === "1234") {
      if (!branch) {
        alert("Please select a branch");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "staff");
      localStorage.setItem("userBranch", branch);
      localStorage.setItem("userName", "Staff Member");
      router.push("/staff");
      return;
    }
    alert("Invalid credentials. Use:\nSuper Admin: superadmin@pos.com / 1234\nAdmin: admin@pos.com / 1234\nStaff: staff@pos.com / 1234");
  };

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-500">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg hover:scale-110 transition-all"
        type="button"
      >
        {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
      </button>

      {/* Left Side - Branding */}
      <div
        key={theme}
        className="hidden lg:flex lg:w-[55%] p-16 flex-col justify-between relative overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url("${config.bgImage}")` }}
      >
        <div className="absolute inset-0 transition-all duration-700" style={{ background: config.leftOverlay }} />
        <div
          className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-700 opacity-20"
          style={{ backgroundColor: config.accent }}
        />
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-white transition-colors duration-500"
              style={{ backgroundColor: config.accent }}
            >
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <span className="text-3xl font-extrabold tracking-tight transition-colors duration-500 text-white">
                SMART<span style={{ color: config.accent }}>POS</span>
              </span>
              <p className="text-sm font-medium uppercase tracking-widest transition-colors duration-500 text-gray-200">
                Enterprise Solutions
              </p>
            </div>
          </div>
          <div className="mt-24 max-w-lg">
            <h1 className="text-6xl font-extrabold mb-8 leading-[1.1] transition-colors duration-500 text-white">
              Elevate your <br />
              <span style={{ color: config.accent }} className="filter brightness-110">Retail Experience</span>
            </h1>
            <p className="text-lg leading-relaxed transition-colors duration-500 text-white opacity-90">
              The most advanced multi-branch management system for Sri Lankan entrepreneurs. Streamline sales, inventory, and staff in one clean dashboard.
            </p>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 pt-8 transition-colors duration-500">
          <div className="flex gap-12">
            <div className="space-y-1">
              <p className="text-3xl font-black transition-colors duration-500 text-white">99.9%</p>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: config.accent }}>Uptime</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black transition-colors duration-500 text-white">5k+</p>
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: config.accent }}>Active Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-[420px] space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tighter text-foreground transition-colors duration-500">Sign In</h2>
            <p className="text-lg text-muted-foreground transition-colors duration-500">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase text-foreground transition-colors duration-500">Access Level</Label>
              <Select onValueChange={(value) => setRole(value)} defaultValue="staff">
                <SelectTrigger className="h-14 bg-background border-input transition-all">
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="w-5 h-5 text-muted-foreground" />
                    <SelectValue placeholder="Select Role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin (Branch Owner)</SelectItem>
                  <SelectItem value="staff">Staff (Cashier)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(role === "admin" || role === "staff") && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                <Label className="text-sm font-bold uppercase text-foreground">Business Branch</Label>
                <Select onValueChange={(value) => setBranch(value)}>
                  <SelectTrigger className="h-14 bg-background border-input">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <SelectValue placeholder="Select Branch" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Branch (Colombo)</SelectItem>
                    <SelectItem value="branch-a">Branch A (Kandy)</SelectItem>
                    <SelectItem value="branch-b">Branch B (Galle)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-bold uppercase text-foreground">Credentials</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Username or Email"
                  className="pl-12 h-14 bg-background border-input text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative pt-2">
                <Lock className="absolute left-4 top-[60%] -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-12 h-14 bg-background border-input text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked as boolean)} />
                <Label htmlFor="remember" className="text-sm font-semibold cursor-pointer text-foreground select-none">Remember device</Label>
              </div>
              <a href="#" className="text-sm font-bold hover:underline transition-colors text-primary">Recover?</a>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 bg-primary text-primary-foreground hover:bg-primary-hover">
              Enter Dashboard
            </Button>
          </form>

          <div className="pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-tighter">
              Product of <span className="font-black italic text-foreground transition-colors duration-500">WEBSTAR SOLUTIONS</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}