// src/context/i18n.js
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "i18next";

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    const lang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "en";
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
