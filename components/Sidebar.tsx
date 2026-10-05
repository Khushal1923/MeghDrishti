"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sprout,
  CloudSun,
  BarChart3,
  MapPin,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { useAuth } from "@/lib/AuthContext";
import { useTranslations } from "next-intl";

interface NavItem {
  key: string;
  en: string;
  mr: string;
  href: string;
  icon: React.ElementType;
}

const PRIMARY_NAV_KEYS = [
  { key: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "nav.officer", href: "/officer", icon: Shield },
  { key: "nav.advisory", href: "/advisory", icon: Sprout },
  { key: "nav.forecast", href: "/forecast", icon: CloudSun },
  { key: "nav.comparison", href: "/comparison", icon: BarChart3 },
  { key: "nav.panchayats", href: "/panchayats", icon: MapPin },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const tN = useTranslations("nav");
  const { user } = useAuth();
  const isOfficer = user?.role === "officer";

  // 1. Hide sidebar completely on the landing page
  const isLandingPage =
    pathname === "/" || pathname === "/landing" || pathname.startsWith("/landing");
  if (isLandingPage) {
    return null;
  }

  // 2. Filter navigation items based on role:
  // - If Officer: Show ONLY Officer View (/officer), hide Farmer View (/dashboard)
  // - If Farmer (or unauthenticated): Show ONLY Farmer View (/dashboard), hide Officer View (/officer)
  const navItems = PRIMARY_NAV_KEYS.filter((item) => {
    if (isOfficer) {
      return item.href !== "/dashboard";
    } else {
      return item.href !== "/officer";
    }
  });

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on md and larger screens) */}
      <aside
        className={cn(
          "hidden md:flex relative bg-[#e5eee5] border-r border-[#c8d9c8] flex-col justify-between transition-all duration-300 z-40 shrink-0 select-none shadow-xs min-h-screen",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div>
          {/* Top Header / Logo Section */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#c8d9c8]">
            <Link href="/" className="flex items-center gap-3 overflow-hidden" title="Go to Home / Landing Page">
              <div className="w-9 h-9 rounded-xl bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#166534]/20">
                <Sprout className="w-5 h-5 text-emerald-100" />
              </div>
              {!collapsed && (
                <span className="font-extrabold text-xl tracking-tight text-[#0f2918] leading-tight">
                  MeghDrishti
                </span>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-7 h-7 rounded-lg bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center transition-colors shrink-0"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Primary Navigation Menu */}
          <nav className="p-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              // Extract the translation key after the dot (e.g. "nav.dashboard" -> "dashboard")
              const tKey = item.key.split(".")[1] as Parameters<typeof tN>[0];
              const label = tN(tKey);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group relative",
                    active
                      ? "bg-[#166534] text-white shadow-xs font-extrabold"
                      : "text-[#1b3d22] hover:bg-[#d5e4d5] hover:text-[#0b1f11]"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        active ? "text-white" : "text-[#166534] group-hover:text-[#0b1f11]"
                      )}
                    />
                    {!collapsed && <span className="font-extrabold tracking-tight">{label}</span>}
                  </div>

                  {!collapsed && active && (
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Role Indicator at bottom of Desktop Sidebar */}
        <div className="p-3 border-t border-[#c8d9c8] bg-[#dce8dc]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shrink-0 text-sm shadow-2xs">
              {isOfficer ? "🏛️" : "🌾"}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#166534] truncate">
                  {isOfficer ? "Officer View" : "Farmer View"}
                </div>
                <div className="text-xs font-bold text-[#0f2918] truncate">
                  {user?.name || (isOfficer ? "Agricultural Officer" : "Farmer Hub")}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM NAVIGATION (Visible on mobile screens < md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#e5eee5]/95 backdrop-blur-lg border-t border-[#c8d9c8] px-2 py-1.5 shadow-lg flex items-center justify-around safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const tKey = item.key.split(".")[1] as Parameters<typeof tN>[0];
          const label = tN(tKey);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[58px]",
                active
                  ? "text-[#166534] font-black bg-[#d7ead9]"
                  : "text-[#2b4c34] font-bold hover:text-[#166534]"
              )}
            >
              <Icon className={cn("w-5 h-5", active ? "text-[#166534]" : "text-[#2b4c34]")} />
              <span className="text-[10px] tracking-tight mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

