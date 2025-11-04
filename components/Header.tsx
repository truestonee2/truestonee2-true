import React from 'react';
import { TranslateIcon } from './icons/TranslateIcon';

interface HeaderProps {
    language: 'ko' | 'en';
    setLanguage: (lang: 'ko' | 'en') => void;
    t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t }) => {
  
  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <header className="relative text-center p-6 border-b border-gray-700/50">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        {t('header_title')}
      </h1>
      <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
        {t('header_subtitle')}
      </p>
      <button 
        onClick={toggleLanguage}
        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-lg text-sm transition-colors"
        title={t('toggle_language_title')}
        >
        <TranslateIcon className="w-5 h-5" />
        <span className="font-semibold">{language === 'ko' ? 'EN' : '한국어'}</span>
      </button>
    </header>
  );
};

export default Header;