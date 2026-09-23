(function() {
  const CONSENT_KEY = 'user-cookie-consent';

  function initCookieBanner() {
    if (localStorage.getItem(CONSENT_KEY)) return;

    // Tworzymy prosty HTML banera dynamicznie, aby nie zaśmiecać DOMu Joomla
    const banner = document.createElement('div');
    banner.id = 'js-cookie-banner';
    banner.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:#0f172a;color:white;padding:1rem;z-index:9999;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;border-top:1px solid #334155;font-family:sans-serif;";
    
    banner.innerHTML = `
      <p style="margin:0;font-size:14px;">Ta strona korzysta z ciasteczek. Pozostając tutaj, wyrażasz na to zgodę.</p>
      <button id="js-accept-cookies" style="background:#2563eb;color:white;border:none;padding:8px 20px;border-radius:4px;cursor:pointer;font-weight:bold;">Akceptuję</button>
    `;

    document.body.appendChild(banner);

    document.getElementById('js-accept-cookies').onclick = function() {
      localStorage.setItem(CONSENT_KEY, 'true');
      banner.remove();
      window.dispatchEvent(new Event('cookie-consent-given'));
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();