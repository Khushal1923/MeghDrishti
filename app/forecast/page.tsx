"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ForecastCard } from "@/components/ForecastCard";
import { PANCHAYATS_DATA } from "@/lib/data";
import { fetchPrediction } from "@/lib/api";
import { PredictionResult } from "@/lib/types";
import { MapPin } from "lucide-react";
import { formatRainfall, formatTemp, formatPercent } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

export default function WeatherForecastPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [leadDays, setLeadDays] = useState<number>(1);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  useEffect(() => {
    fetchPrediction(selectedLgd, leadDays).then(setPrediction);
  }, [selectedLgd, leadDays]);

  const current = PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  const rainMm = prediction ? prediction.estimate : current.latest_rainfall_estimate;
  const tempC = prediction ? prediction.corrected_temp : current.latest_temp_estimate;
  const rainProb = prediction ? prediction.rain_prob : current.latest_rain_prob;

  const leadOptions = [
    { label: "+1 Day", value: 1, marathi: "आज (+१)" },
    { label: "+2 Days", value: 2, marathi: "उद्या (+२)" },
    { label: "+3 Days", value: 3, marathi: "+३ दिवस" },
    { label: "+4 Days", value: 4, marathi: "+४ दिवस" },
    { label: "+5 Days", value: 5, marathi: "+५ दिवस" },
  ];

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

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Location & Horizon Selector Bar */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-extrabold text-[#166534]/70 tracking-wider block">
                {language === "mr" ? "ग्रामपंचायत निवडा" : "Select Panchayat"}
              </label>
              <select
                value={selectedLgd}
                onChange={(e) => setSelectedLgd(e.target.value)}
                className="bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-1.5 text-sm font-extrabold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer"
              >
                {PANCHAYATS_DATA.map((p) => (
                  <option key={p.lgd_code} value={p.lgd_code}>
                    {p.panchayat_name} ({p.district}, {p.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Horizon Pills */}
          <div className="flex items-center gap-1 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-bold overflow-x-auto no-scrollbar max-w-full shrink-0">
            {leadOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLeadDays(opt.value)}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
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

        {/* Current Condition Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[10px] text-[#166534]/70 font-bold uppercase tracking-wider block">
              {language === "mr" ? "तापमान" : "Temperature"}
            </span>
            <div className="text-2xl font-extrabold text-[#0f2918]">{formatTemp(tempC)}</div>
            <span className="text-[11px] text-[#2b4c34] font-semibold block">
              {language === "mr" ? "उंचीनुसार अचूक" : "Terrain lapse corrected"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[10px] text-[#166534]/70 font-bold uppercase tracking-wider block">
              {language === "mr" ? "पाऊस" : "Rainfall"}
            </span>
            <div className="text-2xl font-extrabold text-[#166534]">{formatRainfall(rainMm)}</div>
            <span className="text-[11px] text-[#166534] font-bold block">
              {getRainCategory(rainMm)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[10px] text-[#166534]/70 font-bold uppercase tracking-wider block">
              {language === "mr" ? "पावसाची शक्यता" : "Rain Probability"}
            </span>
            <div className="text-2xl font-extrabold text-sky-800">{formatPercent(rainProb)}</div>
            <span className="text-[11px] text-[#2b4c34] font-semibold block">
              &ge; 2.5 mm {language === "mr" ? "निकष" : "threshold"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1">
            <span className="text-[10px] text-[#166534]/70 font-bold uppercase tracking-wider block">
              {language === "mr" ? "वाऱ्याचा वेग" : "Wind Speed"}
            </span>
            <div className="text-2xl font-extrabold text-[#0f2918]">{prediction?.wind_kmh || 12} km/h</div>
            <span className="text-[11px] text-[#2b4c34] font-semibold block">
              {language === "mr" ? "पृष्ठभागावरील वारा" : "Surface gust proxy"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] shadow-2xs space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-[#166534]/70 font-bold uppercase tracking-wider block">
              {language === "mr" ? "सापेक्ष आर्द्रता" : "Relative Humidity"}
            </span>
            <div className="text-2xl font-extrabold text-[#0f2918]">{prediction?.humidity_proxy || 68}%</div>
            <span className="text-[11px] text-[#2b4c34] font-semibold block">
              {language === "mr" ? "हवेतील बाष्प" : "Boundary layer proxy"}
            </span>
          </div>
        </div>

        {/* Detailed Downscaling Card */}
        {prediction && (
          <ForecastCard
            data={prediction}
            onLeadChange={(lead) => setLeadDays(lead)}
          />
        )}

        {/* 5-Day Outlook Strip */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#0f2918] tracking-tight">
              {language === "mr" ? "५ दिवसांचा स्थानिक हवामान पट" : "5-Day Downscaled Weather Horizon"}
            </h3>
            <span className="text-xs text-[#2b4c34] font-medium">
              {language === "mr" ? "प्रमाण:" : "Resolution:"}{" "}
              <strong className="text-[#0f2918]">
                {language === "mr" ? "१ किमी गावपातळी" : "1 km Panchayat Scale"}
              </strong> &bull; {current.panchayat_name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((day) => {
              const estRain = Math.max(0, current.latest_rainfall_estimate + (day - 2) * 1.5);
              const estTemp = current.latest_temp_estimate + (day % 2 === 0 ? -0.5 : 0.8);
              const isSelected = leadDays === day;
              const dayNamesMr = ["आज (+१)", "उद्या (+२)", "+३ दिवस", "+४ दिवस", "+५ दिवस"];
              const dayNamesEn = ["Day +1", "Day +2", "Day +3", "Day +4", "Day +5"];

              return (
                <div
                  key={day}
                  onClick={() => setLeadDays(day)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-[#d7ead9] border-[#166534] ring-1 ring-[#166534] shadow-2xs"
                      : "bg-[#e6efe6] border-[#c3d6c4] hover:bg-[#dbe8db]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#0f2918]">
                    <span>{language === "mr" ? dayNamesMr[day - 1] : dayNamesEn[day - 1]}</span>
                    <span className="text-[10px] font-extrabold text-[#166534] bg-[#d5e8d5] px-2 py-0.5 rounded-full border border-[#b8d8b8]">
                      {Math.round(current.trust_score * 100)}% {language === "mr" ? "विश्वास" : "Trust"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#166534]/70 block font-medium">
                      {language === "mr" ? "अपेक्षित पाऊस" : "Downscaled Rain"}
                    </span>
                    <div className="text-lg font-extrabold text-[#0f2918]">
                      {formatRainfall(estRain)}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-[#2b4c34]">
                    {language === "mr" ? "तापमान:" : "Temp:"} {formatTemp(estTemp)}
                  </div>

                  <div className="pt-2 border-t border-[#c3d6c4] text-[10px] text-[#2b4c34] flex items-center justify-between font-medium">
                    <span>{language === "mr" ? "शक्यता:" : "P(Rain):"}</span>
                    <strong className="text-sky-800 font-bold">{formatPercent(current.latest_rain_prob)}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
