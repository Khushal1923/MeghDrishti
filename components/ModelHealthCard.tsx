"use client";

import React from "react";
import { ModelHealth } from "@/lib/types";
import { Activity } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

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
            <h3 className="text-base font-extrabold text-[#0f2918]">
              {language === "mr" ? "प्रणाली व मॉडेल कार्यक्षमता स्थिती" : "System & Model Operational Health"}
            </h3>
            <p className="text-xs text-[#2b4c34] font-medium">
              {language === "mr" ? "पाइपलाइन स्थिती, आकडेवारी व पडताळणी निर्देशांक" : "Pipeline status, telemetry and validation metrics"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#166534]"></span>
          </span>
          <span className="text-xs font-black text-[#166534] bg-[#d7ead9] px-3 py-1 rounded-full border border-[#a7d4ac]">
            {language === "mr" ? "प्रणाली कार्यरत (उत्कृष्ट)" : `System Operational (${health.status})`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold">
            {language === "mr" ? "मॉडेल आर्किटेक्चर" : "Model Architecture"}
          </span>
          <div className="text-sm font-black text-[#0f2918] truncate" title={health.model_type}>
            {health.model_type.split("+")[0]}
          </div>
          <span className="text-[10px] text-[#166534] font-mono font-bold">
            {language === "mr" ? "v१.० (क्वांटाइल कॅलिब्रेटेड)" : "v1.0 (Quantile Calibrated)"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold">
            {language === "mr" ? "ऐतिहासिक अचूकता गुण" : "Historical Skill Score"}
          </span>
          <div className="text-sm font-black text-[#166534]">
            {health.historical_skill}
          </div>
          <span className="text-[10px] text-[#2b4c34] font-medium">
            {language === "mr" ? "स्वतंत्र चाचणी पडताळणी" : "Unseen test holdout"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold">
            {language === "mr" ? "प्रक्रिया केलेला डेटा" : "Data Records Processed"}
          </span>
          <div className="text-sm font-black text-[#0f2918]">
            {language === "mr" ? "५९,२८० नोंदी" : "59,280 Pairs"}
          </div>
          <span className="text-[10px] text-[#2b4c34] font-medium">
            {health.data_coverage} {language === "mr" ? "व्याप्ती" : "Coverage"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <span className="text-[11px] text-[#166534] font-bold">
            {language === "mr" ? "कॅलिब्रेटेड ग्रामपंचायती" : "Calibrated Hubs"}
          </span>
          <div className="text-sm font-black text-[#0f2918]">
            {language === "mr" ? "१३ ग्रामपंचायती" : "13 Panchayats"}
          </div>
          <span className="text-[10px] text-[#2b4c34] font-medium">
            {language === "mr" ? "३ कृषी-हवामान विभाग" : "3 Contrast Zones"}
          </span>
        </div>
      </div>
    </div>
  );
};
