# Decisions Log

**Date:** June 2026
**Decision:** Use vanilla HTML/CSS/JS instead of a framework (like Next.js or Nuxt.js) for the main marketing site.
**Reasoning:** The site is heavily focused on marketing and needs to load as fast as possible. A heavy JavaScript payload from a SPA framework is unnecessary for a site that is mostly static content and CSS-driven animations.
**Alternatives considered:** React/Next.js.
**Tradeoffs:** Writing interactive logic (like the hero Kanban drag-and-drop) requires more imperative DOM manipulation instead of declarative state, but it results in a much smaller bundle size and zero build step.
**Impact:** Fast load times, simple deployment, and high maintainability for developers comfortable with vanilla web standards.

---

**Date:** June 2026
**Decision:** Use Netlify Functions and Netlify Forms for the Beta Gate.
**Reasoning:** We needed a way to collect emails and validate beta keys without standing up a dedicated database or backend server.
**Alternatives considered:** Firebase, custom Express server.
**Tradeoffs:** Limits key validation to a serverless context checking against an environment variable (`BETA_KEYS`). This is slightly manual to update, but perfectly acceptable for a closed beta.
**Impact:** Zero-maintenance infrastructure. Forms handle the email collection natively, and a single serverless function handles the key validation securely.

---

**Date:** June 2026
**Decision:** Build the "Tweaks Panel" using standalone React loaded via CDN.
**Reasoning:** The tweaks panel is a complex, state-heavy UI (sliders, color pickers, segmented controls) used for internal design iteration. Writing it in vanilla JS would be tedious.
**Alternatives considered:** Vanilla JS web components.
**Tradeoffs:** Requires the browser to compile JSX via Babel on the fly. This is acceptable because the tweaks panel is an internal tool, not a core user-facing feature.
**Impact:** Allows rapid development of the tweaks UI using React paradigms without imposing a build step on the rest of the project.
