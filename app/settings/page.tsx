"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { Settings, Sliders, Shield, Save, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SettingsPage() {
  const { language } = useLanguage();
  const [wSkill, setWSkill] = useState(0.40);
  const [wCoverage, setWCoverage] = useState(0.25);
  const [wDensity, setWDensity] = useState(0.20);
  const [wQuality, setWQuality] = useState(0.15);
  const [lapseRate, setLapseRate] = useState(0.0065);
  const [rainThreshold, setRainThreshold] = useState(2.5);
  const [saved, setSaved] = useState(false);

  const t = (mrText: string, hiText: string, enText: string) => {
    if (language === "mr") return mrText;
    if (language === "hi") return hiText;
    return enText;
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title={t(
          "सेटिंग्ज व प्लॅटफॉर्म कॅलिब्रेशन",
          "सेटिंग्स और प्लेटफ़ॉर्म कैलिब्रेशन",
          "Settings & Platform Calibration"
        )}
        description={t(
          "विश्वास स्कोअर वेट्स, हवामानशास्त्र निकष आणि लॅप्स-रेट भौतिकी पॅरामीटर्स सेट करा.",
          "विश्वास स्कोर वेट्स, मौसम संबंधी सीमाएं और लैप्स-रेट भौतिकी पैरामीटर कॉन्फ़िगर करें।",
          "Configure trust score weights, meteorological thresholds, and lapse-rate physics parameters."
        )}
      />

      <div className="px-6 space-y-6 max-w-4xl">
        {/* Trust Score Formulation Weights */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Sliders className="w-5 h-5 text-teal-700" />
            <span>
              {t(
                "विश्वास स्कोअर वेट्स सूत्र रचना",
                "विश्वास स्कोर वेट्स सूत्र निर्धारण",
                "Trust Score Weights Formulation"
              )}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {t(
              "Trust = w_H × ऐतिहासिक कौशल्य + w_C × व्याप्ती + w_D × डेटा घनता + w_Q × डेटा गुणवत्ता (एकूण बेरीज १.० असणे आवश्यक)",
              "Trust = w_H × ऐतिहासिक कौशल + w_C × कवरेज + w_D × डेटा घनत्व + w_Q × डेटा गुणवत्ता (कुल योग 1.0 होना चाहिए)",
              "Trust = w_H × Historical Skill + w_C × Coverage + w_D × Data Density + w_Q × Data Quality (Must sum to 1.0)"
            )}
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>
                  {t(
                    "ऐतिहासिक कौशल्य भार (w_H):",
                    "ऐतिहासिक कौशल भार (w_H):",
                    "Historical Skill Weight (w_H):"
                  )}
                </span>
                <span className="font-mono text-teal-700">{(wSkill * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={wSkill}
                onChange={(e) => setWSkill(parseFloat(e.target.value))}
                className="w-full accent-teal-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>
                  {t(
                    "पडताळणी व्याप्ती भार (w_C):",
                    "सत्यापन कवरेज भार (w_C):",
                    "Validation Coverage Weight (w_C):"
                  )}
                </span>
                <span className="font-mono text-teal-700">{(wCoverage * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={wCoverage}
                onChange={(e) => setWCoverage(parseFloat(e.target.value))}
                className="w-full accent-teal-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>
                  {t(
                    "डेटा घनता भार (w_D):",
                    "डेटा घनत्व भार (w_D):",
                    "Data Density Weight (w_D):"
                  )}
                </span>
                <span className="font-mono text-teal-700">{(wDensity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={wDensity}
                onChange={(e) => setWDensity(parseFloat(e.target.value))}
                className="w-full accent-teal-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>
                  {t(
                    "डेटा गुणवत्ता भार (w_Q):",
                    "डेटा गुणवत्ता भार (w_Q):",
                    "Data Quality Weight (w_Q):"
                  )}
                </span>
                <span className="font-mono text-teal-700">{(wQuality * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={wQuality}
                onChange={(e) => setWQuality(parseFloat(e.target.value))}
                className="w-full accent-teal-700"
              />
            </div>
          </div>
        </div>

        {/* Physical & Meteorological Constants */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Shield className="w-5 h-5 text-teal-700" />
            <span>
              {t("हवामानशास्त्रीय स्थिरांक", "मौसम संबंधी स्थिरांक", "Meteorological Constants")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                {t(
                  "पाऊस घटना वर्गीकरण मर्यादा (मिमी)",
                  "बारिश घटना वर्गीकरण सीमा (मिमी)",
                  "Rain Event Classification Threshold (mm)"
                )}
              </label>
              <input
                type="number"
                step="0.5"
                value={rainThreshold}
                onChange={(e) => setRainThreshold(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[10px] text-slate-400 block">
                {t("IMD मानक: २.५ मिमी / दिवस", "IMD मानक: 2.5 मिमी / दिन", "IMD Standard: 2.5 mm / day")}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                {t(
                  "पर्यावरणीय लॅप्स दर (Γ अंश से / मीटर)",
                  "पर्यावरणीय लैप्स दर (Γ डिग्री से / मीटर)",
                  "Environmental Lapse Rate (Γ in °C / meter)"
                )}
              </label>
              <input
                type="number"
                step="0.0005"
                value={lapseRate}
                onChange={(e) => setLapseRate(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[10px] text-slate-400 block">
                {t(
                  "मानक: ०.००६५ °C / मी (६.५ °C / किमी)",
                  "मानक: 0.0065 °C / मी (6.5 °C / किमी)",
                  "Standard: 0.0065 °C / m (6.5 °C / km)"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>
                  {t("यशस्वीरित्या जतन झाले", "सफलतापूर्वक सहेजा गया", "Saved Successfully")}
                </span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  {t(
                    "कॅलिब्रेशन सेटिंग्ज जतन करा",
                    "कैलिब्रेशन सेटिंग्स सहेजें",
                    "Save Calibration Settings"
                  )}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
