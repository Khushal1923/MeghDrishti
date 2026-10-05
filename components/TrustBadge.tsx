"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface TrustBadgeProps {
  level: "High" | "Medium" | "Low" | string;
  score?: number;
  showIcon?: boolean;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  level,
  score,
  showIcon = true,
  className,
}) => {
  const { language } = useLanguage();
  const normalized = level?.toLowerCase() || "high";

  let bgClass = "bg-emerald-50 text-[#166534] border-emerald-200";
  let Icon = ShieldCheck;

  if (normalized === "medium") {
    bgClass = "bg-amber-50 text-amber-800 border-amber-200";
    Icon = Shield;
  } else if (normalized === "low") {
    bgClass = "bg-rose-50 text-rose-800 border-rose-200";
    Icon = ShieldAlert;
  }

  const getLabel = () => {
    if (language === "mr") {
      if (normalized === "medium") return "मध्यम विश्वास";
      if (normalized === "low") return "कमी विश्वास";
      return "उच्च विश्वास";
    }
    if (language === "hi") {
      if (normalized === "medium") return "मध्यम विश्वास";
      if (normalized === "low") return "निम्न विश्वास";
      return "उच्च विश्वास";
    }
    return `${level} Trust`;
  };

  const getTitle = () => {
    if (language === "mr") return "पडताळणी निकषांनुसार विश्वास स्कोअर";
    if (language === "hi") return "सत्यापन मेट्रिक्स से कैलिब्रेटेड विश्वास स्कोर";
    return "Calibrated confidence score from validation metrics";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs transition-colors",
        bgClass,
        className
      )}
      title={getTitle()}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{getLabel()}</span>
      {score !== undefined && (
        <span className="font-mono text-[11px] font-extrabold">
          · {Math.round(score * 100)}%
        </span>
      )}
    </span>
  );
};

