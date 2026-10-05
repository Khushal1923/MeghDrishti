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
  Mail,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";
import { useLanguage, type Language } from "@/lib/LanguageContext";
import { useAuth, DEMO_USERS } from "@/lib/AuthContext";
import { PANCHAYATS_DATA } from "@/lib/data";
import { cn } from "@/lib/utils";

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

  const {
    user,
    loginAs,
    logout,
    isLoggedIn,
    signInFarmer,
    signUpFarmer,
    signInOfficer,
    signUpOfficer,
  } = useAuth();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [loginRoleTab, setLoginRoleTab] = useState<"farmer" | "officer">("farmer");

  // Farmer Form State
  const [farmerPhone, setFarmerPhone] = useState("9823456789");
  const [farmerPin, setFarmerPin] = useState("1234");
  const [farmerName, setFarmerName] = useState("Ramesh Tukaram Patil");
  const [farmerVillage, setFarmerVillage] = useState("MH_PUN_001");
  const [farmerCrops, setFarmerCrops] = useState<string[]>(["Cotton", "Soybean"]);

  // Officer Form State
  const [officerId, setOfficerId] = useState("OFFICER_IMD_2026");
  const [officerPass, setOfficerPass] = useState("admin123");
  const [officerName, setOfficerName] = useState("Dr. Aniruddha Deshmukh");
  const [officerEmail, setOfficerEmail] = useState("officer.imd@meghdrishti.in");
  const [officerDept, setOfficerDept] = useState("District Agricultural & Meteorological Division");

  // UI State
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  const handleLanguageSwitch = (newLang: Language) => {
    setContextLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  const toggleCrop = (crop: string) => {
    if (farmerCrops.includes(crop)) {
      setFarmerCrops(farmerCrops.filter((c) => c !== crop));
    } else {
      setFarmerCrops([...farmerCrops, crop]);
    }
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    try {
      if (authMode === "signin") {
        const res = await signInFarmer(farmerPhone, farmerPin);
        if (res.error) {
          setAuthError(res.error.message);
        } else {
          setAuthSuccess(language === "mr" ? "शेतकरी खात्यात यशस्वी प्रवेश!" : "Signed in as Farmer successfully!");
          setTimeout(() => setShowLoginModal(false), 700);
        }
      } else {
        // Sign Up
        const villageObj = PANCHAYATS_DATA.find((p) => p.lgd_code === farmerVillage);
        const res = await signUpFarmer({
          name: farmerName,
          phone: farmerPhone,
          pin: farmerPin,
          panchayatLgd: farmerVillage,
          location: villageObj ? `${villageObj.panchayat_name}, ${villageObj.district}` : "Maharashtra Gram Panchayat",
          crops: farmerCrops,
        });

        if (res.error) {
          setAuthError(res.error.message);
        } else {
          setAuthSuccess(language === "mr" ? "शेतकरी नोंदणी यशस्वी झाली!" : "Farmer registration successful!");
          setTimeout(() => setShowLoginModal(false), 700);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOfficerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setAuthLoading(true);

    try {
      if (authMode === "signin") {
        const res = await signInOfficer(officerId, officerPass);
        if (res.error) {
          setAuthError(res.error.message);
        } else {
          setAuthSuccess(language === "mr" ? "अधिकारी खात्यात यशस्वी प्रवेश!" : "Signed in as Officer successfully!");
          setTimeout(() => setShowLoginModal(false), 700);
        }
      } else {
        // Sign Up
        const res = await signUpOfficer({
          name: officerName,
          officerId: officerId,
          email: officerEmail,
          password: officerPass,
          department: officerDept,
          location: "IMD District Nodal Cell, Pune Division",
        });

        if (res.error) {
          setAuthError(res.error.message);
        } else {
          setAuthSuccess(language === "mr" ? "अधिकारी नोंदणी यशस्वी झाली!" : "Officer registration successful!");
          setTimeout(() => setShowLoginModal(false), 700);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication error");
    } finally {
      setAuthLoading(false);
    }
  };

  const allNavItems = [
    { labelEn: "Home / Overview", labelMr: "मुख्य पान (Overview)", href: "/", icon: Globe2 },
    { labelEn: "Live Dashboard", labelMr: "थेट डॅशबोर्ड", href: "/dashboard", icon: LayoutDashboard },
    { labelEn: "Crop Advisory", labelMr: "पीक सल्ला", href: "/advisory", icon: Sprout },
    { labelEn: "Weather Forecast", labelMr: "हवामान अंदाज", href: "/forecast", icon: CloudSun },
    { labelEn: "Forecast Compare", labelMr: "अंदाज तुलना", href: "/comparison", icon: BarChart3 },
    { labelEn: "Panchayat Directory", labelMr: "गाव यादी", href: "/panchayats", icon: MapPin },
    { labelEn: "Weather Map", labelMr: "हवामान नकाशा", href: "/map", icon: MapPin },
    { labelEn: "Accuracy Validation", labelMr: "अचूकता पडताळणी", href: "/validation", icon: BarChart3 },
    { labelEn: "Model & Data Lineage", labelMr: "मॉडेल व डेटा", href: "/models", icon: Layers },
    { labelEn: "System Health", labelMr: "सिस्टम स्थिती", href: "/health", icon: Activity },
    { labelEn: "Calibration Settings", labelMr: "कॅलिब्रेशन सेटिंग्ज", href: "/settings", icon: Settings },
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
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title="Go to Home / Landing Page">
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
          {/* Language Toggle (मराठी | English Switch) */}
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
                title="Click to Switch Role or View Profile"
              >
                {user.role === "officer" ? (
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-[#166534]" />
                )}
                <span className="max-w-[90px] sm:max-w-[140px] truncate">
                  {language === "mr" ? user.roleTitleMr.split(" ")[0] : user.roleTitleEn.split(" ")[0]}: {user.name.split(" ")[0]}
                </span>
              </div>

              <button
                onClick={logout}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#d5e4d5] hover:bg-rose-100 text-[#166534] hover:text-rose-700 flex items-center justify-center transition-colors shrink-0"
                title={language === "mr" ? "बाहेर पडा (Sign Out)" : "Sign Out"}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#166534] hover:bg-[#15803d] text-white text-[11px] sm:text-xs font-extrabold transition-all shadow-2xs hover:scale-105 active:scale-95"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "लॉगिन / प्रवेश" : "Login Portal"}</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE FULL-SCREEN SLIDE-OUT DRAWER */}
      {/* ========================================================= */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex md:hidden">
          {/* Drawer Panel */}
          <div className="bg-[#eaf1ea] w-[290px] max-w-[85vw] h-full border-r border-[#c3d6c4] shadow-2xl p-4 sm:p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c8d9c8]">
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                  title="Go to Home / Landing Page"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#166534] text-white flex items-center justify-center shadow-xs">
                    <Sprout className="w-4 h-4 text-emerald-100" />
                  </div>
                  <div>
                    <span className="font-black text-lg text-[#0f2918] block leading-tight">
                      MeghDrishti
                    </span>
                    <span className="text-[10px] font-bold text-[#166534] uppercase tracking-wider block">
                      {language === "mr" ? "स्थानिक हवामान प्रणाली" : "Panchayat Weather AI"}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="w-8 h-8 rounded-xl bg-[#d5e4d5] hover:bg-[#c6d9c6] text-[#166534] flex items-center justify-center transition-colors"
                  aria-label="Close menu"
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
                      {language === "mr" ? user.roleTitleMr : user.roleTitleEn}
                    </span>
                    <span className="text-[9px] font-bold bg-[#166534] text-white px-2 py-0.5 rounded-full">
                      Active
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
                  className="w-full py-2.5 px-3 bg-[#166534] text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-xs"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{language === "mr" ? "शेतकरी / अधिकारी लॉगिन" : "Farmer / Officer Login"}</span>
                </button>
              )}

              {/* Navigation Menu List in Drawer */}
              <nav className="space-y-1">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  const label = language === "mr" ? item.labelMr : item.labelEn;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                        active
                          ? "bg-[#166534] text-white shadow-xs font-black"
                          : "text-[#0f2918] hover:bg-[#dbe8db]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={cn("w-4 h-4", active ? "text-white" : "text-[#166534]")} />
                        <span>{label}</span>
                      </div>
                      {active && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-3 border-t border-[#c8d9c8] text-[11px] text-[#2b4c34] font-bold space-y-1">
              <div className="flex items-center justify-between">
                <span>Smart India Hackathon 2026</span>
                <span className="text-[#166534] font-black">1 km AI</span>
              </div>
              <p className="text-[10px] text-[#2b4c34]/70">Panchayat-level downscaled weather</p>
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
      {/* FULL SUPABASE DUAL AUTHENTICATION MODAL */}
      {/* ========================================================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#eaf1ea] rounded-3xl max-w-md w-full border border-[#c3d6c4] shadow-2xl p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150 max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#c8d9c8] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-[#166534] uppercase tracking-widest block">
                    Supabase Dual Auth Portal
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black border border-emerald-300">
                    Online
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#0f2918] mt-0.5">
                  {loginRoleTab === "farmer"
                    ? language === "mr" ? "👨‍🌾 शेतकरी पोर्टल (Kisan Auth)" : "👨‍🌾 Farmer Authentication"
                    : language === "mr" ? "🏛️ कृषी अधिकारी पोर्टल (Officer Auth)" : "🏛️ Officer Authentication"}
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
                onClick={() => {
                  setLoginRoleTab("farmer");
                  setAuthError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs transition-all",
                  loginRoleTab === "farmer"
                    ? "bg-[#166534] text-white shadow-xs"
                    : "text-[#166534] hover:bg-[#cde0cd]"
                )}
              >
                <Sprout className="w-4 h-4" />
                <span>{language === "mr" ? "शेतकरी (Farmer)" : "Farmer Portal"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginRoleTab("officer");
                  setAuthError(null);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs transition-all",
                  loginRoleTab === "officer"
                    ? "bg-[#1d3557] text-white shadow-xs"
                    : "text-[#1d3557] hover:bg-[#cde0cd]"
                )}
              >
                <Shield className="w-4 h-4" />
                <span>{language === "mr" ? "कृषी अधिकारी (Officer)" : "Officer Portal"}</span>
              </button>
            </div>

            {/* Auth Mode Switcher (Sign In vs Register) */}
            <div className="flex items-center justify-center gap-2 p-1 bg-[#dbe8db] rounded-2xl border border-[#c3d6c4] text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signin");
                  setAuthError(null);
                }}
                className={cn(
                  "flex-1 py-1.5 rounded-xl transition-all",
                  authMode === "signin" ? "bg-[#166534] text-white shadow-xs" : "text-[#166534] hover:bg-[#cde0cd]"
                )}
              >
                {language === "mr" ? "लॉगिन (Sign In)" : "Sign In"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setAuthError(null);
                }}
                className={cn(
                  "flex-1 py-1.5 rounded-xl transition-all",
                  authMode === "signup" ? "bg-[#166534] text-white shadow-xs" : "text-[#166534] hover:bg-[#cde0cd]"
                )}
              >
                {language === "mr" ? "नवीन नोंदणी (Register)" : "Register (Sign Up)"}
              </button>
            </div>

            {/* Feedback Alerts */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {authSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* TAB 1: FARMER AUTH FORM */}
            {loginRoleTab === "farmer" && (
              <form onSubmit={handleFarmerSubmit} className="space-y-3 text-xs">
                {authMode === "signup" && (
                  <>
                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "शेतकऱ्याचे पूर्ण नाव" : "Farmer Full Name"}
                      </label>
                      <input
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="उदा. रमेश तुकाराम पाटील"
                        className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "गाव / ग्रामपंचायत निवडा" : "Select Gram Panchayat"}
                      </label>
                      <select
                        value={farmerVillage}
                        onChange={(e) => setFarmerVillage(e.target.value)}
                        className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
                      >
                        {PANCHAYATS_DATA.map((p) => (
                          <option key={p.lgd_code} value={p.lgd_code}>
                            {p.panchayat_name} ({p.taluka}, {p.district})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "मुख्य पिके (Crops Grown)" : "Select Crops Grown"}
                      </label>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {["Cotton", "Soybean", "Onion", "Wheat", "Sugarcane", "Maize"].map((crop) => (
                          <button
                            key={crop}
                            type="button"
                            onClick={() => toggleCrop(crop)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-black border transition-all",
                              farmerCrops.includes(crop)
                                ? "bg-[#166534] text-white border-[#166534]"
                                : "bg-white text-[#166534] border-[#c8d9c8]"
                            )}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {language === "mr" ? "मोबाईल नंबर" : "Mobile Phone Number"}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
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
                    {language === "mr" ? "४-अंकी सुरक्षा पिन (PIN)" : "4-Digit Security PIN"}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={farmerPin}
                      onChange={(e) => setFarmerPin(e.target.value)}
                      placeholder="1234"
                      maxLength={6}
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
                    ⚡ {language === "mr" ? "१-क्लिक चाचणी शेतकरी" : "1-Click Demo Farmer"}
                  </button>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-[#166534] hover:bg-[#15803d] text-white font-black rounded-full shadow-xs transition-all disabled:opacity-50"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === "mr" ? "प्रक्रिया सुरू..." : "Authenticating..."}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>
                          {authMode === "signin"
                            ? language === "mr" ? "शेतकरी प्रवेश" : "Sign In as Farmer"
                            : language === "mr" ? "शेतकरी नोंदणी करा" : "Register Farmer"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: OFFICER AUTH FORM */}
            {loginRoleTab === "officer" && (
              <form onSubmit={handleOfficerSubmit} className="space-y-3 text-xs">
                {authMode === "signup" && (
                  <>
                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "अधिकारी पूर्ण नाव व पद" : "Officer Name & Designation"}
                      </label>
                      <input
                        type="text"
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        placeholder="उदा. डॉ. अनिरुद्ध देशमुख"
                        className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "शासकीय ईमेल पत्ता" : "Official Govt Email"}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={officerEmail}
                          onChange={(e) => setOfficerEmail(e.target.value)}
                          placeholder="officer.imd@meghdrishti.in"
                          className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                          required
                        />
                        <Mail className="w-3.5 h-3.5 text-[#1d3557]/60 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block font-black text-[#0f2918]">
                        {language === "mr" ? "विभाग / नोडल केंद्र" : "Department / Nodal Division"}
                      </label>
                      <input
                        type="text"
                        value={officerDept}
                        onChange={(e) => setOfficerDept(e.target.value)}
                        placeholder="उदा. District Agriculture Division"
                        className="w-full bg-[#dbe8db] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#1d3557]"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="block font-black text-[#0f2918]">
                    {language === "mr" ? "शासकीय नोडल आयडी (Govt Nodal ID)" : "Govt Officer ID / Nodal ID"}
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
                    {language === "mr" ? "विभागीय पासवर्ड (Password)" : "Department Password"}
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
                    ⚡ {language === "mr" ? "१-क्लिक चाचणी अधिकारी" : "1-Click Demo Officer"}
                  </button>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2 bg-[#1d3557] hover:bg-[#152740] text-white font-black rounded-full shadow-xs transition-all disabled:opacity-50"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{language === "mr" ? "प्रक्रिया सुरू..." : "Authenticating..."}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>
                          {authMode === "signin"
                            ? language === "mr" ? "अधिकारी प्रवेश" : "Sign In as Officer"
                            : language === "mr" ? "अधिकारी नोंदणी करा" : "Register Officer"}
                        </span>
                      </>
                    )}
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
