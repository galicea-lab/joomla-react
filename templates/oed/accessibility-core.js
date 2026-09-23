// accessibility-core.js - czysty JS bez zależności - dla komponentu dostępności
(function() {
  const STORAGE_KEY_CONTRAST = 'accessibility-contrast';
  const STORAGE_KEY_FONT = 'accessibility-font-size';

  function applySettings() {
    const isHighContrast = localStorage.getItem(STORAGE_KEY_CONTRAST) === 'true';
    const fontSize = localStorage.getItem(STORAGE_KEY_FONT) || '1';

    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    document.documentElement.style.fontSize = (fontSize * 100) + '%';
  }

  // Funkcje globalne do wywołania z przycisków
  window.setA11yFontSize = (size) => {
    localStorage.setItem(STORAGE_KEY_FONT, size);
    applySettings();
  };

  window.toggleA11yContrast = () => {
    const current = localStorage.getItem(STORAGE_KEY_CONTRAST) === 'true';
    localStorage.setItem(STORAGE_KEY_CONTRAST, !current);
    applySettings();
  };

  // Uruchom przy ładowaniu
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySettings);
  } else {
    applySettings();
  }
})();