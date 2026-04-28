"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/components/common/auth/LoginPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn === "true" && userRole) {
      router.push(`/${userRole}`);
    }
  }, [router]);

  return <LoginPage />;
}