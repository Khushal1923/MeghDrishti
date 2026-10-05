import React from "react";
import { ModelComparisonItem } from "@/lib/types";
import { CheckCircle, AlertCircle, Clock, Info } from "lucide-react";

interface ModelComparisonTableProps {
  data: ModelComparisonItem[];
}

export const ModelComparisonTable: React.FC<ModelComparisonTableProps> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Transparent Model Benchmark & Scorecard
          </h3>
          <p className="text-xs text-slate-500">
            Strict chronological evaluation on 13,780 unseen test pairs across Maharashtra, Karnataka, and Telangana
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            LightGBM Selected for Production
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Model Architecture</th>
              <th className="py-3 px-3">Target</th>
              <th className="py-3 px-3">MAE (mm) ↓</th>
              <th className="py-3 px-3">RMSE (mm) ↓</th>
              <th className="py-3 px-3">Bias (mm)</th>
              <th className="py-3 px-3">CSI (Threat) ↑</th>
              <th className="py-3 px-3">Train Time</th>
              <th className="py-3 px-3">Benchmark Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => {
              const isBest = row.model.includes("LightGBM Regressor");
              const isBase = row.model.includes("Baseline 1");

              return (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isBest ? "bg-teal-50/40 font-semibold text-slate-900" : ""
                  }`}
                >
                  <td className="py-3 px-3 font-medium flex items-center gap-1.5">
                    {isBest && <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />}
                    <span>{row.model}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                    {row.target}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {row.MAE !== null ? `${row.MAE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {row.RMSE !== null ? `${row.RMSE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {row.bias !== null ? `${row.bias.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-semibold">
                    {row.CSI !== null ? row.CSI.toFixed(3) : "—"}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {row.training_time_sec.toFixed(2)}s
                  </td>
                  <td className="py-3 px-3">
                    {isBase ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        BASELINE
                      </span>
                    ) : row.status === "IMPROVED" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        IMPROVED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {row.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>* Critical Success Index (CSI) = Hits / (Hits + False Alarms + Misses) for rain threshold &ge; 2.5 mm.</span>
        <span className="font-semibold text-teal-800">Evaluated on strictly unseen chronological test split.</span>
      </div>
    </div>
  );
};
