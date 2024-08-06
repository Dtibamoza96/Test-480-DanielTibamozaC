import React from 'react';
import { useLanguage } from '../data/LanguageContext';
import '../styles/Language.css';

const Language = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        onClick={() => switchLanguage('es')}
        className={`language-button ${language === 'es' ? 'selected' : ''}`}
      >
        Español
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`language-button ${language === 'en' ? 'selected' : ''}`}
      >
        English
      </button>
    </div>
  );
};

export default Language;