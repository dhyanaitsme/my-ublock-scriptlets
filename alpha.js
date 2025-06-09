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
