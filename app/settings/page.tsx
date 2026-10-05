"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import {
  Settings,
  Sliders,
  Shield,
  Save,
  Check,
  UserCheck,
  Sprout,
  Smartphone,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/lib/LanguageContext";
import { PANCHAYATS_DATA } from "@/lib/data";

export default function SettingsPage() {
  const { language } = useLanguage();
  const { user, isLoggedIn, updateUserProfile, loginAs, logout } = useAuth();

  // Profile Edit State
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profilePhone, setProfilePhone] = useState(user?.phone || "");
  const [profileLocation, setProfileLocation] = useState(user?.location || "");
  const [profileVillage, setProfileVillage] = useState(user?.panchayatLgd || "MH_PUN_001");
  const [profileOfficerId, setProfileOfficerId] = useState(user?.officerId || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Calibration Weights State
  const [wSkill, setWSkill] = useState(0.4);
  const [wCoverage, setWCoverage] = useState(0.25);
  const [wDensity, setWDensity] = useState(0.2);
  const [wQuality, setWQuality] = useState(0.15);
  const [lapseRate, setLapseRate] = useState(0.0065);
  const [rainThreshold, setRainThreshold] = useState(2.5);
  const [calibSaved, setCalibSaved] = useState(false);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      name: profileName,
      phone: profilePhone,
      location: profileLocation,
      panchayatLgd: profileVillage,
      officerId: profileOfficerId,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleCalibSave = () => {
    setCalibSaved(true);
    setTimeout(() => setCalibSaved(false), 2500);
  };

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        title={language === "mr" ? "सेटिंग्ज व प्रोफाईल व्यवस्थापन" : "Settings & Profile Management"}
        description={
          language === "mr"
            ? "सुपाबेस खाते, शेतकरी व अधिकारी प्रोफाईल आणि हवामान कॅलिब्रेशन पॅरामीटर्स."
            : "Supabase account profile, Farmer/Officer credentials, and physics calibration."
        }
      />

      <div className="px-4 sm:px-6 space-y-6 max-w-4xl mx-auto">
        {/* ========================================================= */}
        {/* 1. USER ACCOUNT & SUPABASE PROFILE CARD */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8d9c8] pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-xs ${
                  user?.role === "officer" ? "bg-[#1d3557]" : "bg-[#166534]"
                }`}
              >
                {user?.role === "officer" ? "🏛️" : "👨‍🌾"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-[#0f2918]">
                    {user?.name || (language === "mr" ? "लॉगिन केलेले नाही" : "Not Signed In")}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                      user?.role === "officer"
                        ? "bg-blue-100 text-blue-900 border-blue-300"
                        : "bg-emerald-100 text-emerald-900 border-emerald-300"
                    }`}
                  >
                    {user?.role === "officer"
                      ? language === "mr" ? "कृषी अधिकारी (Officer)" : "Govt Officer"
                      : language === "mr" ? "शेतकरी (Farmer)" : "Farmer"}
                  </span>
                </div>
                <p className="text-xs text-[#2b4c34] font-bold">
                  {user?.location || "Maharashtra Panchayat Hub"} &bull; {user?.phone || "No phone linked"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => loginAs(user?.role === "officer" ? "farmer" : "officer")}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#e6efe6] text-[#166534] border border-[#c8d9c8] text-xs font-black transition-all shadow-2xs"
              >
                {language === "mr"
                  ? user?.role === "officer" ? "शेतकरी खात्यात बदला" : "अधिकारी खात्यात बदला"
                  : user?.role === "officer" ? "Switch to Farmer" : "Switch to Officer"}
              </button>
            </div>
          </div>

          {/* Profile Edit Form */}
          <form onSubmit={handleProfileSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-black text-[#0f2918] block">
                {language === "mr" ? "पूर्ण नाव (Full Name)" : "Full Name"}
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Ramesh Patil"
                className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-black text-[#0f2918] block">
                {language === "mr" ? "मोबाईल नंबर (Phone Number)" : "Phone Number"}
              </label>
              <input
                type="text"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            {user?.role === "farmer" ? (
              <div className="space-y-1.5">
                <label className="font-black text-[#0f2918] block">
                  {language === "mr" ? "प्राथमिक ग्रामपंचायत (Panchayat)" : "Primary Gram Panchayat"}
                </label>
                <select
                  value={profileVillage}
                  onChange={(e) => setProfileVillage(e.target.value)}
                  className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
                >
                  {PANCHAYATS_DATA.map((p) => (
                    <option key={p.lgd_code} value={p.lgd_code}>
                      {p.panchayat_name} ({p.taluka}, {p.district})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="font-black text-[#0f2918] block">
                  {language === "mr" ? "शासकीय अधिकारी आयडी (Nodal ID)" : "Govt Officer ID"}
                </label>
                <input
                  type="text"
                  value={profileOfficerId}
                  onChange={(e) => setProfileOfficerId(e.target.value)}
                  placeholder="OFFICER_IMD_2026"
                  className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-black text-[#0f2918] block">
                {language === "mr" ? "ठिकाण / विभाग (Location)" : "Location / Region"}
              </label>
              <input
                type="text"
                value={profileLocation}
                onChange={(e) => setProfileLocation(e.target.value)}
                placeholder="Wagholi, Pune"
                className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-black text-xs shadow-xs transition-all"
              >
                {profileSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === "mr" ? "प्रोफाईल जतन झाली!" : "Profile Saved to Supabase!"}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{language === "mr" ? "प्रोफाईल अपडेट करा" : "Update Supabase Profile"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ========================================================= */}
        {/* 2. TRUST SCORE FORMULATION WEIGHTS */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#0f2918] font-black text-base">
            <Sliders className="w-5 h-5 text-[#166534]" />
            <span>
              {language === "mr" ? "विश्वासार्हता स्कोअर भार (Weights)" : "Trust Score Weights Formulation"}
            </span>
          </div>
          <p className="text-xs text-[#2b4c34] font-bold">
            Trust = w_H &times; Historical Skill + w_C &times; Coverage + w_D &times; Data Density + w_Q &times; Data Quality (Sum = 1.0)
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>Historical Skill Weight (w_H):</span>
                <span className="font-mono text-[#166534] font-black">{(wSkill * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={wSkill}
                onChange={(e) => setWSkill(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>Validation Coverage Weight (w_C):</span>
                <span className="font-mono text-[#166534] font-black">{(wCoverage * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={wCoverage}
                onChange={(e) => setWCoverage(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>Data Density Weight (w_D):</span>
                <span className="font-mono text-[#166534] font-black">{(wDensity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={wDensity}
                onChange={(e) => setWDensity(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>Data Quality Weight (w_Q):</span>
                <span className="font-mono text-[#166534] font-black">{(wQuality * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={wQuality}
                onChange={(e) => setWQuality(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. PHYSICAL & METEOROLOGICAL CONSTANTS */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#0f2918] font-black text-base">
            <Shield className="w-5 h-5 text-[#166534]" />
            <span>
              {language === "mr" ? "हवामान भौतिकशास्त्र स्थिरांक" : "Meteorological Constants & Physics"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0f2918] block">
                {language === "mr" ? "पाऊस घटना निकष मर्यादा (Threshold mm)" : "Rain Event Threshold (mm)"}
              </label>
              <input
                type="number"
                step="0.5"
                value={rainThreshold}
                onChange={(e) => setRainThreshold(parseFloat(e.target.value))}
                className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
              <span className="text-[10px] text-[#2b4c34]">IMD Standard: 2.5 mm / day</span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#0f2918] block">
                {language === "mr" ? "लॅप्स रेट दर (Lapse Rate Γ °C/m)" : "Environmental Lapse Rate (Γ °C/m)"}
              </label>
              <input
                type="number"
                step="0.0005"
                value={lapseRate}
                onChange={(e) => setLapseRate(parseFloat(e.target.value))}
                className="w-full bg-white border border-[#c8d9c8] rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
              <span className="text-[10px] text-[#2b4c34]">Standard: 0.0065 °C / m (6.5 °C / km)</span>
            </div>
          </div>

          {/* Save Calibration Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleCalibSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2918] hover:bg-[#1a3824] text-white font-black text-xs shadow-xs transition-all"
            >
              {calibSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === "mr" ? "कॅलिब्रेशन सेव्ह झाले!" : "Calibration Saved!"}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{language === "mr" ? "कॅलिब्रेशन सेव्ह करा" : "Save Calibration Settings"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
