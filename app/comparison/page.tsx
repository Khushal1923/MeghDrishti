"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ForecastComparisonChart } from "@/components/ForecastComparisonChart";
import { PANCHAYATS_DATA } from "@/lib/data";
import { Filter, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ForecastComparisonPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [selectedSeason, setSelectedSeason] = useState<string>("Monsoon");

  const current = PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Top Selectors Bar */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-extrabold text-[#166534]/70 tracking-wider block">
                {language === "mr" ? "ग्रामपंचायत निवडा" : "Benchmark Panchayat"}
              </label>
              <select
                value={selectedLgd}
                onChange={(e) => setSelectedLgd(e.target.value)}
                className="bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer"
              >
                {PANCHAYATS_DATA.map((p) => (
                  <option key={p.lgd_code} value={p.lgd_code}>
                    {p.panchayat_name} ({p.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Season Selector */}
          <div className="flex items-center gap-1 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-bold overflow-x-auto no-scrollbar max-w-full shrink-0">
            {["Monsoon", "Pre-Monsoon", "Winter", "Post-Monsoon"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSeason(s)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
                  selectedSeason === s
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison Component with 3 KPIs and Dominant Recharts Visual */}
        <ForecastComparisonChart panchayatName={current.panchayat_name} />

        {/* Compact Methodology Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#166534]" />
              <span>1. Baseline vs AI Error</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              Every forecast is benchmarked against raw coarse NWP. If local ML performs worse on unseen test data, the system flags no improvement.
            </p>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
              <span>2. Leakage-Free Validation</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              Chronological split ensures future observations or test-period climatologies never leak into the downscaling feature pipeline.
            </p>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>3. Orographic Resolution</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              Elevation, slope, and land cover features enable the model to resolve localized rain-shadow valleys and Ghats rainfall.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
