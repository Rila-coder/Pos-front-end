import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/common/ui/Sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart POS",
  description: "Complete sales and inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}