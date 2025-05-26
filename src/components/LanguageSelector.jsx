import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faCheck,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import './LanguageSelector.css';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // South Africa's 11 official languages plus English
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'zu', name: 'isiZulu' },
    { code: 'xh', name: 'isiXhosa' },
    { code: 'st', name: 'Sesotho' },
    { code: 'tn', name: 'Setswana' },
    { code: 'nso', name: 'Sepedi' },
    { code: 'ts', name: 'Xitsonga' },
    { code: 'ss', name: 'siSwati' },
    { code: 've', name: 'Tshivenda' },
    { code: 'nr', name: 'isiNdebele' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = langCode => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current language name
  const getCurrentLanguageName = () => {
    const lang = languages.find(lang => lang.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector-button"
        onClick={toggleDropdown}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faGlobe} className="globe-icon" />
        <span className="current-language">{getCurrentLanguageName()}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-dropdown-header">
            <h3>Select Language</h3>
          </div>
          <ul className="language-list">
            {languages.map(language => (
              <li
                key={language.code}
                className={`language-item ${currentLanguage === language.code ? 'active' : ''}`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <span className="language-name">{language.name}</span>
                {currentLanguage === language.code && (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
