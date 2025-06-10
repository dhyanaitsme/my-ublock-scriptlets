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
    // 1. Set the dark mode preference cookie for Wikipedia
    document.cookie = "enwikimwclientpreferences=night-mode; path=/; domain=.wikipedia.org; max-age=31536000";
    
    // 2. Update HTML classes to enforce dark mode
    const html = document.documentElement;
    // Remove any explicit day/light mode classes
    html.className = html.className
        .replace(/\bskin-theme-clientpref-day\b/g, "")
        .replace(/\bskin-theme-clientpref-light\b/g, "")
        .replace(/\bskin-theme-clientpref-auto\b/g, "");
    // Add the dark mode class if not present
    if (!html.classList.contains("skin-theme-clientpref-night")) {
        html.classList.add("skin-theme-clientpref-night");
    }
    // Ensure the night mode feature class is present
    if (!html.classList.contains("vector-feature-night-mode-enabled")) {
        html.classList.add("vector-feature-night-mode-enabled");
    }

    // 3. If the appearance menu is open, select the "Dark" button
    const darkButton = Array.from(document.querySelectorAll('button, input[type="radio"]'))
        .find(el =>
            (el.textContent && el.textContent.trim().toLowerCase() === "dark") ||
            (el.value && el.value.trim().toLowerCase() === "dark")
        );
    if (darkButton && !darkButton.getAttribute("aria-checked")) {
        darkButton.click();
    }
})();

/// dark-mode-multi.js
(function() {
    const host = location.hostname;
    window.addEventListener("DOMContentLoaded", function() {
        // Google Search and Google News
        if (
            host === "www.google.com" ||
            host === "news.google.com"
        ) {
            // Google uses a dark mode toggle in the menu (not always present when logged out)
            const darkToggle = document.querySelector("a[aria-label*='Dark theme'], a[aria-label*='dark theme']");
            if (darkToggle && !document.documentElement.classList.contains("dark")) {
                darkToggle.click();
            }
            // Fallback: force dark background
            document.documentElement.style.backgroundColor = "#202124";
            document.body.style.backgroundColor = "#202124";
        }

        // YouTube
        else if (host === "www.youtube.com") {
            // Try to find and click the dark mode toggle in the menu
            const menuButton = document.querySelector('button[aria-label="Settings"]');
            if (menuButton) menuButton.click();
            setTimeout(() => {
                const darkMenuItem = Array.from(document.querySelectorAll("tp-yt-paper-item"))
                    .find(el => el.textContent.toLowerCase().includes("appearance"));
                if (darkMenuItem) {
                    darkMenuItem.click();
                    setTimeout(() => {
                        const darkOption = Array.from(document.querySelectorAll("tp-yt-paper-item"))
                            .find(el => el.textContent.toLowerCase().includes("dark theme"));
                        if (darkOption) darkOption.click();
                    }, 500);
                }
            }, 500);
            // Fallback: force dark background
            document.documentElement.style.backgroundColor = "#181818";
            document.body.style.backgroundColor = "#181818";
        }

        // GitHub
        else if (host === "github.com") {
            // GitHub dark mode toggle (only available for logged-in users, fallback to CSS for logged-out)
            document.documentElement.setAttribute("data-color-mode", "dark");
            document.documentElement.setAttribute("data-dark-theme", "dark");
            document.documentElement.style.backgroundColor = "#0d1117";
            document.body.style.backgroundColor = "#0d1117";
        }

        // Reddit
        else if (host === "www.reddit.com") {
            // Reddit dark mode for not-logged-in users (sets theme cookie)
            document.cookie = "theme=dark; domain=.reddit.com; path=/";
            document.documentElement.classList.add("theme-dark");
            document.body.classList.add("theme-dark");
            document.documentElement.style.backgroundColor = "#1a1a1b";
            document.body.style.backgroundColor = "#1a1a1b";
        }
    });
})();

/// reddit-popular-redirect.js
/// alias rpr.js
(function() {
    // Check if we're on the Reddit homepage
    if (window.location.hostname === 'www.reddit.com' && 
        (window.location.pathname === '/' || window.location.pathname === '')) {
        // Redirect to /r/popular/best with US geo filter
        window.location.replace('https://www.reddit.com/r/popular/best/?geo_filter=us');
    }
})();

