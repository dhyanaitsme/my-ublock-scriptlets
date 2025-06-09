/// github-dark-mode-enabler.js
/// alias gdme.js

(function() {
  window.addEventListener("DOMContentLoaded", function() {
    try {
      const theme = localStorage.getItem("colorMode");
      if (theme !== "dark") {
        localStorage.setItem("colorMode", "dark");
        localStorage.setItem("colorModeSync", "true");
        location.reload();
      }
    } catch (e) {
      console.error("GitHub Dark Mode Enabler failed:", e);
    }
  });
})();
