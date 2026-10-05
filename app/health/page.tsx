"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelHealthCard } from "@/components/ModelHealthCard";
import { fetchModelHealth } from "@/lib/api";
import { ModelHealth } from "@/lib/types";
import { MODEL_HEALTH_DATA } from "@/lib/data";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

export default function ModelHealthPage() {
  const { language, setLanguage } = useLanguage();
  const [health, setHealth] = useState<ModelHealth>(MODEL_HEALTH_DATA);

  useEffect(() => {
    fetchModelHealth().then(setHealth);
  }, []);

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        title={tx(language, "healthTitle")}
        description={tx(language, "healthDesc")}
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Model Health Main Card */}
        <ModelHealthCard health={health} />

        {/* Diagnostic Status Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0f2918] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
              {tx(language, "dataQualityTitle")}
            </h3>

            <div className="space-y-2.5 text-xs text-[#2b4c34]">
              {[
                { label: tx(language, "negRainCheck"),    value: tx(language, "passed") },
                { label: tx(language, "tempRangeCheck"),  value: tx(language, "passed") },
                { label: tx(language, "dupTimestampCheck"), value: tx(language, "passed") },
                { label: tx(language, "featureLeakCheck"), value: tx(language, "strictChronHoldout") },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                  <span>{item.label}</span>
                  <strong className="text-[#166534]">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0f2918] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#166534]" />
              {tx(language, "safeguardsTitle")}
            </h3>

            <div className="space-y-2.5 text-xs text-[#2b4c34]">
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-bold text-[#0f2918] block">{tx(language, "baselinePolicy")}</span>
                {tx(language, "baselinePolicyBody")}
              </div>
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-bold text-[#0f2918] block">{tx(language, "confidenceThresh")}</span>
                {tx(language, "confidenceBody")}
              </div>
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-bold text-[#0f2918] block">{tx(language, "inferenceLatency")}</span>
                {tx(language, "inferenceBody")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
