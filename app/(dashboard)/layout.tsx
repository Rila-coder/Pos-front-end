"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MainLayout from "@/components/common/layout/MainLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    if (pathname.startsWith("/super-admin") && userRole !== "super-admin") {
      router.push(`/${userRole}`);
      return;
    }
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      router.push(`/${userRole}`);
      return;
    }
    if (pathname.startsWith("/staff") && userRole !== "staff") {
      router.push(`/${userRole}`);
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <MainLayout>{children}</MainLayout>;
}