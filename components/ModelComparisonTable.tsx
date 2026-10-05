"use client";

import React from "react";
import { ModelComparisonItem } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

interface ModelComparisonTableProps {
  data: ModelComparisonItem[];
}

export const ModelComparisonTable: React.FC<ModelComparisonTableProps> = ({ data }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#0f2918]">
            {tx(language, "modelBenchTitle")}
          </h3>
          <p className="text-xs text-[#2b4c34]">
            {tx(language, "modelBenchSub")}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] font-semibold border border-[#a7d4ac]">
            <CheckCircle className="w-3.5 h-3.5" />
            {tx(language, "lightgbmProd")}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#2b4c34] border-collapse">
          <thead>
            <tr className="bg-[#e6efe6] border-b border-[#c3d6c4] text-[#0f2918] font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">{tx(language, "colModelArch")}</th>
              <th className="py-3 px-3">{tx(language, "colTarget")}</th>
              <th className="py-3 px-3">MAE (mm) ↓</th>
              <th className="py-3 px-3">RMSE (mm) ↓</th>
              <th className="py-3 px-3">Bias (mm)</th>
              <th className="py-3 px-3">CSI (Threat) ↑</th>
              <th className="py-3 px-3">{tx(language, "colTrainTime")}</th>
              <th className="py-3 px-3">{tx(language, "colBenchStatus")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4ede5]">
            {data.map((row, idx) => {
              const isBest = row.model.includes("LightGBM Regressor");
              const isBase = row.model.includes("Baseline 1");

              return (
                <tr
                  key={idx}
                  className={`hover:bg-[#f4f8f4]/80 transition-colors ${
                    isBest ? "bg-[#d7ead9]/50 font-semibold text-[#0f2918]" : ""
                  }`}
                >
                  <td className="py-3 px-3 font-medium flex items-center gap-1.5">
                    {isBest && <span className="w-2 h-2 rounded-full bg-[#166534] shrink-0" />}
                    <span>{row.model}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#2b4c34]">
                    {row.target}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#0f2918]">
                    {row.MAE !== null ? `${row.MAE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34]">
                    {row.RMSE !== null ? `${row.RMSE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34]">
                    {row.bias !== null ? `${row.bias.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34] font-semibold">
                    {row.CSI !== null ? row.CSI.toFixed(3) : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34] font-mono text-[11px]">
                    {row.training_time_sec.toFixed(2)}s
                  </td>
                  <td className="py-3 px-3">
                    {isBase ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e4eee4] text-[#2b4c34] border border-[#c3d6c4]">
                        {language === "mr" ? "मूळ बेसलाइन" : language === "hi" ? "आधार बेसलाइन" : "BASELINE"}
                      </span>
                    ) : row.status === "IMPROVED" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                        {language === "mr" ? "सुधारित" : language === "hi" ? "सुधारित" : "IMPROVED"}
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

      <div className="p-3 bg-[#e6efe6] rounded-xl border border-[#c3d6c4] text-[11px] text-[#2b4c34] flex flex-wrap items-center justify-between gap-2">
        <span>
          {language === "mr"
            ? "* क्रिटिकल सक्सेस इंडेक्स (CSI) = पाऊस निकष ≥ २.५ मिमी."
            : language === "hi"
            ? "* क्रिटिकल सक्सेस इंडेक्स (CSI) = वर्षा सीमा ≥ 2.5 मिमी."
            : "* Critical Success Index (CSI) = Hits / (Hits + False Alarms + Misses) for rain threshold ≥ 2.5 mm."}
        </span>
        <span className="font-semibold text-[#166534]">
          {language === "mr"
            ? "कडक कालक्रमानुसार अप्रकाशित चाचणी डेटावर पडताळणी."
            : language === "hi"
            ? "सख्त कालानुक्रमिक अदृश्य परीक्षण डेटा पर मूल्यांकन।"
            : "Evaluated on strictly unseen chronological test split."}
        </span>
      </div>
    </div>
  );
};
