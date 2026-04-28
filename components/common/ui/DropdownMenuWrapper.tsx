"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

interface DropdownMenuWrapperProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: "start" | "end" | "center";
  className?: string;
}

export function DropdownMenuWrapper({ 
  children, 
  trigger, 
  align = "end",
  className 
}: DropdownMenuWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder button without dropdown functionality
    return (
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2">
        {trigger}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}