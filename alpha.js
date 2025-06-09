/// github-force-prefers-dark.js
/// alias github-force-dark.js

(function() {
  // Override matchMedia before GitHub's scripts run
  const realMatchMedia = window.matchMedia;
  window.matchMedia = function(query) {
    if (typeof query === "string" && query.includes("prefers-color-scheme")) {
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

  // Pre-set localStorage just in case
  try {
    localStorage.setItem("colorMode", "dark");
    localStorage.setItem("colorModeSync", "true");
  } catch (e) {
    console.warn("Could not set GitHub theme in localStorage:", e);
  }
})();
