"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Lock,
  CheckCircle,
  Sprout,
  LayoutDashboard,
  CloudSun,
  MapPin,
  BarChart3,
  Activity,
  Layers,
  Settings,
  Globe2,
  UserCheck,
  Shield,
  Briefcase,
  Smartphone,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useLanguage, type Language } from "@/lib/LanguageContext";
import { useAuth, DEMO_USERS } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TopHeaderProps {
  title?: string;
  description?: string;
  selectedPanchayatName?: string;
  onRefresh?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  onTakeTour?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  description,
  selectedPanchayatName = "Wagholi Panchayat Region",
  onRefresh,
  language: propLang,
  onLanguageChange,
  onTakeTour,
}) => {
  const { language: contextLang, setLanguage: setContextLang } = useLanguage();
  const currentLang = propLang || contextLang;
  const language = currentLang;
  const pathname = usePathname();
  const tH = useTranslations("header");
  const tN = useTranslations("nav");
  const tL = useTranslations("login");

  const { user, loginAs, logout, isLoggedIn } = useAuth();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginRoleTab, setLoginRoleTab] = useState<"farmer" | "officer">("farmer");
  const [farmerPhone, setFarmerPhone] = useState("9823456789");
  const [farmerPin, setFarmerPin] = useState("1234");
  const [farmerName, setFarmerName] = useState("Ramesh Tukaram Patil");
  const [officerId, setOfficerId] = useState("OFFICER_IMD_2026");
  const [officerPass, setOfficerPass] = useState("admin123");
  const [officerName, setOfficerName] = useState("Dr. Aniruddha Deshmukh");

  const handleLanguageSwitch = (newLang: Language) => {
    setContextLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("farmer", farmerName, farmerPhone);
    setShowLoginModal(false);
  };

  const handleOfficerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("officer", officerName, "9876543210");
    setShowLoginModal(false);
  };

  const allNavItems = [
    { label: tN("dashboard"), href: "/", icon: LayoutDashboard },
    { label: tN("advisory"), href: "/advisory", icon: Sprout },
    { label: tN("forecast"), href: "/forecast", icon: CloudSun },
    { label: tN("comparison"), href: "/comparison", icon: BarChart3 },
    { label: tN("panchayats"), href: "/panchayats", icon: MapPin },
    { label: tN("map"), href: "/map", icon: MapPin },
    { label: tN("validation"), href: "/validation", icon: BarChart3 },
    { label: tN("models"), href: "/models", icon: Layers },
    { label: tN("health"), href: "/health", icon: Activity },
    { label: tN("settings"), href: "/settings", icon: Settings },
    { label: tN("landing"), href: "/landing", icon: Globe2 },
  ];

  return (
    <>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#e5eee5]/95 backdrop-blur-md border-b border-[#c8d9c8] px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 shadow-xs">
        {/* Left: Hamburger menu (mobile) & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden w-9 h-9 rounded-xl bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center transition-colors shrink-0 shadow-2xs active:scale-95"
            aria-label={tH("openMenu")}
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sprout className="w-4 h-4 text-emerald-100" />
            </div>
            <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-[#166534]">
              MeghDrishti
            </span>
          </Link>
        </div>

        {/* Right: Language Toggle + Role Login Info */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language Toggle (मराठी | English | हिंदी) */}
          <div className="flex items-center bg-[#d5e4d5] p-0.5 rounded-full border border-[#c3d6c4] text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => handleLanguageSwitch("mr")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                currentLang === "mr"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => handleLanguageSwitch("en")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                currentLang === "en"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSwitch("hi")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                currentLang === "hi"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* User Auth Status or Login Button */}
          {isLoggedIn && user ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold border transition-all cursor-pointer shadow-2xs",
                  user.role === "officer"
                    ? "bg-[#1d3557] text-white border-[#457b9d]"
                    : "bg-[#d7ead9] text-[#166534] border-[#a7d4ac]"
                )}
                onClick={() => setShowLoginModal(true)}
                title={tH("switchRole")}
              >
                {user.role === "officer" ? (
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-[#166534]" />
                )}
                <span className="max-w-[90px] sm:max-w-[140px] truncate">
                  {language === "mr" ? user.roleTitleMr.split(" ")[0] : language === "hi" ? user.roleTitleHi.split(" ")[0] : user.roleTitleEn.split(" ")[0]}: {user.name.split(" ")[0]}
                </span>
              </div>

              <button
                onClick={logout}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d5e4d5] hover:bg-rose-100 text-[#166534] hover:text-rose-700 flex items-center justify-center transition-colors shrink-0"
                title={tH("signOut")}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#166534] hover:bg-[#15803d] text-white rounded-full text-[11px] sm:text-xs font-extrabold shadow-xs transition-all tracking-wide shrink-0"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{tH("login")}</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE FULL-SCREEN SLIDE-OUT DRAWER (OUTSIDE HEADER) */}
      {/* ========================================================= */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex md:hidden">
          {/* Drawer Panel */}
          <div className="bg-[#eaf1ea] w-[290px] max-w-[85vw] h-full border-r border-[#c3d6c4] shadow-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c8d9c8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shadow-xs">
                    <Sprout className="w-4 h-4 text-emerald-100" />
                  </div>
                  <div>
                    <span className="font-black text-lg text-[#0f2918] block leading-tight">
                      MeghDrishti
                    </span>
                    <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block">
                      {tH("subtitle")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 rounded-xl bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center transition-colors"
                  aria-label={tH("closeMenu")}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Account Tile in Mobile Drawer */}
              {isLoggedIn && user ? (
                <div
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowLoginModal(true);
                  }}
                  className="p-3 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-[#166534]">
                      {language === "mr" ? user.roleTitleMr : language === "hi" ? user.roleTitleHi : user.roleTitleEn}
                    </span>
                    <span className="text-[9px] font-bold bg-[#166534] text-white px-2 py-0.5 rounded-full">
                      {language === "mr" ? "सक्रिय" : language === "hi" ? "सक्रिय" : "Active"}
                    </span>
                  </div>
                  <div className="text-xs font-black text-[#0f2918] truncate">{user.name}</div>
                  <div className="text-[10px] text-[#2b4c34] font-medium truncate">{user.location}</div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-[#166534] text-white text-xs font-black flex items-center justify-center gap-2 shadow-xs"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{tL("signIn")}</span>
                </button>
              )}

              {/* Navigation List */}
              <nav className="space-y-1">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
                        active
                          ? "bg-[#166534] text-white shadow-xs font-black"
                          : "text-[#0f2918] hover:bg-[#d7ead9] border border-transparent"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-[#166534]")} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#c8d9c8] space-y-2">
              <div className="text-[10px] text-[#2b4c34] font-bold text-center">
                {tH("footerNote")}
              </div>
            </div>
          </div>

          {/* Clickable Backdrop to Close */}
          <div
            className="flex-1"
            onClick={() => setShowMobileMenu(false)}
            aria-label="Close backdrop"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* DUAL LOGIN MODAL (FARMER & OFFICER LOGINS) */}
      {/* ========================================================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#eaf1ea] rounded-3xl max-w-md w-full border border-[#c3d6c4] shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-150 max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#c8d9c8] pb-3">
              <div>
                <span className="text-[10px] font-black text-[#166534] uppercase tracking-widest block">
                  {tH("portalAccess")}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#0f2918]">
                  {tH("authPortal")}
                </h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-lg bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dual Role Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#dbe8db] rounded-2xl border border-[#c3d6c4]">
              <button
                type="button"
                onClick={() => setLoginRoleTab("farmer")}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs transition-all",
                  loginRoleTab === "farmer"
                    ? "bg-[#166534] text-white shadow-xs"
                    : "text-[#166534] hover:bg-[#cde0cd]"
                )}
              >
                <Sprout className="w-4 h-4" />
                <span>{tL("farmerTab")}</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginRoleTab("officer")}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs transition-all",
                  loginRoleTab === "officer"
                    ? "bg-[#1d3557] text-white shadow-xs"
                    : "text-[#1d3557] hover:bg-[#cde0cd]"
                )}
              >
                <Shield className="w-4 h-4" />
                <span>{tL("officerTab")}</span>
              </button>
            </div>

            {/* TAB 1: FARMER LOGIN FORM */}
            {loginRoleTab === "farmer" && (
              <form onSubmit={handleFarmerSubmit} className="space-y-3 sm:space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#d7ead9] border border-[#a7d4ac] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#0f2918] font-bold leading-relaxed">
                    {tL("farmerNote")}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("farmerName")}
                  </label>
                  <input
                    type="text"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder={language === "mr" ? "उदा. रमेश तुकाराम पाटील" : language === "hi" ? "उदा. रमेश तुकाराम पाटिल" : "e.g. Ramesh Tukaram Patil"}
                    className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("mobileNumber")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                      required
                    />
                    <Smartphone className="w-3.5 h-3.5 text-[#166534]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("pin")}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={farmerPin}
                      onChange={(e) => setFarmerPin(e.target.value)}
                      placeholder="1234"
                      maxLength={4}
                      className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                      required
                    />
                    <Lock className="w-3.5 h-3.5 text-[#166534]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#c8d9c8]">
                  <button
                    type="button"
                    onClick={() => {
                      loginAs("farmer");
                      setShowLoginModal(false);
                    }}
                    className="w-full sm:w-auto text-[11px] font-black text-[#166534] hover:underline"
                  >
                    ⚡ {tL("demoFarmer")}
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-[#166534] hover:bg-[#15803d] text-white font-black rounded-full shadow-xs transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{tL("signInFarmer")}</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: OFFICER LOGIN FORM */}
            {loginRoleTab === "officer" && (
              <form onSubmit={handleOfficerSubmit} className="space-y-3 sm:space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#e0e7f1] border border-[#b8c9e0] flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#1d3557] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#1d3557] font-bold leading-relaxed">
                    {tL("officerNote")}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("officerName")}
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder={language === "mr" ? "उदा. डॉ. अनिरुद्ध देशमुख" : language === "hi" ? "उदा. डॉ. अनिरुद्ध देशमुख" : "e.g. Dr. Aniruddha Deshmukh"}
                    className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("officerId")}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      placeholder="OFFICER_IMD_2026"
                      className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                      required
                    />
                    <Briefcase className="w-3.5 h-3.5 text-[#1d3557]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {tL("password")}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={officerPass}
                      onChange={(e) => setOfficerPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                      required
                    />
                    <Lock className="w-3.5 h-3.5 text-[#1d3557]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#c8d9c8]">
                  <button
                    type="button"
                    onClick={() => {
                      loginAs("officer");
                      setShowLoginModal(false);
                    }}
                    className="w-full sm:w-auto text-[11px] font-black text-[#1d3557] hover:underline"
                  >
                    ⚡ {tL("demoOfficer")}
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1d3557] hover:bg-[#152740] text-white font-black rounded-full shadow-xs transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{tL("signInOfficer")}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
