/// github-enforced-dark.js
/// alias github-dark.js

(function() {
  // Force GitHub to think user prefers dark mode
  const realMatchMedia = window.matchMedia;
  window.matchMedia = function(query) {
    if (query.includes("prefers-color-scheme")) {
      return {
        matches: query.includes("dark"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
      };
    }
    return realMatchMedia(query);
  };

  // Fallback style for parts GitHub misses
  const fallback = document.createElement("style");
  fallback.textContent = `
    html, body {
      background-color: #0d1117 !important;
      color: #c9d1d9 !important;
    }
    *, *::before, *::after {
      border-color: #30363d !important;
    }
  `;
  document.documentElement.appendChild(fallback);

  // Pre-set dark mode in localStorage just in case
  try {
    localStorage.setItem("colorMode", "dark");
    localStorage.setItem("colorModeSync", "true");
  } catch {}
})();

/// wikipedia-dark-mode-enforce.js
/// alias: wpdme.js
"use strict";
(function() {
    // 1. Set the dark mode preference cookie
    document.cookie = "enwikimwclientpreferences=night-mode; path=/; domain=.wikipedia.org; max-age=31536000";
    
    // 2. Force the HTML class and attributes to dark mode
    const html = document.documentElement;
    // Remove any explicit day/light classes
    html.className = html.className.replace(/\bskin-theme-clientpref-day\b/g, "");
    // Add the dark mode class if not present
    if (!html.classList.contains("skin-theme-clientpref-night")) {
        html.classList.add("skin-theme-clientpref-night");
    }
    // Remove any conflicting client preferences
    html.className = html.className.replace(/\bvector-feature-night-mode-enabled\b/g, "");
    html.classList.add("vector-feature-night-mode-enabled");
    
    // 3. If the appearance menu is open, select the "Dark" button
    // (Wikipedia uses buttons with data-mw="interface-preferences-appearance" and aria-checked)
    const darkButton = Array.from(document.querySelectorAll('button, input[type="radio"]'))
        .find(el =>
            (el.textContent && el.textContent.trim().toLowerCase() === "dark") ||
            (el.value && el.value.trim().toLowerCase() === "dark")
        );
    if (darkButton && !darkButton.getAttribute("aria-checked")) {
        darkButton.click();
    }
})();

