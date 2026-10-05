import React from "react";
import { ModelHealth } from "@/lib/types";
import { Activity, Database, CheckCircle2, ShieldCheck, Server, Radio } from "lucide-react";

interface ModelHealthCardProps {
  health: ModelHealth;
}

export const ModelHealthCard: React.FC<ModelHealthCardProps> = ({ health }) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              System & Model Operational Health
            </h3>
            <p className="text-xs text-slate-500">
              Pipeline status, telemetry and validation metrics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            System Operational ({health.status})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Model Architecture</span>
          <div className="text-sm font-bold text-slate-900 truncate" title={health.model_type}>
            {health.model_type.split("+")[0]}
          </div>
          <span className="text-[10px] text-teal-700 font-mono">v1.0 (Quantile Calibrated)</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Historical Skill Score</span>
          <div className="text-sm font-bold text-emerald-700">
            {health.historical_skill}
          </div>
          <span className="text-[10px] text-slate-500">Unseen test holdout</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Data Records Processed</span>
          <div className="text-sm font-bold text-slate-900">
            59,280 Pairs
          </div>
          <span className="text-[10px] text-slate-500">{health.data_coverage} Coverage</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Calibrated Hubs</span>
          <div className="text-sm font-bold text-slate-900">
            13 Panchayats
          </div>
          <span className="text-[10px] text-slate-500">3 Contrast Zones</span>
        </div>
      </div>
    </div>
  );
};
