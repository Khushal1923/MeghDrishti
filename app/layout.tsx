import React from "react";
import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "MeghDrishti — Panchayat Weather Intelligence Platform",
  description:
    "Transparent panchayat-level weather downscaling, local correction, and crop decision support platform (Ministry of Earth Sciences / IMD).",
};

import { LanguageProvider } from "@/lib/LanguageContext";
import { AuthProvider } from "@/lib/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#edf2ed] text-[#0f2918] min-h-screen flex antialiased">
        <LanguageProvider>
          <AuthProvider>
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 md:pb-0">
              {children}
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

