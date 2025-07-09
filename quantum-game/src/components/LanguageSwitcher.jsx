import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-3 border border-stone-300 hover:bg-stone-200 text-stone-600 font-bold rounded-lg shadow-sm transition-all active:scale-95 text-sm w-12"
    >
      {language === 'tr' ? 'EN' : 'TR'}
    </button>
  );
};

export default LanguageSwitcher;