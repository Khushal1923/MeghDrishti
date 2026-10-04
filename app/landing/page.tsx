"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CloudRain,
  Sun,
  CheckCircle2,
  Clock,
  Droplets,
  Layers,
  Sparkles,
  BarChart3,
  Cpu,
  Radio,
  Share2,
  Volume2,
  Check,
  ChevronRight,
  Zap,
  Globe2,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { PANCHAYATS_DATA } from "@/lib/data";
import { formatRainfall, formatTemp } from "@/lib/utils";

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<"downscaling" | "advisory" | "validation">("downscaling");

  return (
    <div className="min-h-screen bg-[#edf2ed] text-[#0f2918] flex flex-col justify-between selection:bg-[#166534] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER NAVIGATION */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#e5eee5]/95 backdrop-blur-md border-b border-[#c8d9c8] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#166534]/20">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tight text-[#166534] block leading-none">
              MeghDrishti
            </span>
            <span className="text-[10px] font-black text-[#2b4c34] uppercase tracking-wider block mt-1">
              Panchayat Weather Intelligence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#d5e4d5] p-1 rounded-full border border-[#c3d6c4] text-xs font-black">
            <button
              onClick={() => setLanguage("mr")}
              className={`px-3.5 py-1 rounded-full transition-all ${
                language === "mr"
                  ? "bg-[#166534] text-white shadow-xs font-black"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3.5 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-[#166534] text-white shadow-xs font-black"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              English
            </button>
          </div>

          <Link
            href="/"
            className="px-5 py-2 bg-[#166534] hover:bg-[#15803d] text-white rounded-full text-xs font-black shadow-xs transition-all flex items-center gap-2 hover:scale-[1.02]"
          >
            <span>{language === "mr" ? "थेट डॅशबोर्ड" : "Open Dashboard"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d7ead9] border border-[#a7d4ac] text-xs font-black text-[#166534] shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#166534]" />
            <span>Smart India Hackathon 2026 &bull; 1 km Resolution AI Downscaling</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f2918] tracking-tight leading-[1.12]">
            {language === "mr"
              ? "प्रत्येक ग्रामपंचायतीसाठी १ किमी अचूक स्थानिक हवामान बुद्धिमत्ता"
              : "Hyper-Local 1 km Weather Intelligence for Every Gram Panchayat"}
          </h1>

          <p className="text-sm md:text-base text-[#2b4c34] font-bold leading-relaxed max-w-2xl mx-auto">
            {language === "mr"
              ? "१० किमी मॉडेलवरून १ किमी अचूक गावपातळीवर रुपांतरित हवामान अंदाज, स्थानिक टोपोग्राफी दुरुस्ती आणि शेतकऱ्यांसाठी कृतीयोग्य पीक सल्ला."
              : "Bridging the 10km raw NWP gap with terrain-aware Machine Learning, lapse-rate elevation correction, and actionable vernacular crop advisories."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/"
              className="px-6 py-3 bg-[#166534] hover:bg-[#15803d] text-white rounded-2xl text-sm font-black shadow-md shadow-[#166534]/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>{language === "mr" ? "थेट डॅशबोर्ड पहा" : "Explore Live Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/advisory"
              className="px-6 py-3 bg-[#f4f8f4] hover:bg-[#e6efe6] text-[#166534] border border-[#c8d9c8] rounded-2xl text-sm font-black shadow-2xs transition-all flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-[#166534]" />
              <span>{language === "mr" ? "पीक सल्ला (Advisory)" : "Crop Decision Advisory"}</span>
            </Link>

            <Link
              href="/comparison"
              className="px-6 py-3 bg-[#f4f8f4] hover:bg-[#e6efe6] text-[#166534] border border-[#c8d9c8] rounded-2xl text-sm font-black shadow-2xs transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-[#166534]" />
              <span>{language === "mr" ? "अचूकता पडताळणी" : "Validation Scorecard"}</span>
            </Link>
          </div>
        </div>

        {/* Live Downscaling Micro Preview Card */}
        <div className="max-w-4xl mx-auto bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8d9c8] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-black uppercase text-[#166534] tracking-wider">
                {language === "mr" ? "थेट डाउनस्केलिंग प्रात्यक्षिक" : "Live AI Downscaling Benchmark"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] text-[10px] font-black border border-[#a7d4ac]">
                Wagholi Hub &bull; Pune (570m Elev)
              </span>
            </div>
            <span className="text-xs font-black text-[#166534]">
              {language === "mr" ? "८४% मॉडेल विश्वासार्हता" : "84% Calibrated Confidence"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Raw NWP Baseline */}
            <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
              <span className="text-[10px] font-black text-rose-800 uppercase tracking-wider block">
                {language === "mr" ? "कच्चा १० किमी NWP अंदाज" : "Raw 10km NWP Forecast"}
              </span>
              <div className="text-2xl font-black text-rose-900">7.2 mm</div>
              <p className="text-[11px] text-[#2b4c34] font-bold">
                {language === "mr" ? "उंची दुर्लक्षित; जास्त त्रुटी" : "Coarse grid ignores rain shadow"}
              </p>
            </div>

            {/* MeghDrishti AI */}
            <div className="p-4 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-1 ring-1 ring-[#166534]">
              <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider block">
                {language === "mr" ? "मेघदृष्टी १ किमी AI अंदाज" : "MeghDrishti 1km AI Forecast"}
              </span>
              <div className="text-2xl font-black text-[#166534]">4.8 mm</div>
              <p className="text-[11px] text-[#166534] font-black">
                {language === "mr" ? "स्थानिक टोपोग्राफी व उंचीनुसार अचूक" : "Terrain & lapse-rate corrected"}
              </p>
            </div>

            {/* Skill Gain */}
            <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
              <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider block">
                {language === "mr" ? "त्रुटी कपात सुधारणा" : "MAE Error Improvement"}
              </span>
              <div className="text-2xl font-black text-emerald-800">+64.2%</div>
              <p className="text-[11px] text-[#2b4c34] font-bold">
                {language === "mr" ? "IMD निरीक्षण पडताळणी" : "Verified on 1,060 holdout days"}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Unified Pillar Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center font-black">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#0f2918] tracking-tight">
                {language === "mr" ? "१ किमी डाउनस्केलिंग" : "1 km Spatial Grid"}
              </h3>
              <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                {language === "mr"
                  ? "स्थानिक समुद्रसपाटीपासूनची उंची (Elevation), उताराची दिशा (Aspect) व मातीच्या प्रकारानुसार (Clay %) १० पट अचूक अंदाज."
                  : "Resolves localized microclimates by fusing coarse NWP with 30m Digital Elevation Models, slope, aspect, and soil clay properties."}
              </p>
            </div>
            <div className="text-[11px] font-black text-[#166534] pt-2 border-t border-[#c8d9c8]">
              {language === "mr" ? "१० किमी ते १ किमी गावपातळी" : "100x Finer Spatial Grid"}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center font-black">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#0f2918] tracking-tight">
                  {language === "mr" ? "+६२.५% त्रुटी कपात" : "+62.5% Error Reduction"}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] text-[10px] font-black border border-[#a7d4ac]">
                  MAE
                </span>
              </div>
              <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                {language === "mr"
                  ? "प्रत्यक्ष IMD निरीक्षण केंद्रांशी १,०६० दिवस पडताळणी करून त्रुटी लक्षणीयरीत्या कमी करण्यात आली आहे."
                  : "Trained on 33,605 multi-year records across Maharashtra, Karnataka, and Telangana with strict chronological holdout."}
              </p>
            </div>
            <div className="text-[11px] font-black text-[#166534] pt-2 border-t border-[#c8d9c8]">
              {language === "mr" ? "०.१०६ खोटा इशारा दर (FAR)" : "0.106 Low False Alarm Rate"}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center font-black">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#0f2918] tracking-tight">
                {language === "mr" ? "शेतकरी कृती निर्णय" : "Actionable Farmer Advice"}
              </h3>
              <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                {language === "mr"
                  ? "फवारणी वेळ, पाणी नियोजन, खत सल्ला व कीड सावधगिरी थेट मराठीत आवाज व WhatsApp शेअरिंगसह उपलब्ध."
                  : "Direct field decisions for spraying windows, irrigation timing, and pest management with voice audio and WhatsApp sharing."}
              </p>
            </div>
            <div className="text-[11px] font-black text-[#166534] pt-2 border-t border-[#c8d9c8]">
              {language === "mr" ? "मराठी व इंग्रजी दोन्ही भाषांत" : "Vernacular Audio & WhatsApp"}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE FEATURE DEEP DIVE TABS */}
      {/* ========================================================= */}
      <section className="bg-[#e4eee4] border-y border-[#c8d9c8] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "प्रणाली वैशिष्ट्ये" : "PLATFORM ARCHITECTURE"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
              {language === "mr"
                ? "स्थानिक अचूकतेची तिहेरी ताकद"
                : "The Three Pillars of Hyper-Local Accuracy"}
            </h2>
          </div>

          {/* Feature Tabs Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "downscaling", label: language === "mr" ? "१. स्थानिक AI डाउनस्केलिंग" : "1. AI Local Downscaling" },
              { id: "advisory", label: language === "mr" ? "२. शेतकरी पीक सल्ला" : "2. Actionable Crop Advisory" },
              { id: "validation", label: language === "mr" ? "३. पडताळणी व विश्वासार्हता" : "3. Validation Scorecard" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-black border transition-all ${
                  activeTab === tab.id
                    ? "bg-[#166534] text-white border-[#166534] shadow-xs"
                    : "bg-[#f4f8f4] text-[#166534] border-[#c8d9c8] hover:bg-[#dbe8db]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Content */}
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-6 md:p-8 shadow-xs">
            {activeTab === "downscaling" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7ead9] text-[#166534] text-xs font-black border border-[#a7d4ac]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>LightGBM GBDT + Topographic Quantile Regressor</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f2918] tracking-tight">
                    {language === "mr"
                      ? "स्थानिक टोपोग्राफी व उंचीनुसार अंदाज दुरुस्ती"
                      : "Resolving Mountain Slopes, Rain Shadows, & Valleys"}
                  </h3>
                  <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                    {language === "mr"
                      ? "पारंपरिक १० किमी मॉडेलमधील त्रुटी दूर करण्यासाठी मेघदृष्टी मॉडेल प्रत्यक्ष भूपृष्ठाची उंची (DEM), उताराची दिशा आणि मातीतील ओलावा क्षमतेचा वापर करून अचूक अंदाज तयार करते."
                      : "Standard NWP models fail across undulating terrain. MeghDrishti calculates topographic lapse-rate adjustments and orographic uplift to produce 1km localized rainfall and temperature estimates."}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                      <span className="text-[10px] text-[#166534] font-black uppercase block">Spatial Gain</span>
                      <strong className="text-sm font-black text-[#0f2918]">10 km &rarr; 1 km Grid</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                      <span className="text-[10px] text-[#166534] font-black uppercase block">Confidence Interval</span>
                      <strong className="text-sm font-black text-[#166534]">90% Calibrated Bounds</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-3 font-sans">
                  <div className="text-xs font-black text-[#166534] uppercase tracking-wider">
                    Feature Engineering Pipeline
                  </div>
                  <div className="space-y-2 text-xs font-bold text-[#0f2918]">
                    <div className="p-2.5 rounded-lg bg-[#f4f8f4] border border-[#c8d9c8] flex items-center justify-between">
                      <span>1. DEM Elevation & Slope Aspect</span>
                      <span className="text-[#166534] font-black">SRTM 30m</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#f4f8f4] border border-[#c8d9c8] flex items-center justify-between">
                      <span>2. Land Use / Cropland Fraction</span>
                      <span className="text-[#166534] font-black">Sentinel-2 Landcover</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#f4f8f4] border border-[#c8d9c8] flex items-center justify-between">
                      <span>3. Soil Clay & Water Retention</span>
                      <span className="text-[#166534] font-black">ICAR Soil Profile</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#f4f8f4] border border-[#c8d9c8] flex items-center justify-between">
                      <span>4. IMD Observational Network Calibration</span>
                      <span className="text-[#166534] font-black">AWS Ground Truth</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "advisory" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7ead9] text-[#166534] text-xs font-black border border-[#a7d4ac]">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>Agronomic Decision Support & Vernacular Delivery</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f2918] tracking-tight">
                    {language === "mr"
                      ? "शेतकऱ्यांसाठी थेट शेतावर उपयुक्त निर्णय"
                      : "Translating Meteorology into Direct Farmer Action"}
                  </h3>
                  <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                    {language === "mr"
                      ? "हवामान अंदाजाचे रुपांतर स्पष्ट कृती सल्ल्यात केले जाते: फवारणीची योग्य वेळ, पाणी नियोजन, खत मात्रा आणि कीड-रोग सावधगिरी."
                      : "Rather than raw numbers, farmers receive practical guidance: exact spray windows, irrigation pauses to save diesel/power, and preventive pest remedies with local chemical dosages."}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-[#e6efe6] text-[#166534] text-xs font-black border border-[#c3d6c4]">
                      Cotton / कापूस
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#e6efe6] text-[#166534] text-xs font-black border border-[#c3d6c4]">
                      Soybean / सोयाबीन
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#e6efe6] text-[#166534] text-xs font-black border border-[#c3d6c4]">
                      Maize / मका
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#e6efe6] text-[#166534] text-xs font-black border border-[#c3d6c4]">
                      Onion / कांदा
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-[#166534]">
                    <span>Sample Advisory (Cotton - Flowering)</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#166534] text-white text-[10px]">
                      Safe Window
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">Spray Window</span>
                    <p className="text-xs font-black text-[#0f2918]">
                      7:30 AM - 11:00 AM (Calm winds; leaves dry)
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">Irrigation Decision</span>
                    <p className="text-xs font-black text-[#0f2918]">
                      Hold irrigation for 2 days; 4.8mm rain expected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "validation" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7ead9] text-[#166534] text-xs font-black border border-[#a7d4ac]">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Independent Ground Truth Verification</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0f2918] tracking-tight">
                    {language === "mr"
                      ? "१,०६० दिवसांची काटेकोर स्वतंत्र पडताळणी"
                      : "Strict Chronological Holdout Benchmarking"}
                  </h3>
                  <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                    {language === "mr"
                      ? "कोणताही डेटा लीकेज नसलेली स्वतंत्र पडताळणी पद्धत. कच्चा NWP मॉडेलपेक्षा सर्व १ ते ५ दिवसांच्या अंदाजात सातत्यपूर्ण सुधारणा सिद्ध."
                      : "No future leakage or climatology interpolation. MeghDrishti is validated across pre-monsoon, monsoon, and winter seasons with multi-station ground truth."}
                  </p>
                  <Link
                    href="/comparison"
                    className="inline-flex items-center gap-2 text-xs font-black text-[#166534] hover:underline pt-2"
                  >
                    <span>View full interactive scorecard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 font-sans text-xs">
                  <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">Sample Size</span>
                    <div className="text-2xl font-black text-[#0f2918]">13,780</div>
                    <span className="text-[10px] text-[#2b4c34] font-bold">Unseen test days</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">FAR Rate</span>
                    <div className="text-2xl font-black text-emerald-800">0.106</div>
                    <span className="text-[10px] text-[#2b4c34] font-bold">Low false alarms</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">Correlation</span>
                    <div className="text-2xl font-black text-[#0f2918]">0.879</div>
                    <span className="text-[10px] text-[#2b4c34] font-bold">Ground alignment</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-1">
                    <span className="text-[10px] text-[#166534] font-black uppercase">Overall Skill</span>
                    <div className="text-2xl font-black text-[#166534]">+62.5%</div>
                    <span className="text-[10px] text-[#166534] font-black">Error reduction</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. COVERED HUBS SUMMARY */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "स्थानिक हवामान केंद्र नेटवर्क" : "SPATIAL COVERAGE"}
            </span>
            <h2 className="text-2xl font-black text-[#0f2918] tracking-tight">
              {language === "mr"
                ? "१३ ग्रामपंचायत हवामान केंद्रे (महाराष्ट्र, कर्नाटक, तेलंगणा)"
                : "13 Calibrated Panchayat Hubs across Maharashtra, Karnataka & Telangana"}
            </h2>
          </div>

          <Link
            href="/panchayats"
            className="px-4 py-1.5 rounded-full bg-[#f4f8f4] text-xs font-black text-[#166534] border border-[#c8d9c8] hover:bg-[#e6efe6] transition-all flex items-center gap-1.5"
          >
            <span>{language === "mr" ? "सर्व गावे पहा" : "View Panchayat Directory"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {PANCHAYATS_DATA.map((p) => (
            <Link
              key={p.lgd_code}
              href="/"
              className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] hover:border-[#166534] transition-all space-y-1.5 group shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-[#0f2918] group-hover:text-[#166534] truncate">
                  {p.panchayat_name}
                </span>
                <span className="text-[10px] text-[#166534] font-black shrink-0">
                  {Math.round(p.trust_score * 100)}%
                </span>
              </div>
              <div className="text-[11px] text-[#2b4c34] font-bold">
                {p.district}, {p.zone}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#166534] font-black pt-1 border-t border-[#c8d9c8]">
                <span>{p.elevation_m}m asl</span>
                <span>{formatRainfall(p.latest_rainfall_estimate)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-[#e5eee5] border-t border-[#c8d9c8] px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#2b4c34] font-bold">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#166534]">MeghDrishti</span>
            <span>&bull; Smart India Hackathon 2026</span>
          </div>
          <div>
            1 km Resolution Machine Learning Weather Downscaling for Rural India
          </div>
        </div>
      </footer>
    </div>
  );
}
