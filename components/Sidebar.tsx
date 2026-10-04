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
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface NavItem {
  key: string;
  en: string;
  mr: string;
  href: string;
  icon: React.ElementType;
}

const PRIMARY_NAV: NavItem[] = [
  { key: "nav.dashboard", en: "Dashboard", mr: "डॅशबोर्ड", href: "/", icon: LayoutDashboard },
  { key: "nav.advisory", en: "Crop Advisory", mr: "पीक सल्ला", href: "/advisory", icon: Sprout },
  { key: "nav.forecast", en: "Weather Forecast", mr: "हवामान अंदाज", href: "/forecast", icon: CloudSun },
  { key: "nav.comparison", en: "Forecast Compare", mr: "अंदाज तुलना", href: "/comparison", icon: BarChart3 },
  { key: "nav.panchayats", en: "Panchayat Directory", mr: "गाव यादी", href: "/panchayats", icon: MapPin },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <aside
      className={cn(
        "relative bg-[#e5eee5] border-r border-[#c8d9c8] flex flex-col justify-between transition-all duration-300 z-40 shrink-0 select-none shadow-xs",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Top Header / Logo Section */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#c8d9c8]">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
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
          {PRIMARY_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const label = language === "mr" ? item.mr : item.en;

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
    </aside>
  );
};

