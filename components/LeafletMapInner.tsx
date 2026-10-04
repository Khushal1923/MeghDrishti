"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Panchayat } from "@/lib/types";
import { formatRainfall, formatTemp } from "@/lib/utils";
import { useLanguage, type Language } from "@/lib/LanguageContext";
import "leaflet/dist/leaflet.css";

interface LeafletMapInnerProps {
  panchayats: Panchayat[];
  filtered: Panchayat[];
  zoneFilter: string;
  selectedLgd?: string;
  onSelectPanchayat?: (lgd: string) => void;
  language?: Language;
}

function MapController({
  filtered,
  zoneFilter,
  selectedPanchayat,
}: {
  filtered: Panchayat[];
  zoneFilter: string;
  selectedPanchayat?: Panchayat;
}) {
  const map = useMap();
  const prevZoneRef = useRef<string>(zoneFilter);
  const prevLgdRef = useRef<string | undefined>(selectedPanchayat?.lgd_code);

  useEffect(() => {
    if (!map) return;

    // If zone filter changed, always fit bounds of that zone
    if (prevZoneRef.current !== zoneFilter) {
      prevZoneRef.current = zoneFilter;
      if (filtered.length > 0) {
        const bounds = L.latLngBounds(
          filtered.map((p) => [p.latitude, p.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true });
        return;
      }
    }

    // If selected panchayat changed
    if (selectedPanchayat && prevLgdRef.current !== selectedPanchayat.lgd_code) {
      prevLgdRef.current = selectedPanchayat.lgd_code;
      // If current view already contains the panchayat, smoothly pan to it
      map.flyTo([selectedPanchayat.latitude, selectedPanchayat.longitude], 8, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [map, filtered, zoneFilter, selectedPanchayat]);

  return null;
}

export default function LeafletMapInner({
  panchayats,
  filtered,
  zoneFilter,
  selectedLgd,
  onSelectPanchayat,
  language = "en",
}: LeafletMapInnerProps) {
  const selectedPanchayat = panchayats.find((p) => p.lgd_code === selectedLgd);
  const centerLat = selectedPanchayat ? selectedPanchayat.latitude : 18.1;
  const centerLng = selectedPanchayat ? selectedPanchayat.longitude : 75.5;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={6}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        filtered={filtered}
        zoneFilter={zoneFilter}
        selectedPanchayat={selectedPanchayat}
      />

      {filtered.map((p) => {
        const isSelected = p.lgd_code === selectedLgd;
        const color =
          p.trust_label === "High"
            ? "#166534"
            : p.trust_label === "Medium"
            ? "#d97706"
            : "#dc2626";

        return (
          <CircleMarker
            key={p.lgd_code}
            center={[p.latitude, p.longitude]}
            radius={isSelected ? 11 : 7}
            pathOptions={{
              fillColor: color,
              fillOpacity: 0.9,
              color: isSelected ? "#052e16" : "#ffffff",
              weight: isSelected ? 3.5 : 1.5,
            }}
            eventHandlers={{
              click: () => onSelectPanchayat && onSelectPanchayat(p.lgd_code),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[210px] space-y-2 bg-[#f4f8f4] text-[#0f2918] font-sans">
                <div className="border-b border-[#c8d9c8] pb-1">
                  <h4 className="font-black text-xs text-[#0f2918] leading-tight">
                    {p.panchayat_name}
                  </h4>
                  <p className="text-[10px] text-[#2b4c34] font-bold">
                    {p.district}, {p.state} ({p.zone})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#e6efe6] p-1.5 rounded-lg border border-[#c3d6c4]">
                    <span className="text-[9px] text-[#166534] font-black block uppercase">
                      {language === "mr" ? "पाऊस" : "Rainfall"}
                    </span>
                    <strong className="text-[#166534] text-xs font-black">
                      {formatRainfall(p.latest_rainfall_estimate)}
                    </strong>
                  </div>
                  <div className="bg-[#e6efe6] p-1.5 rounded-lg border border-[#c3d6c4]">
                    <span className="text-[9px] text-[#0f2918] font-black block uppercase">
                      {language === "mr" ? "तापमान" : "Temperature"}
                    </span>
                    <strong className="text-[#0f2918] text-xs font-black">
                      {formatTemp(p.latest_temp_estimate)}
                    </strong>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-[#c8d9c8]">
                  <span className="text-[10px] font-black text-[#166534]">
                    {Math.round(p.trust_score * 100)}% {language === "mr" ? "विश्वास" : "Trust"}
                  </span>
                  <button
                    onClick={() => onSelectPanchayat && onSelectPanchayat(p.lgd_code)}
                    className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#166534] text-white hover:bg-[#15803d] shadow-2xs"
                  >
                    {language === "mr" ? "केंद्र निवडा" : "Select Hub"} &rarr;
                  </button>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
