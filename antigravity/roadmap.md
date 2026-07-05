# Roadmap: What Needs to be Done

While the core website is complete, several operational and ongoing tasks are required as the app approaches public release:

1. **Update Download Links:**
   - Currently, the Mac / Windows / Linux download buttons in `download.html` point to placeholder `#` links.
   - **Action:** Update `js/flywall-release.js` with the real binary URLs, SHA256 hashes, and version numbers once the builds are ready.

2. **Beta Key Management:**
   - Process incoming beta requests from Netlify Forms.
   - Generate unique keys for approved users.
   - Add these keys to the `BETA_KEYS` environment variable in the Netlify dashboard.
   - Redeploy the site to apply the new keys.

3. **Transition from Closed Beta to Public Launch:**
   - Remove the beta gate from `download.html` when the product reaches General Availability.
   - Update marketing copy across `index.html` to reflect public availability.

4. **Maintenance & Iteration:**
   - Maintain the `changelog.html` as new versions of the desktop app are released.
   - Gather user feedback via the `feedback.html` page and iterate on the product roadmap.
   - Monitor and potentially expand the React-based tweaks panel (`tweaks-app.jsx`) to test new design variations.
