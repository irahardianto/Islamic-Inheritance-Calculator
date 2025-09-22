
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type Language, type Currency } from '../types';
import { translations } from '../constants/locales';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  const t = (key: string, params?: Record<string, any>): string => {
    try {
      let text = key.split('.').reduce((obj, k) => obj && (obj as any)[k], translations[language]) as string;
      
      if (typeof text !== 'string') {
        console.warn(`Translation key '${key}' not found or is not a string.`);
        return key;
      }

      if (params) {
        text = Object.keys(params).reduce((acc, k) => {
          return acc.replace(new RegExp(`{${k}}`, 'g'), params[k]);
        }, text);
      }
      return text;
    } catch (error) {
        console.error(`Error translating key '${key}':`, error);
        return key;
    }
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};