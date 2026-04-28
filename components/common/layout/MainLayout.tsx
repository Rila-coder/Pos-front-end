"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const tablet = width >= 768 && width < 1024;
      setIsTablet(tablet);
      
      if (isMobile || tablet) {
        setSidebarOpen(false);
        setMobileSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile || isTablet) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={`${
          sidebarOpen && !isMobile && !isTablet ? "lg:ml-64" : !isMobile && !isTablet ? "lg:ml-20" : "ml-0"
        } transition-all duration-300`}
      >
        <TopBar toggleSidebar={toggleSidebar} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}