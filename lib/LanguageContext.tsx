"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";

export type Language = "en" | "mr" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);

  useEffect(() => {
    // Dynamically load the message bundle for the selected language
    import(`@/messages/${language}.json`)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        // Fallback to English on error
        import("@/messages/en.json").then((mod) => setMessages(mod.default));
      });
  }, [language]);

  // Don't render until messages are loaded to avoid flash of untranslated content
  if (!messages) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <NextIntlClientProvider locale={language} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
