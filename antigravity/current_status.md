# Current Status

The website is actively built and functioning as a sophisticated static site hosted on Netlify. It uses a vanilla tech stack to achieve high performance without heavy frameworks.

## What's Been Done:
1. **Core Pages:** Created `index.html` (main landing), `download.html` (beta gate), `feedback.html`, `privacy.html`, `roadmap.html`, and `changelog.html`.
2. **Interactive Mockups:** The hero section in `index.html` contains a complex, live-updating mockup of the Flywall app, driven by vanilla JS in `js/site.js`. It simulates recording a meeting, live transcription, and kanban board drag-and-drop.
3. **Styling & Theming:** Custom CSS architecture utilizing variables (`css/tokens.css`) and specific stylesheets (`css/site.css`, `css/mockups.css`). Supports light and dark modes.
4. **Beta Access Gate:** 
   - A Netlify form (`beta-signup`) is used to collect emails.
   - A Netlify serverless function (`netlify/functions/validate-key.js`) validates user-provided beta keys against environment variables (`BETA_KEYS`).
   - Downloads are securely gated until a valid key is provided.
5. **Tweaks Panel:** A React-based floating tweaks panel (`tweaks-panel.jsx`, `js/tweaks-app.jsx`) is integrated into the site, allowing developers/designers to adjust branding, fonts, and copy in real-time.
6. **Release Management:** `js/flywall-release.js` acts as the single source of truth for the current app version and download URLs.
