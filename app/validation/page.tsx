"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelComparisonTable } from "@/components/ModelComparisonTable";
import { fetchModelComparison, fetchScorecard } from "@/lib/api";
import { ModelComparisonItem, ScorecardItem } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

export default function AccuracyValidationPage() {
  const { language, setLanguage } = useLanguage();
  const [modelData, setModelData] = useState<ModelComparisonItem[]>([]);
  const [scorecard, setScorecard] = useState<ScorecardItem[]>([]);

  useEffect(() => {
    fetchModelComparison().then(setModelData);
    fetchScorecard().then(setScorecard);
  }, []);

  const getSeasonLabel = (season: string) => {
    if (season === "Monsoon") return tx(language, "seasonMonsoon");
    if (season === "Pre-Monsoon") return tx(language, "seasonPreMonsoon");
    if (season === "Winter") return tx(language, "seasonWinter");
    if (season === "Post-Monsoon") return tx(language, "seasonPostMonsoon");
    return season;
  };

  const getStatusLabel = (status: string) => {
    if (status === "PASS") return language === "mr" ? "उत्तीर्ण (PASS)" : language === "hi" ? "उत्तीर्ण (PASS)" : "PASS";
    return status;
  };

  const getLeadText = (days: number) => {
    if (language === "mr") return `+${days} दिवस`;
    if (language === "hi") return `+${days} दिन`;
    return `+${days}d Lead`;
  };

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        title={tx(language, "validationTitle")}
        description={tx(language, "validationDesc")}
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Model Comparison Table */}
        <ModelComparisonTable data={modelData} />

        {/* Multi-Zone Scorecard Table */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#0f2918]">
                {tx(language, "scorecardTitle")}
              </h3>
              <p className="text-xs text-[#2b4c34] mt-0.5">
                {tx(language, "scorecardSubtitle")}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-[#d7ead9] text-[#166534] rounded-full border border-[#a7d4ac]">
              {tx(language, "cohorts")}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2b4c34] border-collapse">
              <thead>
                <tr className="bg-[#e6efe6] border-b border-[#c3d6c4] text-[#0f2918] font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">{tx(language, "colZone")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colLead")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colSeason")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colSample")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colRawMAE")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colModelMAE")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colSkill")}</th>
                  <th className="py-2.5 px-3">{tx(language, "colStatus")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4ede5]">
                {scorecard.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f4f8f4]/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#0f2918]">{row.zone}</td>
                    <td className="py-2.5 px-3 font-mono font-medium">{getLeadText(row.lead_days)}</td>
                    <td className="py-2.5 px-3 text-[#2b4c34]">{getSeasonLabel(row.season)}</td>
                    <td className="py-2.5 px-3 text-[#2b4c34]">{row.sample_count}</td>
                    <td className="py-2.5 px-3 font-semibold text-rose-600">{row.baseline_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-bold text-[#166534]">{row.model_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-bold text-[#166534]">
                      +{(row.skill_score * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                        {getStatusLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
