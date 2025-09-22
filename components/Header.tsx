
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Language, Currency } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage, currency, setCurrency, t } = useAppContext();

  return (
    <header className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t('appName')}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="language-select" className="sr-only">{t('language')}</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-teal-600 text-white rounded-md py-1 pl-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
            </select>
          </div>
          <div className="relative">
             <label htmlFor="currency-select" className="sr-only">{t('currency')}</label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-teal-600 text-white rounded-md py-1 pl-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="USD">USD ($)</option>
              <option value="IDR">IDR (Rp)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
