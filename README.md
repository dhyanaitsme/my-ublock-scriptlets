# uBlock Scriptlets to Force GitHub Dark Mode

This repo contains a custom `scriptlets.js` and `filters.txt` file for use with **uBlock Origin**.

## What it Does

- Forces GitHub into dark mode for non-logged-in users.
- Spoofs `prefers-color-scheme: dark` using injected styles.
- Sets localStorage flags GitHub uses to apply dark mode.
- Adds fallback CSS styles in case GitHub's theme doesn’t fully apply.

## How to Use

### 1. Enable Advanced Mode in uBlock Origin
Go to uBlock Dashboard → Settings → check "I am an advanced user".

### 2. Add the Custom Filter List

In uBlock → Filter Lists → **Import**, add:
```
https://dhyanaitsme.github.io/my-ublock-scriptlets/filters.txt
```

Then click **"Apply Changes"**.

### 3. Open GitHub in a Private Window

You should now see GitHub in dark mode, even when not logged in.

## Hosting

This repo uses **GitHub Pages**. If not already enabled, go to:
**Settings → Pages → Source: main branch** and save.
