"use client";

import React from "react";
import { TopHeader } from "@/components/TopHeader";
import { Database, Cpu, Layers, HardDrive, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function DataAndModelsPage() {
  const { language, setLanguage } = useLanguage();

  const datasets = [
    {
      title: language === "mr" ? "मूळ हवामान अंदाज डेटा" : "Coarse Forecast Data",
      source: "Open-Meteo NWP ECMWF IFS / GFS Model Run",
      coverage: language === "mr" ? "१३ ग्रामपंचायती (महाराष्ट्र, कर्नाटक, तेलंगणा)" : "13 Panchayats across MH, KA, TS (2023–2025)",
      records: language === "mr" ? "५९,२८० बहु-दिवसीय अंदाज नोंदी" : "59,280 Multi-Lead Forecast Rows",
      features: language === "mr" ? "पाऊस, कमाल/किमान तापमान, वाऱ्याचा वेग" : "Precipitation, Tmax, Tmin, Wind, Coarse Probability",
      status: language === "mr" ? "सक्रिय / समक्रमित" : "Active / Synced",
    },
    {
      title: language === "mr" ? "प्रत्यक्ष हवामान निरीक्षणे (Ground Truth)" : "Ground Truth Observations",
      source: "IMD Gridded Daily Archive Reference",
      coverage: language === "mr" ? "महाराष्ट्र, कर्नाटक, तेलंगणा हवामान केंद्रे" : "Maharashtra, Karnataka, Telangana Stations",
      records: language === "mr" ? "११,८५६ स्वच्छ निरीक्षण नोंदी" : "11,856 Clean Observation Records",
      features: language === "mr" ? "प्रत्यक्ष पाऊस (मिमी), सरासरी व कमाल तापमान" : "Observed Rainfall (mm), Daily Mean/Max/Min Temp",
      status: language === "mr" ? "पडताळणी पूर्ण" : "Verified / Clean",
    },
    {
      title: language === "mr" ? "ग्रामपंचायत टोपोग्राफी व DEM" : "Panchayat Geography & DEM",
      source: "Survey of India / NASA SRTM 30m DEM / ISRO Bhuvan",
      coverage: language === "mr" ? "दख्खनचे पठार व पश्चिम घाट टोपोग्राफी" : "Topography across Deccan Plateau & Western Ghats",
      records: language === "mr" ? "१३ ग्रामपंचायत क्षेत्र भू-वेक्टर्स" : "13 Panchayat Centroids & Terrain Vectors",
      features: language === "mr" ? "उंची (मी), उतार (अंश), दिशा (Aspect)" : "Elevation (m), Slope (deg), Aspect (deg)",
      status: language === "mr" ? "कॅलिब्रेटेड" : "Calibrated",
    },
    {
      title: language === "mr" ? "माती व जमीन आच्छादन डेटा" : "Soil & Land Cover Data",
      source: "Soil Health Card Portal / ESA WorldCover 10m",
      coverage: language === "mr" ? "१३ सूक्ष्म पाणलोट व गाव परिसर" : "13 Micro-watersheds and Village Catchments",
      records: language === "mr" ? "१३ माती घटक व जमीन वापर प्रमाण" : "13 Soil Composition & Land Use Fractions",
      features: language === "mr" ? "चिकणमाती %, वाळू %, गाळ %, pH, सेंद्रिय कर्ब %" : "Clay %, Sand %, Silt %, pH, SOC %, Cropland %",
      status: language === "mr" ? "एकत्रित" : "Integrated",
    },
  ];

  const models = [
    {
      name: language === "mr" ? "LightGBM रिग्रेसर (मुख्य उत्पादन मॉडेल)" : "LightGBM Regressor (Production)",
      type: "Gradient Boosted Decision Trees (GBDT)",
      target: language === "mr" ? "स्थानिक प्रत्यक्ष पाऊस (मिमी)" : "Downscaled Observed Rainfall (mm)",
      metrics: "MAE: 0.630 mm | RMSE: 2.094 mm | CSI: 0.725",
      features: language === "mr" ? "२७ स्थानिक व हवामान वैशिष्ट्ये" : "27 Engineered Spatial & Climatological Features",
      status: language === "mr" ? "मुख्य उत्पादन प्रणाली" : "Active Production Engine",
    },
    {
      name: language === "mr" ? "LightGBM पाऊस वर्गीकरण मॉडेल" : "LightGBM Rain Event Classifier",
      type: "Binary Logistic GBDT Classifier",
      target: language === "mr" ? "पाऊस घटना निकष (≥ २.५ मिमी/दिवस)" : "Rain Event Indicator (≥ 2.5 mm / day)",
      metrics: "Brier: 0.032 | ROC-AUC: 0.984 | POD: 0.815",
      features: language === "mr" ? "संभाव्य अचूक प्रमाण P(Rain ≥ 2.5mm)" : "Calibrated Probabilistic Output P(Rain ≥ 2.5mm)",
      status: language === "mr" ? "सक्रिय वर्गीकरण मॉडेल" : "Active Production Classifier",
    },
    {
      name: language === "mr" ? "LightGBM तापमान सुधारणा मॉडेल" : "LightGBM Temperature Model",
      type: "Terrain-Aware Lapse-Rate Regressor",
      target: language === "mr" ? "दैनंदिन सरासरी तापमान (°C)" : "Observed Daily Mean Temperature (°C)",
      metrics: "MAE: 0.440 °C (vs Baseline 0.539 °C)",
      features: language === "mr" ? "उंची फरक, सौर दिशा, माती घटक" : "Elevation difference, solar aspect, soil fractions",
      status: language === "mr" ? "सक्रिय उत्पादन मॉडेल" : "Active Production Model",
    },
    {
      name: language === "mr" ? "रँडम फॉरेस्ट रिग्रेसर" : "Random Forest Regressor",
      type: "Bagging Ensemble (120 Trees)",
      target: language === "mr" ? "प्रत्यक्ष पाऊस (मिमी)" : "Observed Rainfall (mm)",
      metrics: "MAE: 0.903 mm | CSI: 0.680",
      features: language === "mr" ? "तुलनात्मक मूल्यांकन मॉडेल" : "Tree-based benchmark comparison",
      status: language === "mr" ? "मूल्यांकन झालेले मॉडेल" : "Evaluated Benchmark",
    },
    {
      name: language === "mr" ? "रिज रिग्रेशन मॉडेल" : "Ridge Regression",
      type: "L2-Regularized Linear Model",
      target: language === "mr" ? "प्रत्यक्ष पाऊस (मिमी)" : "Observed Rainfall (mm)",
      metrics: "MAE: 0.992 mm | CSI: 0.594",
      features: language === "mr" ? "रेषीय बेसलाइन मॉडेल" : "Linear baseline comparison",
      status: language === "mr" ? "मूल्यांकन झालेले मॉडेल" : "Evaluated Benchmark",
    },
  ];

  return (
    <div className="flex-1 pb-16 space-y-6 bg-[#edf2ed]">
      <TopHeader
        language={language}
        onLanguageChange={(l) => setLanguage(l)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Data Lineage Architecture Flow */}
        <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-[#0f2918]">
            {language === "mr" ? "मेघदृष्टी डेटा व मॉडेल प्रवाह (Data Lineage)" : "MeghDrishti End-to-End Data Lineage"}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold p-4 rounded-xl bg-[#e6efe6] border border-[#c3d6c4]">
            <span className="p-2.5 rounded-lg bg-white border border-[#c8d9c8] text-[#0f2918] shadow-2xs">
              {language === "mr" ? "१. मूळ NWP हवामान अंदाज" : "1. Coarse NWP Forecast"}
            </span>
            <ArrowRight className="w-4 h-4 text-[#166534] shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-[#c8d9c8] text-[#0f2918] shadow-2xs">
              {language === "mr" ? "२. ग्रामपंचायत DEM + माती" : "2. Panchayat DEM + Soil"}
            </span>
            <ArrowRight className="w-4 h-4 text-[#166534] shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-[#c8d9c8] text-[#0f2918] shadow-2xs">
              {language === "mr" ? "३. ऐतिहासिक त्रुटी दुरुस्ती" : "3. Historical Bias Pipeline"}
            </span>
            <ArrowRight className="w-4 h-4 text-[#166534] shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-[#c8d9c8] text-[#0f2918] shadow-2xs">
              {language === "mr" ? "४. LightGBM १ किमी रुपांतरण" : "4. LightGBM Downscaling"}
            </span>
            <ArrowRight className="w-4 h-4 text-[#166534] shrink-0" />
            <span className="p-2.5 rounded-lg bg-[#166534] text-white shadow-xs font-black">
              {language === "mr" ? "५. ९०% मर्यादा + विश्वास + सल्ला" : "5. 90% Range + Trust + Advisory"}
            </span>
          </div>
        </div>

        {/* Dataset Inventory Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-[#0f2918] px-1">
            {language === "mr" ? "जोडलेली डेटा संसाधने" : "Attached Dataset Inventory"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets.map((d, i) => (
              <div key={i} className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#0f2918] flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#166534]" />
                    {d.title}
                  </h4>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                    {d.status}
                  </span>
                </div>
                <div className="text-xs text-[#2b4c34] space-y-1 pt-1 font-medium">
                  <div><strong className="text-[#0f2918] font-bold">{language === "mr" ? "स्रोत:" : "Source:"}</strong> {d.source}</div>
                  <div><strong className="text-[#0f2918] font-bold">{language === "mr" ? "व्याप्ती:" : "Coverage:"}</strong> {d.coverage}</div>
                  <div><strong className="text-[#0f2918] font-bold">{language === "mr" ? "नोंदी प्रमाण:" : "Volume:"}</strong> {d.records}</div>
                  <div><strong className="text-[#0f2918] font-bold">{language === "mr" ? "वैशिष्ट्ये:" : "Key Features:"}</strong> <span className="font-bold text-[#166534]">{d.features}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Architecture Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-[#0f2918] px-1">
            {language === "mr" ? "प्रशिक्षित मॉडेल नोंदवही" : "Evaluated Model Registry"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((m, i) => (
              <div key={i} className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] border border-[#a7d4ac]">
                    {m.status}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-[#0f2918]">{m.name}</h4>
                <div className="text-xs text-[#2b4c34] font-medium">{m.type}</div>
                <div className="pt-2 border-t border-[#c8d9c8] text-xs space-y-1">
                  <div className="text-[#166534] font-black">{m.metrics}</div>
                  <div className="text-[#2b4c34] text-[11px] font-medium">
                    <strong className="text-[#0f2918] font-bold">{language === "mr" ? "वैशिष्ट्ये:" : "Features:"}</strong> {m.features}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
