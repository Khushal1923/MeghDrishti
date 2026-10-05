"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
  Bot,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Square,
  Copy,
  Check,
  Radio,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import {
  ChatMessage,
  SupportedLanguage,
  detectLanguage,
  generateChatbotReply
} from "@/lib/chatbotEngine";

const QUICK_PROMPTS: Record<SupportedLanguage, string[]> = {
  en: [
    "🌧️ Rain forecast for Wagholi",
    "🌾 Cotton spray advisory",
    "⚡ How does AI downscaling work?",
    "🏔️ Tapola soil and elevation",
    "☀️ High temperature alerts"
  ],
  mr: [
    "🌧️ वाघोलीत आज पाऊस पडेल का?",
    "🌾 कापूस पिकासाठी फवारणी सल्ला",
    "⚡ मेघदृष्टी मॉडेल कसे काम करते?",
    "🏔️ तापोळा माती आणि उंची",
    "💧 जमिनीतील ओलावा व पाण्याचा निचरा"
  ],
  hi: [
    "🌧️ वाघोली में आज बारिश का अनुमान",
    "🌾 कपास फसल छिड़काव सलाह",
    "⚡ मेघदृष्टि मॉडल कैसे काम करता है?",
    "🏔️ तापोला मिट्टी और ऊंचाई",
    "💧 सोयाबीन सिंचाई सलाह"
  ]
};

export const VoiceChatbot: React.FC = () => {
  const { language: appLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [manualLang, setManualLang] = useState<SupportedLanguage | "auto">("auto");

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting on mount
  useEffect(() => {
    const greetingText =
      appLang === "mr"
        ? "नमस्कार! मी मेघदृष्टी एआय सहाय्यक आहे. 🌾🌧️\nतुम्ही मला कोणत्याही ग्रामपंचायतीचा पावसाचा अंदाज, मातीची स्थिती किंवा पिकांच्या सल्ल्याबद्दल बोलून अथवा लिहून विचारू शकता."
        : appLang === "hi"
        ? "नमस्ते! मैं मेघदृष्टि एआई सहायक हूँ। 🌾🌧️\nआप मुझसे किसी भी ग्राम पंचायत के मौसम पूर्वानुमान, मिट्टी की स्थिति या फसल सलाह के बारे में बोलकर या लिखकर पूछ सकते हैं।"
        : "Hello! I am your MeghDrishti AI Voice Assistant. 🌾🌧️\nAsk me anything about panchayat rainfall, 1km AI downscaling, soil types, or crop advisories by speaking or typing!";

    const speechText =
      appLang === "mr"
        ? "नमस्कार! मी मेघदृष्टी एआय सहाय्यक आहे. हवामान आणि पिकांच्या सल्ल्याबद्दल प्रश्न विचारा."
        : appLang === "hi"
        ? "नमस्ते! मैं मेघदृष्टि एआई सहायक हूँ। मौसम और फसल सलाह के बारे में पूछें।"
        : "Hello! I am your MeghDrishti AI Voice Assistant. How can I help you today?";

    setMessages([
      {
        id: "msg-initial",
        sender: "bot",
        text: greetingText,
        speechText: speechText,
        lang: appLang as SupportedLanguage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  }, [appLang]);

  // Check speech synthesis & recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSpeechRec = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
      setVoiceSupported(hasSpeechRec);
    }
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Clean up speech on unmount or close
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Speak text aloud using SpeechSynthesis
  const speakUtterance = (text: string, lang: SupportedLanguage, messageId?: string) => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "mr" ? "mr-IN" : lang === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.93;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matched =
        voices.find((v) => v.lang.replace("_", "-").toLowerCase() === utterance.lang.toLowerCase()) ||
        voices.find((v) => v.lang.toLowerCase().includes(lang === "mr" ? "mr" : lang === "hi" ? "hi" : "en-in")) ||
        voices.find((v) => v.lang.toLowerCase().includes("hi") || v.lang.toLowerCase().includes("en"));

      if (matched) {
        utterance.voice = matched;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (messageId) setActiveSpeakingId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeakingId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeakingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      setIsSpeaking(false);
      setActiveSpeakingId(null);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveSpeakingId(null);
  };

  // Toggle voice recognition (Speech to Text)
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    stopSpeaking();

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;

      const effectiveLang = manualLang !== "auto" ? manualLang : appLang;
      recognition.lang = effectiveLang === "mr" ? "mr-IN" : effectiveLang === "hi" ? "hi-IN" : "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Could not start speech recognition:", err);
      setIsListening(false);
    }
  };

  // Send message and get AI answer
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    setInputValue("");
    stopSpeaking();

    const effectiveLang = manualLang !== "auto" ? manualLang : appLang;
    const detected = detectLanguage(query, effectiveLang as SupportedLanguage);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      lang: detected,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      // First attempt to call the server API route
      let botResponse: { text: string; speechText: string; detectedLang: SupportedLanguage } | null = null;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: query,
            language: manualLang !== "auto" ? manualLang : detected
          })
        });

        if (res.ok) {
          botResponse = await res.json();
        }
      } catch (e) {
        // Fallback to client-side grounded knowledge engine
      }

      if (!botResponse || !botResponse.text) {
        botResponse = generateChatbotReply(
          query,
          manualLang !== "auto" ? manualLang : detected
        );
      }

      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        text: botResponse.text,
        speechText: botResponse.speechText,
        lang: botResponse.detectedLang,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);

      // Speak automatically in detected language
      if (!isMuted && botResponse.speechText) {
        speakUtterance(botResponse.speechText, botResponse.detectedLang, botMsgId);
      }
    } catch (err) {
      console.error("Error handling message:", err);
      setIsThinking(false);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: "I am having difficulty retrieving weather details right now. Please try again.",
        speechText: "I am having difficulty retrieving weather details right now. Please try again.",
        lang: "en",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const currentPrompts =
    manualLang === "mr" || (manualLang === "auto" && appLang === "mr")
      ? QUICK_PROMPTS.mr
      : manualLang === "hi" || (manualLang === "auto" && appLang === "hi")
      ? QUICK_PROMPTS.hi
      : QUICK_PROMPTS.en;

  return (
    <>
      {/* Floating Launcher Button at Bottom-Right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-[#0f2918] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-[#2b5936] animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
            <span>
              {appLang === "mr" ? "हवामान आवाज सहाय्यक" : appLang === "hi" ? "मौसम आवाज सहायक" : "AI Voice Assistant"}
            </span>
          </div>
        )}

        <button
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            } else {
              stopSpeaking();
              setIsOpen(false);
            }
          }}
          className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#166534]/50 ${
            isOpen
              ? "bg-[#0f2918] text-white rotate-90"
              : "bg-gradient-to-tr from-[#166534] via-[#1b7a3e] to-[#22c55e] text-white hover:scale-105"
          }`}
          aria-label="Toggle MeghDrishti AI Voice Assistant"
        >
          {/* Subtle pulse ring */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-[#22c55e] opacity-40 animate-ping" />
          )}

          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4ade80] rounded-full border-2 border-[#166534] animate-pulse" />
            </div>
          )}
        </button>
      </div>

      {/* Expanded Chat Drawer / Card */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md h-[580px] max-h-[82vh] bg-[#f8faf8] border border-[#c4d8c6] rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f2918] via-[#166534] to-[#1e5229] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#2b5936] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <Bot className="w-5 h-5 text-[#4ade80]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ade80] rounded-full border-2 border-[#0f2918]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black tracking-tight">MeghDrishti AI</h3>
                  <span className="bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                    Voice
                  </span>
                </div>
                <p className="text-[11px] text-[#c4d8c6] font-medium leading-none">
                  {appLang === "mr" ? "१ किमी ग्रामपंचायत हवामान सल्लागार" : appLang === "hi" ? "1 किमी पंचायत मौसम सलाहकार" : "1km Panchayat Weather & Crops"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Selector Dropdown Pill */}
              <div className="relative">
                <select
                  value={manualLang}
                  onChange={(e) => setManualLang(e.target.value as any)}
                  className="bg-black/25 text-white text-[11px] font-bold px-2 py-1 rounded-lg border border-white/20 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
                  title="Force Language or Auto-detect"
                >
                  <option value="auto" className="bg-[#0f2918] text-white">Auto Lang</option>
                  <option value="en" className="bg-[#0f2918] text-white">English</option>
                  <option value="mr" className="bg-[#0f2918] text-white">मराठी</option>
                  <option value="hi" className="bg-[#0f2918] text-white">हिंदी</option>
                </select>
              </div>

              {/* Mute / Unmute Button */}
              <button
                onClick={() => {
                  if (!isMuted) stopSpeaking();
                  setIsMuted(!isMuted);
                }}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isMuted
                    ? "bg-red-500/20 border-red-400/40 text-red-300"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Minimize/Close */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Speaking Indicator Banner */}
          {isSpeaking && (
            <div className="bg-[#dcfce7] border-b border-[#86efac] px-3.5 py-1.5 flex items-center justify-between text-xs text-[#166534] font-bold animate-pulse">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-[#166534]" />
                <span>
                  {appLang === "mr" ? "आवाज सुरू आहे..." : appLang === "hi" ? "आवाज शुरू है..." : "Speaking response..."}
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-[#166534] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-4 bg-[#166534] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-2 bg-[#166534] rounded-full animate-bounce" />
                </span>
              </div>
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1 bg-[#166534] text-white text-[10px] px-2 py-0.5 rounded-md hover:bg-[#0f2918] transition-colors"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
                <span>{appLang === "mr" ? "थांबवा" : appLang === "hi" ? "रोकें" : "Stop"}</span>
              </button>
            </div>
          )}

          {/* Listening Indicator Banner */}
          {isListening && (
            <div className="bg-red-50 border-b border-red-200 px-3.5 py-2 flex items-center justify-between text-xs text-red-700 font-bold animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>
                  {appLang === "mr" ? "ऐकत आहे... बोला..." : appLang === "hi" ? "सुन रहा हूँ... बोलिए..." : "Listening... Speak now..."}
                </span>
              </div>
              <button
                onClick={toggleListening}
                className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-md hover:bg-red-700"
              >
                {appLang === "mr" ? "पूर्ण करा" : appLang === "hi" ? "समाप्त" : "Done"}
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f4f7f4]/80">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isCurrentlySpeaking = activeSpeakingId === msg.id && isSpeaking;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-xs text-sm ${
                      isUser
                        ? "bg-[#166534] text-white rounded-br-xs font-medium"
                        : "bg-white text-[#0f2918] border border-[#cde0cf] rounded-bl-xs leading-relaxed"
                    } ${isCurrentlySpeaking ? "ring-2 ring-[#22c55e] shadow-md" : ""}`}
                  >
                    {/* Message Header info for bot */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#e4ede5]">
                        <span className="text-[10px] font-black uppercase text-[#166534] tracking-wider flex items-center gap-1">
                          <Bot className="w-3 h-3 text-[#166534]" />
                          MeghDrishti AI ({msg.lang.toUpperCase()})
                        </span>

                        <div className="flex items-center gap-1">
                          {msg.speechText && (
                            <button
                              onClick={() => {
                                if (isCurrentlySpeaking) {
                                  stopSpeaking();
                                } else {
                                  speakUtterance(msg.speechText!, msg.lang, msg.id);
                                }
                              }}
                              className={`p-1 rounded hover:bg-[#e4ede5] transition-colors ${
                                isCurrentlySpeaking ? "text-[#166534] font-bold" : "text-[#55755b]"
                              }`}
                              title="Listen to this answer"
                            >
                              {isCurrentlySpeaking ? (
                                <Square className="w-3.5 h-3.5 fill-current text-[#166534]" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1 rounded text-[#55755b] hover:bg-[#e4ede5] transition-colors"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-[#166534]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Formatted Text Content */}
                    <div className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed break-words">
                      {msg.text.split("\n").map((line, idx) => {
                        if (line.startsWith("### ")) {
                          return (
                            <h4 key={idx} className="font-black text-[#166534] text-sm mt-1 mb-1">
                              {line.replace("### ", "")}
                            </h4>
                          );
                        }
                        if (line.startsWith("- ")) {
                          const parts = line.replace("- ", "").split("**");
                          return (
                            <p key={idx} className="my-0.5 pl-2 border-l-2 border-[#166534]/30">
                              {parts.map((p, pIdx) =>
                                pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-[#0f2918]">{p}</strong> : p
                              )}
                            </p>
                          );
                        }
                        return <p key={idx} className="my-0.5">{line}</p>;
                      })}
                    </div>

                    <div
                      className={`text-[9px] mt-1.5 flex justify-end ${
                        isUser ? "text-white/70" : "text-[#7a9980]"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-[#166534] bg-white border border-[#cde0cf] px-3.5 py-2.5 rounded-2xl w-fit shadow-xs">
                <Sparkles className="w-4 h-4 text-[#166534] animate-spin" />
                <span className="font-bold">
                  {appLang === "mr" ? "माहिती तपासत आहे..." : appLang === "hi" ? "जानकारी खोज रहा हूँ..." : "Analyzing panchayat data..."}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#166534] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#166534] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#166534] rounded-full animate-bounce" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="bg-[#ebf2ec] px-3 py-2 border-t border-[#d2e2d4] overflow-x-auto no-scrollbar flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] font-black text-[#166534] uppercase tracking-wider shrink-0 mr-1">
              {appLang === "mr" ? "सुचवलेले प्रश्न:" : appLang === "hi" ? "सुझाव:" : "Suggestions:"}
            </span>
            {currentPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ""))}
                className="text-xs bg-white text-[#166534] hover:bg-[#166534] hover:text-white px-2.5 py-1 rounded-full border border-[#c2d9c4] transition-all font-semibold shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Controls Bar */}
          <div className="bg-white p-3 border-t border-[#cde0cf] flex items-center gap-2">
            {/* Microphone Button (Speech to Text) */}
            <button
              onClick={toggleListening}
              className={`p-2.5 rounded-2xl transition-all shadow-xs flex items-center justify-center shrink-0 ${
                isListening
                  ? "bg-red-600 text-white animate-pulse ring-4 ring-red-200"
                  : "bg-[#e5eee5] hover:bg-[#d5e4d5] text-[#166534]"
              }`}
              title={
                isListening
                  ? "Stop recording"
                  : voiceSupported
                  ? "Speak your question (Voice Input)"
                  : "Voice not supported"
              }
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                appLang === "mr"
                  ? "हवामान किंवा पिकांविषयी विचारा..."
                  : appLang === "hi"
                  ? "मौसम या फसल के बारे में पूछें..."
                  : "Ask about weather, rain, crops..."
              }
              className="flex-1 bg-[#f4f8f4] border border-[#c7dcc9] rounded-2xl px-3.5 py-2 text-sm text-[#0f2918] placeholder:text-[#6a8770] focus:outline-none focus:ring-2 focus:ring-[#166534] focus:bg-white font-medium"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isThinking}
              className="p-2.5 rounded-2xl bg-[#166534] hover:bg-[#0f2918] disabled:opacity-40 text-white transition-all shadow-xs shrink-0 flex items-center justify-center"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
