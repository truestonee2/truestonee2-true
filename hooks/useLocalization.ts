import { useState, useCallback } from 'react';
import { translations } from '../translations';

export type Language = 'ko' | 'en';

export const useLocalization = () => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return { language, setLanguage, t };
};
