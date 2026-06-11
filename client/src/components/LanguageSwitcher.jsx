import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n/index.js';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language)
    || SUPPORTED_LANGUAGES.find((l) => i18n.language?.startsWith(l.code))
    || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const pick = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={`lang-switcher ${open ? 'is-open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang-switcher-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <i className="fas fa-globe" />
        <span>{current.native}</span>
        <i className="fas fa-chevron-down lang-chevron" />
      </button>
      <div className="lang-switcher-panel" role="menu">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <button
            key={lng.code}
            type="button"
            className={`lang-option ${lng.code === current.code ? 'is-active' : ''}`}
            onClick={() => pick(lng.code)}
          >
            <span className="lang-option-native">{lng.native}</span>
            <small>{lng.label}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
