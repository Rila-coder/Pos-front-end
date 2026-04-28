"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Moon,
  Sun,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { Avatar, AvatarFallback } from "@/components/common/ui/Avatar";
import { useTheme } from "@/providers/theme-provider";

interface TopBarProps {
  toggleSidebar: () => void;
}

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState<string>("admin");
  const [userName, setUserName] = useState<string>("Admin");

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("userRole") || "admin";
    const name = localStorage.getItem("userName") || 
      (role === "super-admin" ? "Super Admin" : role === "admin" ? "Admin" : "Staff");
    setUserRole(role);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userBranch");
    router.push("/");
  };

  const getInitials = () => {
    if (userRole === "super-admin") return "SA";
    if (userRole === "admin") return "AD";
    return "ST";
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted animate-pulse rounded-md" />
          <div className="w-24 sm:w-32 h-8 sm:h-10 bg-muted animate-pulse rounded-md" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="relative hidden md:block w-64 lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 bg-background text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                EN <ChevronDown className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Sinhala</DropdownMenuItem>
              <DropdownMenuItem>Tamil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full border-2 border-card" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 p-1 pl-2">
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                  <AvatarFallback className="bg-primary text-white text-[8px] sm:text-[10px] font-black">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-bold text-xs sm:text-sm">{userName}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} className="text-rose-500 focus:text-rose-500 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}