# Completed Features

## Feature: Initial Website Launch
- **Completion Date:** June 2026 (Approx)
- **Files Created:** `index.html`, `privacy.html`, `roadmap.html`, `changelog.html`, `feedback.html`, `css/site.css`, `css/tokens.css`, `js/site.js`
- **Purpose:** Provide a marketing landing page explaining the Flywall application.
- **Important Implementation Notes:** Built using vanilla HTML/CSS/JS to ensure maximum performance. Employs `IntersectionObserver` for scroll reveals.

## Feature: Interactive App Mockup (Hero Section)
- **Completion Date:** June 2026 (Approx)
- **Files Created:** `css/mockups.css`, logic inside `js/site.js`
- **Purpose:** Demonstrate the "local AI" experience directly on the website without a video.
- **Important Implementation Notes:** Features a custom drag-and-drop Kanban board using Pointer Events, and a live transcription simulation loop.

## Feature: Beta Access Gate
- **Completion Date:** June 2026 (Approx)
- **Files Created:** `download.html`, `netlify/functions/validate-key.js`, `BETA-SETUP.md`
- **Purpose:** Restrict access to the beta binaries to authorized users.
- **Important Implementation Notes:** Uses Netlify Forms for signup requests. The validation function checks keys against a Netlify Environment variable (`BETA_KEYS`).

## Feature: Tweaks Panel
- **Completion Date:** June 2026 (Approx)
- **Files Created:** `tweaks-panel.jsx`, `js/tweaks-app.jsx`
- **Purpose:** Allow live, in-browser tweaking of brand colors and copy for rapid iteration.
- **Important Implementation Notes:** Built with standalone React. Uses `postMessage` protocol to communicate edits.
