"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored && (stored === "light" || stored === "dark")) {
        setTheme(stored);
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  }, [theme, mounted, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  // Return children wrapped in provider even when not mounted
  // This ensures the context is always available
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    // Instead of throwing, return a default value during SSR
    // This prevents the error during initial render
    if (typeof window === 'undefined') {
      return {
        theme: 'light' as Theme,
        setTheme: () => {},
      };
    }
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};