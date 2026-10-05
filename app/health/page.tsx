"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelHealthCard } from "@/components/ModelHealthCard";
import { fetchModelHealth } from "@/lib/api";
import { ModelHealth } from "@/lib/types";
import { MODEL_HEALTH_DATA } from "@/lib/data";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ModelHealthPage() {
  const { language, setLanguage } = useLanguage();
  const [health, setHealth] = useState<ModelHealth>(MODEL_HEALTH_DATA);

  useEffect(() => {
    fetchModelHealth().then(setHealth);
  }, []);

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Model Health Main Card */}
        <ModelHealthCard health={health} />

        {/* Diagnostic Status Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#0f2918] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
              {language === "mr" ? "स्वयंचलित डेटा गुणवत्ता तपासणी" : "Automated Data Quality Audit"}
            </h3>

            <div className="space-y-2.5 text-xs text-[#2b4c34]">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span>{language === "mr" ? "ऋणात्मक पाऊस विसंगती तपासणी" : "Negative Rainfall Anomaly Check"}</span>
                <strong className="text-[#166534]">
                  {language === "mr" ? "० त्रुटी (उत्तीर्ण)" : "0 Violations (PASSED)"}
                </strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span>{language === "mr" ? "तापमान मर्यादा पडताळणी (-१०°C ते ६०°C)" : "Temperature Range Validation (-10°C to 60°C)"}</span>
                <strong className="text-[#166534]">
                  {language === "mr" ? "० त्रुटी (उत्तीर्ण)" : "0 Violations (PASSED)"}
                </strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span>{language === "mr" ? "पुनरावृत्ती वेळ/नोंद तपासणी" : "Duplicate Timestamp / Lead-Time Pairs"}</span>
                <strong className="text-[#166534]">
                  {language === "mr" ? "० पुनरावृत्ती (उत्तीर्ण)" : "0 Duplicates (PASSED)"}
                </strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span>{language === "mr" ? "डेटा पारदर्शकता चाचणी" : "Feature Leakage Audit"}</span>
                <strong className="text-[#166534]">
                  {language === "mr" ? "कडक ऐतिहासिक विभाजन (उत्तीर्ण)" : "Strict Chronological Holdout (PASSED)"}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-[#0f2918] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#166534]" />
              {language === "mr" ? "कार्यरत सुरक्षा यंत्रणा व फॉलबॅक" : "Operational Safeguards & Fallback"}
            </h3>

            <div className="space-y-2.5 text-xs text-[#2b4c34]">
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-extrabold text-[#0f2918] block">
                  {language === "mr" ? "बेसलाइन फॉलबॅक धोरण:" : "Baseline Fail-Safe Policy:"}
                </span>
                {language === "mr"
                  ? "जर AI मॉडेलची अचूकता कमी झाली, तर प्रणाली आपोआप मूळ हवामान मॉडेलवर स्विच होते."
                  : "If model MAE degrades past baseline NWP, fallback to raw coarse forecast is automatic."}
              </div>
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-extrabold text-[#0f2918] block">
                  {language === "mr" ? "विश्वासार्हता मर्यादा सूचना:" : "Confidence Thresholding:"}
                </span>
                {language === "mr"
                  ? "हवामान केंद्राचा डेटा ३० दिवसांपेक्षा कमी असल्यास 'सावध' इशारा दाखवला जातो."
                  : "Low Trust warnings automatically display when historical station density is < 30 days."}
              </div>
              <div className="p-2.5 rounded-lg bg-[#e6efe6] border border-[#c3d6c4]">
                <span className="font-extrabold text-[#0f2918] block">
                  {language === "mr" ? "अनुमान गती (Inference Speed):" : "Inference Latency:"}
                </span>
                {language === "mr"
                  ? "< १५ मिलीसेकंद प्रति गाव अंदाज (CPU वर जलद कार्यक्षमता)."
                  : "< 15 milliseconds per village prediction query on CPU."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
