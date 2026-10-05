"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Panchayat } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

const LeafletMapInner = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] bg-[#e4eee4] rounded-2xl border border-[#c3d6c4] animate-pulse flex items-center justify-center text-xs text-[#166534] font-black">
      Loading…
    </div>
  ),
});

interface PanchayatMapProps {
  panchayats: Panchayat[];
  selectedLgd?: string;
  onSelectPanchayat?: (lgd: string) => void;
}

export const PanchayatMap: React.FC<PanchayatMapProps> = ({
  panchayats,
  selectedLgd,
  onSelectPanchayat,
}) => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [zoneFilter, setZoneFilter] = useState<string>("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    zoneFilter === "All"
      ? panchayats
      : panchayats.filter((p) => p.zone === zoneFilter);

  const selectedPanchayat = panchayats.find((p) => p.lgd_code === selectedLgd);

  const zoneTabs = [
    { id: "All",         label: tx(language, "zoneAll") },
    { id: "Maharashtra", label: tx(language, "zoneMH") },
    { id: "Karnataka",   label: tx(language, "zoneKA") },
    { id: "Telangana",   label: tx(language, "zoneTS") },
  ];

  if (!mounted) {
    return (
      <div className="w-full h-[420px] bg-[#e4eee4] rounded-3xl border border-[#c3d6c4] animate-pulse flex items-center justify-center text-xs text-[#166534] font-black">
        {tx(language, "mapLoading")}
      </div>
    );
  }

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
      {/* Map Header & Zone Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {tx(language, "spatialIntel")}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] text-[10px] font-black border border-[#a7d4ac]">
              1 km Grid
            </span>
          </div>
          <h3 className="text-base font-black text-[#0f2918] tracking-tight mt-0.5">
            {tx(language, "stationClusters")}
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-[#e4eee4] p-1 rounded-full border border-[#c3d6c4] text-xs font-black overflow-x-auto no-scrollbar max-w-full shrink-0">
          {zoneTabs.map((z) => (
            <button
              key={z.id}
              onClick={() => setZoneFilter(z.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all shrink-0 text-[11px] sm:text-xs ${
                zoneFilter === z.id
                  ? "bg-[#166534] text-white shadow-xs font-black"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              {z.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden border border-[#c3d6c4] relative shadow-inner">
        <LeafletMapInner
          panchayats={panchayats}
          filtered={filtered}
          zoneFilter={zoneFilter}
          selectedLgd={selectedLgd}
          onSelectPanchayat={onSelectPanchayat}
          language={language}
        />
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#0f2918] font-bold pt-1 border-t border-[#c8d9c8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" /> {tx(language, "highTrust")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" /> {tx(language, "moderateTrust")}
          </span>
        </div>
        <span className="text-[#166534] font-black">
          {tx(language, "selected")}: {selectedPanchayat?.village_name || "Wagholi"}
        </span>
      </div>
    </div>
  );
};
