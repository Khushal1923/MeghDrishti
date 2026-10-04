"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { AdvisoryCard } from "@/components/AdvisoryCard";
import { PANCHAYATS_DATA } from "@/lib/data";
import { fetchAdvisory } from "@/lib/api";
import { CropAdvisory } from "@/lib/types";
import { MapPin, CheckCircle, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function CropAdvisoryPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [crop, setCrop] = useState<string>("Cotton");
  const [stage, setStage] = useState<string>("Flowering / Square Formation");
  const [advisory, setAdvisory] = useState<CropAdvisory | null>(null);

  useEffect(() => {
    fetchAdvisory(crop, stage, selectedLgd, language).then(setAdvisory);
  }, [crop, stage, selectedLgd, language]);

  const current = PANCHAYATS_DATA.find((p) => p.lgd_code === selectedLgd) || PANCHAYATS_DATA[0];

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Top Location Selector Bar */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#166534]" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-black text-[#166534]/70 tracking-wider block">
                {language === "mr" ? "स्थानिक ग्रामपंचायत निवडा" : "Select Panchayat Location"}
              </label>
              <select
                value={selectedLgd}
                onChange={(e) => setSelectedLgd(e.target.value)}
                className="bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-1.5 text-sm font-black text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer"
              >
                {PANCHAYATS_DATA.map((p) => (
                  <option key={p.lgd_code} value={p.lgd_code}>
                    {p.panchayat_name} ({p.district}, {p.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-xs text-[#2b4c34] font-black bg-[#e4eee4] px-3.5 py-1.5 rounded-full border border-[#c3d6c4]">
            {language === "mr" ? "माती:" : "Soil:"} <strong className="text-[#0f2918]">{current.soil_type}</strong> &bull; {language === "mr" ? "उंची:" : "Elev:"} <strong className="text-[#0f2918]">{current.elevation_m}m</strong>
          </div>
        </div>

        {/* Main Farmer Advisory Component */}
        {advisory ? (
          <AdvisoryCard
            advisory={advisory}
            onLanguageChange={(l) => setLanguage(l as any)}
            onCropChange={(c) => {
              setCrop(c);
              setStage(
                c === "Cotton"
                  ? "Flowering / Square Formation"
                  : c === "Soybean"
                  ? "Pod Formation & Filling"
                  : c === "Onion"
                  ? "Bulb Development"
                  : c === "Tomato"
                  ? "Flowering & Fruit Set"
                  : "Vegetative Growth"
              );
            }}
            onStageChange={(s) => setStage(s)}
          />
        ) : (
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-8 flex items-center justify-center text-xs text-[#166534] font-black">
            {language === "mr" ? "पीक सल्ला लोड होत आहे..." : "Loading Crop Advisory Intelligence..."}
          </div>
        )}

        {/* Concise Guidelines Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#0f2918] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#166534]" />
              {language === "mr" ? "कृषी वैज्ञानिक निकष" : "Agronomic Scientific Thresholds"}
            </h4>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-bold">
              {language === "mr"
                ? "स्थानिक पाऊस शक्यता (≥२.५ मिमी निकष) आणि जमिनीतील चिकणमाती ओलावा क्षमतेनुसार फवारणी व सिंचन वेळापत्रक ठरवले जाते."
                : "Cross-references precipitation probability (≥ 2.5 mm threshold) and clay retention capacity to recommend precise irrigation and spraying windows."}
            </p>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-4 shadow-2xs space-y-1.5">
            <h4 className="font-black text-xs uppercase tracking-wider text-[#0f2918] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#166534]" />
              {language === "mr" ? "शेतकरी अनुकूल थेट निर्णय" : "Direct Field Decision Support"}
            </h4>
            <p className="text-xs text-[#2b4c34] leading-relaxed font-bold">
              {language === "mr"
                ? "शेतकऱ्यांना समजण्यासाठी सुलभ मराठी व इंग्रजीत कृती सल्ला, आवाज ऐकण्याची सुविधा व WhatsApp वर शेअर करण्याचा पर्याय."
                : "Clear Marathi and English advisories with voice audio readout and instant WhatsApp sharing for village farmer groups."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

