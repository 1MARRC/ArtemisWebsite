# Architecture

**System Architecture:** Static Jamstack site augmented with a single serverless endpoint.
**Frontend Stack:** 
- Vanilla HTML5 / CSS3 / ES6+ JavaScript.
- Standalone React/Babel (loaded via script tags) used exclusively for the `tweaks-panel.jsx` developer tool.
**Backend Stack:** Node.js (Netlify Functions) via `netlify/functions/validate-key.js`.
**Database Design:** No formal database. Beta keys are stored securely as a comma-separated string in the Netlify `BETA_KEYS` environment variable.
**Authentication Approach:** Simple key-matching. The client sends a key to the serverless function, which checks the env variable. If valid, the function returns the download URLs.
**Storage Approach:** Standard Netlify static asset hosting.
**External Integrations:** 
- Netlify Forms (for capturing beta signup emails).
- Netlify Functions (for validating keys).
**Deployment Architecture:** Netlify continuous deployment. The `netlify.toml` specifies the build directory (`.`) and the functions directory (`netlify/functions`).
**Infrastructure Decisions:**
- Keep it simple: No build step for the frontend CSS/JS to maximize development speed and simplicity. 
- Use CSS Variables (`tokens.css`) for the design system.
