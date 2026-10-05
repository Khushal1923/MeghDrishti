"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelComparisonTable } from "@/components/ModelComparisonTable";
import { fetchModelComparison, fetchScorecard } from "@/lib/api";
import { ModelComparisonItem, ScorecardItem } from "@/lib/types";
import { CheckCircle2, Award, Zap, Layers, BarChart2 } from "lucide-react";

export default function AccuracyValidationPage() {
  const [modelData, setModelData] = useState<ModelComparisonItem[]>([]);
  const [scorecard, setScorecard] = useState<ScorecardItem[]>([]);

  useEffect(() => {
    fetchModelComparison().then(setModelData);
    fetchScorecard().then(setScorecard);
  }, []);

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title="Accuracy & Research Validation Dashboard"
        description="Comprehensive evaluation across Raw NWP, Bias Correction, Ridge, Random Forest, and LightGBM models."
      />

      <div className="px-6 space-y-6">
        {/* Model Comparison Table */}
        <ModelComparisonTable data={modelData} />

        {/* Multi-Zone Scorecard Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Zone & Lead-Time Skill Scorecard
              </h3>
              <p className="text-xs text-slate-500">
                Skill = 1 - (Model MAE / Baseline MAE). Higher positive score indicates superior error reduction.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-200">
              12 Stratified Evaluation Cohorts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Zone / State</th>
                  <th className="py-2.5 px-3">Lead Time</th>
                  <th className="py-2.5 px-3">Season</th>
                  <th className="py-2.5 px-3">Sample Count</th>
                  <th className="py-2.5 px-3">Raw MAE (mm)</th>
                  <th className="py-2.5 px-3">Model MAE (mm)</th>
                  <th className="py-2.5 px-3">Skill Score ↑</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scorecard.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{row.zone}</td>
                    <td className="py-2.5 px-3 font-mono font-medium">+{row.lead_days}d Lead</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.season}</td>
                    <td className="py-2.5 px-3 text-slate-500">{row.sample_count}</td>
                    <td className="py-2.5 px-3 font-semibold text-rose-600">{row.baseline_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-bold text-teal-800">{row.model_mae_mm.toFixed(2)}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">
                      +{(row.skill_score * 100).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {row.status}
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
