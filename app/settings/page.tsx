"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { Settings, Sliders, Shield, Save, Check } from "lucide-react";

export default function SettingsPage() {
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
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title="Settings & Platform Calibration"
        description="Configure trust score weights, meteorological thresholds, and lapse-rate physics parameters."
      />

      <div className="px-6 space-y-6 max-w-4xl">
        {/* Trust Score Formulation Weights */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Sliders className="w-5 h-5 text-teal-700" />
            <span>Trust Score Weights Formulation</span>
          </div>
          <p className="text-xs text-slate-500">
            Trust = w_H &times; Historical Skill + w_C &times; Coverage + w_D &times; Data Density + w_Q &times; Data Quality (Must sum to 1.0)
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Historical Skill Weight (w_H):</span>
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
                <span>Validation Coverage Weight (w_C):</span>
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
                <span>Data Density Weight (w_D):</span>
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
                <span>Data Quality Weight (w_Q):</span>
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
            <span>Meteorological Constants</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Rain Event Classification Threshold (mm)
              </label>
              <input
                type="number"
                step="0.5"
                value={rainThreshold}
                onChange={(e) => setRainThreshold(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[10px] text-slate-400 block">IMD Standard: 2.5 mm / day</span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Environmental Lapse Rate (Γ in °C / meter)
              </label>
              <input
                type="number"
                step="0.0005"
                value={lapseRate}
                onChange={(e) => setLapseRate(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <span className="text-[10px] text-slate-400 block">Standard: 0.0065 °C / m (6.5 °C / km)</span>
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
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Calibration Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
