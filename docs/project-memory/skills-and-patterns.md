# Skills and Patterns

## UI Component Patterns

### Vanilla Drag-and-Drop (Kanban)
**Problem:** Implementing drag-and-drop for the hero Kanban board without heavy libraries.
**Solution:** Use Pointer Events (`pointerdown`, `pointermove`, `pointerup`) with `setPointerCapture`. Create a ghost/placeholder element and use `document.elementFromPoint` to determine drop targets dynamically.
**Files:** `js/site.js` (`initBoardDnD` function).
**Why it worked:** Pointer events unify mouse and touch, and absolute positioning during drag provides 60fps performance without framework overhead.
**When to reuse it:** Whenever lightweight, custom drag-and-drop interactions are needed in vanilla JS projects.

### Scroll Reveal Animations
**Problem:** Triggering animations when elements scroll into view without tanking performance.
**Solution:** Use the `IntersectionObserver` API. Watch elements with a `.reveal` class, and append an `.in` class when they intersect the viewport. Use CSS transitions on the `.in` class to handle the visual animation.
**Files:** `js/site.js` (Observer setup), `css/site.css` (`.reveal` and `.in` classes).
**Why it worked:** `IntersectionObserver` runs asynchronously off the main thread, preventing scroll jank.
**When to reuse it:** For all scroll-triggered animations across the site.

## Architecture Patterns

### The "Tweaks Panel" Protocol
**Problem:** Creating a complex developer/design tool UI without forcing the main marketing site into a React build pipeline.
**Solution:** Build the Tweaks Panel in standalone React (`tweaks-app.jsx`). Use the `postMessage` protocol to communicate between the standalone React app and the host window.
**Files:** `tweaks-panel.jsx`, `js/tweaks-app.jsx`.
**Why it worked:** Total isolation. The tweaks panel can be complex and stateful, but it doesn't affect the bundle size or build complexity of the core vanilla site.
**When to reuse it:** For internal-only tooling layered on top of static sites.
