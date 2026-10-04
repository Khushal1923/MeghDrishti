import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRainfall(mm: number): string {
  if (mm === undefined || mm === null || isNaN(mm)) return "0.0 mm";
  return `${mm.toFixed(1)} mm`;
}

export function formatTemp(tempC: number): string {
  if (tempC === undefined || tempC === null || isNaN(tempC)) return "--°C";
  return `${tempC.toFixed(1)}°C`;
}

export function formatPercent(prob: number): string {
  if (prob === undefined || prob === null || isNaN(prob)) return "0%";
  const p = prob > 1 ? prob : prob * 100;
  return `${Math.round(p)}%`;
}
