import { PANCHAYATS_DATA, MODEL_HEALTH_DATA } from "./data";
import { Panchayat } from "./types";

export type SupportedLanguage = "en" | "mr" | "hi";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  speechText?: string;
  lang: SupportedLanguage;
  timestamp: string;
}

export interface ChatbotResponse {
  text: string;
  speechText: string;
  detectedLang: SupportedLanguage;
}

// 1. Language Detection Helper
export function detectLanguage(text: string, fallback: SupportedLanguage = "en"): SupportedLanguage {
  const devanagariRegex = /[\u0900-\u097F]/;
  if (!devanagariRegex.test(text)) {
    // Check for romanized Marathi/Hindi keywords
    const lower = text.toLowerCase();
    const marathiKeywords = ["ahe", "aahe", "nahi", "kay", "kasa", "kase", "paus", "pik", "pika", "sang", "mahit", "kuthe", "sheti", "kiti"];
    const hindiKeywords = ["kya", "hoga", "hogi", "hai", "nahi", "kaise", "kaisa", "barish", "barsat", "batao", "kisan", "pani", "fasal", "kitna", "mausam"];

    const marathiScore = marathiKeywords.filter(k => lower.includes(k)).length;
    const hindiScore = hindiKeywords.filter(k => lower.includes(k)).length;

    if (marathiScore > 0 && marathiScore >= hindiScore) return "mr";
    if (hindiScore > 0 && hindiScore > marathiScore) return "hi";

    return fallback;
  }

  // Devanagari text: distinguish between Marathi and Hindi
  const marathiMarkers = [
    "आहे", "नाही", "काय", "कसे", "कशी", "कसा", "हवामान", "शेतकरी", "पाऊस", "पिकांची",
    "सल्ला", "ग्रामपंचायत", "जमीन", "तपासा", "करा", "होईल", "का", "कोणते", "कधी",
    "सांगा", "माहिती", "किती", "आहेत", "वाघोली", "शेतात", "फवारणी", "उंची"
  ];
  const hindiMarkers = [
    "है", "नहीं", "क्या", "कैसे", "कैसा", "कैसी", "मौसम", "बारिश", "फसल", "सलाह",
    "किसान", "होगा", "होगी", "कब", "कितना", "कितनी", "तापमान", "बताओ", "जानकारी",
    "छिड़काव", "सिंचाई", "जमीन", "मिट्टी", "कीजिए", "सकते"
  ];

  let mrScore = 0;
  let hiScore = 0;

  for (const marker of marathiMarkers) {
    if (text.includes(marker)) mrScore += 1;
  }
  for (const marker of hindiMarkers) {
    if (text.includes(marker)) hiScore += 1;
  }

  if (mrScore > hiScore) return "mr";
  if (hiScore > mrScore) return "hi";

  // If tied, check fallback or default to Marathi if Maharashtra terms appear
  if (text.includes("महाराष्ट्र") || text.includes("पुणे") || text.includes("सातारा") || text.includes("सोलापूर")) {
    return "mr";
  }

  return fallback === "mr" || fallback === "hi" ? fallback : "hi";
}

// 2. Crop Advisory Knowledge Dictionary
const CROP_KNOWLEDGE: Record<string, {
  en: { summary: string; advice: string; spray: string; irrigation: string };
  mr: { summary: string; advice: string; spray: string; irrigation: string };
  hi: { summary: string; advice: string; spray: string; irrigation: string };
}> = {
  cotton: {
    en: {
      summary: "Cotton is in flowering/square formation stage in black cotton soil zones.",
      advice: "Postpone protective pesticide spraying by 48 hours; ensure drainage channels in heavy black clay soil are clear to avoid waterlogging.",
      spray: "Foliar spray not recommended during rain windows. Resume only under clear sunshine.",
      irrigation: "Withhold supplemental irrigation if rainfall exceeds 3mm."
    },
    mr: {
      summary: "कापूस पीक सध्या काळ्या जमिनीत पात्या व फुले येण्याच्या अवस्थेत आहे.",
      advice: "कीटकनाशक फवारणी २ दिवस पुढे ढकला आणि काळ्या जमिनीतील पाण्याचा निचरा होण्यासाठी शेतात चर काढा.",
      spray: "पावसाची शक्यता असताना पानांवर फवारणी करू नका. ऊन पडल्यावरच फवारणी करा.",
      irrigation: "३ मिमी पेक्षा जास्त पाऊस असल्यास अतिरिक्त सिंचन थांबवा."
    },
    hi: {
      summary: "कपास की फसल अभी फूल और कलियां बनने की अवस्था में है।",
      advice: "कीटनाशक छिड़काव को 48 घंटे के लिए टालें और काली मिट्टी में जल निकासी नालियों को साफ रखें ताकि पानी जमा न हो।",
      spray: "बारिश के दौरान छिड़काव न करें। मौसम साफ और धूप निकलने पर ही छिड़काव करें।",
      irrigation: "यदि 3 मिमी से अधिक बारिश होती है तो अतिरिक्त सिंचाई रोकें।"
    }
  },
  soybean: {
    en: {
      summary: "Soybean is in pod formation & filling stage.",
      advice: "Withhold supplemental irrigation; apply fungicide spray (Azoxystrobin) during clear morning hours to prevent pod rot.",
      spray: "Safe spraying window: Early morning (7 AM - 10 AM) under calm wind.",
      irrigation: "Avoid water stagnation in root zones; ensure proper ridge drainage."
    },
    mr: {
      summary: "सोयाबीन पीक सध्या शेंगा भरणे व दाणे पोसण्याच्या संवेदनशील अवस्थेत आहे.",
      advice: "अतिरिक्त सिंचन टाळा; शेंगा सडणे रोखण्यासाठी सकाळच्या मोकळ्या हवेत बुरशीनाशक (अझॉक्सीस्ट्रॉबिन) फवारणी करा.",
      spray: "फवारणीची सुरक्षित वेळ: सकाळी ७ ते १० दरम्यान शांत वाऱ्यात.",
      irrigation: "मुळे कुजण्यापासून वाचवण्यासाठी शेतात पाणी साचू देऊ नका."
    },
    hi: {
      summary: "सोयाबीन की फसल फलियां भरने और दाने पुष्ट होने की अवस्था में है।",
      advice: "अतिरिक्त सिंचाई रोकें; फली सड़न रोकने के लिए सुबह के समय कवकनाशी (एज़ोक्सीस्ट्रोबिन) का छिड़काव करें।",
      spray: "सुरक्षित छिड़काव समय: सुबह 7 से 10 बजे के बीच शांत मौसम में।",
      irrigation: "जड़ों के पास पानी न भरने दें; जलनिकासी सुनिश्चित करें।"
    }
  },
  sugarcane: {
    en: {
      summary: "Sugarcane is in tillering and grand growth phase.",
      advice: "Maintain furrow irrigation cycles; apply nitrogen/potash split doses before expected shower. Watch for early shoot borer.",
      spray: "Spray chlorantraniliprole if shoot borer attack exceeds 10%.",
      irrigation: "Irrigate every 8-10 days depending on soil moisture levels."
    },
    mr: {
      summary: "ऊस पीक सध्या फुटवे फुटणे व कांड्या भरण्याच्या जोमदार वाढीच्या टप्प्यात आहे.",
      advice: "पाटाने पाणी देण्याचे नियोजन करा; पावसापूर्वी नत्र व पालाशची मात्रा द्या. खोडकिडीवर लक्ष ठेवा.",
      spray: "खोडकिडीचा प्रादुर्भाव १०% पेक्षा जास्त असल्यास क्लोरांट्रानिलीप्रोलची फवारणी करा.",
      irrigation: "जमिनीतील ओलावा बघून ८ ते १० दिवसांच्या अंतराने पाणी द्या."
    },
    hi: {
      summary: "गन्ना फसल कल्ले फूटने और तेजी से बढ़ने की अवस्था में है।",
      advice: "नालीदार सिंचाई व्यवस्था बनाए रखें; बारिश से पहले यूरिया और पोटाश की किस्त दें। तना छेदक कीट की निगरानी करें।",
      spray: "तना छेदक का असर दिखने पर अनुशंसित कीटनाशक का छिड़काव करें।",
      irrigation: "मिट्टी में नमी के अनुसार 8 से 10 दिनों के अंतराल पर सिंचाई करें।"
    }
  },
  onion: {
    en: {
      summary: "Onion is in bulb enlargement and vegetative development stage.",
      advice: "Protect from thrips and purple blotch; avoid excess nitrogen. Light irrigation is recommended before soil crusting.",
      spray: "Apply Mancozeb with sticker in clear non-rainy periods.",
      irrigation: "Maintain moderate moisture; saturated soil leads to bulb rot."
    },
    mr: {
      summary: "कांदा पीक सध्या कंद पोसणे आणि पातीच्या वाढीच्या अवस्थेत आहे.",
      advice: "फुलकिडे (थ्रिप्स) आणि करपा रोगापासून संरक्षण करा; अति नत्र देणे टाळा. हलके पाणी द्यावे.",
      spray: "पाऊस नसताना मॅन्कोझेब स्टीकरसह फवारावे.",
      irrigation: "जमिनीत हलका ओलावा ठेवा, पाणी साचल्यास कांदा सडतो."
    },
    hi: {
      summary: "प्याज की फसल कंद विकास और पत्तों की बढ़वार की अवस्था में है।",
      advice: "थ्रिप्स और बैंगनी धब्बा (पर्पल ब्लॉच) से बचाव करें; अधिक यूरिया न दें। हल्की सिंचाई करें।",
      spray: "मौसम साफ रहने पर मैन्कोजेब स्टीकर मिलाकर छिड़कें।",
      irrigation: "हल्की नमी बनाए रखें, अधिक पानी से प्याज सड़ने का खतरा रहता है।"
    }
  },
  wheat: {
    en: {
      summary: "Wheat is in tillering to crown root initiation stage.",
      advice: "Crown root stage requires critical irrigation. High day temperatures require light micro-sprinkler misting.",
      spray: "Spray 2,4-D for broadleaf weed control 30-35 days after sowing.",
      irrigation: "First critical irrigation at 21 days after sowing (CRI stage)."
    },
    mr: {
      summary: "गहू पीक सध्या मुकुट मुळे फुटणे (CRI) आणि फुटव्यांच्या अवस्थेत आहे.",
      advice: "मुकुट मुळे फुटताना पाणी देणे अतिशय महत्त्वाचे आहे. दुपारचे तापमान वाढल्यास हलके तुषार सिंचन करावे.",
      spray: "पेरणीनंतर ३०-३५ दिवसांनी रुंद पानाच्या तण नियंत्रणासाठी तणनाशक फवारावे.",
      irrigation: "पेरणीनंतर २१ व्या दिवशी पहिली महत्त्वाची पाणी पाळी द्यावी."
    },
    hi: {
      summary: "गेहूं की फसल शीर्ष जड़ (CRI) और कल्ले फूटने की क्रांतिक अवस्था में है।",
      advice: "शीर्ष जड़ अवस्था में पहली सिंचाई अत्यंत आवश्यक है। दिन का तापमान बढ़ने पर फव्वारा सिंचाई से ठंडक दें।",
      spray: "चौड़ी पत्ती वाले खरपतवार के लिए बुवाई के 30-35 दिन बाद अनुशंसित खरपतवारनाशक डालें।",
      irrigation: "बुवाई के 21वें दिन पहली जरूरी सिंचाई करें।"
    }
  }
};

// 3. Main Intelligent Query Resolver
export function generateChatbotReply(
  rawQuery: string,
  currentAppLang: SupportedLanguage = "en",
  selectedPanchayatCode: string = "MH_PUN_001"
): ChatbotResponse {
  const query = rawQuery.trim();
  const lang = detectLanguage(query, currentAppLang);
  const lower = query.toLowerCase();

  // Find targeted panchayat if mentioned in query, else use selected/default
  const foundPanchayat = PANCHAYATS_DATA.find((p) => {
    const pName = p.panchayat_name.toLowerCase();
    const vName = p.village_name.toLowerCase();
    const dist = p.district.toLowerCase();
    const tal = p.taluka.toLowerCase();
    return (
      lower.includes(vName) ||
      lower.includes(pName) ||
      lower.includes(dist) ||
      lower.includes(tal) ||
      lower.includes(p.lgd_code.toLowerCase())
    );
  }) || PANCHAYATS_DATA.find((p) => p.lgd_code === selectedPanchayatCode) || PANCHAYATS_DATA[0];

  // Check if query is about rain explicitly
  const isExplicitRainQuery =
    lower.includes("rain") ||
    lower.includes("पाऊस") ||
    lower.includes("पावसा") ||
    lower.includes("बारिश") ||
    lower.includes("हवामान") ||
    lower.includes("मौसम") ||
    lower.includes("forecast") ||
    lower.includes("weather");

  // Check if query is about a specific crop
  let matchedCropKey: string | null = null;
  if (lower.includes("cotton") || lower.includes("कापूस") || lower.includes("कपास")) matchedCropKey = "cotton";
  else if (lower.includes("soybean") || lower.includes("सोयाबीन")) matchedCropKey = "soybean";
  else if (lower.includes("sugarcane") || lower.includes("sugar") || /(^|[\s,.\-!?:])ऊस([\s,.\-!?:;]|$)/.test(lower) || lower.includes("गन्ना")) matchedCropKey = "sugarcane";
  else if (lower.includes("onion") || lower.includes("कांदा") || lower.includes("प्याज")) matchedCropKey = "onion";
  else if (lower.includes("wheat") || lower.includes("गहू") || lower.includes("गेहूं")) matchedCropKey = "wheat";

  // Intent 1: Greetings & Introduction
  const isGreeting =
    /^(hi|hello|hey|namaste|pranam|namaskar|good morning|good evening|who are you|help|कसा आहेस|नमस्कार|नमस्ते|कौन हो|मदद)/i.test(
      query.trim()
    );

  if (isGreeting && query.length < 35) {
    if (lang === "mr") {
      const text = `नमस्कार! मी **मेघदृष्टी एआय सहाय्यक** आहे. 🌾🌧️\n\nमी तुम्हाला कोणत्याही ग्रामपंचायतीचा १ किमी अचूक पावसाचा अंदाज, हवामान बदल, मातीची स्थिती आणि पिकांचा (कापूस, सोयाबीन, ऊस, कांदा) कृषी सल्ला देऊ शकतो.\n\nतुम्ही मला विचारू शकता:\n- *"वाघोलीत आज पाऊस पडेल का?"*\n- *"कापूस पिकासाठी काय सल्ला आहे?"*\n- *"मेघदृष्टी कसे काम करते?"*`;
      const speechText = `नमस्कार! मी मेघदृष्टी एआय सहाय्यक आहे. मी तुम्हाला स्थानिक हवामान अंदाज आणि पिकांचा कृषी सल्ला देऊ शकतो. आपण कोणताही प्रश्न विचारू शकता.`;
      return { text, speechText, detectedLang: "mr" };
    }
    if (lang === "hi") {
      const text = `नमस्ते! मैं **मेघदृष्टि एआई सहायक** हूँ। 🌾🌧️\n\nमैं आपको किसी भी ग्राम पंचायत के लिए 1 किमी सटीक बारिश का पूर्वानुमान, तापमान, मिट्टी की स्थिति और फसलों (कपास, सोयाबीन, गन्ना, प्याज) के लिए कृषि सलाह बता सकता हूँ।\n\nआप मुझसे पूछ सकते हैं:\n- *"वाघोली में आज बारिश होगी क्या?"*\n- *"कपास की फसल के लिए क्या सलाह है?"*\n- *"मेघदृष्टि मॉडल कैसे काम करता है?"*`;
      const speechText = `नमस्ते! मैं मेघदृष्टि एआई सहायक हूँ। मैं आपको ग्राम पंचायत स्तर पर मौसम का पूर्वानुमान और फसल सलाह दे सकता हूँ। आप अपना सवाल पूछ सकते हैं।`;
      return { text, speechText, detectedLang: "hi" };
    }
    const text = `Hello! I am the **MeghDrishti AI Voice Assistant**. 🌾🌧️\n\nI can provide you with 1km hyper-local panchayat rainfall forecasts, soil & terrain insights, and crop advisories for Cotton, Soybean, Sugarcane, Onion, and Wheat.\n\nTry asking me:\n- *"Will it rain in Wagholi today?"*\n- *"What is the crop advisory for Cotton?"*\n- *"How does the AI downscaling model work?"*`;
    const speechText = `Hello! I am the MeghDrishti AI Voice Assistant. I can provide 1km panchayat weather forecasts and crop advisories. How can I help you today?`;
    return { text, speechText, detectedLang: "en" };
  }

  // Intent 2: What is MeghDrishti / How does the AI model work?
  const isAboutModel =
    lower.includes("meghdrishti") ||
    lower.includes("मेघदृष्टी") ||
    lower.includes("मेघदृष्टि") ||
    lower.includes("downscaling") ||
    lower.includes("model") ||
    lower.includes("मॉडेल") ||
    lower.includes("काम कसे") ||
    lower.includes("कैसे काम") ||
    lower.includes("accuracy") ||
    lower.includes("अचूकता") ||
    lower.includes("lightgbm") ||
    lower.includes("imd");

  if (isAboutModel && !lower.includes("rain") && !lower.includes("पाऊस") && !lower.includes("बारिश")) {
    if (lang === "mr") {
      const text = `### 🛰️ मेघदृष्टी प्रणालीची माहिती\n\n**मेघदृष्टी** ही भारत सरकारच्या भूविज्ञान मंत्रालय (MoES) आणि भारतीय हवामान विभाग (IMD) अंतर्गत विकसित केलेली ग्रामपंचायत-स्तरीय हवामान बुद्धिमत्ता प्रणाली आहे.\n\n- **१ किमी अचूकता:** १० किमी जागतिक NWP मॉडेलचा अंदाज १ किमी ग्रामपंचायत पातळीवर अचूक केला जातो.\n- **एआय तंत्रज्ञान:** LightGBM GBDT आणि स्थानिक लॅप्स-रेट व उतार दुरुस्ती अल्गोरिदम.\n- **त्रुटी घट (MAE):** कच्च्या हवामान मॉडेलच्या तुलनेत **+६२.५% ते +६४.९% त्रुटी कमी** केली गेली आहे.\n- **प्रशिक्षण डेटा:** ३३,६०५ हून अधिक ऐतिहासिक स्टेशन नोंदींवर मॉडेल प्रशिक्षित आहे.`;
      const speechText = `मेघदृष्टी ही भूविज्ञान मंत्रालय आणि आयएमडीची १ किलोमीटर ग्रामपंचायत हवामान प्रणाली आहे. ही प्रणाली LightGBM एआय मॉडेलद्वारे हवामानातील त्रुटी ६२ टक्क्यांपेक्षा जास्त कमी करते.`;
      return { text, speechText, detectedLang: "mr" };
    }
    if (lang === "hi") {
      const text = `### 🛰️ मेघदृष्टि प्रणाली की जानकारी\n\n**मेघदृष्टि** भारत सरकार के पृथ्वी विज्ञान मंत्रालय (MoES) और भारत मौसम विज्ञान विभाग (IMD) द्वारा विकसित ग्राम पंचायत-स्तरीय मौसम प्रणाली है।\n\n- **1 किमी डाउनस्केलिंग:** 10 किमी मोटे NWP मौसम डेटा को 1 किमी ग्राम पंचायत स्तर पर सटीक बनाया जाता है।\n- **एआई मॉडल:** LightGBM GBDT और भूभाग (Terrain) लॅप्स-रेट सुधार।\n- **त्रुटि में कमी:** सामान्य पूर्वानुमान की तुलना में **+62.5% से +64.9% अधिक सटीकता**।\n- **डेटा कवरेज:** 33,605 से अधिक रिकॉर्ड्स पर प्रशिक्षित और 99.8% सिस्टम विश्वसनीयता।`;
      const speechText = `मेघदृष्टि पृथ्वी विज्ञान मंत्रालय और मौसम विभाग की ग्राम पंचायत स्तर की मौसम प्रणाली है। यह 10 किलोमीटर के डेटा को 1 किलोमीटर तक सटीक बनाकर मौसम की गलतियों को 62 प्रतिशत से अधिक कम करती है।`;
      return { text, speechText, detectedLang: "hi" };
    }
    const text = `### 🛰️ About MeghDrishti AI Platform\n\n**MeghDrishti** is an advanced Panchayat Weather Intelligence platform under the Ministry of Earth Sciences and IMD.\n\n- **Resolution:** Downscales coarse 10km Numerical Weather Prediction (NWP) to hyper-local **1km village resolution**.\n- **Core Engine:** LightGBM Gradient Boosted Decision Trees with Residual Quantile Calibration.\n- **Error Reduction:** Achieves **+62.5% to +64.9% error reduction** over baseline NWP across Maharashtra, Karnataka, and Telangana.\n- **Telemetry:** Validated on 33,605+ ground station records with 99.8% data coverage.`;
    const speechText = `MeghDrishti is an AI weather platform that downscales coarse ten kilometer forecasts to one kilometer panchayat resolution, reducing rainfall errors by over sixty two percent using LightGBM models.`;
    return { text, speechText, detectedLang: "en" };
  }

  // Intent 3: Crop Advisory Query
  const isCropSpecific = !isExplicitRainQuery || lower.includes("सल्ला") || lower.includes("सलाह") || lower.includes("फवारणी") || lower.includes("छिड़काव") || lower.includes("advisory") || lower.includes("spray");
  if (isCropSpecific && (matchedCropKey || lower.includes("crop") || lower.includes("advisory") || lower.includes("पीक") || lower.includes("फसल") || lower.includes("सल्ला") || lower.includes("सलाह") || lower.includes("फवारणी") || lower.includes("छिड़काव") || lower.includes("कीटकनाशक"))) {
    const cropKey = matchedCropKey || "cotton";
    const data = CROP_KNOWLEDGE[cropKey] || CROP_KNOWLEDGE.cotton;
    const cropName = cropKey.toUpperCase();

    if (lang === "mr") {
      const c = data.mr;
      const text = `### 🌾 ${foundPanchayat.panchayat_name} — पीक सल्ला (${cropName})\n\n- **अवस्था:** ${c.summary}\n- **मुख्य सल्ला:** ${c.advice}\n- **फवारणीची वेळ:** ${c.spray}\n- **सिंचन व्यवस्थापन:** ${c.irrigation}\n- **माती प्रकार:** ${foundPanchayat.soil_type} (चिकणमाती ${foundPanchayat.soil_clay_pct}%)\n\n*टीप: पावसाची शक्यता ${(foundPanchayat.latest_rain_prob * 100).toFixed(0)}% असल्याने फवारणीचे नियोजन काळजीपूर्वक करा.*`;
      const speechText = `${foundPanchayat.village_name} साठी ${cropName} पीक सल्ला: ${c.advice} फवारणी विषयी: ${c.spray}`;
      return { text, speechText, detectedLang: "mr" };
    }
    if (lang === "hi") {
      const c = data.hi;
      const text = `### 🌾 ${foundPanchayat.panchayat_name} — फसल सलाह (${cropName})\n\n- **अवस्था:** ${c.summary}\n- **मुख्य सिफारिश:** ${c.advice}\n- **छिड़काव विंडो:** ${c.spray}\n- **सिंचाई प्रबंधन:** ${c.irrigation}\n- **मिट्टी प्रकार:** ${foundPanchayat.soil_type} (चिकनी मिट्टी ${foundPanchayat.soil_clay_pct}%)\n\n*सलाह: आज बारिश की संभावना ${(foundPanchayat.latest_rain_prob * 100).toFixed(0)}% है। जलभराव से बचें।*`;
      const speechText = `${foundPanchayat.village_name} के लिए ${cropName} फसल सलाह: ${c.advice} छिड़काव के लिए: ${c.spray}`;
      return { text, speechText, detectedLang: "hi" };
    }
    const c = data.en;
    const text = `### 🌾 ${foundPanchayat.panchayat_name} — Crop Advisory (${cropName})\n\n- **Status:** ${c.summary}\n- **Recommended Action:** ${c.advice}\n- **Spraying Window:** ${c.spray}\n- **Irrigation:** ${c.irrigation}\n- **Local Soil:** ${foundPanchayat.soil_type} (${foundPanchayat.soil_clay_pct}% clay content)\n\n*Forecast note: Rain probability is ${(foundPanchayat.latest_rain_prob * 100).toFixed(0)}% with ${foundPanchayat.latest_rainfall_estimate} mm anticipated.*`;
    const speechText = `Crop advisory for ${cropName} at ${foundPanchayat.village_name}: ${c.advice} Spray advice: ${c.spray}`;
    return { text, speechText, detectedLang: "en" };
  }

  // Intent 4: Soil / Elevation / Terrain Query
  const isSoilOrTerrain =
    lower.includes("soil") ||
    lower.includes("elevation") ||
    lower.includes("terrain") ||
    lower.includes("माती") ||
    lower.includes("उंची") ||
    lower.includes("जमीन") ||
    lower.includes("मिट्टी") ||
    lower.includes("ढलान");

  if (isSoilOrTerrain) {
    if (lang === "mr") {
      const text = `### 🏔️ ${foundPanchayat.panchayat_name} — जमीन व भौगोलिक माहिती\n\n- **मातीचा प्रकार:** ${foundPanchayat.soil_type}\n- **चिकणमाती प्रमाण:** ${foundPanchayat.soil_clay_pct}%\n- **उंची (समुद्रसपाटीपासून):** ${foundPanchayat.elevation_m} मीटर\n- **जमिनीचा उतार:** ${foundPanchayat.slope_deg}°\n- **शेती क्षेत्र प्रमाण:** ${(foundPanchayat.cropland_frac * 100).toFixed(0)}%\n- **स्थानिक प्रभाव:** ${foundPanchayat.trust_reason}`;
      const speechText = `${foundPanchayat.village_name} येथे मातीचा प्रकार ${foundPanchayat.soil_type} आहे, आणि समुद्रसपाटीपासून उंची ${foundPanchayat.elevation_m} मीटर आहे.`;
      return { text, speechText, detectedLang: "mr" };
    }
    if (lang === "hi") {
      const text = `### 🏔️ ${foundPanchayat.panchayat_name} — मिट्टी और भौगोलिक विवरण\n\n- **मिट्टी का प्रकार:** ${foundPanchayat.soil_type}\n- **चिकनी मिट्टी (Clay):** ${foundPanchayat.soil_clay_pct}%\n- **ऊंचाई:** समुद्र तल से ${foundPanchayat.elevation_m} मीटर\n- **ढलान (Slope):** ${foundPanchayat.slope_deg}°\n- **कृषि भूमि भाग:** ${(foundPanchayat.cropland_frac * 100).toFixed(0)}%\n- **मॉडल सुधार:** ${foundPanchayat.trust_reason}`;
      const speechText = `${foundPanchayat.village_name} में मिट्टी ${foundPanchayat.soil_type} है और ऊंचाई समुद्र तल से ${foundPanchayat.elevation_m} मीटर है।`;
      return { text, speechText, detectedLang: "hi" };
    }
    const text = `### 🏔️ ${foundPanchayat.panchayat_name} — Terrain & Soil Profile\n\n- **Soil Type:** ${foundPanchayat.soil_type}\n- **Clay Fraction:** ${foundPanchayat.soil_clay_pct}%\n- **Elevation:** ${foundPanchayat.elevation_m} m above sea level\n- **Terrain Slope:** ${foundPanchayat.slope_deg}°\n- **Cropland Coverage:** ${(foundPanchayat.cropland_frac * 100).toFixed(0)}%\n- **Terrain Calibration:** ${foundPanchayat.trust_reason}`;
    const speechText = `The terrain profile for ${foundPanchayat.village_name} features ${foundPanchayat.soil_type} with an elevation of ${foundPanchayat.elevation_m} meters.`;
    return { text, speechText, detectedLang: "en" };
  }

  // Intent 5: Rainfall / Weather Forecast (Default & Primary Intent)
  const rainProbPct = Math.round(foundPanchayat.latest_rain_prob * 100);
  const rainEst = foundPanchayat.latest_rainfall_estimate;
  const rawBase = foundPanchayat.latest_baseline_rainfall;
  const temp = foundPanchayat.latest_temp_estimate;

  let rainIntensityMr = "पावसाची शक्यता कमी";
  let rainIntensityHi = "बारिश की संभावना कम";
  let rainIntensityEn = "Low probability of rain";

  if (rainProbPct > 60) {
    rainIntensityMr = "मध्यम ते जोरदार पावसाची शक्यता";
    rainIntensityHi = "मध्यम से तेज बारिश की संभावना";
    rainIntensityEn = "Moderate to heavy rain expected";
  } else if (rainProbPct > 30) {
    rainIntensityMr = "हलक्या सरी किंवा हलका पाऊस संभव";
    rainIntensityHi = "हल्की बूंदाबांदी या फुहार संभव";
    rainIntensityEn = "Scattered light showers possible";
  }

  if (lang === "mr") {
    const text = `### 🌧️ ${foundPanchayat.panchayat_name} (${foundPanchayat.taluka}, ${foundPanchayat.district}) हवामान अंदाज\n\n- **अपेक्षित पाऊस (१ किमी AI):** **${rainEst} मिमी** *(कच्च्या NWP मॉडेलने ${rawBase} मिमी वर्तवला होता)*\n- **पावसाची शक्यता:** **${rainProbPct}%** (${rainIntensityMr})\n- **अपेक्षित तापमान:** **${temp}°C**\n- **विश्वासार्हता स्कोअर:** **${(foundPanchayat.trust_score * 100).toFixed(0)}% (उच्च)**\n- **एआय विश्लेषण:** ${foundPanchayat.trust_reason}\n\n💡 **शेतकरी सल्ला:** ${rainEst > 3 ? "पाणी साचण्याची शक्यता असल्याने फवारणी पुढे ढकला." : "फवारणी आणि खत व्यवस्थापनासाठी हवामान अनुकूल आहे."}`;
    const speechText = `${foundPanchayat.village_name} मध्ये आज ${rainEst} मिलीमीटर पावसाचा अंदाज आहे, पावसाची शक्यता ${rainProbPct} टक्के आहे, आणि तापमान ${temp} अंश सेल्सिअस राहील. ${rainIntensityMr}.`;
    return { text, speechText, detectedLang: "mr" };
  }

  if (lang === "hi") {
    const text = `### 🌧️ ${foundPanchayat.panchayat_name} (${foundPanchayat.taluka}, ${foundPanchayat.district}) मौसम पूर्वानुमान\n\n- **अनुमानित बारिश (1 किमी AI):** **${rainEst} मिमी** *(कच्चे NWP मॉडल का अनुमान ${rawBase} मिमी था)*\n- **बारिश की संभावना:** **${rainProbPct}%** (${rainIntensityHi})\n- **तापमान:** **${temp}°C**\n- **विश्वसनीयता स्कोर:** **${(foundPanchayat.trust_score * 100).toFixed(0)}% (High Trust)**\n- **एआई सत्यापन:** ${foundPanchayat.trust_reason}\n\n💡 **किसान सलाह:** ${rainEst > 3 ? "मिट्टी में नमी अधिक रहेगी, इसलिए कीटनाशक छिड़काव अभी न करें।" : "छिड़काव और उर्वरक प्रबंधन के लिए मौसम उपयुक्त है।"}`;
    const speechText = `${foundPanchayat.village_name} में आज ${rainEst} मिलीमीटर बारिश का अनुमान है, बारिश की संभावना ${rainProbPct} प्रतिशत है, और तापमान ${temp} डिग्री सेल्सियस रहेगा। ${rainIntensityHi}.`;
    return { text, speechText, detectedLang: "hi" };
  }

  const text = `### 🌧️ ${foundPanchayat.panchayat_name} (${foundPanchayat.taluka}, ${foundPanchayat.district}) Weather Forecast\n\n- **AI Downscaled Rain:** **${rainEst} mm** *(Raw NWP suggested ${rawBase} mm)*\n- **Probability of Rain:** **${rainProbPct}%** (${rainIntensityEn})\n- **Expected Temperature:** **${temp}°C**\n- **Model Trust Score:** **${(foundPanchayat.trust_score * 100).toFixed(0)}% (High)**\n- **Terrain Correction:** ${foundPanchayat.trust_reason}\n\n💡 **Farmer Tip:** ${rainEst > 3 ? "Avoid foliar spray due to rainfall runoff risk." : "Favorable conditions for routine agricultural activities."}`;
  const speechText = `In ${foundPanchayat.village_name}, expected rainfall is ${rainEst} millimeters with a ${rainProbPct} percent probability of rain. Temperature is around ${temp} degrees Celsius. ${rainIntensityEn}.`;

  return { text, speechText, detectedLang: "en" };
}
