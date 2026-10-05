import { NextRequest, NextResponse } from "next/server";
import { generateChatbotReply, SupportedLanguage, detectLanguage } from "@/lib/chatbotEngine";
import { PANCHAYATS_DATA, MODEL_HEALTH_DATA } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || "";
    const requestedLang = (body.language as SupportedLanguage) || "en";
    const panchayatCode = body.panchayatCode || "MH_PUN_001";

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Check if user has configured GEMINI_API_KEY or OPENAI_API_KEY in environment
    const geminiKey = process.env.GEMINI_API_KEY;
    const detected = detectLanguage(message, requestedLang);

    if (geminiKey) {
      try {
        const systemPrompt = `You are MeghDrishti AI Voice Assistant, an AI expert for the Indian Ministry of Earth Sciences and IMD.
You specialize in 1km panchayat-level weather downscaling and crop advisories for farmers in Maharashtra, Karnataka, and Telangana.

Context data from website:
- Panchayats: ${JSON.stringify(PANCHAYATS_DATA.map(p => ({
          name: p.panchayat_name,
          village: p.village_name,
          taluka: p.taluka,
          district: p.district,
          state: p.state,
          rain_est_mm: p.latest_rainfall_estimate,
          baseline_rain_mm: p.latest_baseline_rainfall,
          rain_prob: p.latest_rain_prob,
          temp_c: p.latest_temp_estimate,
          soil: p.soil_type,
          clay_pct: p.soil_clay_pct,
          elevation_m: p.elevation_m,
          trust_score: p.trust_score,
          trust_reason: p.trust_reason
        })))}
- Model Health: ${JSON.stringify(MODEL_HEALTH_DATA)}
- Error reduction: +62.5% to +64.9% error reduction over raw NWP forecasts.

Instructions:
1. Respond in the EXACT same language in which the user asks:
   - If user asks in Marathi (मराठी) -> answer in fluent, respectful Marathi.
   - If user asks in Hindi (हिंदी) -> answer in fluent, respectful Hindi.
   - If user asks in English -> answer in English.
2. Provide two outputs in valid JSON format:
   - "text": Clean Markdown formatted response with bullet points and emojis.
   - "speechText": A clear, spoken sentence without markdown, bullets, or emojis for text-to-speech voice synthesis.
   - "detectedLang": "mr" or "hi" or "en".
Only output valid JSON.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
              ],
              generationConfig: { responseMimeType: "application/json" }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const parsed = JSON.parse(geminiData.candidates[0].content.parts[0].text);
          return NextResponse.json(parsed);
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to built-in knowledge engine.", err);
      }
    }

    // Default fast & reliable grounded engine
    const reply = generateChatbotReply(message, requestedLang, panchayatCode);
    return NextResponse.json(reply);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        text: "I'm sorry, I encountered an issue processing your request. Please try again.",
        speechText: "I'm sorry, I encountered an issue. Please try again.",
        detectedLang: "en"
      },
      { status: 500 }
    );
  }
}
