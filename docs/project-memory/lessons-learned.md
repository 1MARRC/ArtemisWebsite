# Lessons Learned

## Infrastructure Lessons
- **Netlify Forms:** Netlify Forms provides an incredibly frictionless way to handle "Request Access" flows without needing a database. Simply adding the `netlify` attribute to an HTML form wires it up instantly.

## UI/UX Lessons
- **Vanilla Drag and Drop:** Implementing complex UI interactions like the Kanban board drag-and-drop is entirely feasible (and performant) using vanilla JavaScript Pointer Events (`pointerdown`, `pointermove`, `pointerup`), avoiding the need for heavy libraries like `react-beautiful-dnd`.
- **Scroll Animations:** Utilizing the native `IntersectionObserver` API for triggering CSS transitions (like the `.reveal` classes) is highly performant and doesn't cause the jank often associated with scroll-event listeners.

## Architecture Lessons
- **Hybrid React/Vanilla approach:** It is entirely possible to mix a highly optimized, no-build vanilla website with a complex React component (the Tweaks Panel) by leveraging CDN-hosted React and Babel for specific, isolated tools.
