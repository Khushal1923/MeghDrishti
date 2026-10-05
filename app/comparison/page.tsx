"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ForecastComparisonChart } from "@/components/ForecastComparisonChart";
import { PANCHAYATS_DATA } from "@/lib/data";
import { Filter, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

export default function ForecastComparisonPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [selectedSeason, setSelectedSeason] = useState<string>("Monsoon");

  const current = PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  const seasons = [
    { id: "Monsoon",       label: tx(language, "seasonMonsoon") },
    { id: "Pre-Monsoon",   label: tx(language, "seasonPreMonsoon") },
    { id: "Winter",        label: tx(language, "seasonWinter") },
    { id: "Post-Monsoon",  label: tx(language, "seasonPostMonsoon") },
  ];

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader language={language} onLanguageChange={(l) => setLanguage(l)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Top Selectors Bar */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-extrabold text-[#166534]/70 tracking-wider block">
                {tx(language, "benchmarkPanchayat")}
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
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
                  selectedSeason === s.id
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison Component */}
        <ForecastComparisonChart panchayatName={current.panchayat_name} />

        {/* Compact Methodology Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#166534]" />
              <span>{tx(language, "compCard1Title")}</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              {tx(language, "compCard1Body")}
            </p>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#166534]" />
              <span>{tx(language, "compCard2Title")}</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              {tx(language, "compCard2Body")}
            </p>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>{tx(language, "compCard3Title")}</span>
            </div>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-medium">
              {tx(language, "compCard3Body")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
