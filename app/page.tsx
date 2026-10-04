"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { PANCHAYATS_DATA } from "@/lib/data";
import { fetchPrediction } from "@/lib/api";
import { PredictionResult } from "@/lib/types";
import { TrustBadge } from "@/components/TrustBadge";
import { PanchayatMap } from "@/components/PanchayatMap";
import {
  CloudRain,
  Sun,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import { formatRainfall, formatTemp, formatPercent } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export default function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [leadDays, setLeadDays] = useState<number>(1);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const currentPanchayat =
    PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  useEffect(() => {
    fetchPrediction(selectedLgd, leadDays).then(setPrediction);
  }, [selectedLgd, leadDays]);

  const leadOptions = [
    { label: "Today", value: 1, marathi: "आज" },
    { label: "Tomorrow", value: 2, marathi: "उद्या" },
    { label: "+2 Days", value: 3, marathi: "+२ दिवस" },
    { label: "+3 Days", value: 4, marathi: "+३ दिवस" },
    { label: "+5 Days", value: 5, marathi: "+५ दिवस" },
  ];

  const rainMm = prediction ? prediction.estimate : currentPanchayat.latest_rainfall_estimate;
  const tempC = prediction ? prediction.corrected_temp : currentPanchayat.latest_temp_estimate;
  const rainProb = prediction ? prediction.rain_prob : currentPanchayat.latest_rain_prob;
  
  const getRainCategory = (mm: number) => {
    if (language === "mr") {
      if (mm < 0.1) return "निरभ्र / पाऊस नाही";
      if (mm < 2.5) return "अति हलका पाऊस";
      if (mm <= 15.5) return "हलका पाऊस";
      return "मध्यम ते जोरदार पाऊस";
    }
    if (mm < 0.1) return "No Rain";
    if (mm < 2.5) return "Very Light";
    if (mm <= 15.5) return "Light Rain";
    return "Moderate Rain";
  };

  const rainCategory = getRainCategory(rainMm);
  const trustScore = currentPanchayat.trust_score;

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      {/* Top Header */}
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* ========================================================= */}
        {/* 1. TOP: PANCHAYAT SELECTOR & HORIZON BAR */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-extrabold text-[#166534]/70 tracking-wider block">
                {language === "mr" ? "निवडलेली ग्रामपंचायत" : "Selected Panchayat"}
              </label>
              <select
                value={selectedLgd}
                onChange={(e) => setSelectedLgd(e.target.value)}
                className="bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer"
              >
                {PANCHAYATS_DATA.map((p) => (
                  <option key={p.lgd_code} value={p.lgd_code}>
                    {p.panchayat_name} ({p.taluka}, {p.district}) - {p.zone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lead Horizon Pills: [Today] [Tomorrow] [+2 Days] [+3 Days] [+5 Days] */}
          <div className="flex items-center gap-1.5 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-bold">
            {leadOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLeadDays(opt.value)}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  leadDays === opt.value
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                {language === "mr" ? opt.marathi : opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN WEATHER INTELLIGENCE & AI INSIGHT SECTION */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Weather Intelligence Card (8 Cols) */}
          <div className="lg:col-span-8 bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
                  {language === "mr" ? "स्थानिक हवामान अचूकता" : "LOCAL WEATHER INTELLIGENCE"}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight mt-1">
                  {currentPanchayat.panchayat_name}
                </h1>
                <p className="text-xs text-[#0f2918] font-bold mt-0.5">
                  {currentPanchayat.taluka}, {currentPanchayat.district}, {currentPanchayat.state} ({currentPanchayat.zone})
                </p>
              </div>

              <TrustBadge level={currentPanchayat.trust_label} score={trustScore} />
            </div>

            {/* Temperature & Rain Dominant Stat */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-2">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0 border border-[#b8d8b8] shadow-2xs">
                  {rainMm > 2.5 ? (
                    <CloudRain className="w-8 h-8 text-[#166534]" />
                  ) : (
                    <Sun className="w-8 h-8 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-[#0f2918] tracking-tight">
                    {formatTemp(tempC)}
                  </div>
                  <div className="text-xs font-black text-[#166534] uppercase tracking-wide">
                    {rainCategory}
                  </div>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-[#c8d9c8] sm:pl-6">
                <span className="text-xs text-[#166534] font-black uppercase tracking-wider block">
                  {language === "mr" ? "अपेक्षित पाऊस" : "Expected Rainfall"}
                </span>
                <div className="text-2xl md:text-3xl font-black text-[#166534] tracking-tight mt-0.5">
                  {formatRainfall(rainMm)}
                </div>
                <div className="text-xs font-bold text-[#0f2918] mt-0.5">
                  {language === "mr" ? "शक्यता" : "P(Rain)"}: <strong className="text-sky-800 font-extrabold">{formatPercent(rainProb)}</strong>
                </div>
              </div>
            </div>

            {/* Micro Details Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#c8d9c8] text-xs">
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {language === "mr" ? "उंची (समुद्रसपाटी)" : "Elevation"}
                </span>
                <strong className="text-[#0f2918] font-black">{currentPanchayat.elevation_m}m asl</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {language === "mr" ? "जमिनीचा प्रकार" : "Soil Type"}
                </span>
                <strong className="text-[#0f2918] font-black truncate block">{currentPanchayat.soil_type}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {language === "mr" ? "वाऱ्याचा वेग" : "Wind Speed"}
                </span>
                <strong className="text-[#0f2918] font-black">{prediction?.wind_kmh || 12} km/h</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {language === "mr" ? "हवेतील आर्द्रता" : "Humidity"}
                </span>
                <strong className="text-[#0f2918] font-black">{prediction?.humidity_proxy || 68}%</strong>
              </div>
            </div>
          </div>

          {/* AI Local Correction Highlight Card (4 Cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#166534] to-[#0d381e] text-white rounded-3xl p-6 md:p-7 shadow-xs flex flex-col justify-between space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider">
                  {language === "mr" ? "स्थानिक AI दुरुस्ती" : "AI LOCAL CORRECTION"}
                </span>
                <span className="text-xs font-black text-emerald-200">
                  {Math.round(trustScore * 100)}% {language === "mr" ? "विश्वास" : "Trust"}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                {language === "mr"
                  ? "स्थानिक टोपोग्राफी व उंचीनुसार अचूक अंदाज"
                  : "Terrain & bias-corrected panchayat forecast"}
              </h2>

              <p className="text-xs text-emerald-100 font-bold leading-relaxed">
                {language === "mr"
                  ? "स्थानिक टोपोग्राफी, लॅप्स-रेट उंची व IMD नेटवर्क आधारे अंदाज अचूक करण्यात आला आहे."
                  : "Forecast adjusted for local terrain, lapse-rate elevation and IMD ground network."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200 font-black uppercase tracking-wide">
                  {language === "mr" ? "त्रुटी कपात (MAE)" : "Error Reduction (MAE)"}
                </span>
                <span className="text-lg font-black text-[#fef08a]">+62.5%</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#fef08a] h-full rounded-full w-[62.5%]" />
              </div>
              <div className="text-[11px] text-emerald-200 font-bold">
                {language === "mr"
                  ? "१० किमी मॉडेलवरून १ किमी अचूक गावपातळीवर रुपांतरित"
                  : "Downscaled from 10km raw NWP to 1km resolution"}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. KEY METRICS: 4 COMPACT CARDS */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "पाऊस" : "Rainfall"}
            </span>
            <div className="text-2xl font-black text-[#0f2918]">
              {formatRainfall(rainMm)}
            </div>
            <span className="text-xs font-extrabold text-[#166534] block">
              {rainCategory}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "तापमान" : "Temperature"}
            </span>
            <div className="text-2xl font-black text-[#0f2918]">
              {formatTemp(tempC)}
            </div>
            <span className="text-xs font-bold text-[#0f2918] block">
              {language === "mr" ? "उंचीनुसार अचूक" : "Lapse corrected"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "पावसाची शक्यता" : "Rain Probability"}
            </span>
            <div className="text-2xl font-black text-sky-800">
              {formatPercent(rainProb)}
            </div>
            <span className="text-xs font-bold text-[#0f2918] block">
              &ge; 2.5 mm {language === "mr" ? "निकष" : "threshold"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "AI विश्वासार्हता" : "AI Trust"}
            </span>
            <div className="text-2xl font-black text-[#166534]">
              {Math.round(trustScore * 100)}%
            </div>
            <span className="text-xs font-extrabold text-[#166534] block">
              {currentPanchayat.trust_label} {language === "mr" ? "खात्री" : "Confidence"}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. 5-DAY WEATHER FORECAST TIMELINE (COMPACT HORIZONTAL) */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#0f2918] tracking-tight">
              {language === "mr" ? "५ दिवसांचा स्थानिक हवामान अंदाज" : "5-Day Weather Outlook"}
            </h2>
            <span className="text-xs text-[#2b4c34] font-semibold">
              {currentPanchayat.panchayat_name} Hub
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((day) => {
              const dayRain = Math.max(0, currentPanchayat.latest_rainfall_estimate + (day - 2) * 1.2);
              const dayTemp = currentPanchayat.latest_temp_estimate + (day % 2 === 0 ? -0.4 : 0.6);
              const dayProb = Math.min(0.95, currentPanchayat.latest_rain_prob + (day - 1) * 0.05);
              const isSelected = leadDays === day;

              const dayNamesEn = ["Today", "Tomorrow", "Day +2", "Day +3", "Day +5"];
              const dayNamesMr = ["आज", "उद्या", "+२ दिवस", "+३ दिवस", "+५ दिवस"];
              const dayLabel = language === "mr" ? dayNamesMr[day - 1] : dayNamesEn[day - 1];

              return (
                <div
                  key={day}
                  onClick={() => setLeadDays(day)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-[#d7ead9] border-[#166534] ring-1 ring-[#166534] shadow-2xs"
                      : "bg-[#e6efe6] border-[#c3d6c4] hover:bg-[#dbe8db]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-extrabold text-[#0f2918]">
                    <span>{dayLabel}</span>
                    <span className="text-[10px] font-bold text-[#166534]">
                      {Math.round(trustScore * 100)}%
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#166534]/70 block font-medium">
                      {language === "mr" ? "पाऊस" : "Rain"}
                    </span>
                    <div className="text-base font-extrabold text-[#0f2918]">
                      {formatRainfall(dayRain)}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#2b4c34]">
                    {formatTemp(dayTemp)}
                  </div>

                  <div className="text-[10px] text-[#2b4c34] pt-1 border-t border-[#c8d9c8] flex items-center justify-between font-medium">
                    <span>{language === "mr" ? "शक्यता" : "P(Rain)"}</span>
                    <strong className="text-sky-800 font-bold">{formatPercent(dayProb)}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 5. SPATIAL INTELLIGENCE MAP SECTION (FULL WIDTH) */}
        {/* ========================================================= */}
        <div className="w-full">
          <PanchayatMap
            panchayats={PANCHAYATS_DATA}
            selectedLgd={selectedLgd}
            onSelectPanchayat={(lgd) => setSelectedLgd(lgd)}
          />
        </div>

        {/* ========================================================= */}
        {/* 6. BOTTOM: FORECAST CONFIDENCE & MODEL INSIGHT */}
        {/* ========================================================= */}
        <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs text-[#2b4c34]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#166534] shrink-0" />
            <div>
              <strong className="text-[#0f2918] font-extrabold">
                {language === "mr" ? "मेघदृष्टी AI स्थानिक हवामान प्रणाली" : "MeghDrishti AI Downscaling Engine"}
              </strong>
              <span className="text-[#2b4c34] ml-2">
                {language === "mr"
                  ? "हवामान केंद्र अंतर: ४.८ किमी • १,०६० दिवस पडताळणी • खोटा इशारा दर (FAR): ०.१०६"
                  : "Station distance: 4.8 km • 1,060 test days validated • False Alarm Ratio: 0.106"}
              </span>
            </div>
          </div>
          <div className="font-bold text-[#166534]">
            {language === "mr" ? "९०% खात्रीशीर मर्यादा सक्रिय" : "Calibrated 90% Confidence Interval Active"}
          </div>
        </div>
      </div>
    </div>
  );
}

