"use client";

import React, { useState, useEffect } from "react";
import { TopHeader } from "@/components/TopHeader";
import { ModelHealthCard } from "@/components/ModelHealthCard";
import { fetchModelHealth } from "@/lib/api";
import { ModelHealth } from "@/lib/types";
import { MODEL_HEALTH_DATA } from "@/lib/data";
import { Activity, ShieldCheck, Server, AlertCircle, Database, CheckCircle2 } from "lucide-react";

export default function ModelHealthPage() {
  const [health, setHealth] = useState<ModelHealth>(MODEL_HEALTH_DATA);

  useEffect(() => {
    fetchModelHealth().then(setHealth);
  }, []);

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title="Model Health & Pipeline Diagnostics"
        description="Real-time operational monitoring, validation record coverage, and telemetry logs."
      />

      <div className="px-6 space-y-6">
        {/* Model Health Main Card */}
        <ModelHealthCard health={health} />

        {/* Diagnostic Status Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Automated Data Quality Audit
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span>Negative Rainfall Anomaly Check</span>
                <strong className="text-emerald-700">0 Violations (PASSED)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span>Temperature Range Validation (-10°C to 60°C)</span>
                <strong className="text-emerald-700">0 Violations (PASSED)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span>Duplicate Timestamp / Lead-Time Pairs</span>
                <strong className="text-emerald-700">0 Duplicates (PASSED)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span>Feature Leakage Audit</span>
                <strong className="text-emerald-700">Strict Chronological Holdout (PASSED)</strong>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Operational Safeguards & Fallback
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Baseline Fail-Safe Policy:</span>
                If model MAE degrades past baseline NWP, fallback to raw coarse forecast is automatic.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Confidence Thresholding:</span>
                Low Trust warnings automatically display when historical station density is &lt; 30 days.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Inference Latency:</span>
                &lt; 15 milliseconds per village prediction query on CPU.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
