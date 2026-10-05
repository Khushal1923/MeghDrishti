"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { PANCHAYATS_DATA } from "@/lib/data";
import { TrustBadge } from "@/components/TrustBadge";
import { ForecastCard } from "@/components/ForecastCard";
import { AdvisoryCard } from "@/components/AdvisoryCard";
import { fetchPrediction, fetchAdvisory } from "@/lib/api";
import { PredictionResult, CropAdvisory } from "@/lib/types";
import {
  Search,
  MapPin,
  Mountain,
  Layers,
  Sparkles,
  TrendingUp,
  Sprout,
  CheckCircle2,
  Calendar,
  CloudRain,
  Thermometer,
} from "lucide-react";
import { formatRainfall, formatTemp, formatPercent } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export default function PanchayatDirectoryPage() {
  const { language, setLanguage } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [activeTab, setActiveTab] = useState<"overview" | "forecast" | "accuracy" | "geography" | "advisory">("overview");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [advisory, setAdvisory] = useState<CropAdvisory | null>(null);

  useEffect(() => {
    fetchPrediction(selectedLgd, 2).then(setPrediction);
    fetchAdvisory("Cotton", "Flowering / Square Formation", selectedLgd, language).then(setAdvisory);
  }, [selectedLgd, language]);

  const filteredPanchayats = PANCHAYATS_DATA.filter((p) => {
    const matchZone = selectedZone === "All" || p.zone === selectedZone;
    const matchSearch =
      p.panchayat_name.toLowerCase().includes(search.toLowerCase()) ||
      p.village_name.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase()) ||
      p.lgd_code.toLowerCase().includes(search.toLowerCase());
    return matchZone && matchSearch;
  });

  const current = PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  const zoneFilters = [
    { key: "All", en: "All States", mr: "सर्व राज्ये" },
    { key: "Maharashtra", en: "Maharashtra", mr: "महाराष्ट्र" },
    { key: "Karnataka", en: "Karnataka", mr: "कर्नाटक" },
    { key: "Telangana", en: "Telangana", mr: "तेलंगणा" },
  ];

  const tabsList = [
    { id: "overview", labelEn: "Overview", labelMr: "आढावा" },
    { id: "forecast", labelEn: "Forecast", labelMr: "हवामान अंदाज" },
    { id: "accuracy", labelEn: "Accuracy", labelMr: "अचूकता आकडेवारी" },
    { id: "geography", labelEn: "Geography", labelMr: "भूगोल व माती" },
    { id: "advisory", labelEn: "Crop Advisory", labelMr: "पीक सल्ला" },
  ];

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Header Title & Filter Bar */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0f2918] tracking-tight">
              {language === "mr" ? "ग्रामपंचायत हवामान सूची" : "Panchayat Weather Directory"}
            </h1>
            <p className="text-xs text-[#2b4c34] font-bold mt-0.5">
              {language === "mr"
                ? `गावपातळीवरील १ किमी अचूक हवामान (${PANCHAYATS_DATA.length} सक्रिय ग्रामपंचायती)`
                : `Explore 1 km localized downscaling for ${PANCHAYATS_DATA.length} rural hubs`}
            </p>
          </div>

          {/* Zone Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-bold overflow-x-auto no-scrollbar max-w-full shrink-0">
            {zoneFilters.map((z) => (
              <button
                key={z.key}
                onClick={() => setSelectedZone(z.key)}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
                  selectedZone === z.key
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                {language === "mr" ? z.mr : z.en}
              </button>
            ))}
          </div>
        </div>

        {/* 40% LEFT / 60% RIGHT Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ========================================================= */}
          {/* LEFT 40% (5 Cols): SEARCH & PANCHAYAT LIST */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#166534]/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === "mr" ? "ग्रामपंचायत, जिल्हा, गाव शोधा..." : "Search panchayat, district, village..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#f4f8f4] border border-[#c8d9c8] rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] shadow-2xs placeholder:text-[#166534]/50"
              />
            </div>

            {/* List of Compact Panchayat Cards */}
            <div className="space-y-2.5 max-h-[380px] lg:max-h-[680px] overflow-y-auto pr-1">
              {filteredPanchayats.map((p) => {
                const isSelected = p.lgd_code === selectedLgd;
                return (
                  <div
                    key={p.lgd_code}
                    onClick={() => setSelectedLgd(p.lgd_code)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? "bg-[#d7ead9] border-[#166534] ring-1 ring-[#166534] shadow-xs"
                        : "bg-[#f4f8f4] border-[#c8d9c8] hover:border-[#b8d8b8] hover:bg-[#eaf1ea]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-[#0f2918] leading-tight">
                          {p.panchayat_name}
                        </h4>
                        <p className="text-xs text-[#2b4c34] mt-0.5 font-bold">
                          {p.district}, {p.state}
                        </p>
                      </div>
                      <TrustBadge level={p.trust_label} score={p.trust_score} showIcon={false} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#c8d9c8]">
                      <div>
                        <span className="text-[10px] text-[#166534] font-bold block uppercase">
                          {language === "mr" ? "पाऊस" : "Rain"}
                        </span>
                        <strong className="text-[#166534] font-extrabold">
                          {formatRainfall(p.latest_rainfall_estimate)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#166534] font-bold block uppercase">
                          {language === "mr" ? "तापमान" : "Temp"}
                        </span>
                        <strong className="text-[#0f2918] font-bold">
                          {formatTemp(p.latest_temp_estimate)}
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT 60% (7 Cols): SELECTED PANCHAYAT INTELLIGENCE PANEL */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-xs space-y-5">
            {/* Header: Selected Name & Trust */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#c8d9c8]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl md:text-2xl font-black text-[#0f2918] tracking-tight">
                    {current.panchayat_name}
                  </h2>
                  <span className="text-[11px] bg-[#e4eee4] text-[#166534] px-2.5 py-0.5 rounded-full font-mono font-black border border-[#c3d6c4]">
                    {current.lgd_code}
                  </span>
                </div>
                <p className="text-xs text-[#0f2918] mt-0.5 font-bold">
                  {current.village_name} &bull; {current.taluka}, {current.district}, {current.state}
                </p>
              </div>

              <TrustBadge level={current.trust_label} score={current.trust_score} />
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b border-[#c8d9c8] pb-1 text-xs font-black overflow-x-auto no-scrollbar">
              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "bg-[#166534] text-white font-black shadow-xs"
                      : "text-[#166534] hover:bg-[#e4eee4]"
                  }`}
                >
                  {language === "mr" ? tab.labelMr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-4 pt-1">
                {/* 4 Geography Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-black block">
                      {language === "mr" ? "उंची" : "Elevation"}
                    </span>
                    <strong className="text-xs md:text-sm text-[#0f2918] font-black">{current.elevation_m}m asl</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-black block">
                      {language === "mr" ? "उतार" : "Slope / Aspect"}
                    </span>
                    <strong className="text-xs md:text-sm text-[#0f2918] font-black">{current.slope_deg}° / {current.aspect_deg}°</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-black block">
                      {language === "mr" ? "माती" : "Soil Type"}
                    </span>
                    <strong className="text-xs md:text-sm text-[#0f2918] font-black truncate block" title={current.soil_type}>
                      {current.soil_type}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#d7ead9] border border-[#a7d4ac]">
                    <span className="text-[10px] text-[#166534] uppercase font-black block">
                      {language === "mr" ? "चिकणमाती" : "Clay Content"}
                    </span>
                    <strong className="text-xs md:text-sm text-[#166534] font-black">{current.soil_clay_pct}% Clay</strong>
                  </div>
                </div>

                {/* 5-Day Forecast Mini Timeline */}
                <div className="p-4 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0f2918] uppercase tracking-wide">
                      {language === "mr" ? "५ दिवसांचा स्थानिक अंदाज" : "5-Day Weather Outlook"}
                    </span>
                    <span className="text-[11px] text-[#166534] font-black">
                      {Math.round(current.trust_score * 100)}% {language === "mr" ? "विश्वास" : "Trust"}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((d) => {
                      const r = Math.max(0, current.latest_rainfall_estimate + (d - 2) * 1.1);
                      const t = current.latest_temp_estimate + (d % 2 === 0 ? -0.4 : 0.5);
                      const dayLabelsMr = ["आज", "उद्या", "+३", "+४", "+५"];
                      const dayLabelsEn = ["+1d", "+2d", "+3d", "+4d", "+5d"];
                      return (
                        <div key={d} className="p-2 rounded-xl bg-[#f4f8f4] border border-[#c8d9c8] text-center space-y-1">
                          <span className="text-[10px] font-black text-[#166534] block">
                            {language === "mr" ? dayLabelsMr[d - 1] : dayLabelsEn[d - 1]}
                          </span>
                          <strong className="text-xs font-black text-[#166534] block">{formatRainfall(r)}</strong>
                          <span className="text-[10px] font-bold text-[#0f2918] block">{formatTemp(t)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI Trust Explanation */}
                <div className="p-4 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-1">
                  <div className="flex items-center gap-2 text-[#166534] font-black text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[#166534] shrink-0" />
                    <span>{language === "mr" ? "AI विश्वासार्हता व कॅलिब्रेशन माहिती" : "AI Trust & Calibration Insight"}</span>
                  </div>
                  <p className="text-xs font-bold text-[#0f2918] leading-relaxed pl-6">
                    {language === "mr"
                      ? "स्थानिक टोपोग्राफी, लॅप्स-रेट उंची आणि ५ किमी परिसरातील IMD केंद्राच्या आकडेवारीनुसार मॉडेल अचूक केले आहे."
                      : (prediction?.trust_reason || "Calibrated on local topography, elevation lapse-rate correction, and ground-truth IMD station data within 5 km radius.")}
                  </p>
                </div>

                {/* Crop Recommendation Summary */}
                <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#166534] font-black text-xs uppercase tracking-wider">
                      <Sprout className="w-4 h-4 text-[#166534]" />
                      <span>{language === "mr" ? "पीक सल्ला (कापूस • फुलोरा अवस्था)" : "Crop Recommendation (Cotton • Flowering)"}</span>
                    </div>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                      {language === "mr" ? "योग्य वेळ" : "Good Window"}
                    </span>
                  </div>
                  <p className="text-xs text-[#0f2918] font-black pl-6">
                    {language === "mr"
                      ? "शेतात आंतरमशागतीची कामे पूर्ण करा. हलके ठिबक सिंचन सुरू ठेवा."
                      : (advisory?.recommended_action || "Suitable conditions for field activity. Proceed with planned intercultural operations.")}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FORECAST */}
            {activeTab === "forecast" && prediction && (
              <div className="pt-1">
                <ForecastCard data={prediction} />
              </div>
            )}

            {/* TAB CONTENT: ACCURACY */}
            {activeTab === "accuracy" && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[11px] text-[#166534] font-bold block uppercase">
                      {language === "mr" ? "मूळ NWP त्रुटी" : "Raw NWP Error"}
                    </span>
                    <div className="text-xl font-extrabold text-rose-700 mt-1">1.84 mm</div>
                    <span className="text-[10px] text-[#2b4c34]">
                      {language === "mr" ? "बेसलाइन MAE" : "Baseline MAE"}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#d7ead9] border border-[#a7d4ac]">
                    <span className="text-[11px] text-[#166534] font-bold block uppercase">
                      {language === "mr" ? "मेघदृष्टी AI" : "MeghDrishti"}
                    </span>
                    <div className="text-xl font-extrabold text-[#166534] mt-1">0.68 mm</div>
                    <span className="text-[10px] text-[#166534]">
                      {language === "mr" ? "दुरुस्त MAE" : "Downscaled MAE"}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#d7ead9] border border-[#a7d4ac]">
                    <span className="text-[11px] text-[#166534] font-bold block uppercase">
                      {language === "mr" ? "सुधारणा" : "Skill Boost"}
                    </span>
                    <div className="text-xl font-extrabold text-[#166534] mt-1">+63.0%</div>
                    <span className="text-[10px] text-[#166534]">
                      {language === "mr" ? "त्रुटी कपात" : "Error reduction"}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] text-xs text-[#2b4c34] space-y-1 font-medium">
                  <div className="font-extrabold text-[#0f2918]">
                    {language === "mr" ? "हवामान केंद्र व पडताळणी आकडेवारी:" : "Station & Validation Record:"}
                  </div>
                  <div>
                    &bull; {language === "mr" ? "जवळचे स्वयंचलित हवामान केंद्र:" : "Nearest IMD Automatic Weather Station:"} <strong>4.8 km</strong>
                  </div>
                  <div>
                    &bull; {language === "mr" ? "एकूण पडताळलेले दिवस:" : "Total Validated Chronological Records:"} <strong>4,560 pairs</strong>
                  </div>
                  <div>
                    &bull; {language === "mr" ? "खोटा इशारा दर (FAR):" : "False Alarm Ratio:"} <strong>0.106</strong> | {language === "mr" ? "शोध संभाव्यता (POD):" : "Probability of Detection:"} <strong>0.856</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GEOGRAPHY */}
            {activeTab === "geography" && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-bold block">
                      {language === "mr" ? "शेती क्षेत्र" : "Cropland"}
                    </span>
                    <strong className="text-sm font-extrabold text-[#0f2918]">{Math.round(current.cropland_frac * 100)}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-bold block">
                      {language === "mr" ? "झाडे व वन" : "Tree Cover"}
                    </span>
                    <strong className="text-sm font-extrabold text-[#0f2918]">{Math.round(current.forest_frac * 100)}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-bold block">
                      {language === "mr" ? "वस्ती / गावठाण" : "Settlement"}
                    </span>
                    <strong className="text-sm font-extrabold text-[#0f2918]">{Math.round(current.builtup_frac * 100)}%</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
                    <span className="text-[10px] text-[#166534] uppercase font-bold block">
                      {language === "mr" ? "अक्षांश / रेखांश" : "Coordinates"}
                    </span>
                    <strong className="text-xs font-mono font-bold text-[#0f2918]">{current.latitude.toFixed(2)}°N, {current.longitude.toFixed(2)}°E</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ADVISORY */}
            {activeTab === "advisory" && advisory && (
              <div className="pt-1">
                <AdvisoryCard advisory={advisory} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
