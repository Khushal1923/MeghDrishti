"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Lock,
  CheckCircle,
  Sprout,
  MapPin,
  BarChart3,
  Activity,
  Layers,
  Settings,
  Globe2,
  ExternalLink,
} from "lucide-react";
import { useLanguage, type Language } from "@/lib/LanguageContext";

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

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"Farmer" | "Officer" | "Sarpanch">("Farmer");
  const [loginId, setLoginId] = useState("9823456789");
  const [loginPass, setLoginPass] = useState("••••");

  const handleLanguageSwitch = (newLang: Language) => {
    setContextLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const secondaryNavItems = [
    { labelEn: "Panchayat Map", labelMr: "हवामान नकाशा", href: "/map", icon: MapPin },
    { labelEn: "Accuracy Validation", labelMr: "अचूकता पडताळणी", href: "/validation", icon: BarChart3 },
    { labelEn: "Model & Data Lineage", labelMr: "मॉडेल व डेटा माहिती", href: "/models", icon: Layers },
    { labelEn: "System Health", labelMr: "सिस्टम स्थिती", href: "/health", icon: Activity },
    { labelEn: "Calibration Settings", labelMr: "कॅलिब्रेशन सेटिंग्ज", href: "/settings", icon: Settings },
    { labelEn: "Project Landing", labelMr: "प्रकल्प परिचय", href: "/landing", icon: Globe2 },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#e5eee5]/95 backdrop-blur-md border-b border-[#c8d9c8] px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4 shadow-xs">
      {/* Left: Hamburger menu (mobile) & Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={() => setShowMobileMenu(true)}
          className="md:hidden w-8 h-8 rounded-xl bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
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

      {/* Right: Language Toggle + Login Button */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Language Toggle (मराठी | English Switch) */}
        <div className="flex items-center bg-[#d5e4d5] p-0.5 rounded-full border border-[#c3d6c4] text-[11px] sm:text-xs font-bold">
          <button
            onClick={() => handleLanguageSwitch("mr")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all ${
              currentLang === "mr"
                ? "bg-[#166534] text-white shadow-xs font-extrabold"
                : "text-[#166534] hover:text-[#0b1f11]"
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => handleLanguageSwitch("en")}
            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full transition-all ${
              currentLang === "en"
                ? "bg-[#166534] text-white shadow-xs font-extrabold"
                : "text-[#166534] hover:text-[#0b1f11]"
            }`}
          >
            English
          </button>
        </div>

        {/* Login Button */}
        {isLoggedIn ? (
          <div className="flex items-center gap-1.5 bg-[#d7ead9] border border-[#a7d4ac] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-[#166534]">
            <span>{userRole}</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-[#166534]/70 hover:text-rose-700 transition-colors ml-0.5 text-[10px] sm:text-[11px] font-medium underline"
            >
              Exit
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#166534] hover:bg-[#15803d] text-white rounded-full text-[11px] sm:text-xs font-extrabold shadow-xs transition-all tracking-wide shrink-0"
          >
            Login
          </button>
        )}
      </div>

      {/* ========================================================= */}
      {/* MOBILE SLIDE-OUT DRAWER */}
      {/* ========================================================= */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-[#0c2413]/70 backdrop-blur-xs flex md:hidden animate-fade-in">
          <div className="bg-[#eaf1ea] w-4/5 max-w-xs h-full border-r border-[#c3d6c4] shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#c8d9c8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center">
                    <Sprout className="w-4 h-4 text-emerald-100" />
                  </div>
                  <span className="font-black text-lg text-[#0f2918]">MeghDrishti</span>
                </div>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 rounded-lg bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] uppercase font-black tracking-wider text-[#166534]/70 px-1">
                {language === "mr" ? "अधिक विभाग व साधने" : "Modules & Tools"}
              </div>

              <nav className="space-y-1.5">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const label = language === "mr" ? item.labelMr : item.labelEn;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-[#0f2918] bg-[#f4f8f4] hover:bg-[#d7ead9] border border-[#c8d9c8] transition-all"
                    >
                      <Icon className="w-4 h-4 text-[#166534]" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#c8d9c8] text-[10px] text-[#2b4c34] font-bold text-center">
              Smart India Hackathon &bull; IMD Downscaling Platform
            </div>
          </div>

          <div className="flex-1" onClick={() => setShowMobileMenu(false)} />
        </div>
      )}

      {/* ========================================================= */}
      {/* LOGIN MODAL (RESPONSIVE) */}
      {/* ========================================================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-[#0c2413]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#eaf1ea] rounded-3xl max-w-md w-full border border-[#c3d6c4] shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-start justify-between border-b border-[#c8d9c8] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#166534] uppercase tracking-widest">
                  MeghDrishti Farmer & Officer Portal
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0f2918]">
                  {language === "mr" ? "शेतकरी / अधिकारी लॉगिन" : "Farmer & Officer Sign In"}
                </h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-lg bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3 sm:space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0f2918] mb-1.5">
                  {language === "mr" ? "भूमिका निवडा (Select Role)" : "Select Role"}
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { id: "Farmer", label: "शेतकरी" },
                    { id: "Officer", label: "कृषी अधिकारी" },
                    { id: "Sarpanch", label: "ग्रामपंचायत" },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setUserRole(r.id as any)}
                      className={`py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl font-bold border transition-all text-center text-[11px] sm:text-xs ${
                        userRole === r.id
                          ? "bg-[#166534] text-white border-[#166534] shadow-xs"
                          : "bg-[#d9e7d9] text-[#1b3d22] border-[#c3d6c4] hover:bg-[#c8d9c8]"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-[#0f2918]">
                  {language === "mr" ? "मोबाईल नंबर / युझर आयडी" : "Mobile Number / User ID"}
                </label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-[#0f2918]">
                  {language === "mr" ? "पासवर्ड / पिन (PIN)" : "PIN / Password"}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter PIN"
                    className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    required
                  />
                  <Lock className="w-3.5 h-3.5 text-[#166534]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#c8d9c8]">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-[#166534] hover:bg-[#d5e4d5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 bg-[#166534] hover:bg-[#15803d] text-white font-bold rounded-full shadow-xs transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{language === "mr" ? "लॉगिन" : "Sign In"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
