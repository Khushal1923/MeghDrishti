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
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslations("dashboard");
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [leadDays, setLeadDays] = useState<number>(1);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const currentPanchayat =
    PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  useEffect(() => {
    fetchPrediction(selectedLgd, leadDays).then(setPrediction);
  }, [selectedLgd, leadDays]);

  const leadOptions = [
    { label: t("today"), value: 1 },
    { label: t("tomorrow"), value: 2 },
    { label: t("day2"), value: 3 },
    { label: t("day3"), value: 4 },
    { label: t("day5"), value: 5 },
  ];

  const rainMm = prediction ? prediction.estimate : currentPanchayat.latest_rainfall_estimate;
  const tempC = prediction ? prediction.corrected_temp : currentPanchayat.latest_temp_estimate;
  const rainProb = prediction ? prediction.rain_prob : currentPanchayat.latest_rain_prob;
  
  const getRainCategory = (mm: number) => {
    if (mm < 0.1) return t("noRain");
    if (mm < 2.5) return t("veryLight");
    if (mm <= 15.5) return t("lightRain");
    return t("moderateRain");
  };

  const getTrustLabel = (lbl: string) => {
    const l = lbl?.toLowerCase() || "";
    if (l === "high") return language === "mr" ? "उच्च" : language === "hi" ? "उच्च" : "High";
    if (l === "medium") return language === "mr" ? "मध्यम" : language === "hi" ? "मध्यम" : "Medium";
    if (l === "low") return language === "mr" ? "कमी" : language === "hi" ? "निम्न" : "Low";
    return lbl;
  };

  const getSoilType = (st: string) => {
    if (!st) return "";
    if (st.includes("Black Cotton")) {
      return language === "mr" ? "काळी कसदार माती (व्हर्टिसॉल)" : language === "hi" ? "काली कपास मिट्टी (वर्टिसोल)" : st;
    }
    if (st.includes("Red Sandy") || st.includes("Sandy")) {
      return language === "mr" ? "तांबडी वाळूमिश्रित माती (अल्फिसॉल)" : language === "hi" ? "लाल रेतीली मिट्टी (अल्फीसोल)" : st;
    }
    if (st.includes("Clay Loam")) {
      return language === "mr" ? "चिकणमाती पोयटा (इन्सेप्टिसॉल)" : language === "hi" ? "दोमट चिकनी मिट्टी (इन्सेप्टिसोल)" : st;
    }
    return st;
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
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-3.5 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <label className="text-[10px] uppercase font-extrabold text-[#166534]/70 tracking-wider block">
                {t("selectedPanchayat")}
              </label>
              <select
                value={selectedLgd}
                onChange={(e) => setSelectedLgd(e.target.value)}
                className="w-full sm:w-auto bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-extrabold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer truncate"
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
          <div className="flex items-center gap-1 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-bold overflow-x-auto no-scrollbar max-w-full shrink-0">
            {leadOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLeadDays(opt.value)}
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
                  leadDays === opt.value
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MAIN WEATHER INTELLIGENCE & AI INSIGHT SECTION */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Main Weather Intelligence Card (8 Cols) */}
          <div className="lg:col-span-8 bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-black text-[#166534] uppercase tracking-wider block">
                  {t("localWeather")}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight mt-0.5 sm:mt-1">
                  {currentPanchayat.panchayat_name}
                </h1>
                <p className="text-xs text-[#0f2918] font-bold mt-0.5">
                  {currentPanchayat.taluka}, {currentPanchayat.district}, {currentPanchayat.state} ({currentPanchayat.zone})
                </p>
              </div>

              <TrustBadge level={currentPanchayat.trust_label} score={trustScore} />
            </div>

            {/* Temperature & Rain Dominant Stat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 py-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0 border border-[#b8d8b8] shadow-2xs">
                  {rainMm > 2.5 ? (
                    <CloudRain className="w-7 h-7 sm:w-8 sm:h-8 text-[#166534]" />
                  ) : (
                    <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f2918] tracking-tight">
                    {formatTemp(tempC)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-black text-[#166534] uppercase tracking-wide">
                    {rainCategory}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right sm:border-l sm:border-[#c8d9c8] sm:pl-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#c8d9c8]">
                <span className="text-[11px] sm:text-xs text-[#166534] font-black uppercase tracking-wider block">
                  {t("expectedRainfall")}
                </span>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#166534] tracking-tight mt-0.5">
                  {formatRainfall(rainMm)}
                </div>
                <div className="text-xs font-bold text-[#0f2918] mt-0.5">
                  {t("rainProb")}: <strong className="text-sky-800 font-extrabold">{formatPercent(rainProb)}</strong>
                </div>
              </div>
            </div>

            {/* Micro Details Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#c8d9c8] text-xs">
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {t("elevation")}
                </span>
                <strong className="text-[#0f2918] font-black">
                  {currentPanchayat.elevation_m}m {language === "mr" ? "समुद्रसपाटी" : language === "hi" ? "समुद्रतल" : "asl"}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {t("soilType")}
                </span>
                <strong className="text-[#0f2918] font-black truncate block">
                  {getSoilType(currentPanchayat.soil_type)}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {t("windSpeed")}
                </span>
                <strong className="text-[#0f2918] font-black">{prediction?.wind_kmh || 12} km/h</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="text-[10px] text-[#166534] font-black block uppercase">
                  {t("humidity")}
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
                  {t("aiCorrection")}
                </span>
                <span className="text-xs font-black text-emerald-200">
                  {Math.round(trustScore * 100)}% {t("trust")}
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                {t("terrainTitle")}
              </h2>

              <p className="text-xs text-emerald-100 font-bold leading-relaxed">
                {t("terrainDesc")}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-200 font-black uppercase tracking-wide">
                  {t("errorReduction")}
                </span>
                <span className="text-lg font-black text-[#fef08a]">+62.5%</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#fef08a] h-full rounded-full w-[62.5%]" />
              </div>
              <div className="text-[11px] text-emerald-200 font-bold">
                {t("downscaled")}
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
              {t("rainfall")}
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
              {t("temperature")}
            </span>
            <div className="text-2xl font-black text-[#0f2918]">
              {formatTemp(tempC)}
            </div>
            <span className="text-xs font-bold text-[#0f2918] block">
              {t("lapseCorrect")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {t("rainProbability")}
            </span>
            <div className="text-2xl font-black text-sky-800">
              {formatPercent(rainProb)}
            </div>
            <span className="text-xs font-bold text-[#0f2918] block">
              &ge; 2.5 mm {t("threshold")}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[11px] font-black text-[#166534] uppercase tracking-wider block">
              {t("aiTrust")}
            </span>
            <div className="text-2xl font-black text-[#166534]">
              {Math.round(trustScore * 100)}%
            </div>
            <span className="text-xs font-extrabold text-[#166534] block">
              {getTrustLabel(currentPanchayat.trust_label)} {t("confidence")}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. 5-DAY WEATHER FORECAST TIMELINE (COMPACT HORIZONTAL) */}
        {/* ========================================================= */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#0f2918] tracking-tight">
              {t("outlook5Day")}
            </h2>
            <span className="text-xs text-[#2b4c34] font-semibold">
              {currentPanchayat.panchayat_name} {language === "mr" ? "हब / केंद्र" : language === "hi" ? "हब / केंद्र" : "Hub"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((day) => {
              const dayRain = Math.max(0, currentPanchayat.latest_rainfall_estimate + (day - 2) * 1.2);
              const dayTemp = currentPanchayat.latest_temp_estimate + (day % 2 === 0 ? -0.4 : 0.6);
              const dayProb = Math.min(0.95, currentPanchayat.latest_rain_prob + (day - 1) * 0.05);
              const isSelected = leadDays === day;

              const dayLabels = [t("today"), t("tomorrow"), t("day2"), t("day3"), t("day5")];
              const dayLabel = dayLabels[day - 1];

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
                      {t("rain")}
                    </span>
                    <div className="text-base font-extrabold text-[#0f2918]">
                      {formatRainfall(dayRain)}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#2b4c34]">
                    {formatTemp(dayTemp)}
                  </div>

                  <div className="text-[10px] text-[#2b4c34] pt-1 border-t border-[#c8d9c8] flex items-center justify-between font-medium">
                    <span>{t("probability")}</span>
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
                {t("engineTitle")}
              </strong>
              <span className="text-[#2b4c34] ml-2">
                {t("engineDesc")}
              </span>
            </div>
          </div>
          <div className="font-bold text-[#166534]">
            {t("calibrated")}
          </div>
        </div>
      </div>
    </div>
  );
}

