"use client";

import React from "react";
import { ModelComparisonItem } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ModelComparisonTableProps {
  data: ModelComparisonItem[];
}

export const ModelComparisonTable: React.FC<ModelComparisonTableProps> = ({ data }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-extrabold text-[#0f2918]">
            {language === "mr"
              ? "पारदर्शक मॉडेल मूल्यमापन व अचूकता स्कोरकार्ड"
              : "Transparent Model Benchmark & Scorecard"}
          </h3>
          <p className="text-xs text-[#2b4c34] font-bold">
            {language === "mr"
              ? "महाराष्ट्र, कर्नाटक व तेलंगणामधील १३,७८० स्वतंत्र चाचणी नोंदींवर पडताळणी"
              : "Strict chronological evaluation on 13,780 unseen test pairs across Maharashtra, Karnataka, and Telangana"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#d7ead9] text-[#166534] font-extrabold border border-[#a7d4ac]">
            <CheckCircle className="w-3.5 h-3.5" />
            {language === "mr" ? "LightGBM प्रणाली सक्रिय" : "LightGBM Selected for Production"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-[#0f2918] border-collapse">
          <thead>
            <tr className="bg-[#e6efe6] border-b border-[#c8d9c8] text-[#166534] font-black uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">{language === "mr" ? "मॉडेल प्रकार" : "Model Architecture"}</th>
              <th className="py-3 px-3">{language === "mr" ? "अपेक्षित निकष" : "Target"}</th>
              <th className="py-3 px-3">{language === "mr" ? "MAE (मिमी) ↓" : "MAE (mm) ↓"}</th>
              <th className="py-3 px-3">{language === "mr" ? "RMSE (मिमी) ↓" : "RMSE (mm) ↓"}</th>
              <th className="py-3 px-3">{language === "mr" ? "बायस (मिमी)" : "Bias (mm)"}</th>
              <th className="py-3 px-3">{language === "mr" ? "CSI अचूकता ↑" : "CSI (Threat) ↑"}</th>
              <th className="py-3 px-3">{language === "mr" ? "प्रशिक्षण वेळ" : "Train Time"}</th>
              <th className="py-3 px-3">{language === "mr" ? "स्थिती" : "Benchmark Status"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c8d9c8]">
            {data.map((row, idx) => {
              const isBest = row.model.includes("LightGBM Regressor");
              const isBase = row.model.includes("Baseline 1");

              return (
                <tr
                  key={idx}
                  className={`hover:bg-[#eaf1ea] transition-colors ${
                    isBest ? "bg-[#d7ead9] font-black text-[#0f2918]" : ""
                  }`}
                >
                  <td className="py-3 px-3 font-extrabold flex items-center gap-1.5">
                    {isBest && <span className="w-2 h-2 rounded-full bg-[#166534] shrink-0" />}
                    <span>{row.model}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#2b4c34]">
                    {row.target}
                  </td>
                  <td className="py-3 px-3 font-black text-[#0f2918]">
                    {row.MAE !== null ? `${row.MAE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34] font-bold">
                    {row.RMSE !== null ? `${row.RMSE.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34] font-bold">
                    {row.bias !== null ? `${row.bias.toFixed(4)}` : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#166534] font-black">
                    {row.CSI !== null ? row.CSI.toFixed(3) : "—"}
                  </td>
                  <td className="py-3 px-3 text-[#2b4c34] font-mono text-[11px]">
                    {row.training_time_sec.toFixed(2)}s
                  </td>
                  <td className="py-3 px-3">
                    {isBase ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e4eee4] text-[#2b4c34] border border-[#c3d6c4]">
                        {language === "mr" ? "मूळ मॉडेल" : "BASELINE"}
                      </span>
                    ) : row.status === "IMPROVED" ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                        {language === "mr" ? "सुधारित" : "IMPROVED"}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-800 border border-rose-200">
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

      <div className="p-3 bg-[#e6efe6] rounded-xl border border-[#c3d6c4] text-[11px] text-[#2b4c34] flex flex-wrap items-center justify-between gap-2 font-bold">
        <span>
          {language === "mr"
            ? "* Critical Success Index (CSI) = २.५ मिमी पावसासाठी अचूक अंदाज प्रमाण."
            : "* Critical Success Index (CSI) = Hits / (Hits + False Alarms + Misses) for rain threshold ≥ 2.5 mm."}
        </span>
        <span className="font-black text-[#166534]">
          {language === "mr"
            ? "संपूर्ण पारदर्शक ऐतिहासिक पडताळणी"
            : "Evaluated on strictly unseen chronological test split."}
        </span>
      </div>
    </div>
  );
};
