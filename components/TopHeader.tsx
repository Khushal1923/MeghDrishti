"use client";

import React, { useState } from "react";
import {
  Bell,
  Sparkles,
  MapPin,
  Radio,
  LogIn,
  LogOut,
  UserCheck,
  X,
  Lock,
  CheckCircle,
  HelpCircle,
  Sprout,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface TopHeaderProps {
  title?: string;
  description?: string;
  selectedPanchayatName?: string;
  onRefresh?: () => void;
  language?: "en" | "mr";
  onLanguageChange?: (lang: "en" | "mr") => void;
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

  const [showNotification, setShowNotification] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"Farmer" | "Officer" | "Sarpanch">("Farmer");
  const [loginId, setLoginId] = useState("9823456789");
  const [loginPass, setLoginPass] = useState("••••");

  const handleLanguageSwitch = (newLang: "en" | "mr") => {
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

  return (
    <header className="sticky top-0 z-30 bg-[#e5eee5]/95 backdrop-blur-md border-b border-[#c8d9c8] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
      {/* Left: Website Name */}
      <div className="flex items-center gap-3">
        <a href="/" className="hover:opacity-90 transition-opacity">
          <span className="font-extrabold text-2xl tracking-tight text-[#166534]">
            MeghDrishti
          </span>
        </a>
      </div>

      {/* Right: Language Toggle + Login Button */}
      <div className="flex items-center gap-3">
        {/* Language Toggle (मराठी | English Switch) */}
        <div className="flex items-center bg-[#d5e4d5] p-0.5 rounded-full border border-[#c3d6c4] text-xs font-bold">
          <button
            onClick={() => handleLanguageSwitch("mr")}
            className={`px-3 py-1 rounded-full transition-all ${
              currentLang === "mr"
                ? "bg-[#166534] text-white shadow-xs font-extrabold"
                : "text-[#166534] hover:text-[#0b1f11]"
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => handleLanguageSwitch("en")}
            className={`px-3 py-1 rounded-full transition-all ${
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
          <div className="flex items-center gap-2 bg-[#d7ead9] border border-[#a7d4ac] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#166534]">
            <span>{userRole}</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-[#166534]/70 hover:text-rose-700 transition-colors ml-1 text-[11px] font-medium underline"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-1.5 bg-[#166534] hover:bg-[#15803d] text-white rounded-full text-xs font-extrabold shadow-xs transition-all tracking-wide"
          >
            Login
          </button>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-[#0c2413]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#eaf1ea] rounded-3xl max-w-md w-full border border-[#c3d6c4] shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-[#c8d9c8] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#166534] uppercase tracking-widest">
                  MeghDrishti Farmer & Officer Portal
                </span>
                <h3 className="text-lg font-extrabold text-[#0f2918]">
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

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0f2918] mb-1.5">
                  {language === "mr" ? "भूमिका निवडा (Select Role)" : "Select Role"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Farmer", label: "शेतकरी (Farmer)" },
                    { id: "Officer", label: "कृषी अधिकारी" },
                    { id: "Sarpanch", label: "ग्रामपंचायत" },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setUserRole(r.id as any)}
                      className={`py-2 px-2 rounded-xl font-bold border transition-all text-center ${
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
                  className="px-4 py-2 rounded-full font-bold text-[#166534] hover:bg-[#d5e4d5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[#166534] hover:bg-[#15803d] text-white font-bold rounded-full shadow-xs transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{language === "mr" ? "प्रवेश करा (Login)" : "Sign In"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );

};
