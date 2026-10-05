"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Check,
  Droplets,
  Clock,
  FlaskConical,
  Bug,
  MessageCircle,
} from "lucide-react";
import { CropAdvisory } from "@/lib/types";
import { TrustBadge } from "./TrustBadge";
import { useLanguage } from "@/lib/LanguageContext";
import { tx } from "@/lib/t";

interface AdvisoryCardProps {
  advisory: CropAdvisory;
  onLanguageChange?: (lang: "en" | "mr" | "hi") => void;
  onCropChange?: (crop: string) => void;
  onStageChange?: (stage: string) => void;
}

interface CropMeta {
  id: string;
  en: string;
  mr: string;
  hi: string;
}

const CROPS: CropMeta[] = [
  { id: "Cotton",    en: "Cotton",    mr: "कापूस",    hi: "कपास" },
  { id: "Soybean",   en: "Soybean",   mr: "सोयाबीन",  hi: "सोयाबीन" },
  { id: "Maize",    en: "Maize",     mr: "मका",      hi: "मक्का" },
  { id: "Onion",    en: "Onion",     mr: "कांदा",    hi: "प्याज" },
  { id: "Tomato",   en: "Tomato",    mr: "टोमॅटो",   hi: "टमाटर" },
  { id: "Sugarcane",en: "Sugarcane", mr: "ऊस",       hi: "गन्ना" },
  { id: "Wheat",    en: "Wheat",     mr: "गहू",      hi: "गेहूं" },
];

const STAGES_MAP: Record<string, { en: string; mr: string; hi: string }[]> = {
  Cotton: [
    { en: "Sowing / Seedling",           mr: "पेरणी / उगवण अवस्था",             hi: "बुवाई / पौध" },
    { en: "Vegetative Growth",            mr: "शाकीय वाढ अवस्था",                hi: "वानस्पतिक वृद्धि" },
    { en: "Flowering / Square Formation", mr: "पात्या व फुले येण्याची अवस्था",   hi: "फूल / कली अवस्था" },
    { en: "Boll Formation / Development", mr: "बोंड भरण्याची अवस्था",            hi: "बोल निर्माण" },
    { en: "Boll Bursting / Harvesting",   mr: "बोंड फुटणे / वेचणी",              hi: "बोल फटना / कटाई" },
  ],
  Soybean: [
    { en: "Sowing / Germination",     mr: "पेरणी व उगवण",             hi: "बुवाई / अंकुरण" },
    { en: "Vegetative / Branching",   mr: "फांद्या फुटण्याची अवस्था", hi: "वानस्पतिक / शाखाएं" },
    { en: "Flowering Stage",          mr: "फुलोरा अवस्था",            hi: "फूल अवस्था" },
    { en: "Pod Formation & Filling",  mr: "शेंगा भरणे व दाणे पोसणे", hi: "फली निर्माण" },
    { en: "Maturity / Harvesting",    mr: "कापणी / मळणी",             hi: "परिपक्वता / कटाई" },
  ],
  Maize: [
    { en: "Knee High Stage",           mr: "गुडघाभर वाढ",                      hi: "घुटने तक बढ़वार" },
    { en: "Tasseling & Silking",       mr: "तुरा व कणसाचे केस बाहेर पडणे",   hi: "नर-मंजरी और रेशम" },
    { en: "Grain Filling (Milk stage)",mr: "दाणे भरणे (दुधाळ अवस्था)",       hi: "दाना भरना (दूधिया)" },
    { en: "Maturity / Harvest",        mr: "कापणी",                            hi: "परिपक्वता / कटाई" },
  ],
  Onion: [
    { en: "Nursery / Transplanting", mr: "रोपवाटिका / पुनर्लागवड", hi: "नर्सरी / रोपाई" },
    { en: "Vegetative Growth",       mr: "पातीची वाढ",              hi: "वानस्पतिक वृद्धि" },
    { en: "Bulb Development",        mr: "कांदा पोसणे (कंद विकास)", hi: "कंद विकास" },
    { en: "Maturity / Harvesting",   mr: "काढणी / सुकवणे",          hi: "परिपक्वता / खुदाई" },
  ],
  Tomato: [
    { en: "Transplanting",           mr: "पुनर्लागवड",           hi: "रोपाई" },
    { en: "Vegetative / Staking",    mr: "फांद्यांची वाढ / बांधणी", hi: "बढ़वार / बांधना" },
    { en: "Flowering & Fruit Set",   mr: "फुलोरा व फळधारणा",    hi: "फूल और फल निर्माण" },
    { en: "Fruit Maturation & Picking", mr: "फळ काढणी (तोडा)",  hi: "फल पकना / तुड़ाई" },
  ],
  Sugarcane: [
    { en: "Germination (0-45 days)",  mr: "उगवण काळ (०-४५ दिवस)",    hi: "अंकुरण (0-45 दिन)" },
    { en: "Tillering Stage",          mr: "फुटवे फुटण्याची अवस्था",  hi: "कल्ले फूटना" },
    { en: "Grand Growth (Elongation)",mr: "मोठी वाढ (कांडी भरणे)",   hi: "तीव्र वृद्धि (बढ़ाव)" },
    { en: "Ripening & Harvesting",    mr: "पक्वता व तोडणी",           hi: "पकना और कटाई" },
  ],
  Wheat: [
    { en: "Crown Root Initiation", mr: "मुकुट मुळे फुटणे (CRI)", hi: "मुकुट जड़ निर्माण (CRI)" },
    { en: "Tillering / Stem Extension", mr: "फुटवे व कांडी भरणे", hi: "कल्ले फूटना / तना विस्तार" },
    { en: "Heading & Flowering", mr: "ओंबी बाहेर पडणे व फुलोरा", hi: "बाली निकलना और फूल" },
    { en: "Grain Milk / Dough Stage", mr: "दाणे भरणे व पक्वता", hi: "दुधिया दाना व परिपक्वता" },
  ],
};

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({
  advisory,
  onLanguageChange,
  onCropChange,
  onStageChange,
}) => {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeCropStages = STAGES_MAP[advisory.crop] || STAGES_MAP["Cotton"];

  const handleSpeak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      let textToSpeak = "";
      if (language === "mr" || advisory.language === "mr") {
        textToSpeak = `${advisory.panchayat_name} शेतकरी सल्ला. पीक ${advisory.crop}, अवस्था ${advisory.stage}. मुख्य सल्ला: ${advisory.recommended_action}. कारण: ${advisory.why}. फवारणी: ${advisory.spray_window || ""}. सिंचन: ${advisory.irrigation_advice || ""}. कीड सावधगिरी: ${advisory.pest_alert || ""} ${advisory.pest_remedy || ""}`;
      } else if (language === "hi" || advisory.language === "hi") {
        textToSpeak = `${advisory.panchayat_name} किसान फसल सलाह। फसल ${advisory.crop}, अवस्था ${advisory.stage}। मुख्य सलाह: ${advisory.recommended_action}। कारण: ${advisory.why}। छिड़काव: ${advisory.spray_window || ""}। सिंचाई: ${advisory.irrigation_advice || ""}। कीट चेतावनी: ${advisory.pest_alert || ""} ${advisory.pest_remedy || ""}`;
      } else {
        textToSpeak = `MeghDrishti Farmer Advisory for ${advisory.panchayat_name}. Crop ${advisory.crop}, stage ${advisory.stage}. Recommended Action: ${advisory.recommended_action}. Reason: ${advisory.why}. Spray Window: ${advisory.spray_window || ""}. Irrigation: ${advisory.irrigation_advice || ""}. Pest Alert: ${advisory.pest_alert || ""} ${advisory.pest_remedy || ""}`;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === "mr" || advisory.language === "mr" ? "mr-IN" : language === "hi" || advisory.language === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShareWhatsApp = () => {
    let msg = "";
    if (language === "mr") {
      msg = `*मेघदृष्टी ग्रामपंचायत शेतकरी सल्ला*\n*गाव:* ${advisory.panchayat_name}\n*पीक:* ${advisory.crop} (${advisory.stage})\n*अपेक्षित पाऊस:* ${advisory.forecast_rainfall_mm} मिमी\n\n*मुख्य सल्ला:* ${advisory.recommended_action}\n*कारण:* ${advisory.why}\n*फवारणी:* ${advisory.spray_window || "योग्य वेळ"}\n*सिंचन:* ${advisory.irrigation_advice || "नेहमीप्रमाणे"}\n*कीड नियंत्रण:* ${advisory.pest_alert || ""} - ${advisory.pest_remedy || ""}\n\n_मेघदृष्टी १ किमी अचूक स्थानिक हवामान प्रणाली_`;
    } else if (language === "hi") {
      msg = `*मेघदृष्टि ग्राम पंचायत किसान सलाह*\n*गाँव:* ${advisory.panchayat_name}\n*फसल:* ${advisory.crop} (${advisory.stage})\n*अपेक्षित वर्षा:* ${advisory.forecast_rainfall_mm} मिमी\n\n*मुख्य सलाह:* ${advisory.recommended_action}\n*कारण:* ${advisory.why}\n*छिड़काव:* ${advisory.spray_window || "उचित समय"}\n*सिंचाई:* ${advisory.irrigation_advice || "नियमित"}\n*कीट नियंत्रण:* ${advisory.pest_alert || ""} - ${advisory.pest_remedy || ""}\n\n_मेघदृष्टि 1 किमी स्थानिक मौसम AI प्रणाली_`;
    } else {
      msg = `*MeghDrishti Panchayat Farmer Advisory*\n*Hub:* ${advisory.panchayat_name}\n*Crop:* ${advisory.crop} (${advisory.stage})\n*Expected Rain:* ${advisory.forecast_rainfall_mm} mm\n\n*Action:* ${advisory.recommended_action}\n*Reason:* ${advisory.why}\n*Spray Window:* ${advisory.spray_window || "Safe window"}\n*Irrigation:* ${advisory.irrigation_advice || "Regular schedule"}\n*Pest Alert:* ${advisory.pest_alert || ""} - ${advisory.pest_remedy || ""}\n\n_MeghDrishti 1km AI Weather Intelligence_`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  return (
    <div className="bg-[#f4f8f4] border border-[#c8d9c8] rounded-3xl p-5 md:p-6 shadow-xs h-full flex flex-col justify-between space-y-4">
      {/* Top Advisory Header & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#c8d9c8]">
        <div>
          <h3 className="text-base md:text-lg font-black text-[#0f2918] leading-tight">
            {tx(language, "advisoryTitle")}
          </h3>
          <p className="text-xs text-[#2b4c34] font-bold mt-0.5">
            {tx(language, "advisoryFor")}{" "}
            <strong className="text-[#166534] font-black">{advisory.panchayat_name}</strong>
          </p>
        </div>

        {/* Action Buttons: Voice Audio & WhatsApp Share */}
        <div className="flex items-center gap-2">
          {/* Voice Readout Button */}
          <button
            onClick={handleSpeak}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all border shadow-2xs ${
              isSpeaking
                ? "bg-[#166534] text-white border-[#166534] animate-pulse"
                : "bg-[#d7ead9] text-[#166534] border-[#a7d4ac] hover:bg-[#c6e2ca]"
            }`}
            title="Listen to Voice Advisory"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? tx(language, "voiceStop") : tx(language, "voiceRead")}</span>
          </button>

          {/* WhatsApp Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-[#e4eee4] text-[#166534] border border-[#c3d6c4] hover:bg-[#d5e4d5] transition-all shadow-2xs"
            title="Share via WhatsApp"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-700" />
            ) : (
              <MessageCircle className="w-4 h-4 text-[#166534]" />
            )}
            <span>{copied ? tx(language, "copied") : tx(language, "shareWhatsApp")}</span>
          </button>
        </div>
      </div>

      {/* Crop Selector (Clean Text Pill Buttons) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-black text-[#0f2918] uppercase tracking-wider">
          {tx(language, "selectCrop")}
        </label>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full">
          {CROPS.map((c) => {
            const isSelected = advisory.crop === c.id;
            const label = language === "mr" ? c.mr : language === "hi" ? c.hi : c.en;
            return (
              <button
                key={c.id}
                onClick={() => onCropChange && onCropChange(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-black border transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#166534] text-white border-[#166534] shadow-xs font-black"
                    : "bg-[#e6efe6] text-[#166534] border-[#c3d6c4] hover:bg-[#dbe8db]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Growth Stage Selector */}
      <div className="space-y-1">
        <label className="block text-xs font-black text-[#0f2918] uppercase tracking-wider">
          {tx(language, "growthStage")}
        </label>
        <select
          value={advisory.stage}
          onChange={(e) => onStageChange && onStageChange(e.target.value)}
          className="w-full bg-[#e4eee4] border border-[#c3d6c4] rounded-xl px-3 py-2 text-xs font-extrabold text-[#0f2918] focus:outline-none focus:ring-2 focus:ring-[#166534] cursor-pointer"
        >
          {activeCropStages.map((s) => (
            <option key={s.en} value={s.en}>
              {language === "mr" ? s.mr : language === "hi" ? s.hi : s.en}
            </option>
          ))}
        </select>
      </div>

      {/* 3 Quick Decision Indicators: Spraying, Irrigation, Fertilizer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* 1. Spray Window Card */}
        <div className="p-3 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#166534] font-black uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#166534]" />
              {tx(language, "sprayWindow")}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                advisory.spray_status === "AVOID"
                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                  : advisory.spray_status === "CAUTION"
                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                  : "bg-emerald-100 text-[#166534] border border-emerald-300"
              }`}
            >
              {advisory.spray_status === "AVOID"
                ? tx(language, "hold")
                : advisory.spray_status === "CAUTION"
                ? tx(language, "caution")
                : tx(language, "safe")}
            </span>
          </div>
          <p className="text-xs font-black text-[#0f2918] leading-tight">
            {advisory.spray_window || tx(language, "defaultSpray")}
          </p>
        </div>

        {/* 2. Irrigation Guidance Card */}
        <div className="p-3 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#166534] font-black uppercase flex items-center gap-1">
              <Droplets className="w-3 h-3 text-[#166534]" />
              {tx(language, "irrigation")}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                advisory.irrigation_status === "STOP"
                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                  : "bg-sky-100 text-sky-800 border border-sky-300"
              }`}
            >
              {advisory.irrigation_status === "STOP" ? tx(language, "stop") : tx(language, "irrigate")}
            </span>
          </div>
          <p className="text-xs font-black text-[#0f2918] leading-tight">
            {advisory.irrigation_advice || tx(language, "defaultIrrigation")}
          </p>
        </div>

        {/* 3. Fertilizer Recommendation */}
        <div className="p-3 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#166534] font-black uppercase flex items-center gap-1">
              <FlaskConical className="w-3 h-3 text-[#166534]" />
              {tx(language, "fertilizer")}
            </span>
          </div>
          <p className="text-xs font-black text-[#0f2918] leading-tight truncate">
            {advisory.fertilizer_advice || tx(language, "defaultFertilizer")}
          </p>
        </div>
      </div>

      {/* Primary Recommended Action (Large Clear Green Card) */}
      <div className="p-4 rounded-2xl bg-[#d7ead9] border border-[#a7d4ac] space-y-2">
        <div className="flex items-center gap-2 text-[#166534] font-black text-xs uppercase tracking-wider">
          <CheckCircle className="w-4 h-4 text-[#166534] shrink-0" />
          <span>{tx(language, "todayAction")}</span>
        </div>
        <p className="text-sm md:text-base font-black text-[#0f2918] leading-relaxed pl-6">
          {advisory.recommended_action}
        </p>
      </div>

      {/* Why this action? (Scientific Explanation) */}
      <div className="p-3.5 rounded-2xl bg-[#e6efe6] border border-[#c3d6c4] space-y-1">
        <div className="flex items-center gap-2 text-[#0f2918] font-black text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#166534] shrink-0" />
          <span>{tx(language, "agronomicReason")}</span>
        </div>
        <p className="text-xs font-bold text-[#0f2918] leading-relaxed pl-6">
          {advisory.why}
        </p>
      </div>

      {/* Pest & Disease Alert Card */}
      {advisory.pest_alert && (
        <div className="p-3 rounded-2xl bg-[#fef3c7] border border-[#fde68a] space-y-1">
          <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
            <Bug className="w-4 h-4 text-amber-800 shrink-0" />
            <span>{tx(language, "pestAlert")}</span>
          </div>
          <p className="text-xs font-black text-amber-950 leading-relaxed pl-6">
            <strong>{advisory.pest_alert}</strong> &bull;{" "}
            <span className="font-bold">{advisory.pest_remedy}</span>
          </p>
        </div>
      )}

      {/* Footer / Soil Calibration */}
      <div className="text-xs text-[#0f2918] font-bold flex items-center justify-between pt-2 border-t border-[#c8d9c8]">
        <span>
          {tx(language, "soilCalib")}{" "}
          <strong className="text-[#166534] font-black">{advisory.stage}</strong>
        </span>
        <TrustBadge level={advisory.trust_level} />
      </div>
    </div>
  );
};
