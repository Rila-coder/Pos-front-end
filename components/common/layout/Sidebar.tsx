"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Truck,
  Box,
  UserCog,
  DollarSign,
  FileText,
  Settings,
  Menu,
  X,
  History,
  ShoppingCart as ShoppingCartIcon,
  Building2,
  LogOut,
  ChevronDown,
  UserCircle,
  Shapes,
} from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Avatar, AvatarFallback } from "@/components/common/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";

interface SidebarProps {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export default function Sidebar({
  sidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("admin");
  const [userName, setUserName] = useState<string>("Admin User");
  const [userEmail, setUserEmail] = useState<string>("admin@pos.com");
  const [branch, setBranch] = useState<string>("");
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    const name =
      localStorage.getItem("userName") ||
      (role === "super-admin"
        ? "Super Admin"
        : role === "admin"
          ? "Admin User"
          : "Staff Member");
    const userBranch = localStorage.getItem("userBranch") || "";

    setUserRole(role);
    setUserName(name);
    setUserEmail(`${role}@pos.com`);
    setBranch(userBranch);

    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userBranch");
    router.push("/");
  };

  const getRoleDisplay = () => {
    switch (userRole) {
      case "super-admin":
        return "Super Admin";
      case "admin":
        return "Administrator";
      case "staff":
        return "Staff Member";
      default:
        return "User";
    }
  };

  const getRoleBadgeColor = () => {
    switch (userRole) {
      case "super-admin":
        return "bg-purple-500/20 text-purple-300";
      case "admin":
        return "bg-primary/20 text-primary";
      case "staff":
        return "bg-blue-500/20 text-blue-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getInitials = () => {
    if (userRole === "super-admin") return "SA";
    if (userRole === "admin") return "AD";
    return "ST";
  };

  const navigation = (() => {
    if (userRole === "super-admin") {
      return [
        { name: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
        { name: "Branches", href: "/super-admin/branches", icon: Building2 },
        { name: "Global POS", href: "/super-admin/pos", icon: ShoppingCart },
        { name: "Sales History", href: "/super-admin/sales-history", icon: History },
        { name: "All Products", href: "/super-admin/products", icon: Package },
        { name: "Categories", href: "/super-admin/categories", icon: Shapes },
        { name: "All Customers", href: "/super-admin/customers", icon: Users },
        { name: "All Suppliers", href: "/super-admin/suppliers", icon: Truck },
        { name: "Global Inventory", href: "/super-admin/inventory", icon: Box },
        {
          name: "All Employees",
          href: "/super-admin/employees",
          icon: UserCog,
        },
        {
          name: "Global Expenses",
          href: "/super-admin/expenses",
          icon: DollarSign,
        },
        {
          name: "Global Reports",
          href: "/super-admin/reports",
          icon: FileText,
        },
        {
          name: "Global Settings",
          href: "/super-admin/global-settings",
          icon: Settings,
        },
      ];
    }
    if (userRole === "staff") {
      return [
        { name: "Dashboard", href: "/staff", icon: LayoutDashboard },
        { name: "POS Register", href: "/staff/pos", icon: ShoppingCart },
        { name: "Sales History", href: "/staff/sales-history", icon: History },
        { name: "Products", href: "/staff/products", icon: Package },
        { name: "Categories", href: "/staff/categories", icon: Shapes },
        { name: "Customers", href: "/staff/customers", icon: Users },
        { name: "Suppliers", href: "/staff/suppliers", icon: Truck },
      ];
    }
    // Admin role (default)
    return [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "POS Register", href: "/admin/pos", icon: ShoppingCart },
      { name: "Sales History", href: "/admin/sales-history", icon: History },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: Shapes },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
      { name: "Inventory", href: "/admin/inventory", icon: Box },
      { name: "Employees", href: "/admin/employees", icon: UserCog },
      { name: "Expenses", href: "/admin/expenses", icon: DollarSign },
      { name: "Reports", href: "/admin/reports", icon: FileText },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ];
  })();

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  // Determine sidebar width based on screen size and state
  const getSidebarWidth = () => {
    if (isMobile) return "w-64";
    if (isTablet) return "w-64";
    return sidebarOpen ? "w-64" : "w-20";
  };

  // Determine if logo should be visible
  const showLogo = () => {
    if (isMobile) return mobileSidebarOpen;
    if (isTablet) return true;
    return sidebarOpen;
  };

  // Determine if navigation text should be visible
  const showNavText = () => {
    if (isMobile) return mobileSidebarOpen;
    if (isTablet) return true;
    return sidebarOpen;
  };

  // Determine if user profile should be expanded
  const showUserProfile = () => {
    if (isMobile) return mobileSidebarOpen;
    if (isTablet) return true;
    return sidebarOpen;
  };

  return (
    <>
      {/* Overlay for mobile and tablet when sidebar is open */}
      {(isMobile || isTablet) && mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ${getSidebarWidth()} ${
          (isMobile || isTablet) && !mobileSidebarOpen ? "-translate-x-full" : "translate-x-0"
        } bg-gradient-to-b from-[#1F2937] to-[#111827] shadow-xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section with Close Button */}
          <div className="p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              {showLogo() && (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
                    <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-white font-bold text-lg sm:text-xl">Smart POS</span>
                </div>
              )}
              
              {/* Desktop toggle button - only visible on large screens (above 1024px) */}
              {!isMobile && !isTablet && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="hidden lg:flex text-white hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}

              {/* Close button for tablet (768px to 1024px) - always visible when sidebar is open */}
              {isTablet && mobileSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeSidebar}
                  className="flex text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}

              {/* Close button for mobile (below 768px) - visible when sidebar is open */}
              {isMobile && mobileSidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeSidebar}
                  className="flex text-white hover:bg-white/10 ml-auto"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}

              {/* Empty div to maintain spacing when logo is hidden on desktop collapsed state */}
              {!isMobile && !isTablet && !sidebarOpen && !showLogo() && (
                <div className="w-8 h-8"></div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 sm:py-6 px-2 sm:px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/50"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={closeSidebar}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {showNavText() && <span className="text-sm sm:text-base">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Section */}
          {showUserProfile() ? (
            <div className="p-3 sm:p-4 border-t border-white/10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center justify-between p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-white text-xs sm:text-sm font-medium truncate">
                          {userName}
                        </p>
                        <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-[#1F2937] border-white/10 text-white"
                >
                  <div className="px-3 py-2 border-b border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-white">
                        {getRoleDisplay()}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${getRoleBadgeColor()}`}
                    >
                      {userRole === "super-admin"
                        ? "Full Access"
                        : userRole === "admin"
                          ? "Branch Manager"
                          : "Limited Access"}
                    </span>
                    {branch && (
                      <p className="text-[10px] text-gray-400 mt-2">
                        Branch: {branch}
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer focus:text-red-300 focus:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="p-4 border-t border-white/10 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-48 bg-[#1F2937] border-white/10 text-white"
                >
                  <div className="px-3 py-2 text-center border-b border-white/10">
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-[10px] text-gray-400">{userEmail}</p>
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full ${getRoleBadgeColor()} mt-1 inline-block`}
                    >
                      {getRoleDisplay()}
                    </span>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer focus:text-red-300 focus:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}