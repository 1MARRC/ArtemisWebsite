# Skills Required

To effectively maintain and expand this project, developers will need the following skills:

1. **Vanilla Web Technologies (HTML5 / CSS3 / ES6+ JavaScript):**
   - The majority of the site avoids build steps and heavy frameworks.
   - Strong understanding of DOM manipulation, `IntersectionObserver` for scroll animations, and Pointer Events for drag-and-drop functionality (`js/site.js`).
   - Proficiency in modern CSS layout (Flexbox/Grid) and CSS variables for theming.

2. **React (Standalone/Browser Context):**
   - The tweaks panel (`tweaks-panel.jsx`, `js/tweaks-app.jsx`) is written in React JSX, compiled on the fly (presumably by a CDN Babel script in the HTML headers).

3. **Netlify Ecosystem:**
   - **Netlify Functions:** Writing and debugging Node.js serverless functions (specifically `netlify/functions/validate-key.js`).
   - **Netlify Forms:** Managing form submissions for beta access requests.
   - **Netlify Environment Variables:** Updating and managing `BETA_KEYS`.

4. **Node.js (Basic):**
   - Used within the Netlify serverless function environment to handle POST requests and JSON responses.
