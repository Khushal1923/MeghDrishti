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

  let bgClass = "bg-[#d7ead9] text-[#166534] border-[#a7d4ac]";
  let Icon = ShieldCheck;
  let labelText = `${level} Trust`;

  if (language === "mr") {
    if (normalized === "high") labelText = "उच्च विश्वास";
    else if (normalized === "medium") labelText = "मध्यम विश्वास";
    else labelText = "सावध";
  }

  if (normalized === "medium") {
    bgClass = "bg-amber-50 text-amber-800 border-amber-300";
    Icon = Shield;
  } else if (normalized === "low") {
    bgClass = "bg-rose-50 text-rose-800 border-rose-300";
    Icon = ShieldAlert;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs transition-colors",
        bgClass,
        className
      )}
      title="Calibrated confidence score from validation metrics"
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{labelText}</span>
      {score !== undefined && (
        <span className="font-mono text-[11px] font-extrabold">
          · {Math.round(score * 100)}%
        </span>
      )}
    </span>
  );
};
