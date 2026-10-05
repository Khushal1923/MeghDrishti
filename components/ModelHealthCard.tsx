"use client";

import React from "react";
import { ModelHealth } from "@/lib/types";
import { Activity } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

interface ModelHealthCardProps {
  health: ModelHealth;
}

export const ModelHealthCard: React.FC<ModelHealthCardProps> = ({ health }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#c8d9c8]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#d5e8d5] text-[#166534] flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0f2918]">
              {tx(language, "sysHealthTitle")}
            </h3>
            <p className="text-xs text-[#2b4c34]">
              {tx(language, "sysHealthSub")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-[#166534] bg-[#d7ead9] px-2.5 py-1 rounded-full border border-[#a7d4ac]">
            {tx(language, "sysOperational")} ({health.status})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold block">{tx(language, "colModelArch")}</span>
          <div className="text-sm font-bold text-[#0f2918] truncate" title={health.model_type}>
            {health.model_type.split("+")[0]}
          </div>
          <span className="text-[10px] text-[#166534] font-mono">v1.0 (Quantile Calibrated)</span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold block">{tx(language, "histSkillScore")}</span>
          <div className="text-sm font-bold text-[#166534]">
            {health.historical_skill}
          </div>
          <span className="text-[10px] text-[#2b4c34]">{tx(language, "unseenHoldout")}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold block">{tx(language, "dataRecordsProc")}</span>
          <div className="text-sm font-bold text-[#0f2918]">
            {language === "mr" ? "५९,२८० जोड्या" : language === "hi" ? "59,280 जोड़े" : "59,280 Pairs"}
          </div>
          <span className="text-[10px] text-[#2b4c34]">{health.data_coverage} {tx(language, "coverageLabel")}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold block">{tx(language, "calibratedHubs")}</span>
          <div className="text-sm font-bold text-[#0f2918]">
            {language === "mr" ? "१३ ग्रामपंचायती" : language === "hi" ? "13 ग्राम पंचायतें" : "13 Panchayats"}
          </div>
          <span className="text-[10px] text-[#2b4c34]">{tx(language, "contrastZones")}</span>
        </div>
      </div>
    </div>
  );
};
