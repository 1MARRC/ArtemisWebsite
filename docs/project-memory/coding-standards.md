# Coding Standards

## Code Style Requirements
- **HTML:** Semantic HTML5. 
- **CSS:** Vanilla CSS utilizing CSS Custom Properties (variables) defined in `tokens.css`.
- **JavaScript (Vanilla):** ES5/ES6 compatibility. Keep logic tightly scoped. Avoid global namespace pollution (wrap in IIFE or modules).
- **JavaScript (React):** The Tweaks panel (`tweaks-app.jsx` / `tweaks-panel.jsx`) uses React via CDN.

## Folder Structure Conventions
- `/css`: Stylesheets (`site.css`, `tokens.css`, `mockups.css`).
- `/js`: JavaScript logic (`site.js`, `flywall-release.js`).
- `/assets`: Images and SVGs.
- `/netlify/functions`: Backend serverless functions.
- `/docs/project-memory`: Project intelligence and documentation.

## Naming Conventions
- CSS classes: Use kebab-case. 
- JS variables/functions: Use camelCase.
- JS Files: Use kebab-case (e.g., `validate-key.js`).

## Component Standards
- Avoid creating web components unless necessary. Use standard DOM manipulation in `site.js` for interactivity (e.g., the Kanban drag-and-drop feature).

## Testing Requirements
- Manual testing of the Beta gate.
- Cross-browser testing for the `IntersectionObserver` animations and Pointer Events drag-and-drop.

## Security Requirements
- **Beta Keys:** NEVER expose `BETA_KEYS` or valid download URLs in the client-side JavaScript. Validation must occur in the Netlify Function.

## Performance Requirements
- No heavy frontend frameworks for the main user-facing site.
- Minimize render-blocking resources.

## Accessibility Requirements
- Provide `aria-labels` for interactive elements (e.g., the theme toggle).
- Maintain sufficient color contrast (addressed in `tokens.css`).
