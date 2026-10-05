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

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      if ("speechSynthesis" in window) {
        const text =
          language === "mr"
            ? `${currentVillage.panchayat_name} येथे आज हलका पाऊस अपेक्षित आहे. तापमान ${currentVillage.latest_temp_estimate} अंश राहील. सकाळी फवारणीसाठी योग्य वेळ आहे.`
            : `Weather advisory for ${currentVillage.panchayat_name}. Light rain expected today. Temperature ${currentVillage.latest_temp_estimate} degree Celsius. Safe spraying window in the morning.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "mr" ? "mr-IN" : "en-IN";
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
      nameMr: "कापूस (Cotton)",
      nameEn: "Cotton",
      stage: language === "mr" ? "फुलधारणा अवस्था" : "Flowering Stage",
      spray: language === "mr" ? "सकाळी ८ ते ११ सुरक्षित" : "Safe: 8 AM - 11 AM",
      irrigation: language === "mr" ? "२ दिवस पाणी थांबवा" : "Hold irrigation 2 days",
      pest: language === "mr" ? "बोंडअळी प्रतिबंधक फवारणी" : "Bollworm preventive spray",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "🌾",
    },
    {
      nameMr: "सोयाबीन (Soybean)",
      nameEn: "Soybean",
      stage: language === "mr" ? "शेंगा भरणे" : "Pod Filling",
      spray: language === "mr" ? "दुपारी १२ नंतर टाळा" : "Avoid spray after 12 PM",
      irrigation: language === "mr" ? "हलके पाणी नियोजन करा" : "Provide light irrigation",
      pest: language === "mr" ? "पाने खाणाऱ्या अळीचे नियंत्रण" : "Spodoptera leaf caterpiller alert",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: "🌱",
    },
    {
      nameMr: "कांदा (Onion)",
      nameEn: "Onion",
      stage: language === "mr" ? "पोषण व वाढ" : "Bulb Development",
      spray: language === "mr" ? "बुरशीनाशक फवारणी योग्य" : "Fungicide spray recommended",
      irrigation: language === "mr" ? "पावसानंतर निचरा तपासा" : "Ensure field drainage",
      pest: language === "mr" ? "करपा व फुलकिडे सावधगिरी" : "Thrips & purple blotch caution",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      icon: "🧅",
    },
  ];

  const faqs = [
    {
      qMr: "मेघदृष्टी इतर हवामान ॲप्सपेक्षा वेगळे कसे आहे?",
      qEn: "How is MeghDrishti different from regular weather apps?",
      aMr: "इतर ॲप्स संपूर्ण १० किमी ते २५ किमी तालुक्याचा एकच अंदाज दाखवतात. मेघदृष्टी प्रत्यक्ष तुमच्या गावातील डोंगर, उतार आणि मातीच्या प्रकारानुसार १ किमी अचूक अंदाज देते, ज्यामुळे तुमच्या शेतातील निर्णय चुकत नाहीत.",
      aEn: "Regular weather apps show generic 10-25 km block forecasts. MeghDrishti downscales forecasts to 1 km resolution tailored to your village's elevation, slope, and soil type for reliable farm decisions.",
    },
    {
      qMr: "हे ॲप शेतकऱ्यांसाठी मोफत आहे का?",
      qEn: "Is MeghDrishti completely free for farmers?",
      aMr: "होय! स्मार्ट इंडिया हॅकेथॉन २०२६ उपक्रमांतर्गत सर्व शेतकरी बांधवांसाठी गावपातळी हवामान अंदाज, पीक सल्ला आणि ऑडिओ सुविधा पूर्णपणे विनामूल्य आहे.",
      aEn: "Yes! Under the Smart India Hackathon 2026 initiative, village-level weather forecasts, crop advisories, and audio features are 100% free for farmers.",
    },
    {
      qMr: "माझ्या शेतात फवारणी कधी करावी हे कसे समजेल?",
      qEn: "How do I know the best time to spray pesticide?",
      aMr: "डॅशबोर्डवर तुमच्या गावाचे नाव निवडा. तिथे थेट 'फवारणी वेळ (Spray Window)' दिसेल, ज्यामध्ये वाऱ्याचा वेग, पाऊस व पानांचा ओलावा तपासून सुरक्षित वेळ सांगितली जाते.",
      aEn: "Select your village on the dashboard. You will see a dedicated 'Spray Window' indicating safe hours based on wind speed, expected rain, and leaf dryness.",
    },
    {
      qMr: "वाचता येत नसल्यास ऑडिओ (आवाज) मध्ये माहिती ऐकता येईल का?",
      qEn: "Can I listen to the advisory in voice audio?",
      aMr: "होय, '🔊 ऑडिओ ऐका' बटण दाबल्यास सर्व हवामान व पीक सल्ला शुद्ध मराठी किंवा इंग्रजीत ऐकता येतो. तसेच एका क्लिकवर व्हॉट्सॲपवर शेअर करता येतो.",
      aEn: "Yes, just tap the '🔊 Play Audio' button to hear the complete weather and crop advisory in Marathi or English, and share it on WhatsApp in one click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f7f3] text-[#0f2918] flex flex-col justify-between selection:bg-[#166534] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP HEADER NAVIGATION */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-[#f3f7f3]/95 backdrop-blur-md border-b border-[#c8d9c8] px-4 md:px-8 py-3 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#166534]/20">
            <Sprout className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tight text-[#166534] block leading-none">
                MeghDrishti
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#d7ead9] text-[#166534] text-[10px] font-black border border-[#a7d4ac]">
                मेघदृष्टी
              </span>
            </div>
            <span className="text-[10px] font-black text-[#2b4c34] uppercase tracking-wider block mt-1">
              {language === "mr" ? "गावपातळी हवामान बुद्धिमत्ता" : "Panchayat Weather Intelligence"}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#dce8dc] p-1 rounded-full border border-[#c3d6c4] text-xs font-black">
            <button
              onClick={() => setLanguage("mr")}
              className={`px-3 py-1 rounded-full transition-all ${
                language === "mr"
                  ? "bg-[#166534] text-white shadow-xs font-black"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full transition-all ${
                language === "en"
                  ? "bg-[#166534] text-white shadow-xs font-black"
                  : "text-[#166534] hover:text-[#0b1f11]"
              }`}
            >
              English
            </button>
          </div>

          <Link
            href="/dashboard"
            className="px-4 md:px-5 py-2 bg-[#166534] hover:bg-[#15803d] text-white rounded-full text-xs font-black shadow-xs transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <span>{language === "mr" ? "थेट डॅशबोर्ड" : "Live Dashboard"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION (FARMER-FIRST DESIGN) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-14 pb-10 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d7ead9] border border-[#a7d4ac] text-xs font-black text-[#166534] shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#166534]" />
            <span>
              {language === "mr"
                ? "स्मार्ट इंडिया हॅकेथॉन २०२६ • १ किमी अचूक गावपातळी हवामान"
                : "Smart India Hackathon 2026 • 1 km Hyper-Local Weather AI"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f2918] tracking-tight leading-[1.15]">
            {language === "mr" ? (
              <>
                तुमच्या <span className="text-[#166534] underline decoration-[#166534]/30 underline-offset-4">गावातील शेतासाठी</span> अचूक पाऊस व पीक सल्ला
              </>
            ) : (
              <>
                Accurate <span className="text-[#166534] underline decoration-[#166534]/30 underline-offset-4">Village-Level Weather</span> & Crop Advisory
              </>
            )}
          </h1>

          <p className="text-sm md:text-base text-[#2b4c34] font-bold leading-relaxed max-w-2xl mx-auto">
            {language === "mr"
              ? "तालुक्याचे ढोबळ अंदाज विसरा. आता प्रत्यक्ष तुमच्या ग्रामपंचायतीसाठी १ किमी अचूक पाऊस, फवारणीची सुरक्षित वेळ आणि पाणी नियोजनाचा सल्ला थेट मोबाईलवर मिळवा."
              : "Move beyond generic block-level forecasts. Get high-precision 1 km rainfall estimates, safe spraying windows, and actionable crop advisories designed specifically for smallholder farmers."}
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              onClick={() => loginAs("farmer", "Ramesh Tukaram Patil", "9823456789")}
              className="px-6 py-3.5 bg-[#166534] hover:bg-[#15803d] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#166534]/25 transition-all flex items-center gap-2.5 hover:scale-[1.02]"
            >
              <span>👨‍🌾</span>
              <span>{language === "mr" ? "शेतकरी डॅशबोर्ड पहा (मोफत)" : "Farmer Portal (Free)"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/advisory"
              className="px-5 py-3.5 bg-[#f4f8f4] hover:bg-[#e6efe6] text-[#166534] border border-[#c8d9c8] rounded-2xl text-sm font-black shadow-2xs transition-all flex items-center gap-2"
            >
              <Sprout className="w-4 h-4 text-[#166534]" />
              <span>{language === "mr" ? "पीक सल्ला (Advisory)" : "Crop Advisories"}</span>
            </Link>

            <Link
              href="/comparison"
              className="px-5 py-3.5 bg-[#f4f8f4] hover:bg-[#e6efe6] text-[#2b4c34] border border-[#c8d9c8] rounded-2xl text-sm font-black shadow-2xs transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-[#166534]" />
              <span>{language === "mr" ? "अचूकता पडताळणी" : "Accuracy Scorecard"}</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE "CHECK MY VILLAGE" LIVE PREVIEW CARD */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto bg-white border border-[#c8d9c8] rounded-3xl p-5 md:p-7 shadow-md space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5eee5] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs md:text-sm font-black uppercase text-[#166534] tracking-wider">
                {language === "mr" ? "📍 तुमच्या गावाचे थेट हवामान तपासा:" : "📍 Live Village Weather Check:"}
              </span>
            </div>

            {/* Quick Village Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2b4c34] hidden sm:inline">
                {language === "mr" ? "गाव निवडा:" : "Select Village:"}
              </span>
              <select
                value={selectedVillageIndex}
                onChange={(e) => setSelectedVillageIndex(Number(e.target.value))}
                aria-label={language === "mr" ? "गाव निवडा" : "Select Village"}
                className="bg-[#f3f7f3] border border-[#c8d9c8] text-[#0f2918] font-black text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              >
                {PANCHAYATS_DATA.map((p, idx) => (
                  <option key={p.lgd_code} value={idx}>
                    {p.panchayat_name} ({p.district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Village Weather Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Box 1: Village & Elevation */}
            <div className="p-4 rounded-2xl bg-[#f8faf8] border border-[#dce8dc] space-y-1">
              <span className="text-[10px] font-black text-[#2b4c34] uppercase tracking-wider block">
                {language === "mr" ? "ग्रामपंचायत व उंची" : "Panchayat & Elevation"}
              </span>
              <div className="text-xl font-black text-[#0f2918] truncate">
                {currentVillage.panchayat_name}
              </div>
              <p className="text-xs text-[#2b4c34] font-bold">
                {currentVillage.district} &bull; {currentVillage.elevation_m}m {language === "mr" ? "उंची" : "ASL"}
              </p>
            </div>

            {/* Box 2: Rain Forecast */}
            <div className="p-4 rounded-2xl bg-[#ecf7ec] border border-[#a7d4ac] space-y-1 ring-1 ring-[#166534]/20">
              <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider block flex items-center justify-between">
                <span>{language === "mr" ? "पाऊस अंदाज (आज)" : "Rainfall (Today)"}</span>
                <CloudRain className="w-3.5 h-3.5 text-[#166534]" />
              </span>
              <div className="text-2xl font-black text-[#166534]">
                {formatRainfall(currentVillage.latest_rainfall_estimate)}
              </div>
              <p className="text-xs text-[#166534] font-black">
                {currentVillage.latest_rainfall_estimate < 0.1
                  ? language === "mr" ? "पाऊस नाही / कोरडे" : "No Rain Expected"
                  : currentVillage.latest_rainfall_estimate < 5
                  ? language === "mr" ? "हलका पाऊस संभवतो" : "Light Showers"
                  : language === "mr" ? "मध्यम पाऊस संभवतो" : "Moderate Rain"}
              </p>
            </div>

            {/* Box 3: Temperature & Climate */}
            <div className="p-4 rounded-2xl bg-[#f8faf8] border border-[#dce8dc] space-y-1">
              <span className="text-[10px] font-black text-[#2b4c34] uppercase tracking-wider block flex items-center justify-between">
                <span>{language === "mr" ? "तापमान व ओलावा" : "Temp & Humidity"}</span>
                <Sun className="w-3.5 h-3.5 text-amber-600" />
              </span>
              <div className="text-2xl font-black text-[#0f2918]">
                {formatTemp(currentVillage.latest_temp_estimate)}
              </div>
              <p className="text-xs text-[#2b4c34] font-bold">
                {language === "mr" ? "हवेतील आर्द्रता:" : "Humidity:"} 68% &bull; {language === "mr" ? "वारा:" : "Wind:"} 8 km/h
              </p>
            </div>

            {/* Box 4: Spray Window */}
            <div className="p-4 rounded-2xl bg-[#fef8ea] border border-[#f4db9b] space-y-1">
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block flex items-center justify-between">
                <span>{language === "mr" ? "फवारणी सल्ला" : "Spraying Window"}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              </span>
              <div className="text-sm font-black text-amber-900">
                {language === "mr" ? "सकाळी ७:३० ते ११:००" : "7:30 AM - 11:00 AM"}
              </div>
              <p className="text-[11px] text-amber-800 font-bold">
                {language === "mr" ? "फवारणीसाठी सुरक्षित वेळ" : "Safe spray condition"}
              </p>
            </div>
          </div>

          {/* Actionable Voice & WhatsApp Bar */}
          <div className="p-4 rounded-2xl bg-[#f3f7f3] border border-[#c8d9c8] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                  isPlayingAudio
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-[#166534] hover:bg-[#15803d] text-white shadow-xs"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>
                  {isPlayingAudio
                    ? language === "mr" ? "थांबवा (Stop Audio)" : "Stop Audio"
                    : language === "mr" ? "🔊 मराठीत ऐका (Voice Audio)" : "🔊 Listen in Voice"}
                </span>
              </button>
              <span className="text-xs font-bold text-[#2b4c34] hidden md:inline">
                {language === "mr"
                  ? "वाचण्याची गरज नाही — थेट आवाज ऐका!"
                  : "No reading required — listen in simple vernacular!"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `*मेघदृष्टी १ किमी हवामान अंदाज (${currentVillage.panchayat_name})*:\nपाऊस: ${formatRainfall(
                    currentVillage.latest_rainfall_estimate
                  )}\nतापमान: ${formatTemp(
                    currentVillage.latest_temp_estimate
                  )}\nफवारणी वेळ: सकाळी ७:३० ते ११:०० सुरक्षित.\nअधिक माहिती: https://meghdrishti.vercel.app`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === "mr" ? "WhatsApp वर पाठवा" : "Share on WhatsApp"}</span>
              </a>

              <Link
                href="/dashboard"
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#e6efe6] text-[#166534] border border-[#c8d9c8] text-xs font-black flex items-center gap-1.5 transition-all"
              >
                <span>{language === "mr" ? "पूर्ण तपशील" : "Full View"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. "HOW IT HELPS THE FARMER" - 4 ACTIONABLE BENEFITS */}
      {/* ========================================================= */}
      <section className="bg-white border-y border-[#c8d9c8] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "शेतकऱ्यांचा खरा फायदा" : "DIRECT FARMER BENEFITS"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
              {language === "mr"
                ? "मेघदृष्टी ॲपमुळे तुमचे नुकसान कसे वाचते?"
                : "How MeghDrishti Protects Your Crops & Saves Money"}
            </h2>
            <p className="text-xs md:text-sm text-[#2b4c34] font-bold">
              {language === "mr"
                ? "केवळ हवामानाचे आकडे नव्हे, तर शेतात प्रत्यक्ष काय करायचे ते समजा."
                : "Not just meteorology metrics — direct, practical agricultural guidance."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Benefit 1 */}
            <div className="p-6 rounded-3xl bg-[#f8faf8] border border-[#dce8dc] hover:border-[#166534] transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌧️
                </div>
                <h3 className="text-lg font-black text-[#0f2918]">
                  {language === "mr" ? "१. १ किमी गाव पाऊस" : "1. 1 km Village Rain"}
                </h3>
                <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                  {language === "mr"
                    ? "तुमच्या गावात आज पाऊस पडेल का आणि किती पडेल, हे डोंगर व स्थानिक उताराचा विचार करून अचूक समजते."
                    : "Know exactly when and how much rain will fall on your village with terrain-aware 1 km spatial resolution."}
                </p>
              </div>
              <div className="text-[11px] font-black text-[#166534] pt-3 border-t border-[#dce8dc]">
                {language === "mr" ? "✅ अचूक अंदाज" : "✅ High Accuracy"}
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-3xl bg-[#f8faf8] border border-[#dce8dc] hover:border-[#166534] transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🧪
                </div>
                <h3 className="text-lg font-black text-[#0f2918]">
                  {language === "mr" ? "२. फवारणीची योग्य वेळ" : "2. Safe Spray Windows"}
                </h3>
                <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                  {language === "mr"
                    ? "महागडी औषधे फवारल्यानंतर पाऊस येऊन वाया जाऊ नये म्हणून वाऱ्याचा वेग व पावसाचा अचूक तास तपासा."
                    : "Prevent expensive chemical spray wash-offs by checking hourly rain probability and wind speeds."}
                </p>
              </div>
              <div className="text-[11px] font-black text-[#166534] pt-3 border-t border-[#dce8dc]">
                {language === "mr" ? "💰 खतांची व औषधांची बचत" : "💰 Save Chemical Costs"}
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-3xl bg-[#f8faf8] border border-[#dce8dc] hover:border-[#166534] transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-lg font-black text-[#0f2918]">
                  {language === "mr" ? "३. पाणी व वीज बचत" : "3. Water & Power Savings"}
                </h3>
                <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                  {language === "mr"
                    ? "उद्या पाऊस होणार असल्यास विनाकारण मोटार चालवणे व डिझेल जाळणे थांबवून विजेची बचत करा."
                    : "Avoid unnecessary pumping when rain is imminent. Save diesel, electricity, and prevent waterlogging."}
                </p>
              </div>
              <div className="text-[11px] font-black text-[#166534] pt-3 border-t border-[#dce8dc]">
                {language === "mr" ? "💧 जल संवर्धन व बचत" : "💧 Smart Irrigation"}
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="p-6 rounded-3xl bg-[#f8faf8] border border-[#dce8dc] hover:border-[#166534] transition-all space-y-3 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌾
                </div>
                <h3 className="text-lg font-black text-[#0f2918]">
                  {language === "mr" ? "४. कीड व रोग सावधगिरी" : "4. Pest & Disease Alerts"}
                </h3>
                <p className="text-xs text-[#2b4c34] font-bold leading-relaxed">
                  {language === "mr"
                    ? "कापूस, सोयाबीन, कांदा पिकांवर दमट हवामानामुळे येणाऱ्या किडींचा आगाऊ इशारा व उपायांचा सल्ला मिळवा."
                    : "Receive crop-specific pest warnings triggered by high humidity and temperature spikes with exact dosage."}
                </p>
              </div>
              <div className="text-[11px] font-black text-[#166534] pt-3 border-t border-[#dce8dc]">
                {language === "mr" ? "🛡️ पीक संरक्षण" : "🛡️ Crop Protection"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BEFORE VS AFTER COMPARISON TABLE FOR FARMERS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
            {language === "mr" ? "तुलना व फरक" : "CLEAR COMPARISON"}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
            {language === "mr"
              ? "इतर ॲप्स विरुद्ध मेघदृष्टी १ किमी"
              : "Generic Weather Apps vs MeghDrishti 1 km"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Generic Apps */}
          <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-200 text-rose-800 flex items-center justify-center font-black">
                ❌
              </div>
              <div>
                <h3 className="text-base font-black text-rose-950">
                  {language === "mr" ? "इतर सामान्य हवामान ॲप्स" : "Generic Weather Apps"}
                </h3>
                <span className="text-xs text-rose-800 font-bold">
                  {language === "mr" ? "१० किमी ते २५ किमी कच्चा अंदाज" : "Coarse 10-25 km block grid"}
                </span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-rose-900 font-bold">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-black">✕</span>
                <span>
                  {language === "mr"
                    ? "संपूर्ण तालुक्याचा एकच अंदाज दाखवतात (डोंगर व खोऱ्यातील फरक दुर्लक्षित)."
                    : "Shows one single forecast for entire taluka, ignoring hill slopes and valleys."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-black">✕</span>
                <span>
                  {language === "mr"
                    ? "केवळ '६०% पाऊस' असा गोंधळात टाकणारा आकडा सांगतात."
                    : "Outputs vague '60% rain' without actionable spraying or irrigation guidance."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-black">✕</span>
                <span>
                  {language === "mr"
                    ? "मराठी आवाज किंवा व्हॉट्सॲप शेअरिंगची सुविधा नसते."
                    : "No vernacular voice narration or one-tap WhatsApp advisory sharing."}
                </span>
              </li>
            </ul>
          </div>

          {/* MeghDrishti */}
          <div className="p-6 rounded-3xl bg-[#e6f4e6] border-2 border-[#166534] space-y-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#166534] text-white flex items-center justify-center font-black">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#0f2918]">
                  {language === "mr" ? "मेघदृष्टी १ किमी AI बुद्धिमत्ता" : "MeghDrishti 1 km AI"}
                </h3>
                <span className="text-xs text-[#166534] font-black">
                  {language === "mr" ? "प्रत्येक ग्रामपंचायतीनुसार अचूक" : "Calibrated for individual Panchayats"}
                </span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-[#0f2918] font-black">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                <span>
                  {language === "mr"
                    ? "गावातील प्रत्यक्ष समुद्रसपाटीपासूनची उंची (DEM) आणि मातीच्या प्रकारानुसार अचूक पाऊस."
                    : "1 km resolution with terrain lapse-rate and soil clay retention adjustments."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                <span>
                  {language === "mr"
                    ? "स्पष्ट शेती सल्ला: 'सकाळी ८ ते ११ फवारणी करा', '२ दिवस पाणी थांबवा'."
                    : "Direct agronomic actions: exact spray windows, irrigation pauses, and pesticide remedies."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                <span>
                  {language === "mr"
                    ? "🔊 १-क्लिक मराठी आवाज आणि 📲 थेट व्हॉट्सॲपवर शेतकरी ग्रुपमध्ये पाठवण्याची सोय."
                    : "1-Click Marathi/English voice audio and instant WhatsApp community sharing."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CROP ADVISORY PREVIEW CARDS */}
      {/* ========================================================= */}
      <section className="bg-white border-y border-[#c8d9c8] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
                {language === "mr" ? "पीकनिहाय कृती सल्ला" : "POPULAR CROP ADVISORIES"}
              </span>
              <h2 className="text-2xl font-black text-[#0f2918] tracking-tight">
                {language === "mr" ? "प्रमुख पिकांसाठी उपयुक्त सूचना" : "Tailored Decision Support for Key Crops"}
              </h2>
            </div>

            <Link
              href="/advisory"
              className="px-4 py-2 rounded-full bg-[#f3f7f3] text-xs font-black text-[#166534] border border-[#c8d9c8] hover:bg-[#e6efe6] transition-all flex items-center gap-1.5"
            >
              <span>{language === "mr" ? "सर्व पिके पहा" : "View All Crops"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleCrops.map((crop, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-[#f8faf8] border border-[#dce8dc] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{crop.icon}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${crop.badgeColor}`}>
                      {crop.stage}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#0f2918]">
                    {language === "mr" ? crop.nameMr : crop.nameEn}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-[#e5eee5] flex items-center justify-between">
                      <span className="text-[#2b4c34] font-bold">
                        {language === "mr" ? "फवारणी:" : "Spray:"}
                      </span>
                      <strong className="text-[#166534] font-black">{crop.spray}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#e5eee5] flex items-center justify-between">
                      <span className="text-[#2b4c34] font-bold">
                        {language === "mr" ? "पाणी व्यवस्थापन:" : "Irrigation:"}
                      </span>
                      <strong className="text-[#0f2918] font-black">{crop.irrigation}</strong>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#e5eee5] flex items-center justify-between">
                      <span className="text-[#2b4c34] font-bold">
                        {language === "mr" ? "कीड दक्षता:" : "Pest:"}
                      </span>
                      <strong className="text-amber-800 font-black">{crop.pest}</strong>
                    </div>
                  </div>
                </div>

                <Link
                  href="/advisory"
                  className="w-full py-2 bg-white hover:bg-[#166534] hover:text-white text-[#166534] border border-[#c8d9c8] rounded-xl text-xs font-black text-center transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>{language === "mr" ? "सल्ला वाचा" : "Open Advisory"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. DUAL ROLE ACCESS (FARMER & OFFICER) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
            {language === "mr" ? "वापरकर्ता प्रवेश" : "DUAL PORTAL ACCESS"}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
            {language === "mr"
              ? "शेतकरी आणि कृषी अधिकारी दोघांसाठी स्वतंत्र व्यवस्था"
              : "Dedicated Portals for Farmers & Agricultural Officers"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Farmer Card */}
          <div className="p-6 rounded-3xl bg-white border-2 border-emerald-600 space-y-5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#d7ead9] text-[#166534] flex items-center justify-center text-2xl font-black">
                👨‍🌾
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0f2918]">
                  {language === "mr" ? "शेतकरी पोर्टल (Kisan Portal)" : "Farmer Portal (Kisan Portal)"}
                </h3>
                <span className="text-xs text-[#166534] font-black">
                  {language === "mr" ? "मोफत • साधा व सोपा इंटरफेस" : "Free • Clean & Simple Mobile View"}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#2b4c34] font-bold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                <span>{language === "mr" ? "१ किमी अचूक गाव पाऊस अंदाज" : "1 km village rainfall forecast"}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                <span>{language === "mr" ? "फवारणी वेळ व सिंचन सल्ला" : "Safe spraying window & irrigation timing"}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                <span>{language === "mr" ? "🔊 मराठी ऑडिओ व WhatsApp शेअरिंग" : "Vernacular audio & WhatsApp sharing"}</span>
              </li>
            </ul>

            <Link
              href="/dashboard"
              onClick={() => loginAs("farmer", "Ramesh Tukaram Patil", "9823456789")}
              className="w-full py-3 bg-[#166534] hover:bg-[#15803d] text-white rounded-2xl text-xs font-black text-center transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{language === "mr" ? "शेतकरी म्हणून लॉगिन करा (1-Click)" : "Login as Farmer (1-Click)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Officer Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#c8d9c8] space-y-5 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl font-black">
                🏛️
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0f2918]">
                  {language === "mr" ? "अधिकारी पोर्टल (Officer Portal)" : "Officer Portal (Govt Nodal)"}
                </h3>
                <span className="text-xs text-blue-800 font-black">
                  {language === "mr" ? "कृषी विभाग, IMD व KVK साठी" : "For Agronomists, IMD & District Officials"}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-[#2b4c34] font-bold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span>{language === "mr" ? "झोनल अचूकता स्कोअरकार्ड (RMSE, POD, FAR)" : "Zonal Skill Scorecards (RMSE, POD, FAR)"}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span>{language === "mr" ? "मॉडेल कॅलिब्रेशन व बायस ऑडिट" : "Terrain lapse-rate model calibration"}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span>{language === "mr" ? "तातडीच्या हवामान आपत्ती सूचना प्रसारण" : "Emergency disaster advisory broadcast"}</span>
              </li>
            </ul>

            <Link
              href="/officer"
              onClick={() => loginAs("officer", "Dr. Aniruddha Deshmukh", "OFFICER_IMD_2026")}
              className="w-full py-3 bg-[#0f2918] hover:bg-[#1a3824] text-white rounded-2xl text-xs font-black text-center transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>{language === "mr" ? "अधिकारी म्हणून लॉगिन करा (1-Click)" : "Login as Officer (1-Click)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ========================================================= */}
      <section className="bg-white border-y border-[#c8d9c8] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#166534] uppercase tracking-wider block">
              {language === "mr" ? "नेहमी विचारले जाणारे प्रश्न" : "FARMER FAQ"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
              {language === "mr" ? "शेतकरी बांधवांचे सामान्य प्रश्न" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#f8faf8] border border-[#dce8dc] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-black text-sm text-[#0f2918] hover:text-[#166534]"
                >
                  <span>{language === "mr" ? faq.qMr : faq.qEn}</span>
                  <span className="text-lg font-black text-[#166534]">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs font-bold text-[#2b4c34] leading-relaxed border-t border-[#e5eee5] pt-3">
                    {language === "mr" ? faq.aMr : faq.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CALL TO ACTION FOOTER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2918] tracking-tight">
            {language === "mr"
              ? "आजच तुमच्या गावाचे अचूक हवामान तपासा!"
              : "Check Your Village Weather Accuracy Today!"}
          </h2>
          <p className="text-xs md:text-sm text-[#2b4c34] font-bold">
            {language === "mr"
              ? "स्मार्ट इंडिया हॅकेथॉन २०२६ उपक्रम • सर्व शेतकऱ्यांसाठी विनामूल्य"
              : "Smart India Hackathon 2026 Initiative • Completely Free for Farmers"}
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#166534] hover:bg-[#15803d] text-white rounded-2xl text-sm font-black shadow-lg shadow-[#166534]/30 hover:scale-[1.03] transition-all"
            >
              <span>{language === "mr" ? "थेट डॅशबोर्डवर जा" : "Open Live Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-[#e5eee5] border-t border-[#c8d9c8] px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#2b4c34] font-bold">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#166534]">MeghDrishti (मेघदृष्टी)</span>
            <span>&bull; Smart India Hackathon 2026</span>
          </div>
          <div>
            1 km Resolution Machine Learning Weather Downscaling for Rural India
          </div>
        </div>
      </footer>
    </div>
  );
}
