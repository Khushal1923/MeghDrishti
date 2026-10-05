import React from "react";
import { CloudRain, Thermometer, Wind, Droplets, ArrowDownRight, Compass, ShieldCheck } from "lucide-react";
import { PredictionResult } from "@/lib/types";
import { TrustBadge } from "./TrustBadge";
import { ForecastRange } from "./ForecastRange";
import { formatRainfall, formatTemp, formatPercent } from "@/lib/utils";

interface ForecastCardProps {
  data: PredictionResult;
  onLeadChange?: (lead: number) => void;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  data,
  onLeadChange,
}) => {
  const rainDiff = data.estimate - data.baseline;
  const tempDiff = data.corrected_temp - data.baseline_temp;

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-5 md:p-6 shadow-xs space-y-5">
      {/* Header: Location & Trust */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#c8d9c8]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-extrabold text-[#0f2918] tracking-tight">
              {data.panchayat_name}
            </h2>
            <span className="text-[11px] bg-[#e4eee4] text-[#166534] px-2 py-0.5 rounded font-mono font-bold border border-[#c3d6c4]">
              {data.lgd_code}
            </span>
          </div>
          <p className="text-xs text-[#2b4c34] mt-0.5 font-medium">
            {data.village_name}, {data.taluka}, {data.district}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TrustBadge level={data.trust} score={data.trust_score} />
          {/* Lead Day Selector Buttons */}
          <div className="flex items-center bg-[#e4eee4] p-0.5 rounded-full border border-[#c3d6c4] text-xs font-bold">
            {[1, 2, 3, 4, 5].map((lead) => (
              <button
                key={lead}
                onClick={() => onLeadChange && onLeadChange(lead)}
                className={`px-3 py-1 rounded-full transition-all ${
                  data.lead_days === lead
                    ? "bg-[#166534] text-white shadow-xs font-extrabold"
                    : "text-[#166534] hover:text-[#0b1f11]"
                }`}
              >
                +{lead}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Rainfall & Temperature Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rainfall Card */}
        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d5e8d5] text-[#166534] flex items-center justify-center">
                <CloudRain className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#0f2918] uppercase tracking-wider">
                Rainfall Downscaling
              </span>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#d5e8d5] text-[#166534] border border-[#b8d8b8]">
              {data.rain_category}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-2xl md:text-3xl font-black text-[#0f2918]">
                {formatRainfall(data.estimate)}
              </div>
              <div className="text-xs text-[#166534] mt-0.5 font-extrabold">
                MeghDrishti Local AI
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-[#2b4c34]/70 line-through">
                Raw: {formatRainfall(data.baseline)}
              </div>
              <div className="text-xs font-extrabold text-[#166534] flex items-center justify-end gap-0.5 mt-0.5">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>{Math.abs(rainDiff).toFixed(1)} mm adjusted</span>
              </div>
            </div>
          </div>

          {/* Uncertainty Range Bar */}
          <ForecastRange
            low={data.range[0]}
            high={data.range[1]}
            estimate={data.estimate}
            baseline={data.baseline}
            unit="mm"
          />

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#c3d6c4] text-[#0f2918] font-bold">
            <span>Rain Probability (&ge; 2.5 mm):</span>
            <strong className="text-sky-800 font-extrabold">
              {formatPercent(data.rain_prob)}
            </strong>
          </div>
        </div>

        {/* Temperature & Micro-Climate Card */}
        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d5e8d5] text-[#166534] flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#0f2918] uppercase tracking-wider">
                Temperature & Terrain
              </span>
            </div>
            <span className="text-xs text-[#0f2918] font-bold">
              Elev: {data.elevation_m}m
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-2xl md:text-3xl font-black text-[#0f2918]">
                {formatTemp(data.corrected_temp)}
              </div>
              <div className="text-xs text-[#166534] mt-0.5 font-extrabold">
                Terrain Corrected
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-[#2b4c34]/70">
                Raw: {formatTemp(data.baseline_temp)}
              </div>
              <div className="text-xs font-extrabold text-[#0f2918] mt-0.5">
                Δ {tempDiff > 0 ? `+${tempDiff.toFixed(1)}` : tempDiff.toFixed(1)} °C
              </div>
            </div>
          </div>

          {/* Micro-Climate Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[#dbe8db] border border-[#c3d6c4] flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-700 shrink-0" />
              <div>
                <div className="text-[10px] text-[#166534] font-black uppercase">Humidity</div>
                <div className="text-xs font-black text-[#0f2918]">
                  {data.humidity_proxy}%
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#dbe8db] border border-[#c3d6c4] flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#166534] shrink-0" />
              <div>
                <div className="text-[10px] text-[#166534] font-black uppercase">Wind</div>
                <div className="text-xs font-black text-[#0f2918]">
                  {data.wind_kmh} km/h
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#0f2918] pt-2 border-t border-[#c3d6c4] flex items-center gap-1.5 font-bold">
            <Compass className="w-3.5 h-3.5 text-[#166534]" />
            <span>Resolution: <strong className="font-extrabold text-[#166534]">Panchayat / 1 km Scale</strong></span>
          </div>

        </div>
      </div>

      {/* Trust Reason Banner */}
      <div className="p-3.5 rounded-xl bg-[#d7ead9] border border-[#a7d4ac] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
        <div className="text-xs text-[#0f2918] font-medium leading-relaxed">
          <strong className="font-extrabold text-[#166534]">AI Correction Insight: </strong>
          {data.trust_reason}
        </div>
      </div>
    </div>
  );
};
