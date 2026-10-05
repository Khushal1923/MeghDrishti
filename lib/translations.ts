export type Language = "en" | "mr" | "hi";

export interface TranslationDict {
  [key: string]: {
    en: string;
    mr: string;
    hi?: string;
  };
}

export const TRANSLATIONS: TranslationDict = {
  // Brand & Navigation
  "brand.name": {
    en: "MeghDrishti",
    mr: "मेघदृष्टी",
  },
  "brand.tagline": {
    en: "1 km Hyperlocal Panchayat AI Weather & Advisory",
    mr: "१ किमी अचूक ग्रामपंचायत AI हवामान व पीक सल्ला",
  },
  "nav.dashboard": {
    en: "Dashboard",
    mr: "डॅशबोर्ड",
  },
  "nav.advisory": {
    en: "Crop Advisory",
    mr: "पीक सल्ला",
  },
  "nav.forecast": {
    en: "Forecast",
    mr: "हवामान अंदाज",
  },
  "nav.comparison": {
    en: "Compare Models",
    mr: "मॉडेल तुलना",
  },
  "nav.panchayats": {
    en: "Villages",
    mr: "ग्रामपंचायती",
  },
  "nav.models": {
    en: "Model Benchmarks",
    mr: "मॉडेल मूल्यमापन",
  },
  "nav.validation": {
    en: "Ground Validation",
    mr: "प्रत्यक्ष पडताळणी",
  },
  "nav.settings": {
    en: "Calibration",
    mr: "प्रणाली सेटिंग्ज",
  },
  "nav.health": {
    en: "System Health",
    mr: "प्रणाली स्थिती",
  },

  // Header & User Profiles
  "header.badge": {
    en: "AI Panchayat Intelligence",
    mr: "AI ग्रामपंचायत हवामान प्रणाली",
  },
  "header.stations": {
    en: "Live Ground Stations",
    mr: "सक्रिय हवामान केंद्रे",
  },
  "header.login": {
    en: "Login Portal",
    mr: "लॉगिन पोर्टल",
  },
  "header.logout": {
    en: "Logout",
    mr: "बाहेर पडा",
  },
  "header.role_farmer": {
    en: "Farmer",
    mr: "शेतकरी",
  },
  "header.role_officer": {
    en: "Agri Officer",
    mr: "कृषी अधिकारी",
  },
  "header.language": {
    en: "Language",
    mr: "भाषा",
  },

  // Login Modal
  "login.title": {
    en: "MeghDrishti Login Portal",
    mr: "मेघदृष्टी लॉगिन पोर्टल",
  },
  "login.subtitle": {
    en: "Select your role to access customized village weather intelligence",
    mr: "सानुकूलित गावपातळीवरील हवामान माहितीसाठी तुमची भूमिका निवडा",
  },
  "login.tab_farmer": {
    en: "Farmer Login",
    mr: "शेतकरी लॉगिन",
  },
  "login.tab_officer": {
    en: "Officer Login",
    mr: "कृषी अधिकारी लॉगिन",
  },
  "login.phone": {
    en: "Mobile Number",
    mr: "मोबाईल क्रमांक",
  },
  "login.pin": {
    en: "4-Digit PIN",
    mr: "४-अंकी पिन",
  },
  "login.officer_id": {
    en: "Officer / Nodal ID",
    mr: "अधिकारी / नोडल आयडी",
  },
  "login.password": {
    en: "Password",
    mr: "पासवर्ड",
  },
  "login.btn_farmer_submit": {
    en: "Login as Farmer",
    mr: "शेतकरी म्हणून लॉगिन करा",
  },
  "login.btn_officer_submit": {
    en: "Login as Officer",
    mr: "अधिकारी म्हणून लॉगिन करा",
  },
  "login.demo_farmer": {
    en: "1-Click Demo Farmer",
    mr: "झटपट डेमो शेतकरी",
  },
  "login.demo_officer": {
    en: "1-Click Demo Officer",
    mr: "झटपट डेमो अधिकारी",
  },
  "login.farmer_features": {
    en: "Hyperlocal downscaled rain • Voice advisory • WhatsApp broadcast",
    mr: "गावपातळीवरील पाऊस अंदाज • आवाज सल्ला • WhatsApp शेअर",
  },
  "login.officer_features": {
    en: "Zonal Skill Scorecards • IMD ground telemetry • Model calibration",
    mr: "विभागीय अचूकता स्कोरकार्ड • IMD प्रत्यक्ष आकडेवारी • मॉडेल कॅलिब्रेशन",
  },

  // Dashboard Page
  "dash.selected_panchayat": {
    en: "Selected Panchayat",
    mr: "निवडलेली ग्रामपंचायत",
  },
  "dash.local_weather": {
    en: "LOCAL WEATHER INTELLIGENCE",
    mr: "स्थानिक गावपातळीवरील हवामान अचूकता",
  },
  "dash.expected_rainfall": {
    en: "Expected Rainfall",
    mr: "अपेक्षित पाऊस",
  },
  "dash.rain_prob": {
    en: "Rain Probability",
    mr: "पावसाची शक्यता",
  },
  "dash.prob_label": {
    en: "P(Rain)",
    mr: "शक्यता",
  },
  "dash.elevation": {
    en: "Elevation",
    mr: "उंची (समुद्रसपाटी)",
  },
  "dash.soil_type": {
    en: "Soil Type",
    mr: "जमिनीचा प्रकार",
  },
  "dash.wind_speed": {
    en: "Wind Speed",
    mr: "वाऱ्याचा वेग",
  },
  "dash.humidity": {
    en: "Humidity",
    mr: "हवेतील आर्द्रता",
  },
  "dash.ai_correction": {
    en: "AI LOCAL CORRECTION",
    mr: "स्थानिक AI अचूकता",
  },
  "dash.ai_title": {
    en: "Terrain & bias-corrected panchayat forecast",
    mr: "स्थानिक टोपोग्राफी व उंचीनुसार अचूक अंदाज",
  },
  "dash.ai_desc": {
    en: "Forecast adjusted for local terrain, lapse-rate elevation and IMD ground network.",
    mr: "स्थानिक टोपोग्राफी, लॅप्स-रेट उंची व IMD नेटवर्क आधारे अंदाज अचूक करण्यात आला आहे.",
  },
  "dash.error_reduction": {
    en: "Error Reduction (MAE)",
    mr: "त्रुटी कपात (MAE)",
  },
  "dash.downscaled_note": {
    en: "Downscaled from 10km raw NWP to 1km resolution",
    mr: "१० किमी मॉडेलवरून १ किमी अचूक गावपातळीवर रुपांतरित",
  },
  "dash.rainfall_metric": {
    en: "Rainfall",
    mr: "पाऊस",
  },
  "dash.temperature_metric": {
    en: "Temperature",
    mr: "तापमान",
  },
  "dash.lapse_corrected": {
    en: "Lapse corrected",
    mr: "उंचीनुसार अचूक",
  },
  "dash.threshold": {
    en: "threshold",
    mr: "निकष",
  },
  "dash.ai_trust": {
    en: "AI Trust",
    mr: "AI विश्वासार्हता",
  },
  "dash.confidence": {
    en: "Confidence",
    mr: "खात्री",
  },
  "dash.outlook_title": {
    en: "5-Day Weather Outlook",
    mr: "५ दिवसांचा स्थानिक हवामान अंदाज",
  },
  "dash.engine_title": {
    en: "MeghDrishti AI Downscaling Engine",
    mr: "मेघदृष्टी AI स्थानिक हवामान प्रणाली",
  },
  "dash.engine_details": {
    en: "Station distance: 4.8 km • 1,060 test days validated • False Alarm Ratio: 0.106",
    mr: "हवामान केंद्र अंतर: ४.८ किमी • १,०६० दिवस पडताळणी • खोटा इशारा दर (FAR): ०.१०६",
  },
  "dash.confidence_active": {
    en: "Calibrated 90% Confidence Interval Active",
    mr: "९०% खात्रीशीर मर्यादा सक्रिय",
  },

  // Time Horizons
  "time.today": {
    en: "Today",
    mr: "आज",
  },
  "time.tomorrow": {
    en: "Tomorrow",
    mr: "उद्या",
  },
  "time.day_2": {
    en: "+2 Days",
    mr: "+२ दिवस",
  },
  "time.day_3": {
    en: "+3 Days",
    mr: "+३ दिवस",
  },
  "time.day_5": {
    en: "+5 Days",
    mr: "+५ दिवस",
  },

  // Rain Categories
  "rain.no_rain": {
    en: "No Rain",
    mr: "निरभ्र / पाऊस नाही",
  },
  "rain.very_light": {
    en: "Very Light Rain",
    mr: "अति हलका पाऊस",
  },
  "rain.light": {
    en: "Light Rain",
    mr: "हलका पाऊस",
  },
  "rain.moderate": {
    en: "Moderate Rain",
    mr: "मध्यम पाऊस",
  },
  "rain.heavy": {
    en: "Heavy Rain",
    mr: "जोरदार पाऊस",
  },

  // Crop Advisory
  "adv.title": {
    en: "Crop Advisory & Farmer Action",
    mr: "शेतकरी पीक सल्ला व कृती निर्णय",
  },
  "adv.guidance_for": {
    en: "Actionable guidance for",
    mr: "स्थानिक कृषी मार्गदर्शन:",
  },
  "adv.voice_readout": {
    en: "Voice Readout",
    mr: "आवाज ऐका",
  },
  "adv.voice_stop": {
    en: "Stop Audio",
    mr: "थांबवा",
  },
  "adv.share_whatsapp": {
    en: "Share WhatsApp",
    mr: "WhatsApp वर पाठवा",
  },
  "adv.copied": {
    en: "Copied!",
    mr: "कॉपी झाले!",
  },
  "adv.select_crop": {
    en: "Select Crop",
    mr: "पीक निवडा",
  },
  "adv.select_stage": {
    en: "Current Growth Stage",
    mr: "पिकाची सद्य अवस्था",
  },
  "adv.spray_window": {
    en: "Spray Window",
    mr: "फवारणी काळ",
  },
  "adv.irrigation": {
    en: "Irrigation",
    mr: "सिंचन नियोजन",
  },
  "adv.fertilizer": {
    en: "Fertilizer Advice",
    mr: "खत सल्ला",
  },
  "adv.main_action": {
    en: "Today's Recommended Action",
    mr: "आजचा मुख्य कृती सल्ला",
  },
  "adv.reason": {
    en: "Agronomic Reason",
    mr: "वैज्ञानिक कारण",
  },
  "adv.pest_alert": {
    en: "Pest & Disease Alert",
    mr: "कीड व रोग सावधगिरी",
  },
  "adv.soil_calibrated": {
    en: "Calibrated for local soil moisture • Stage:",
    mr: "स्थानिक मातीच्या ओलाव्यानुसार अचूक • अवस्था:",
  },
  "adv.scientific_basis": {
    en: "Agronomic Scientific Thresholds",
    mr: "कृषी वैज्ञानिक निकष",
  },
  "adv.scientific_desc": {
    en: "Cross-references precipitation probability (≥ 2.5 mm threshold) and clay retention capacity to recommend precise irrigation and spraying windows.",
    mr: "स्थानिक पाऊस शक्यता (≥२.५ मिमी निकष) आणि जमिनीतील चिकणमाती ओलावा क्षमतेनुसार फवारणी व सिंचन वेळापत्रक ठरवले जाते.",
  },
  "adv.field_support": {
    en: "Direct Field Decision Support",
    mr: "शेतकरी अनुकूल थेट निर्णय",
  },
  "adv.field_desc": {
    en: "Clear Marathi and English advisories with voice audio readout and instant WhatsApp sharing for village farmer groups.",
    mr: "शेतकऱ्यांना समजण्यासाठी सुलभ मराठी व इंग्रजीत कृती सल्ला, आवाज ऐकण्याची सुविधा व WhatsApp वर शेअर करण्याचा पर्याय.",
  },
  "adv.status_safe": {
    en: "SAFE",
    mr: "योग्य वेळ",
  },
  "adv.status_caution": {
    en: "CAUTION",
    mr: "सावध",
  },
  "adv.status_avoid": {
    en: "HOLD",
    mr: "थांबवा",
  },
  "adv.status_irrigate": {
    en: "IRRIGATE",
    mr: "पाणी द्या",
  },
  "adv.status_stop_irrigate": {
    en: "STOP",
    mr: "पाणी बंद",
  },

  // Crops
  "crop.Cotton": { en: "Cotton", mr: "कापूस" },
  "crop.Soybean": { en: "Soybean", mr: "सोयाबीन" },
  "crop.Maize": { en: "Maize", mr: "मका" },
  "crop.Onion": { en: "Onion", mr: "कांदा" },
  "crop.Tomato": { en: "Tomato", mr: "टोमॅटो" },
  "crop.Sugarcane": { en: "Sugarcane", mr: "ऊस" },
  "crop.Wheat": { en: "Wheat", mr: "गहू" },

  // Forecast Page
  "fc.title": {
    en: "Localized Weather Forecast",
    mr: "स्थानिक हवामान अंदाज",
  },
  "fc.subtitle": {
    en: "Downscaled 1 km panchayat predictions with physical uncertainty bounds",
    mr: "१ किमी अचूक गावपातळीवरील हवामान अंदाज व खात्रीशीर मर्यादा",
  },
  "fc.downscaling_card": {
    en: "Rainfall Downscaling",
    mr: "पाऊस स्थानिक रुपांतरण",
  },
  "fc.temp_downscaling": {
    en: "Temperature Downscaling",
    mr: "तापमान स्थानिक रुपांतरण",
  },
  "fc.nwp_raw": {
    en: "Raw Coarse NWP",
    mr: "मूळ मॉडेल अंदाज (Raw)",
  },
  "fc.ai_adjusted": {
    en: "AI Downscaled",
    mr: "AI दुरुस्त अंदाज",
  },
  "fc.uncertainty_range": {
    en: "90% Uncertainty Interval",
    mr: "९०% संभाव्य मर्यादा",
  },
  "fc.surface_wind": {
    en: "Surface Wind",
    mr: "पृष्ठभागावरील वारा",
  },
  "fc.rel_humidity": {
    en: "Relative Humidity",
    mr: "सापेक्ष आर्द्रता",
  },
  "fc.soil_moisture": {
    en: "Soil Clay Moisture",
    mr: "मातीतील ओलावा",
  },
  "fc.terrain_elevation": {
    en: "Terrain Elevation",
    mr: "टोपोग्राफी उंची",
  },
  "fc.horizon_title": {
    en: "5-Day Downscaled Weather Horizon",
    mr: "५ दिवसांचा स्थानिक हवामान पट",
  },

  // Comparison Page
  "comp.title": {
    en: "Forecast Benchmark & Model Comparison",
    mr: "हवामान मॉडेल तुलना व मूल्यमापन",
  },
  "comp.subtitle": {
    en: "Raw Coarse NWP vs MeghDrishti AI Downscaled Predictions across Lead Times",
    mr: "मूळ हवामान मॉडेल विरुद्ध मेघदृष्टी AI अचूकता तुलना",
  },
  "comp.select_panchayat": {
    en: "Benchmark Panchayat",
    mr: "ग्रामपंचायत निवडा",
  },
  "comp.season": {
    en: "Season",
    mr: "ऋतू",
  },
  "comp.season_monsoon": {
    en: "Monsoon",
    mr: "पावसाळा (Monsoon)",
  },
  "comp.season_premonsoon": {
    en: "Pre-Monsoon",
    mr: "मान्सूनपूर्व (Pre-Monsoon)",
  },
  "comp.season_winter": {
    en: "Winter",
    mr: "हिवाळा (Winter)",
  },
  "comp.season_postmonsoon": {
    en: "Post-Monsoon",
    mr: "परतीचा पाऊस (Post-Monsoon)",
  },
  "comp.mae_reduction": {
    en: "Error Reduction (MAE)",
    mr: "त्रुटी कपात (MAE)",
  },
  "comp.raw_error": {
    en: "Raw NWP Error",
    mr: "मूळ मॉडेल त्रुटी",
  },
  "comp.ai_error": {
    en: "MeghDrishti AI Error",
    mr: "मेघदृष्टी AI त्रुटी",
  },
  "comp.chart_title": {
    en: "Rainfall Error (MAE mm) by Forecast Lead Time",
    mr: "दिवसानुसार पाऊस अंदाज त्रुटी (MAE मिमी)",
  },
  "comp.method_title1": {
    en: "1. Baseline vs AI Error",
    mr: "१. मूळ मॉडेल विरुद्ध AI",
  },
  "comp.method_desc1": {
    en: "Every forecast is benchmarked against raw coarse NWP. If local ML performs worse on unseen test data, the system flags no improvement.",
    mr: "प्रत्येक अंदाज मूळ मॉडेलसोबत तपासला जातो, जेणेकरून स्थानिक AI मुळे अचूकता वाढल्याची खात्री होते.",
  },
  "comp.method_title2": {
    en: "2. Leakage-Free Validation",
    mr: "२. पारदर्शक पडताळणी",
  },
  "comp.method_desc2": {
    en: "Chronological split ensures future observations or test-period climatologies never leak into the downscaling feature pipeline.",
    mr: "काळानुरूप डेटा विभाजनामुळे भविष्यातील माहिती मॉडेलमध्ये मिसळत नाही आणि पडताळणी संपूर्ण पारदर्शक राहते.",
  },
  "comp.method_title3": {
    en: "3. Orographic Resolution",
    mr: "३. डोंगर व दऱ्यांचे पृथक्करण",
  },
  "comp.method_desc3": {
    en: "Elevation, slope, and land cover features enable the model to resolve localized rain-shadow valleys and Ghats rainfall.",
    mr: "उंची, उतार आणि जमिनीच्या प्रकारामुळे पर्जन्यछायेचे प्रदेश व घाटमाथ्यावरील पाऊस अचूक टिपला जातो.",
  },

  // Panchayats Directory
  "pan.title": {
    en: "Panchayat Weather Directory",
    mr: "ग्रामपंचायत हवामान सूची",
  },
  "pan.subtitle": {
    en: "Explore 1 km localized downscaling for rural panchayat hubs",
    mr: "गावपातळीवरील १ किमी अचूक हवामान व स्थानिक माहिती",
  },
  "pan.search_placeholder": {
    en: "Search panchayat, district, village...",
    mr: "ग्रामपंचायत, जिल्हा किंवा गाव शोधा...",
  },
  "pan.tab_overview": {
    en: "Overview",
    mr: "आढावा",
  },
  "pan.tab_forecast": {
    en: "Forecast",
    mr: "हवामान अंदाज",
  },
  "pan.tab_advisory": {
    en: "Crop Advisory",
    mr: "पीक सल्ला",
  },
  "pan.tab_geography": {
    en: "Terrain & Soil",
    mr: "भूगोल व माती",
  },
  "pan.tab_accuracy": {
    en: "Accuracy Stats",
    mr: "अचूकता आकडेवारी",
  },
  "pan.all_zones": {
    en: "All States",
    mr: "सर्व राज्ये",
  },
  "pan.zone_mh": {
    en: "Maharashtra",
    mr: "महाराष्ट्र",
  },
  "pan.zone_ka": {
    en: "Karnataka",
    mr: "कर्नाटक",
  },
  "pan.zone_ts": {
    en: "Telangana",
    mr: "तेलंगणा",
  },

  // Common UI Buttons & Badges
  "btn.view_details": {
    en: "View Details",
    mr: "तपशील पहा",
  },
  "btn.close": {
    en: "Close",
    mr: "बंद करा",
  },
  "btn.apply": {
    en: "Apply",
    mr: "लागू करा",
  },
  "badge.high_trust": {
    en: "High Trust",
    mr: "उच्च विश्वासार्हता",
  },
  "badge.medium_trust": {
    en: "Medium Trust",
    mr: "मध्यम विश्वासार्हता",
  },
  "badge.low_trust": {
    en: "Caution",
    mr: "सावधगिरी",
  },
};

export function getTranslation(key: string, language: Language = "en"): string {
  const item = TRANSLATIONS[key];
  if (!item) return key;
  if (language === "mr") return item.mr || item.en;
  if (language === "hi" && item.hi) return item.hi;
  return item.en;
}
