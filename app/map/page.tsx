"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { PanchayatMap } from "@/components/PanchayatMap";
import { PANCHAYATS_DATA } from "@/lib/data";
import { ForecastCard } from "@/components/ForecastCard";
import { fetchPrediction } from "@/lib/api";
import { PredictionResult } from "@/lib/types";
import { MapPin, Layers, Compass, ShieldCheck } from "lucide-react";

export default function MapPage() {
  const [selectedLgd, setSelectedLgd] = useState<string>("MH_PUN_001");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  React.useEffect(() => {
    fetchPrediction(selectedLgd, 2).then(setPrediction);
  }, [selectedLgd]);

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title="Interactive Panchayat Weather Intelligence Map"
        description="Geographic distribution of downscaling performance, calibrated trust scores, and station hubs."
      />

      <div className="px-6 space-y-6">
        {/* Full Leaflet Map */}
        <PanchayatMap
          panchayats={PANCHAYATS_DATA}
          selectedLgd={selectedLgd}
          onSelectPanchayat={(lgd) => setSelectedLgd(lgd)}
        />

        {/* Selected Panchayat Detail Card */}
        {prediction && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider px-1">
              Selected Panchayat Intelligence
            </h3>
            <ForecastCard data={prediction} />
          </div>
        )}
      </div>
    </div>
  );
}
