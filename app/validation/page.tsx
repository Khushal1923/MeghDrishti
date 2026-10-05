"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelComparisonTable } from "@/components/ModelComparisonTable";
import { fetchModelComparison, fetchScorecard } from "@/lib/api";
import { ModelComparisonItem, ScorecardItem } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";

export default function AccuracyValidationPage() {
  const { language, setLanguage } = useLanguage();
  const [modelData, setModelData] = useState<ModelComparisonItem[]>([]);
  const [scorecard, setScorecard] = useState<ScorecardItem[]>([]);

  useEffect(() => {
    fetchModelComparison().then(setModelData);
    fetchScorecard().then(setScorecard);
  }, []);

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
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
              <h3 className="text-base font-extrabold text-[#0f2918]">
                {language === "mr" ? "विभागीय व दिवसानिहाय अचूकता स्कोरकार्ड" : "Zone & Lead-Time Skill Scorecard"}
              </h3>
              <p className="text-xs text-[#2b4c34] font-bold">
                {language === "mr"
                  ? "कौशल्य गुण (Skill Score) = १ - (मॉडेल MAE / बेसलाइन MAE). जास्त गुण म्हणजे अधिक अचूकता."
                  : "Skill = 1 - (Model MAE / Baseline MAE). Higher positive score indicates superior error reduction."}
              </p>
            </div>
            <span className="text-xs font-black px-3 py-1 bg-[#d7ead9] text-[#166534] rounded-full border border-[#a7d4ac]">
              {language === "mr" ? "१२ मूल्यांकन गट" : "12 Stratified Evaluation Cohorts"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0f2918] border-collapse">
              <thead>
                <tr className="bg-[#e6efe6] border-b border-[#c8d9c8] text-[#166534] font-black uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">{language === "mr" ? "विभाग / राज्य" : "Zone / State"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "अंदाज दिवस" : "Lead Time"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "ऋतू" : "Season"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "नमुना संख्या" : "Sample Count"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "मूळ MAE (मिमी)" : "Raw MAE (mm)"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "AI MAE (मिमी)" : "Model MAE (mm)"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "कौशल्य गुण ↑" : "Skill Score ↑"}</th>
                  <th className="py-2.5 px-3">{language === "mr" ? "स्थिती" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c8d9c8]">
                {scorecard.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#eaf1ea] transition-colors">
                    <td className="py-2.5 px-3 font-extrabold text-[#0f2918]">{row.zone}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#166534]">
                      {language === "mr" ? `+${row.lead_days} दिवस` : `+${row.lead_days}d Lead`}
                    </td>
                    <td className="py-2.5 px-3 text-[#2b4c34] font-bold">
                      {row.season === "Monsoon" ? (language === "mr" ? "पावसाळा" : "Monsoon") : row.season}
                    </td>
                    <td className="py-2.5 px-3 text-[#2b4c34] font-bold">{row.sample_count}</td>
                    <td className="py-2.5 px-3 font-bold text-rose-700">{row.baseline_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-black text-[#166534]">{row.model_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-black text-[#166534]">
                      +{(row.skill_score * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                        {language === "mr" ? "सुधारित" : row.status}
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
