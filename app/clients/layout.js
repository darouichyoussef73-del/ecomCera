"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProvider } from "../context/UserContext";
import AuthRedirect from "@/app/components/AuthRedirect";
import "../globals.css";
export default function ClientLayout({ children }) {
  const router = useRouter();
 
  useEffect(() => {
    const expiresAt = localStorage.getItem("expiresAt");

    if (expiresAt && Date.now() > Number(expiresAt)) {
      localStorage.clear();
      router.push("/pages/acountCreation"); // safer than window.location
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <UserProvider>
        <AuthRedirect />
        {children}
      </UserProvider>
    </div>
  );
}
