"use client";

import React from "react";
import { TopHeader } from "@/components/TopHeader";
import { Database, Cpu, Layers, HardDrive, ShieldCheck, ArrowRight } from "lucide-react";

export default function DataAndModelsPage() {
  const datasets = [
    {
      title: "Coarse Forecast Data",
      source: "Open-Meteo NWP ECMWF IFS / GFS Model Run",
      coverage: "13 Panchayats across MH, KA, TS (2023–2025)",
      records: "59,280 Multi-Lead Forecast Rows",
      features: "Precipitation, Tmax, Tmin, Wind, Coarse Probability",
      status: "Active / Synced",
    },
    {
      title: "Ground Truth Observations",
      source: "IMD Gridded Daily Archive Reference",
      coverage: "Maharashtra, Karnataka, Telangana Stations",
      records: "11,856 Clean Observation Records",
      features: "Observed Rainfall (mm), Daily Mean/Max/Min Temp",
      status: "Verified / Clean",
    },
    {
      title: "Panchayat Geography & DEM",
      source: "Survey of India / NASA SRTM 30m DEM / ISRO Bhuvan",
      coverage: "Topography across Deccan Plateau & Western Ghats",
      records: "13 Panchayat Centroids & Terrain Vectors",
      features: "Elevation (m), Slope (deg), Aspect (deg)",
      status: "Calibrated",
    },
    {
      title: "Soil & Land Cover Data",
      source: "Soil Health Card Portal / ESA WorldCover 10m",
      coverage: "13 Micro-watersheds and Village Catchments",
      records: "13 Soil Composition & Land Use Fractions",
      features: "Clay %, Sand %, Silt %, pH, SOC %, Cropland %",
      status: "Integrated",
    },
  ];

  const models = [
    {
      name: "LightGBM Regressor (Production)",
      type: "Gradient Boosted Decision Trees (GBDT)",
      target: "Downscaled Observed Rainfall (mm)",
      metrics: "MAE: 0.630 mm | RMSE: 2.094 mm | CSI: 0.725",
      features: "27 Engineered Spatial & Climatological Features",
      status: "Active Production Engine",
    },
    {
      name: "LightGBM Rain Event Classifier",
      type: "Binary Logistic GBDT Classifier",
      target: "Rain Event Indicator (≥ 2.5 mm / day)",
      metrics: "Brier: 0.032 | ROC-AUC: 0.984 | POD: 0.815",
      features: "Calibrated Probabilistic Output P(Rain ≥ 2.5mm)",
      status: "Active Production Classifier",
    },
    {
      name: "LightGBM Temperature Model",
      type: "Terrain-Aware Lapse-Rate Regressor",
      target: "Observed Daily Mean Temperature (°C)",
      metrics: "MAE: 0.440 °C (vs Baseline 0.539 °C)",
      features: "Elevation difference, solar aspect, soil fractions",
      status: "Active Production Model",
    },
    {
      name: "Random Forest Regressor",
      type: "Bagging Ensemble (120 Trees)",
      target: "Observed Rainfall (mm)",
      metrics: "MAE: 0.903 mm | CSI: 0.680",
      features: "Tree-based benchmark comparison",
      status: "Evaluated Benchmark",
    },
    {
      name: "Ridge Regression",
      type: "L2-Regularized Linear Model",
      target: "Observed Rainfall (mm)",
      metrics: "MAE: 0.992 mm | CSI: 0.594",
      features: "Linear baseline comparison",
      status: "Evaluated Benchmark",
    },
  ];

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title="Data Lineage & Model Architecture Registry"
        description="Transparent inventory of datasets, feature pipelines, and trained machine learning models."
      />

      <div className="px-6 space-y-6">
        {/* Data Lineage Architecture Flow */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            MeghDrishti End-to-End Data Lineage
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              1. Coarse NWP Forecast
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              2. Panchayat DEM + Soil
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              3. Historical Bias Pipeline
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              4. LightGBM Downscaling
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-teal-700 text-white shadow-xs">
              5. 90% Range + Trust + Advisory
            </span>
          </div>
        </div>

        {/* Dataset Inventory Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 px-1">
            Attached Dataset Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-700" />
                    {d.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {d.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <div><strong className="text-slate-900 font-bold">Source:</strong> {d.source}</div>
                  <div><strong className="text-slate-900 font-bold">Coverage:</strong> {d.coverage}</div>
                  <div><strong className="text-slate-900 font-bold">Volume:</strong> {d.records}</div>
                  <div><strong className="text-slate-900 font-bold">Key Features:</strong> <span className="font-semibold text-slate-800">{d.features}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Architecture Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 px-1">
            Evaluated Model Registry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((m, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {m.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{m.name}</h4>
                <div className="text-xs text-slate-500 font-medium">{m.type}</div>
                <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                  <div className="text-teal-800 font-bold">{m.metrics}</div>
                  <div className="text-slate-700 text-[11px]"><strong className="text-slate-900 font-bold">Features:</strong> {m.features}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
