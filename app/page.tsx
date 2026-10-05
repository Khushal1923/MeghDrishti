"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CloudRain,
  Sun,
  CheckCircle2,
  Clock,
  Droplets,
  Layers,
  Sparkles,
  BarChart3,
  Cpu,
  Radio,
  Share2,
  Volume2,
  Check,
  ChevronRight,
  Zap,
  Globe2,
  Wind,
  Phone,
  Shield,
  HelpCircle,
  Play,
  MessageCircle,
  ThumbsUp,
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { PANCHAYATS_DATA } from "@/lib/data";
import { formatRainfall, formatTemp } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const { loginAs } = useAuth();
  const [selectedVillageIndex, setSelectedVillageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const currentVillage = PANCHAYATS_DATA[selectedVillageIndex] || PANCHAYATS_DATA[0];

  const t = (mrText: string, hiText: string, enText: string) => {
    if (language === "mr") return mrText;
    if (language === "hi") return hiText;
    return enText;
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      if ("speechSynthesis" in window) {
        const text =
          language === "mr"
            ? `${currentVillage.panchayat_name} शेतकरी हवामान सल्ला. आज पाऊस पडण्याची शक्यता आहे. तापमान ${currentVillage.latest_temp_estimate} अंश सेल्सिअस राहील. फवारणीसाठी सकाळची वेळ अनुकूल आहे.`
            : language === "hi"
            ? `${currentVillage.panchayat_name} किसान मौसम सलाह। आज बारिश की संभावना है। तापमान ${currentVillage.latest_temp_estimate} डिग्री सेल्सियस रहेगा। छिड़काव के लिए सुबह का समय अनुकूल है।`
            : `Weather advisory for ${currentVillage.panchayat_name}. Rain expected today. Temperature ${currentVillage.latest_temp_estimate} degree Celsius. Safe spraying window in the morning.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en-IN";
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingAudio(false), 3000);
      }
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const sampleCrops = [
    {
      name: t("कापूस (Cotton)", "कपास (Cotton)", "Cotton"),
      stage: t("फुलोरा अवस्था", "फूल अवस्था", "Flowering Stage"),
      spray: t("सकाळी ८ ते ११ अनुकूल", "सुबह 8 से 11 बजे अनुकूल", "Safe: 8 AM - 11 AM"),
      irrigation: t("२ दिवस पाणी थांबवा", "2 दिन सिंचाई रोकें", "Hold irrigation 2 days"),
      pest: t("बोंडअळी प्रतिबंधक फवारणी", "गुलाबी सुंडी निवारण छिड़काव", "Bollworm preventive spray"),
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "🌱",
    },
    {
      name: t("सोयाबीन (Soybean)", "सोयाबीन (Soybean)", "Soybean"),
      stage: t("शेंगा भरणे", "फली विकास", "Pod Filling"),
      spray: t("दुपारी १२ नंतर फवारणी टाळा", "दोपहर 12 के बाद छिड़काव न करें", "Avoid spray after 12 PM"),
      irrigation: t("हलके पाणी द्यावे", "हल्की सिंचाई प्रदान करें", "Provide light irrigation"),
      pest: t("लष्करी अळी सावधगिरी", "स्पोडोप्टेरा कीट चेतावनी", "Spodoptera leaf caterpillar alert"),
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: "🌿",
    },
    {
      name: t("कांदा (Onion)", "प्याज (Onion)", "Onion"),
      stage: t("कांदा फुगवण", "कंद विकास", "Bulb Development"),
      spray: t("बुरशीनाशक फवारणी शिफारस", "कवकनाशी छिड़काव अनुशंसित", "Fungicide spray recommended"),
      irrigation: t("पाण्याचा निचरा ठेवा", "खेत से जल निकासी सुनिश्चित करें", "Ensure field drainage"),
      pest: t("थ्रिप्स व करपा नियंत्रण", "थ्रिप्स व पर्पल ब्लॉच सतर्कता", "Thrips & purple blotch caution"),
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      icon: "🧅",
    },
  ];

  const faqs = [
    {
      q: t(
        "मेघदृष्टी इतर हवामान ॲप्सपेक्षा वेगळे कसे आहे?",
        "मेघदृष्टि अन्य मौसम ऐप्स से किस प्रकार भिन्न है?",
        "How is MeghDrishti different from regular weather apps?"
      ),
      a: t(
        "इतर ॲप्स १० ते २५ किमीच्या मोठ्या ब्लॉकचा अंदाज दाखवतात. मेघदृष्टी तुमच्या गावाच्या स्थानिक उंची (DEM), उतार आणि मातीच्या प्रकारानुसार १ किमीच्या अचूक गावपातळीवर हवामान अंदाज देते.",
        "पारंपरिक ऐप्स 10 से 25 किमी के बड़े ब्लॉक का अनुमान दिखाते हैं। मेघदृष्टि आपके गाँव की समुद्रतल से ऊंचाई, ढलान और मिट्टी अनुसार 1 किमी सटीक पंचायत स्तर पर मौसम पूर्वानुमान देती है।",
        "Regular weather apps show generic 10-25 km block forecasts. MeghDrishti downscales forecasts to 1 km resolution tailored to your village's elevation, slope, and soil type for reliable farm decisions."
      ),
    },
    {
      q: t(
        "मेघदृष्टी शेतकऱ्यांसाठी पूर्णपणे मोफत आहे का?",
        "क्या मेघदृष्टि किसानों के लिए पूरी तरह निःशुल्क है?",
        "Is MeghDrishti completely free for farmers?"
      ),
      a: t(
        "होय! स्मार्ट इंडिया हॅकेथॉन २०२६ उपक्रमांतर्गत गावपातळीवरील हवामान अंदाज, पीक सल्ला आणि आवाज सहाय्यक शेतकऱ्यांसाठी १००% मोफत आहे.",
        "हाँ! स्मार्ट इंडिया हैकथॉन 2026 पहल के तहत ग्राम पंचायत स्तरीय मौसम पूर्वानुमान, फसल सलाह और वॉयस फीचर्स किसानों के लिए 100% निःशुल्क हैं।",
        "Yes! Under the Smart India Hackathon 2026 initiative, village-level weather forecasts, crop advisories, and audio features are 100% free for farmers."
      ),
    },
    {
      q: t(
        "कृषी अधिकारी व संशोधक याचा कसा वापर करू शकतात?",
        "कृषि अधिकारी और शोधकर्ता इसका उपयोग कैसे कर सकते हैं?",
        "How do Agricultural Officers & Researchers use it?"
      ),
      a: t(
        "कृषी अधिकाऱ्यांसाठी स्वतंत्र 'अधिकारी व्ह्यू' उपलब्ध आहे, ज्यामध्ये क्षेत्रीय कौशल्य स्कोरकार्ड, मॉडेल अचूकता (LightGBM वि. कच्चा NWP) आणि टेलीमेट्रीचे परीक्षण केले जाऊ शकते.",
        "कृषि और मौसम अधिकारियों के लिए समर्पित 'अधिकारी डैशबोर्ड' उपलब्ध है, जिसमें क्षेत्रीय कौशल स्कोरकार्ड, मॉडल सत्यापन (LightGBM बनाम कच्चा NWP) और टेलीमेट्री की जाँच की जा सकती है।",
        "Officers have a dedicated Officer & Research portal (/officer) providing stratified skill scorecards, bias-reduction charts, telemetry, and physics calibration controls."
      ),
    },
    {
      q: t(
        "शेतकऱ्यांना स्मार्टफोन किंवा इंटरनेट नसेल तरीही माहिती मिळू शकते का?",
        "यदि किसान के पास इंटरनेट न हो तो क्या जानकारी मिल सकती है?",
        "Can advisories be shared easily with village groups?"
      ),
      a: t(
        "होय! प्रत्येक पीक सल्ल्यामध्ये १-क्लिक WhatsApp शेअरिंग आणि आवाज ऐकण्याची सुविधा उपलब्ध आहे, ज्यामुळे शेतकरी गट एकमेकांना माहिती पाठवू शकतात.",
        "हाँ! प्रत्येक फसल सलाह में 1-क्लिक WhatsApp शेयरिंग और ध्वनि सुनाने की सुविधा है, जिससे ग्राम पंचायत समूह तुरंत जानकारी साझा कर सकते हैं।",
        "Yes! One-click WhatsApp sharing formats village advisories directly for farmer messaging groups, accompanied by native speech readout."
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#edf2ed] text-[#0f2918] flex flex-col justify-between selection:bg-[#166534] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER NAVIGATION */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#e5eee5]/95 backdrop-blur-md border-b border-[#c8d9c8] px-4 md:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#166534]/20">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <span className="font-black text-xl sm:text-2xl tracking-tight text-[#166534] block leading-none">
              {t("मेघदृष्टी", "मेघदृष्टि", "MeghDrishti")}
            </span>
            <span className="text-[10px] font-black text-[#2b4c34] uppercase tracking-wider block mt-1">
              {t("ग्रामपंचायत हवामान बुद्धिमत्ता", "ग्राम पंचायत मौसम बुद्धिमत्ता", "Panchayat Weather AI")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Trilingual Switcher */}
          <div className="flex items-center bg-[#d5e4d5] p-0.5 rounded-full border border-[#c3d6c4] text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => setLanguage("mr")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                language === "mr"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                language === "hi"
                  ? "bg-[#166534] text-white shadow-xs font-extrabold"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              हिंदी
            </button>
          </div>

          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#166534] text-white text-xs font-black hover:bg-[#15803d] transition-all shadow-xs"
          >
            <span>{t("डॅशबोर्ड उघडा", "डैशबोर्ड खोलें", "Open Dashboard")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-16 px-4 md:px-8 border-b border-[#c8d9c8]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7ead9] border border-[#a7d4ac] text-[#166534] text-xs font-black">
              <Sparkles className="w-3.5 h-3.5 text-[#166534]" />
              <span>{t("स्मार्ट इंडिया हॅकेथॉन २०२६ • १ किमी स्थानिक मॉडेल", "स्मार्ट इंडिया हैकथॉन 2026 • 1 किमी स्थानिक मॉडल", "Smart India Hackathon 2026 • 1 km Panchayat Model")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2918] tracking-tight leading-tight">
              {t(
                "गावपातळीवर १ किमी अचूक पाऊस अंदाज आणि पीक सल्ला",
                "ग्राम पंचायत स्तर पर 1 किमी सटीक बारिश और फसल सलाह",
                "1 km Resolution Panchayat Rainfall & Farmer Crop Advisory"
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#2b4c34] font-bold leading-relaxed">
              {t(
                "कच्च्या १० किमी हवामान मॉडेल्सच्या तुलनेत +६२.५% त्रुटी कपात. स्थानिक भूरचना, समुद्रसपाटीपासूनची उंची (DEM), आणि मातीच्या ओलाव्यानुसार अचूक कृती निर्णय.",
                "कच्चे 10 किमी मौसम मॉडल की तुलना में +62.5% त्रुटि कमी। स्थानीय स्थलाकृति, डिजिटल ऊंचाई (DEM) और मिट्टी नमी अनुसार किसानों के लिए सटीक निर्णय।",
                "+62.5% error reduction over raw NWP models. Downscaled to 1km panchayat grid with local DEM elevation, lapse-rate corrections, and actionable farm decisions."
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#166534] hover:bg-[#15803d] text-white text-xs sm:text-sm font-black shadow-md transition-all"
              >
                <Sprout className="w-4 h-4 text-emerald-200" />
                <span>{t("शेतकरी डॅशबोर्ड पहा", "किसान डैशबोर्ड देखें", "Farmer Live Dashboard")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/officer"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1d3557] hover:bg-[#152740] text-white text-xs sm:text-sm font-black shadow-md transition-all"
              >
                <Shield className="w-4 h-4 text-amber-300" />
                <span>{t("अधिकारी / संशोधक व्ह्यू", "अधिकारी / शोध पोर्टल", "Officer & Research Portal")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LIVE DEMO WIDGET */}
          {/* ========================================================= */}
          <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-7 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8d9c8] pb-4">
              <div>
                <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider block">
                  {t("थेट चाचणी केंद्र", "लाइव परीक्षण केंद्र", "LIVE PANCHAYAT BENCHMARK DEMO")}
                </span>
                <h3 className="text-lg md:text-xl font-black text-[#0f2918] tracking-tight">
                  {currentVillage.panchayat_name} ({currentVillage.district}, {currentVillage.state})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedVillageIndex}
                  onChange={(e) => setSelectedVillageIndex(Number(e.target.value))}
                  className="bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-1.5 text-xs font-black text-[#0f2918] cursor-pointer"
                >
                  {PANCHAYATS_DATA.map((p, idx) => (
                    <option key={p.lgd_code} value={idx}>
                      {p.village_name} ({p.district})
                    </option>
                  ))}
                </select>

                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d7ead9] text-[#166534] border border-[#a7d4ac] hover:bg-[#cde4cf] text-xs font-black transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? t("थांबवा", "रोकें", "Stop") : t("सल्ला ऐका", "सलाह सुनें", "Listen")}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                <span className="text-[10px] text-[#166534] font-black uppercase">{t("अपेक्षित पाऊस", "अपेक्षित वर्षा", "Downscaled Rain")}</span>
                <div className="text-xl font-black text-[#166534]">{formatRainfall(currentVillage.latest_rainfall_estimate)}</div>
                <span className="text-[10px] text-[#2b4c34] font-bold">{t("कच्चा अंदाज:", "कच्चा अनुमान:", "Raw NWP:")} {formatRainfall(currentVillage.latest_baseline_rainfall)}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                <span className="text-[10px] text-[#166534] font-black uppercase">{t("तापमान", "तापमान", "Temperature")}</span>
                <div className="text-xl font-black text-[#0f2918]">{formatTemp(currentVillage.latest_temp_estimate)}</div>
                <span className="text-[10px] text-[#2b4c34] font-bold">{t("उंची लॅप्स सुधारित", "ऊंचाई सुधारित", "Lapse corrected")}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
                <span className="text-[10px] text-[#166534] font-black uppercase">{t("पाऊस शक्यता", "बारिश संभावना", "Rain Probability")}</span>
                <div className="text-xl font-black text-sky-800">{Math.round(currentVillage.latest_rain_prob * 100)}%</div>
                <span className="text-[10px] text-[#2b4c34] font-bold">&ge; 2.5 mm {t("निकष", "सीमा", "threshold")}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-1">
                <span className="text-[10px] text-[#166534] font-black uppercase">{t("AI विश्वासार्हता", "AI विश्वसनीयता", "AI Trust Score")}</span>
                <div className="text-xl font-black text-[#166534]">{Math.round(currentVillage.trust_score * 100)}%</div>
                <span className="text-[10px] text-[#166534] font-black">{currentVillage.trust_label} {t("विश्वास", "विश्वास", "Trust")}</span>
              </div>
            </div>

            {/* Sample Crops Advice Carousel */}
            <div className="space-y-2 pt-2 border-t border-[#c8d9c8]">
              <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider block">
                {t("या भागातील मुख्य पिकांचा सल्ला", "इस क्षेत्र की मुख्य फसलों की सलाह", "Field Crops Action Window")}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sampleCrops.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-[#0f2918]">{c.icon} {c.name}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#c3d6c4]">{c.stage}</span>
                    </div>
                    <div className="text-[#2b4c34] font-bold">
                      <strong>{t("फवारणी:", "छिड़काव:", "Spray:")}</strong> {c.spray}
                    </div>
                    <div className="text-[#2b4c34] font-bold">
                      <strong>{t("सिंचन:", "सिंचाई:", "Irrigation:")}</strong> {c.irrigation}
                    </div>
                    <div className="text-[#166534] font-extrabold text-[11px]">
                      {c.pest}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. THREE CORE PILLARS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#166534] uppercase tracking-wider">
            {t("मेघदृष्टीचे ३ आधारस्तंभ", "मेघदृष्टि के 3 मुख्य आधारस्तंभ", "THREE CORE PILLARS")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f2918] tracking-tight">
            {t("पारंपरिक मॉडेल्सच्या मर्यादांवर मात", "पारंपरिक मॉडलों की सीमाओं पर विजय", "Overcoming Coarse NWP Limitations")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#0f2918]">
              {t("१ किमी स्थानिक रिझोल्यूशन", "1 किमी स्थानिक रिज़ॉल्यूशन", "1 km Panchayat Grid Resolution")}
            </h3>
            <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
              {t(
                "१० किमीच्या ढोबळ अंदाजाचे नासा SRTM ३०मी DEM आणि इस्रो भुवन टोपोग्राफीच्या सहाय्याने १ किमी अचूक गावपातळीवर रुपांतर.",
                "10 किमी के अपरिष्कृत पूर्वानुमान को NASA SRTM 30m DEM और ISRO भुवन भूभाग के आधार पर 1 किमी सटीक गाँव स्तर पर रूपांतरण।",
                "Downscales coarse 10 km NWP forecasts using 30m NASA SRTM DEM terrain vectors and Soil Health Card clay fractions to 1 km scale."
              )}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#0f2918]">
              {t("स्थानिक भाषा व आवाज सहाय्यक", "मातृभाषा व ध्वनि सहायक", "Vernacular Speech & WhatsApp Sharing")}
            </h3>
            <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
              {t(
                "मराठी, हिंदी व इंग्रजीत थेट आवाज ऐकण्याची सुविधा आणि गावपातळीवरील शेतकरी व्हॉट्सॲप समूहांसाठी १-क्लिक शेअरिंग.",
                "मराठी, हिंदी और अंग्रेजी में सीधे ऑडियो सुनने की सुविधा और ग्राम पंचायत किसान WhatsApp समूहों के लिए त्वरित साझाकरण।",
                "Complete Marathi, Hindi, and English voice synthesis with instant formatted WhatsApp sharing for village farmer cooperatives."
              )}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f8f4] border border-[#c8d9c8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#0f2918]">
              {t("डेटा गळती रहित अचूकता सत्यापन", "डेटा लीकेज-मुक्त सत्यापन", "Strict Zero Data-Leakage Validation")}
            </h3>
            <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
              {t(
                "भविष्यातील डेटा प्रशिक्षणात मिसळू न देता कडक कालक्रमानुसार IMD वेधशाळा नोंदींवर पडताळणी (+६२.५% त्रुटी कपात).",
                "भविष्य का डेटा AI प्रशिक्षण में कभी नहीं मिलता। IMD वेधशाला रिकॉर्ड पर सख्त कालानुक्रमिक सत्यापन (+62.5% त्रुटि कमी)।",
                "Strict chronological holdout split ensures future data never leaks into training, benchmarked against daily IMD station observations."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. COVERED HUBS SUMMARY */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {t("स्थानिक हवामान केंद्र नेटवर्क", "स्थानिक मौसम केंद्र नेटवर्क", "SPATIAL COVERAGE")}
            </span>
            <h2 className="text-2xl font-black text-[#0f2918] tracking-tight">
              {t(
                "१३ ग्रामपंचायत हवामान केंद्रे (महाराष्ट्र, कर्नाटक, तेलंगणा)",
                "13 कैलिब्रेटेड ग्राम पंचायत केंद्र (महाराष्ट्र, कर्नाटक, तेलंगाना)",
                "13 Calibrated Panchayat Hubs across Maharashtra, Karnataka & Telangana"
              )}
            </h2>
          </div>

          <Link
            href="/panchayats"
            className="px-4 py-1.5 rounded-full bg-[#f4f8f4] text-xs font-black text-[#166534] border border-[#c8d9c8] hover:bg-[#e6efe6] transition-all flex items-center gap-1.5"
          >
            <span>{t("सर्व गावे पहा", "सभी गाँव देखें", "View Panchayat Directory")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {PANCHAYATS_DATA.map((p) => (
            <Link
              key={p.lgd_code}
              href="/dashboard"
              className="p-4 rounded-2xl bg-[#f4f8f4] border border-[#c8d9c8] hover:border-[#166534] transition-all space-y-1.5 group shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-[#0f2918] group-hover:text-[#166534] truncate">
                  {p.panchayat_name}
                </span>
                <span className="text-[10px] text-[#166534] font-black shrink-0">
                  {Math.round(p.trust_score * 100)}%
                </span>
              </div>
              <div className="text-[11px] text-[#2b4c34] font-bold">
                {p.district}, {p.zone}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#166534] font-black pt-1 border-t border-[#c8d9c8]">
                <span>{p.elevation_m}m {language === "mr" ? "समुद्रसपाटी" : language === "hi" ? "समुद्रतल" : "asl"}</span>
                <span>{formatRainfall(p.latest_rainfall_estimate)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FAQ SECTION */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-[#0f2918] text-center tracking-tight">
          {t("वारंवार विचारले जाणारे प्रश्न (FAQ)", "अक्सर पूछे जाने वाले प्रश्न (FAQ)", "Frequently Asked Questions")}
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-2xl overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-black text-[#0f2918]"
              >
                <span>{faq.q}</span>
                <ChevronRight
                  className={`w-4 h-4 text-[#166534] transition-transform ${
                    activeFaq === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-4 pb-4 text-xs text-[#2b4c34] font-bold border-t border-[#c8d9c8] pt-2.5 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-[#e5eee5] border-t border-[#c8d9c8] px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#2b4c34] font-bold">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#166534]">MeghDrishti</span>
            <span>&bull; Smart India Hackathon 2026</span>
          </div>
          <div>
            {t(
              "ग्रामीण भारतासाठी १ किमी अचूक AI हवामान डाउनस्केलिंग मॉडेल",
              "ग्रामीण भारत के लिए 1 किमी सटीक AI मौसम डाउनस्केलिंग मॉडल",
              "1 km Resolution Machine Learning Weather Downscaling for Rural India"
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
