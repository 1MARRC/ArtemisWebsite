# Known Issues

## Technical Debt
- **Manual Beta Key Management:** Currently, updating beta keys requires manually editing the `BETA_KEYS` environment variable in the Netlify dashboard and redeploying. This is acceptable for early beta but will not scale.
- **Placeholder Download Links:** The download buttons in `download.html` (and the `flywall-release.js` variables) currently point to placeholder `#` URLs. These MUST be updated before releasing the beta.

## Bugs
- None currently reported.

## Performance Concerns
- The `tweaks-app.jsx` uses in-browser Babel compilation, which slows down initial page load slightly when the tweaks panel is enabled. This should be disabled or removed entirely for the final public production build if performance becomes an issue.

## Security Concerns
- None currently reported. The beta keys are properly kept server-side in the Netlify Function.
