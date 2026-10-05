"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { Sliders, Shield, Save, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage();
  const [wSkill, setWSkill] = useState(0.40);
  const [wCoverage, setWCoverage] = useState(0.25);
  const [wDensity, setWDensity] = useState(0.20);
  const [wQuality, setWQuality] = useState(0.15);
  const [lapseRate, setLapseRate] = useState(0.0065);
  const [rainThreshold, setRainThreshold] = useState(2.5);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Trust Score Formulation Weights */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-base">
            <Sliders className="w-5 h-5 text-[#166534]" />
            <span>{language === "mr" ? "विश्वासार्हता गुण भार (Trust Score Weights)" : "Trust Score Weights Formulation"}</span>
          </div>
          <p className="text-xs text-[#2b4c34] font-medium">
            {language === "mr"
              ? "एकूण विश्वास = w_H × ऐतिहासिक अचूकता + w_C × व्याप्ती + w_D × डेटा घनता + w_Q × डेटा गुणवत्ता (एकूण बेरीज = १.०)"
              : "Trust = w_H × Historical Skill + w_C × Coverage + w_D × Data Density + w_Q × Data Quality (Must sum to 1.0)"}
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>{language === "mr" ? "ऐतिहासिक अचूकता भार (w_H):" : "Historical Skill Weight (w_H):"}</span>
                <span className="font-mono text-[#166534] font-black">{(wSkill * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={wSkill}
                onChange={(e) => setWSkill(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>{language === "mr" ? "पडताळणी व्याप्ती भार (w_C):" : "Validation Coverage Weight (w_C):"}</span>
                <span className="font-mono text-[#166534] font-black">{(wCoverage * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={wCoverage}
                onChange={(e) => setWCoverage(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>{language === "mr" ? "डेटा घनता भार (w_D):" : "Data Density Weight (w_D):"}</span>
                <span className="font-mono text-[#166534] font-black">{(wDensity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={wDensity}
                onChange={(e) => setWDensity(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#0f2918] mb-1">
                <span>{language === "mr" ? "डेटा गुणवत्ता भार (w_Q):" : "Data Quality Weight (w_Q):"}</span>
                <span className="font-mono text-[#166534] font-black">{(wQuality * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={wQuality}
                onChange={(e) => setWQuality(parseFloat(e.target.value))}
                className="w-full accent-[#166534]"
              />
            </div>
          </div>
        </div>

        {/* Physical & Meteorological Constants */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#0f2918] font-extrabold text-base">
            <Shield className="w-5 h-5 text-[#166534]" />
            <span>{language === "mr" ? "हवामान व भौतिक स्थिरांक (Meteorological Constants)" : "Meteorological Constants"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-[#0f2918] block">
                {language === "mr" ? "पाऊस वर्गीकरण निकष (मिमी)" : "Rain Event Classification Threshold (mm)"}
              </label>
              <input
                type="number"
                step="0.5"
                value={rainThreshold}
                onChange={(e) => setRainThreshold(parseFloat(e.target.value))}
                className="w-full bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-2 font-mono text-xs text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
              <span className="text-[10px] text-[#2b4c34] font-medium block">
                {language === "mr" ? "IMD मानक: २.५ मिमी / दिवस" : "IMD Standard: 2.5 mm / day"}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#0f2918] block">
                {language === "mr" ? "पर्यावरणीय लॅप्स-रेट (Γ °C / मीटर)" : "Environmental Lapse Rate (Γ in °C / meter)"}
              </label>
              <input
                type="number"
                step="0.0005"
                value={lapseRate}
                onChange={(e) => setLapseRate(parseFloat(e.target.value))}
                className="w-full bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-2 font-mono text-xs text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
              <span className="text-[10px] text-[#2b4c34] font-medium block">
                {language === "mr" ? "मानक: ०.००६५ °C / मी (६.५ °C / किमी)" : "Standard: 0.0065 °C / m (6.5 °C / km)"}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#166534] hover:bg-[#15803d] text-white font-extrabold text-xs shadow-xs transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === "mr" ? "यशस्वीरित्या जतन झाले" : "Saved Successfully"}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{language === "mr" ? "कॅलिब्रेशन सेटिंग्ज सेव्ह करा" : "Save Calibration Settings"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
