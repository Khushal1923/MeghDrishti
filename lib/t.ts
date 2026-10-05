/**
 * MeghDrishti — Central Translation Helper
 * Usage: import { tx } from "@/lib/t";  then  tx(language, "key")
 */

type Lang = "en" | "mr" | "hi";

const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // ── Generic ────────────────────────────────────────────────────────────────
  selectPanchayat:    { en: "Select Panchayat", mr: "ग्रामपंचायत निवडा", hi: "ग्राम पंचायत चुनें" },
  selectZone:         { en: "Select Zone", mr: "क्षेत्र निवडा", hi: "क्षेत्र चुनें" },
  search:             { en: "Search panchayat, district, village…", mr: "ग्रामपंचायत, जिल्हा, गाव शोधा…", hi: "पंचायत, जिला, गाँव खोजें…" },
  loading:            { en: "Loading…", mr: "लोड होत आहे…", hi: "लोड हो रहा है…" },
  active:             { en: "Active", mr: "सक्रिय", hi: "सक्रिय" },
  trust:              { en: "Trust", mr: "विश्वास", hi: "विश्वास" },
  highTrust:          { en: "High Trust", mr: "उच्च विश्वास (≥ ८०%)", hi: "उच्च विश्वास (≥ 80%)" },
  moderateTrust:      { en: "Moderate Trust", mr: "मध्यम विश्वास", hi: "मध्यम विश्वास" },
  selected:           { en: "Selected", mr: "निवडलेले केंद्र", hi: "चुना हुआ" },
  selectHub:          { en: "Select Hub →", mr: "केंद्र निवडा →", hi: "हब चुनें →" },
  rainfall:           { en: "Rainfall", mr: "पाऊस", hi: "वर्षा" },
  temperature:        { en: "Temperature", mr: "तापमान", hi: "तापमान" },
  rain:               { en: "Rain", mr: "पाऊस", hi: "बारिश" },
  rainFull:           { en: "Downscaled Rain", mr: "AI पावसाचा अंदाज", hi: "AI वर्षा अनुमान" },
  rainProb:           { en: "P(Rain):", mr: "पावसाची संभाव्यता:", hi: "वर्षा संभावना:" },
  temp:               { en: "Temp:", mr: "तापमान:", hi: "तापमान:" },
  elevation:          { en: "Elevation", mr: "उंची", hi: "ऊँचाई" },
  soilType:           { en: "Soil Type", mr: "माती प्रकार", hi: "मिट्टी का प्रकार" },
  windSpeed:          { en: "Wind Speed", mr: "वाऱ्याचा वेग", hi: "हवा की गति" },
  humidity:           { en: "Humidity", mr: "आर्द्रता", hi: "आर्द्रता" },

  // ── Days/Horizon ───────────────────────────────────────────────────────────
  today:              { en: "Today", mr: "आज", hi: "आज" },
  tomorrow:           { en: "Tomorrow", mr: "उद्या", hi: "कल" },
  day2:               { en: "+2 Days", mr: "+२ दिवस", hi: "+2 दिन" },
  day3:               { en: "+3 Days", mr: "+३ दिवस", hi: "+3 दिन" },
  day5:               { en: "+5 Days", mr: "+५ दिवस", hi: "+5 दिन" },

  // ── Forecast page ──────────────────────────────────────────────────────────
  forecastTitle:      { en: "5-Day Downscaled Weather Horizon", mr: "५-दिवसीय AI हवामान पूर्वानुमान", hi: "5 दिवसीय AI मौसम पूर्वानुमान" },
  forecastResolution: { en: "Resolution: 1 km Panchayat Scale", mr: "रिझोल्यूशन: १ किमी ग्रामपंचायत", hi: "रिज़ॉल्यूशन: 1 किमी ग्राम पंचायत" },
  terrainLapse:       { en: "Terrain lapse corrected", mr: "भूभाग उंची सुधारणा केली", hi: "भूभाग लैप्स-रेट सुधारित" },
  rainCategory:       { en: "Light Rain", mr: "हलका पाऊस", hi: "हल्की बारिश" },
  threshold:          { en: "≥ 2.5 mm threshold", mr: "≥ २.५ मिमी मर्यादा", hi: "≥ 2.5 मिमी सीमा" },
  surfaceGust:        { en: "Surface gust proxy", mr: "भूपृष्ठ वाऱ्याचा अंदाज", hi: "सतह वायु अनुमान" },
  humidityProxy:      { en: "Boundary layer proxy", mr: "सीमा स्तर आर्द्रता", hi: "सीमा परत आर्द्रता" },

  // ── Panchayats page ────────────────────────────────────────────────────────
  panchayatDir:       { en: "Panchayat Weather Directory", mr: "ग्रामपंचायत हवामान निर्देशिका", hi: "ग्राम पंचायत मौसम निर्देशिका" },
  panchayatSubtitle:  { en: "Explore 1 km localized downscaling for", mr: "१ किमी स्थानिक AI अंदाज —", hi: "1 किमी स्थानिक AI पूर्वानुमान —" },
  hubs:               { en: "rural hubs", mr: "ग्रामीण हब", hi: "ग्रामीण हब" },
  tabOverview:        { en: "Overview", mr: "सारांश", hi: "सिंहावलोकन" },
  tabForecast:        { en: "Forecast", mr: "हवामान अंदाज", hi: "पूर्वानुमान" },
  tabAccuracy:        { en: "Accuracy", mr: "अचूकता", hi: "सटीकता" },
  tabGeography:       { en: "Geography", mr: "भूगोल", hi: "भूगोल" },
  tabAdvisory:        { en: "Crop Advisory", mr: "पीक सल्ला", hi: "फसल सलाह" },
  outlookDays:        { en: "5-Day Weather Outlook", mr: "५-दिवसीय हवामान दृष्टिकोन", hi: "5 दिवसीय मौसम दृष्टिकोन" },
  aiTrustCalib:       { en: "AI Trust & Calibration Insight", mr: "एआय विश्वास आणि दुरुस्ती माहिती", hi: "एआई विश्वास और अंशांकन जानकारी" },
  cropRecommSummary:  { en: "Crop Recommendation (Cotton • Flowering)", mr: "पीक शिफारस (कापूस • फुले येण्याची अवस्था)", hi: "फसल अनुशंसा (कपास • फूल अवस्था)" },
  goodWindow:         { en: "Good Window", mr: "योग्य वेळ", hi: "उचित अवधि" },
  defaultAdvisory:    { en: "Suitable conditions for field activity.", mr: "शेतकाम करण्यासाठी अनुकूल परिस्थिती.", hi: "खेत कार्य के लिए उचित परिस्थितियाँ." },
  elevLabel:          { en: "Elevation", mr: "उंची", hi: "ऊँचाई" },
  slopeLabel:         { en: "Slope / Aspect", mr: "उतार / दिशा", hi: "ढलान / दिशा" },
  soilLabel:          { en: "Soil Type", mr: "माती प्रकार", hi: "मिट्टी का प्रकार" },
  clayLabel:          { en: "Clay Content", mr: "चिकणमाती प्रमाण", hi: "चिकनी मिट्टी" },
  rawNwpErr:          { en: "Raw NWP Error", mr: "कच्चा NWP त्रुटी", hi: "कच्ची NWP त्रुटि" },
  baselineMAE:        { en: "Baseline MAE", mr: "मूळ MAE", hi: "आधार MAE" },
  downscaledMAE:      { en: "Downscaled MAE", mr: "AI सुधारित MAE", hi: "डाउनस्केल्ड MAE" },
  skillBoost:         { en: "Skill Boost", mr: "कौशल्य वाढ", hi: "कौशल सुधार" },
  errorReduction:     { en: "Error reduction", mr: "त्रुटी कमी", hi: "त्रुटि में कमी" },
  stationRecord:      { en: "Station & Validation Record:", mr: "स्टेशन आणि सत्यापन नोंद:", hi: "स्टेशन और सत्यापन रिकॉर्ड:" },
  nearestStation:     { en: "Nearest IMD Station:", mr: "जवळचे IMD स्टेशन:", hi: "निकटतम IMD स्टेशन:" },
  totalValidated:     { en: "Total Validated Records:", mr: "एकूण सत्यापित नोंदी:", hi: "कुल सत्यापित रिकॉर्ड:" },
  falseAlarm:         { en: "False Alarm Ratio:", mr: "खोटा अलार्म गुणोत्तर:", hi: "झूठी चेतावनी अनुपात:" },
  cropland:           { en: "Cropland", mr: "शेती क्षेत्र", hi: "कृषि भूमि" },
  treeCover:          { en: "Tree Cover", mr: "वनक्षेत्र", hi: "वृक्ष आवरण" },
  settlement:         { en: "Settlement", mr: "वसाहत क्षेत्र", hi: "आबादी क्षेत्र" },
  coordinates:        { en: "Coordinates", mr: "भौगोलिक स्थान", hi: "निर्देशांक" },

  // ── Spatial map ────────────────────────────────────────────────────────────
  spatialIntel:       { en: "SPATIAL INTELLIGENCE", mr: "स्थानिक नकाशा बुद्धिमत्ता", hi: "स्थानिक मानचित्र बुद्धिमत्ता" },
  stationClusters:    { en: "Panchayat Station Clusters", mr: "हवामान केंद्र नेटवर्क (क्लस्टर्स)", hi: "पंचायत मौसम केंद्र समूह" },
  mapLoading:         { en: "Loading Panchayat Spatial Intelligence Map…", mr: "स्थानिक नकाशा लोड होत आहे…", hi: "ग्राम पंचायत स्थानिक नक्शा लोड हो रहा है…" },
  zoneAll:            { en: "All", mr: "सर्व", hi: "सभी" },
  zoneMH:             { en: "Maharashtra", mr: "महाराष्ट्र", hi: "महाराष्ट्र" },
  zoneKA:             { en: "Karnataka", mr: "कर्नाटक", hi: "कर्नाटक" },
  zoneTS:             { en: "Telangana", mr: "तेलंगणा", hi: "तेलंगाना" },

  // ── Comparison page ────────────────────────────────────────────────────────
  benchmarkPanchayat: { en: "Benchmark Panchayat", mr: "संदर्भ ग्रामपंचायत", hi: "बेंचमार्क ग्राम पंचायत" },
  seasonMonsoon:      { en: "Monsoon", mr: "पावसाळा", hi: "मानसून" },
  seasonPreMonsoon:   { en: "Pre-Monsoon", mr: "पूर्व-मान्सून", hi: "मानसून-पूर्व" },
  seasonWinter:       { en: "Winter", mr: "हिवाळा", hi: "शीतकाल" },
  seasonPostMonsoon:  { en: "Post-Monsoon", mr: "उत्तर-मान्सून", hi: "मानसून-पश्चात" },
  compCard1Title:     { en: "1. Baseline vs AI Error", mr: "१. मूळ NWP विरुद्ध AI त्रुटी", hi: "1. बेसलाइन बनाम AI त्रुटि" },
  compCard1Body:      {
    en: "Every forecast is benchmarked against raw coarse NWP. If local ML performs worse on unseen test data, the system flags no improvement.",
    mr: "प्रत्येक हवामान अंदाज कच्च्या NWP मॉडेलशी तुलना केला जातो. स्थानिक ML खराब परिणाम दर्शवल्यास प्रणाली 'कोणती सुधारणा नाही' असा इशारा देते.",
    hi: "प्रत्येक पूर्वानुमान कच्चे NWP मॉडल से बेंचमार्क किया जाता है। यदि स्थानिक ML खराब परिणाम देता है, तो सिस्टम 'कोई सुधार नहीं' का संकेत देता है।",
  },
  compCard2Title:     { en: "2. Leakage-Free Validation", mr: "२. डेटा गळती रहित सत्यापन", hi: "2. डेटा लीकेज-मुक्त सत्यापन" },
  compCard2Body:      {
    en: "Chronological split ensures future observations or test-period climatologies never leak into the downscaling feature pipeline.",
    mr: "कालक्रमानुसार विभाजन सुनिश्चित करते की भविष्यातील निरीक्षणे किंवा चाचणी डेटा कधीही AI प्रशिक्षणात मिसळत नाही.",
    hi: "कालानुक्रमिक विभाजन यह सुनिश्चित करता है कि भविष्य के अवलोकन या परीक्षण डेटा AI प्रशिक्षण में कभी नहीं मिलते।",
  },
  compCard3Title:     { en: "3. Orographic Resolution", mr: "३. पर्वतीय भूभाग रिझोल्यूशन", hi: "3. पर्वतीय भूभाग विभेदन" },
  compCard3Body:      {
    en: "Elevation, slope, and land cover features enable the model to resolve localized rain-shadow valleys and Ghats rainfall.",
    mr: "उंची, उतार आणि भूआच्छादन वैशिष्ट्यांमुळे मॉडेल स्थानिक पाऊसछाया आणि घाट पावसाचे चित्रण करू शकतो.",
    hi: "ऊँचाई, ढलान और भूमि उपयोग विशेषताएं मॉडल को स्थानीय वर्षा-छाया और घाट वर्षा को सटीक बनाने में सक्षम बनाती हैं।",
  },

  // ── Advisory card (voice/share) ────────────────────────────────────────────
  advisoryTitle:      { en: "Crop Advisory & Farmer Action", mr: "शेतकरी पीक सल्ला व कृती निर्णय", hi: "फसल सलाह एवं किसान कार्ययोजना" },
  advisoryFor:        { en: "Actionable guidance for", mr: "स्थानिक मार्गदर्शन:", hi: "के लिए व्यावहारिक मार्गदर्शन:" },
  voiceRead:          { en: "Voice Readout", mr: "आवाज ऐका", hi: "आवाज सुनें" },
  voiceStop:          { en: "Stop", mr: "थांबवा", hi: "रोकें" },
  shareWhatsApp:      { en: "Share WhatsApp", mr: "WhatsApp वर पाठवा", hi: "WhatsApp पर भेजें" },
  copied:             { en: "Copied!", mr: "कॉपी झाले!", hi: "कॉपी हुआ!" },
  selectCrop:         { en: "Select Crop", mr: "पीक निवडा", hi: "फसल चुनें" },
  growthStage:        { en: "Current Growth Stage", mr: "पिकाची सद्य अवस्था (Growth Stage)", hi: "वर्तमान वृद्धि अवस्था" },
  sprayWindow:        { en: "Spray Window", mr: "फवारणी काळ", hi: "छिड़काव समय" },
  irrigation:         { en: "Irrigation", mr: "सिंचन नियोजन", hi: "सिंचाई व्यवस्था" },
  fertilizer:         { en: "Fertilizer", mr: "खत सल्ला", hi: "उर्वरक सलाह" },
  hold:               { en: "HOLD", mr: "थांबवा", hi: "रोकें" },
  caution:            { en: "CAUTION", mr: "सावध", hi: "सावधान" },
  safe:               { en: "SAFE", mr: "योग्य वेळ", hi: "सुरक्षित" },
  stop:               { en: "STOP", mr: "पाणी बंद", hi: "बंद करें" },
  irrigate:           { en: "IRRIGATE", mr: "पाणी द्या", hi: "सिंचाई करें" },
  defaultSpray:       { en: "7:00 AM - 11:00 AM (Calm winds)", mr: "सकाळी ७ ते ११ वाऱ्याचा वेग कमी असताना", hi: "सुबह 7 से 11 बजे (शांत हवा)" },
  defaultIrrigation:  { en: "Apply scheduled light irrigation", mr: "हलके ठिबक सिंचन चालू ठेवा", hi: "नियमित हल्की सिंचाई जारी रखें" },
  defaultFertilizer:  { en: "Foliar 19:19:19 spray", mr: "१९:१९:१९ विद्राव्य खत फवारा", hi: "19:19:19 घुलनशील पर्णीय छिड़काव" },
  todayAction:        { en: "Today's Recommended Action", mr: "आजचा मुख्य कृती सल्ला", hi: "आज की अनुशंसित कार्ययोजना" },
  agronomicReason:    { en: "Agronomic Reason", mr: "वैज्ञानिक कारण (Reason)", hi: "कृषि वैज्ञानिक कारण" },
  pestAlert:          { en: "Pest & Disease Alert", mr: "कीड व रोग सावधगिरी", hi: "कीट और रोग चेतावनी" },
  soilCalib:          { en: "Calibrated for local soil moisture • Stage:", mr: "स्थानिक मातीच्या ओलाव्यानुसार अचूक • अवस्था:", hi: "स्थानिक मिट्टी नमी अनुसार अंशांकित • अवस्था:" },

  // ── Health & Validation pages ──────────────────────────────────────────────
  healthTitle:        { en: "Model Health & Pipeline Diagnostics", mr: "मॉडेल आरोग्य आणि पाइपलाइन निदान", hi: "मॉडल स्वास्थ्य और पाइपलाइन डायग्नोस्टिक्स" },
  healthDesc:         { en: "Real-time operational monitoring, validation record coverage, and telemetry logs.", mr: "रिअल-टाइम ऑपरेशनल मॉनिटरिंग, सत्यापन नोंदी आणि टेलीमेट्री लॉग्स.", hi: "रीयल-टाइम परिचालन निगरानी, सत्यापन रिकॉर्ड और टेलीमेट्री लॉग।" },
  dataQualityTitle:   { en: "Automated Data Quality Audit", mr: "स्वयंचलित डेटा गुणवत्ता ऑडिट", hi: "स्वचालित डेटा गुणवत्ता ऑडिट" },
  negRainCheck:       { en: "Negative Rainfall Anomaly Check", mr: "नकारात्मक पाऊस विसंगती तपासणी", hi: "नकारात्मक वर्षा विसंगति जाँच" },
  tempRangeCheck:     { en: "Temperature Range Validation (-10°C to 60°C)", mr: "तापमान श्रेणी सत्यापन (-10°C ते 60°C)", hi: "तापमान सीमा सत्यापन (-10°C से 60°C)" },
  dupTimestampCheck:  { en: "Duplicate Timestamp / Lead-Time Pairs", mr: "डुप्लिकेट टाइमस्टॅम्प / लीड-टाइम जोड्या", hi: "डुप्लिकेट टाइमस्टैम्प / लीड-टाइम जोड़े" },
  featureLeakCheck:   { en: "Feature Leakage Audit", mr: "फीचर लीकेज ऑडिट", hi: "फीचर लीकेज ऑडिट" },
  passed:             { en: "0 Violations (PASSED)", mr: "0 उल्लंघने (उत्तीर्ण)", hi: "0 उल्लंघन (उत्तीर्ण)" },
  strictChronHoldout: { en: "Strict Chronological Holdout (PASSED)", mr: "कडक कालक्रम होल्डआउट (उत्तीर्ण)", hi: "सख्त कालानुक्रमिक होल्डआउट (उत्तीर्ण)" },
  safeguardsTitle:    { en: "Operational Safeguards & Fallback", mr: "ऑपरेशनल सुरक्षा उपाय आणि फॉलबॅक", hi: "परिचालन सुरक्षा उपाय और फॉलबैक" },
  baselinePolicy:     { en: "Baseline Fail-Safe Policy:", mr: "बेसलाइन अयशस्वी-सुरक्षित धोरण:", hi: "बेसलाइन फेल-सेफ नीति:" },
  baselinePolicyBody: {
    en: "If model MAE degrades past baseline NWP, fallback to raw coarse forecast is automatic.",
    mr: "जर मॉडेल MAE कच्च्या NWP पेक्षा खराब झाला तर, कच्च्या अंदाजावर स्वयंचलित स्विच होतो.",
    hi: "यदि मॉडल MAE कच्चे NWP से खराब होता है, तो कच्चे पूर्वानुमान पर स्वचालित फॉलबैक होता है।",
  },
  confidenceThresh:   { en: "Confidence Thresholding:", mr: "विश्वास उंबरठा:", hi: "विश्वास थ्रेशोल्डिंग:" },
  confidenceBody:     {
    en: "Low Trust warnings automatically display when historical station density is < 30 days.",
    mr: "ऐतिहासिक स्टेशन घनता < ३० दिवस असल्यास 'कमी विश्वास' इशारे स्वयंचलितपणे दाखवले जातात.",
    hi: "जब ऐतिहासिक स्टेशन घनता < 30 दिन हो तो 'कम विश्वास' चेतावनी स्वचालित रूप से प्रदर्शित होती है।",
  },
  inferenceLatency:   { en: "Inference Latency:", mr: "अनुमान विलंब:", hi: "अनुमान विलंब:" },
  inferenceBody:      {
    en: "< 15 milliseconds per village prediction query on CPU.",
    mr: "CPU वर प्रति गाव भविष्यवाणी < १५ मिलीसेकंद.",
    hi: "CPU पर प्रति गाँव पूर्वानुमान < 15 मिलीसेकंड।",
  },

  // ── Validation page ────────────────────────────────────────────────────────
  validationTitle:    { en: "Accuracy & Research Validation Dashboard", mr: "अचूकता आणि संशोधन सत्यापन डॅशबोर्ड", hi: "सटीकता और शोध सत्यापन डैशबोर्ड" },
  validationDesc:     {
    en: "Comprehensive evaluation across Raw NWP, Bias Correction, Ridge, Random Forest, and LightGBM models.",
    mr: "कच्चे NWP, पूर्वग्रह सुधारणा, रिज, रँडम फॉरेस्ट आणि LightGBM मॉडेल्सचे सर्वसमावेशक मूल्यमापन.",
    hi: "कच्चे NWP, बायस सुधार, रिज, रैंडम फॉरेस्ट और LightGBM मॉडल का व्यापक मूल्यांकन।",
  },
  scorecardTitle:     { en: "Zone & Lead-Time Skill Scorecard", mr: "क्षेत्र आणि लीड-टाइम कौशल्य स्कोरकार्ड", hi: "क्षेत्र और लीड-टाइम कौशल स्कोरकार्ड" },
  scorecardSubtitle:  {
    en: "Skill = 1 - (Model MAE / Baseline MAE). Higher positive score indicates superior error reduction.",
    mr: "कौशल्य = १ - (मॉडेल MAE / बेसलाइन MAE). जास्त सकारात्मक स्कोर म्हणजे जास्त त्रुटी कमी.",
    hi: "कौशल = 1 - (मॉडल MAE / बेसलाइन MAE)। अधिक धनात्मक स्कोर बेहतर त्रुटि कमी को दर्शाता है।",
  },
  cohorts:            { en: "12 Stratified Evaluation Cohorts", mr: "१२ स्तरीकृत मूल्यमापन गट", hi: "12 स्तरीकृत मूल्यांकन समूह" },
  colZone:            { en: "Zone / State", mr: "क्षेत्र / राज्य", hi: "क्षेत्र / राज्य" },
  colLead:            { en: "Lead Time", mr: "लीड वेळ", hi: "लीड समय" },
  colSeason:          { en: "Season", mr: "हंगाम", hi: "मौसम" },
  colSample:          { en: "Sample Count", mr: "नमुना संख्या", hi: "नमूना संख्या" },
  colRawMAE:          { en: "Raw MAE (mm)", mr: "कच्चे MAE (मिमी)", hi: "कच्चा MAE (मिमी)" },
  colModelMAE:        { en: "Model MAE (mm)", mr: "मॉडेल MAE (मिमी)", hi: "मॉडल MAE (मिमी)" },
  colSkill:           { en: "Skill Score ↑", mr: "कौशल्य स्कोर ↑", hi: "कौशल स्कोर ↑" },
  colStatus:          { en: "Status", mr: "स्थिती", hi: "स्थिति" },

  // ── Map page ───────────────────────────────────────────────────────────────
  mapTitle:           { en: "Interactive Panchayat Weather Intelligence Map", mr: "ग्रामपंचायत हवामान बुद्धिमत्ता नकाशा", hi: "ग्राम पंचायत मौसम बुद्धिमत्ता नक्शा" },
  mapDesc:            {
    en: "Geographic distribution of downscaling performance, calibrated trust scores, and station hubs.",
    mr: "AI डाउनस्केलिंगचे भौगोलिक वितरण, विश्वास स्कोअर आणि स्टेशन हब.",
    hi: "डाउनस्केलिंग प्रदर्शन, विश्वास स्कोर और स्टेशन हब का भौगोलिक वितरण।",
  },
  selectedPanchayatIntel: { en: "Selected Panchayat Intelligence", mr: "निवडलेले ग्रामपंचायत विश्लेषण", hi: "चुनी हुई ग्राम पंचायत विश्लेषण" },

  // ── User card / mobile drawer ──────────────────────────────────────────────
  mobileActive:       { en: "Active", mr: "सक्रिय", hi: "सक्रिय" },

  // ── Forecast Card ──────────────────────────────────────────────────────────
  rainDownscaling:    { en: "Rainfall Downscaling", mr: "पाऊस डाउनस्केलिंग", hi: "वर्षा डाउनस्केलिंग" },
  localAI:            { en: "MeghDrishti Local AI", mr: "मेघदृष्टी स्थानिक AI", hi: "मेघदृष्टि स्थानीय AI" },
  rawForecastLabel:   { en: "Raw", mr: "कच्चा अंदाज", hi: "कच्चा" },
  adjusted:           { en: "adjusted", mr: "सुधारित", hi: "संशोधित" },
  tempTerrain:        { en: "Temperature & Terrain", mr: "तापमान व भूभाग", hi: "तापमान और भूभाग" },
  terrainCorrected:   { en: "Terrain Corrected", mr: "उंची व भूभाग सुधारित", hi: "भूभाग व लैप्स सुधारित" },
  resolutionScale:    { en: "Resolution: Panchayat / 1 km Scale", mr: "रिझोल्यूशन: ग्रामपंचायत / १ किमी प्रमाण", hi: "रिज़ॉल्यूशन: ग्राम पंचायत / 1 किमी पैमाना" },
  aiCorrectionInsight:{ en: "AI Correction Insight:", mr: "स्थानिक AI दुरुस्ती माहिती:", hi: "स्थानीय AI सुधार जानकारी:" },
  wind:               { en: "Wind", mr: "वारा", hi: "हवा" },

  // ── Comparison Chart ───────────────────────────────────────────────────────
  compQuestion:       { en: "Does local correction improve the forecast?", mr: "स्थानिक AI सुधारणेमुळे अंदाज अचूक होतो का?", hi: "क्या स्थानीय AI सुधार से पूर्वानुमान बेहतर होता है?" },
  benchmarkedAt:      { en: "Benchmarked against IMD Ground Truth at", mr: "येथील IMD जमिनीवरील नोंदींशी पडताळणी:", hi: "में IMD ग्राउंड ट्रुथ से तुलना:" },
  rawForecastError:   { en: "Raw Forecast Error", mr: "कच्च्या अंदाजाची त्रुटी", hi: "कच्चे पूर्वानुमान की त्रुटि" },
  coarseNwpBaseline:  { en: "Coarse NWP baseline", mr: "कच्ची NWP बेसलाइन", hi: "कच्ची NWP बेसलाइन" },
  meghdrishtiError:   { en: "MeghDrishti Error", mr: "मेघदृष्टी AI त्रुटी", hi: "मेघदृष्टि AI त्रुटि" },
  localDownscaledErr: { en: "Local downscaled error", mr: "स्थानिक १ किमी त्रुटी", hi: "स्थानीय 1 किमी त्रुटि" },
  improvementSkill:   { en: "Improvement Skill", mr: "सुधारणा कौशल्य", hi: "सुधार कौशल" },
  statValidated:      { en: "Statistically validated improvement", mr: "आकडेवारीनुसार पडताळलेली सुधारणा", hi: "सांख्यिकीय रूप से सत्यापित सुधार" },
  legendObserved:     { en: "Observed (IMD Ground Truth)", mr: "नोंदवला गेलेला पाऊस (IMD)", hi: "वास्तविक वर्षा (IMD सत्य)" },
  legendRaw:          { en: "Raw NWP (Baseline)", mr: "कच्चा NWP अंदाज", hi: "कच्चा NWP बेसलाइन" },
  legendCorrected:    { en: "MeghDrishti (Corrected)", mr: "मेघदृष्टी AI सुधारित", hi: "मेघदृष्टि AI सुधारित" },

  // ── Model Comparison Table ─────────────────────────────────────────────────
  modelBenchTitle:    { en: "Transparent Model Benchmark & Scorecard", mr: "पारदर्शक मॉडेल तुलना व अचूकता स्कोरकार्ड", hi: "पारदर्शी मॉडल बेंचमार्क और स्कोरकार्ड" },
  modelBenchSub:      { en: "Strict chronological evaluation on 13,780 unseen test pairs across Maharashtra, Karnataka, and Telangana", mr: "महाराष्ट्र, कर्नाटक आणि तेलंगणामधील १३,७८० चाचणी नोंदींवर कडक कालक्रमानुसार पडताळणी", hi: "महाराष्ट्र, कर्नाटक और तेलंगाना में 13,780 परीक्षण जोड़ों पर सख्त कालानुक्रमिक मूल्यांकन" },
  lightgbmProd:       { en: "LightGBM Selected for Production", mr: "LightGBM प्रणालीसाठी निवडले", hi: "LightGBM उत्पादन के लिए चयनित" },
  colModelArch:       { en: "Model Architecture", mr: "मॉडेल आर्किटेक्चर", hi: "मॉडल आर्किटेक्चर" },
  colTarget:          { en: "Target", mr: "लक्ष्य (Target)", hi: "लक्ष्य (Target)" },
  colTrainTime:       { en: "Train Time", mr: "प्रशिक्षण वेळ", hi: "प्रशिक्षण समय" },
  colBenchStatus:     { en: "Benchmark Status", mr: "बेंचमार्क स्थिती", hi: "बेंचमार्क स्थिति" },
  zeroLeakageNote:    { en: "Strict zero-data-leakage split: test set never touches training pipeline", mr: "डेटा गळती रहित कालक्रम विभाजन: चाचणी डेटा प्रशिक्षण प्रक्रियेत मिसळत नाही", hi: "डेटा लीकेज-मुक्त कालानुक्रमिक विभाजन: परीक्षण डेटा प्रशिक्षण में कभी नहीं मिलता" },

  // ── Model Health Card ──────────────────────────────────────────────────────
  sysHealthTitle:     { en: "System & Model Operational Health", mr: "प्रणाली व मॉडेल आरोग्य स्थिती", hi: "सिस्टम और मॉडल परिचालन स्वास्थ्य" },
  sysHealthSub:       { en: "Pipeline status, telemetry and validation metrics", mr: "पाइपलाइन स्थिती, टेलिमेट्री व सत्यापन आकडेवारी", hi: "पाइपलाइन स्थिति, टेलीमेट्री और सत्यापन मेट्रिक्स" },
  sysOperational:     { en: "System Operational", mr: "प्रणाली सुरळीत कार्यरत", hi: "सिस्टम सुचारू रूप से कार्यरत" },
  histSkillScore:     { en: "Historical Skill Score", mr: "ऐतिहासिक कौशल्य स्कोर", hi: "ऐतिहासिक कौशल स्कोर" },
  unseenHoldout:      { en: "Unseen test holdout", mr: "अप्रकाशित चाचणी डेटा", hi: "अदृश्य परीक्षण डेटा" },
  dataRecordsProc:    { en: "Data Records Processed", mr: "प्रक्रिया केलेल्या नोंदी", hi: "संसाधित डेटा रिकॉर्ड" },
  calibratedHubs:     { en: "Calibrated Hubs", mr: "कॅलिब्रेटेड ग्रामपंचायती", hi: "कैलिब्रेटेड ग्राम पंचायतें" },
  contrastZones:      { en: "3 Contrast Zones", mr: "३ भौगोलिक क्षेत्रे", hi: "3 भौगोलिक क्षेत्र" },
  coverageLabel:      { en: "Coverage", mr: "व्याप्ती", hi: "कवरेज" },
};

export function tx(lang: Lang, key: string, fallback?: string): string {
  const entry = TRANSLATIONS[key];
  if (!entry) return fallback ?? key;
  return entry[lang] ?? entry["en"] ?? fallback ?? key;
}

export type { Lang };
