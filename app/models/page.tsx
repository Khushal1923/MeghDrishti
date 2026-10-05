"use client";

import React from "react";
import { TopHeader } from "@/components/TopHeader";
import { Database, Cpu, Layers, HardDrive, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function DataAndModelsPage() {
  const { language } = useLanguage();

  const t = (mrText: string, hiText: string, enText: string) => {
    if (language === "mr") return mrText;
    if (language === "hi") return hiText;
    return enText;
  };

  const datasets = [
    {
      title: t("कच्चा हवामान अंदाज डेटा", "अपरिष्कृत पूर्वानुमान डेटा", "Coarse Forecast Data"),
      source: "Open-Meteo NWP ECMWF IFS / GFS Model Run",
      coverage: t(
        "महाराष्ट्र, कर्नाटक, तेलंगणातील १३ ग्रामपंचायती (२०२३–२०२५)",
        "महाराष्ट्र, कर्नाटक, तेलंगाना की 13 ग्राम पंचायतें (2023–2025)",
        "13 Panchayats across MH, KA, TS (2023–2025)"
      ),
      records: t(
        "५९,२८० मल्टि-लीड अंदाज नोंदी",
        "59,280 मल्टी-लीड पूर्वानुमान रिकॉर्ड",
        "59,280 Multi-Lead Forecast Rows"
      ),
      features: t(
        "पर्जन्यमान, कमाल/किमान तापमान, वारा, पावसाची शक्यता",
        "वर्षा, अधिकतम/न्यूनतम तापमान, हवा, बारिश की संभावना",
        "Precipitation, Tmax, Tmin, Wind, Coarse Probability"
      ),
      status: t("सक्रिय / सिंक केलेले", "सक्रिय / समन्वयित", "Active / Synced"),
    },
    {
      title: t("जमिनीवरील प्रत्यक्ष निरीक्षणे (Ground Truth)", "जमीनी अवलोकन (Ground Truth)", "Ground Truth Observations"),
      source: "IMD Gridded Daily Archive Reference",
      coverage: t(
        "महाराष्ट्र, कर्नाटक, तेलंगणा वेधशाळा",
        "महाराष्ट्र, कर्नाटक, तेलंगाना स्टेशन",
        "Maharashtra, Karnataka, Telangana Stations"
      ),
      records: t(
        "११,८५६ स्वच्छ निरीक्षण नोंदी",
        "11,856 स्वच्छ अवलोकन रिकॉर्ड",
        "11,856 Clean Observation Records"
      ),
      features: t(
        "नोंदवलेला पाऊस (मिमी), दैनिक सरासरी/कमाल/किमान तापमान",
        "दर्ज की गई वर्षा (मिमी), दैनिक औसत/अधिकतम/न्यूनतम तापमान",
        "Observed Rainfall (mm), Daily Mean/Max/Min Temp"
      ),
      status: t("सत्यापित / अचूक", "सत्यापित / स्वच्छ", "Verified / Clean"),
    },
    {
      title: t("पंचायत भूगोल व डिजिटल एलिव्हेशन (DEM)", "पंचायत भूगोल और डिजिटल ऊंचाई मॉडल (DEM)", "Panchayat Geography & DEM"),
      source: "Survey of India / NASA SRTM 30m DEM / ISRO Bhuvan",
      coverage: t(
        "दख्खनचे पठार व पश्चिम घाट टोपोग्राफी",
        "दक्कन का पठार और पश्चिमी घाट स्थलाकृति",
        "Topography across Deccan Plateau & Western Ghats"
      ),
      records: t(
        "१३ पंचायत केंद्रबिंदू व भूप्रदेश व्हेक्टर्स",
        "13 पंचायत केंद्र और भूभाग वैक्टर",
        "13 Panchayat Centroids & Terrain Vectors"
      ),
      features: t(
        "उंची (मी), उतार (अंश), दिशा (अंश)",
        "ऊंचाई (मीटर), ढलान (डिग्री), पहलू (डिग्री)",
        "Elevation (m), Slope (deg), Aspect (deg)"
      ),
      status: t("कॅलिब्रेट केलेले", "कैलिब्रेटेड", "Calibrated"),
    },
    {
      title: t("माती व जमीन आच्छादन डेटा", "मिट्टी और भूमि आवरण डेटा", "Soil & Land Cover Data"),
      source: "Soil Health Card Portal / ESA WorldCover 10m",
      coverage: t(
        "१३ सूक्ष्म पाणलोट व गाव पाणलोट क्षेत्रे",
        "13 सूक्ष्म जलग्रहण और ग्राम क्षेत्र",
        "13 Micro-watersheds and Village Catchments"
      ),
      records: t(
        "१३ माती रचना व भूवापर गुणोत्तरे",
        "13 मिट्टी संरचना और भूमि उपयोग अंश",
        "13 Soil Composition & Land Use Fractions"
      ),
      features: t(
        "काळी माती %, वाळू %, गाळ %, pH, सेंद्रिय कर्ब %, शेती जमीन %",
        "चिकनी मिट्टी %, रेत %, गाद %, pH, कार्बन %, कृषि भूमि %",
        "Clay %, Sand %, Silt %, pH, SOC %, Cropland %"
      ),
      status: t("एकात्मिक", "एकीकृत", "Integrated"),
    },
  ];

  const models = [
    {
      name: t("LightGBM रिग्रेशर (मुख्य मॉडेल)", "LightGBM रिग्रेसर (मुख्य मॉडल)", "LightGBM Regressor (Production)"),
      type: t("ग्रेडियंट बूस्टेड डिसिजन ट्री (GBDT)", "ग्रेडिएंट बूस्टेड निर्णय पेड़ (GBDT)", "Gradient Boosted Decision Trees (GBDT)"),
      target: t("डाऊनस्केल केलेला प्रत्यक्ष पाऊस (मिमी)", "डाउनस्केल किया गया वास्तविक वर्षा (मिमी)", "Downscaled Observed Rainfall (mm)"),
      metrics: "MAE: 0.630 mm | RMSE: 2.094 mm | CSI: 0.725",
      features: t(
        "२७ भौगोलिक व हवामानशास्त्रीय वैशिष्ट्ये",
        "27 भौगोलिक और मौसम संबंधी विशेषताएं",
        "27 Engineered Spatial & Climatological Features"
      ),
      status: t("सक्रिय उत्पादन इंजिन", "सक्रिय उत्पादन इंजन", "Active Production Engine"),
    },
    {
      name: t("LightGBM पाऊस वर्गीकरण मॉडेल", "LightGBM वर्षा घटना क्लासिफायर", "LightGBM Rain Event Classifier"),
      type: t("बायनरी लॉजिस्टिक GBDT क्लासिफायर", "बाइनरी लॉजिस्टिक GBDT क्लासिफायर", "Binary Logistic GBDT Classifier"),
      target: t("पाऊस संकेत (≥ २.५ मिमी / दिवस)", "बारिश संकेतक (≥ 2.5 मिमी / दिन)", "Rain Event Indicator (≥ 2.5 mm / day)"),
      metrics: "Brier: 0.032 | ROC-AUC: 0.984 | POD: 0.815",
      features: t(
        "कॅलिब्रेट केलेली संभाव्यता P(पाऊस ≥ २.५ मिमी)",
        "कैलिब्रेटेड संभाव्यता P(बारिश ≥ 2.5 मिमी)",
        "Calibrated Probabilistic Output P(Rain ≥ 2.5mm)"
      ),
      status: t("सक्रिय उत्पादन क्लासिफायर", "सक्रिय उत्पादन क्लासिफायर", "Active Production Classifier"),
    },
    {
      name: t("LightGBM तापमान मॉडेल", "LightGBM तापमान मॉडल", "LightGBM Temperature Model"),
      type: t("भूरचना-जागरूक लॅप्स-रेट रिग्रेशर", "भूभाग-जागरूक लैप्स-रेट रिग्रेसर", "Terrain-Aware Lapse-Rate Regressor"),
      target: t("दैनिक सरासरी तापमान (°C)", "दैनिक औसत तापमान (°C)", "Observed Daily Mean Temperature (°C)"),
      metrics: "MAE: 0.440 °C (vs Baseline 0.539 °C)",
      features: t(
        "उंचीतील फरक, सूर्य दिशा, माती प्रमाण",
        "ऊंचाई का अंतर, सौर पहलू, मिट्टी अंश",
        "Elevation difference, solar aspect, soil fractions"
      ),
      status: t("सक्रिय उत्पादन मॉडेल", "सक्रिय उत्पादन मॉडल", "Active Production Model"),
    },
    {
      name: "Random Forest Regressor",
      type: t("बॅगिंग एन्सेम्बल (१२० ट्रीज)", "बैगिंग एन्सेम्बल (120 पेड़)", "Bagging Ensemble (120 Trees)"),
      target: t("प्रत्यक्ष पाऊस (मिमी)", "वास्तविक वर्षा (मिमी)", "Observed Rainfall (mm)"),
      metrics: "MAE: 0.903 mm | CSI: 0.680",
      features: t("ट्री-आधारित तुलनात्मक बेंचमार्क", "वृक्ष-आधारित तुलनात्मक बेंचमार्क", "Tree-based benchmark comparison"),
      status: t("तपासणी बेंचमार्क", "मूल्यांकित बेंचमार्क", "Evaluated Benchmark"),
    },
    {
      name: "Ridge Regression",
      type: t("L2-नियमित लिनिअर मॉडेल", "L2-नियमित रैखिक मॉडल", "L2-Regularized Linear Model"),
      target: t("प्रत्यक्ष पाऊस (मिमी)", "वास्तविक वर्षा (मिमी)", "Observed Rainfall (mm)"),
      metrics: "MAE: 0.992 mm | CSI: 0.594",
      features: t("लिनिअर बेसलाइन तुलना", "रैखिक बेसलाइन तुलना", "Linear baseline comparison"),
      status: t("तपासणी बेंचमार्क", "मूल्यांकित बेंचमार्क", "Evaluated Benchmark"),
    },
  ];

  return (
    <div className="flex-1 pb-16 space-y-6">
      <TopHeader
        title={t(
          "डेटा वंशावळ व मॉडेल आर्किटेक्चर नोंदणी",
          "डेटा वंशावली और मॉडल वास्तुकला रजिस्ट्री",
          "Data Lineage & Model Architecture Registry"
        )}
        description={t(
          "डेटासेट, वैशिष्ट्य पाइपलाइन आणि प्रशिक्षित मशीन लर्निंग मॉडेल्सची पारदर्शक माहिती.",
          "डेटासेट, फीचर पाइपलाइन और प्रशिक्षित मशीन लर्निंग मॉडल की पारदर्शी सूची।",
          "Transparent inventory of datasets, feature pipelines, and trained machine learning models."
        )}
      />

      <div className="px-6 space-y-6">
        {/* Data Lineage Architecture Flow */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {t(
              "मेघदृष्टी एंड-टू-एंड डेटा प्रवाह",
              "मेघदृष्टि एंड-टू-एंड डेटा प्रवाह",
              "MeghDrishti End-to-End Data Lineage"
            )}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              {t("१. कच्चा NWP अंदाज", "1. कच्चा NWP पूर्वानुमान", "1. Coarse NWP Forecast")}
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              {t("२. पंचायत DEM + माती", "2. पंचायत DEM + मिट्टी", "2. Panchayat DEM + Soil")}
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              {t("३. ऐतिहासिक त्रुटी निवारण", "3. ऐतिहासिक पूर्वाग्रह निवारण", "3. Historical Bias Pipeline")}
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
              {t("४. LightGBM डाऊनस्केलिंग", "4. LightGBM डाउनस्केलिंग", "4. LightGBM Downscaling")}
            </span>
            <ArrowRight className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="p-2.5 rounded-lg bg-teal-700 text-white shadow-xs">
              {t("५. ९०% मर्यादा + विश्वास + सल्ला", "5. 90% रेंज + विश्वास + सलाह", "5. 90% Range + Trust + Advisory")}
            </span>
          </div>
        </div>

        {/* Dataset Inventory Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 px-1">
            {t("संलग्न डेटासेट सूची", "संलग्न डेटासेट सूची", "Attached Dataset Inventory")}
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
                  <div>
                    <strong className="text-slate-900 font-bold">
                      {t("स्रोत:", "स्रोत:", "Source:")}
                    </strong>{" "}
                    {d.source}
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold">
                      {t("व्याप्ती:", "कवरेज:", "Coverage:")}
                    </strong>{" "}
                    {d.coverage}
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold">
                      {t("नोंदी संख्या:", "रिकॉर्ड संख्या:", "Volume:")}
                    </strong>{" "}
                    {d.records}
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold">
                      {t("मुख्य वैशिष्ट्ये:", "मुख्य विशेषताएं:", "Key Features:")}
                    </strong>{" "}
                    <span className="font-semibold text-slate-800">{d.features}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Architecture Cards */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 px-1">
            {t("मूल्यांकित मॉडेल नोंदणी", "मूल्यांकित मॉडल रजिस्ट्री", "Evaluated Model Registry")}
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
                  <div className="text-slate-700 text-[11px]">
                    <strong className="text-slate-900 font-bold">
                      {t("वैशिष्ट्ये:", "विशेषताएं:", "Features:")}
                    </strong>{" "}
                    {m.features}
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
