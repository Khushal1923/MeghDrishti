"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { PanchayatMap } from "@/components/PanchayatMap";
import { PANCHAYATS_DATA } from "@/lib/data";
import { ForecastCard } from "@/components/ForecastCard";
import { fetchPrediction } from "@/lib/api";
import { PredictionResult } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";

export default function MapPage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  React.useEffect(() => {
    fetchPrediction(selectedLgd, 2).then(setPrediction);
  }, [selectedLgd]);

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Full Leaflet Map */}
        <PanchayatMap
          panchayats={PANCHAYATS_DATA}
          selectedLgd={selectedLgd}
          onSelectPanchayat={(lgd) => setSelectedLgd(lgd)}
        />

        {/* Selected Panchayat Detail Card */}
        {prediction && (
          <div className="space-y-2">
            <h3 className="text-sm font-black text-[#0f2918] uppercase tracking-wider px-1">
              {language === "mr" ? "निवडलेल्या ग्रामपंचायतीची माहिती" : "Selected Panchayat Intelligence"}
            </h3>
            <ForecastCard data={prediction} />
          </div>
        )}
      </div>
    </div>
  );
}
