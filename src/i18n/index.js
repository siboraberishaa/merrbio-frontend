import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./en/translations.json";
import sqTranslations from "./sq/translations.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    sq: {
      translation: sqTranslations,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
});

export default i18n;
