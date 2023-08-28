import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const loadPath = `${import.meta.env.VITE_I18n_LOAD_PATH}?api_key=${import.meta.env.VITE_I18n_API_KEY}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["en","de","ru","uk"],
    
    backend: {
      loadPath: loadPath
    }
  })