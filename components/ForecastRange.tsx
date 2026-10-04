import React from "react";
import { formatRainfall } from "@/lib/utils";

interface ForecastRangeProps {
  low: number;
  high: number;
  estimate: number;
  baseline: number;
  unit?: string;
}

export const ForecastRange: React.FC<ForecastRangeProps> = ({
  low,
  high,
  estimate,
  baseline,
  unit = "mm",
}) => {
  const maxScale = Math.max(high * 1.25, baseline * 1.25, 10.0);
  const lowPct = Math.min(Math.max((low / maxScale) * 100, 0), 100);
  const highPct = Math.min(Math.max((high / maxScale) * 100, 0), 100);
  const widthPct = Math.max(highPct - lowPct, 2);
  const estPct = Math.min(Math.max((estimate / maxScale) * 100, 0), 100);
  const basePct = Math.min(Math.max((baseline / maxScale) * 100, 0), 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-[#0f2918] font-bold">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#166534] inline-block"></span>
          <span className="font-extrabold tracking-tight">90% Calibrated Interval</span>
        </span>
        <span className="font-black text-[#0f2918]">
          [{formatRainfall(low)} – {formatRainfall(high)}]
        </span>
      </div>

      <div className="relative w-full h-7 bg-[#dbe8db] rounded-lg p-1 overflow-hidden border border-[#c3d6c4]">
        {/* Shaded Interval Range Bar */}
        <div
          className="absolute top-1 bottom-1 bg-[#b8d8b8] border-x-2 border-[#166534] rounded-md transition-all duration-300"
          style={{ left: `${lowPct}%`, width: `${widthPct}%` }}
        />

        {/* Baseline Indicator Marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
          style={{ left: `${basePct}%` }}
          title={`Raw Forecast Baseline: ${baseline.toFixed(1)} ${unit}`}
        >
          <span className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-600 shadow-xs" />
        </div>

        {/* Downscaled Estimate Indicator Marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#166534] z-20"
          style={{ left: `${estPct}%` }}
          title={`MeghDrishti Downscaled Estimate: ${estimate.toFixed(1)} ${unit}`}
        >
          <span className="absolute -top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#166534] shadow-xs ring-2 ring-[#dbe8db]" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#0f2918] font-bold">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
          <span>Raw: <strong className="text-rose-700 font-extrabold">{baseline.toFixed(1)} {unit}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
          <span>Corrected: <strong className="text-[#166534] font-extrabold">{estimate.toFixed(1)} {unit}</strong></span>
        </div>
      </div>

    </div>
  );
};

