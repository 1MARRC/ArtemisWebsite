# Architecture and Components

The `flywall-website` is structured as a static site augmented with minor serverless functionality and a client-side React playground.

## 1. Directory Structure
- **`/` (Root):** Contains all static HTML pages (`index.html`, `download.html`, `privacy.html`, etc.) and configuration files (`netlify.toml`, `README.md`, `BETA-SETUP.md`).
- **`/css/`**: Contains the stylesheets.
- **`/js/`**: Contains the vanilla JavaScript logic and React app files.
- **`/assets/`**: Contains images, SVGs, and brand assets.
- **`/netlify/functions/`**: Contains the Node.js serverless backend functions.

## 2. Key Components

### A. Static Pages
- `index.html`: The hero landing page. Contains inline SVG definitions for icons, complex DOM structures for the interactive app mockups, and the core marketing copy.
- `download.html`: The beta gateway. Collects emails or validates beta keys to reveal download links.
- `roadmap.html`, `changelog.html`, `feedback.html`, `privacy.html`: Supporting informational pages.

### B. Styling Layer
- `css/tokens.css`: Defines the design system via CSS variables (colors, spacing, fonts).
- `css/site.css`: The primary stylesheet handling layout, typography, and utility classes.
- `css/mockups.css`: Highly specific styles used to draw the "fake" Flywall application windows, kanban boards, and chat interfaces seen in `index.html`.

### C. Client-side Interaction (Vanilla JS)
- `js/site.js`: The heart of the site's interactivity. It handles:
  - Theme toggling (light/dark mode persisted in localStorage).
  - Scroll-triggered animations via `IntersectionObserver`.
  - A custom implementation of Kanban drag-and-drop using Pointer Events.
  - A timer and live typing simulation for the hero section's mock meeting recorder.
  - Interactive knowledge graph SVG animations.

### D. The React Tweaks Panel
- `tweaks-panel.jsx`: A reusable, floating control panel component written in React. It listens for `message` events to manage an "edit mode".
- `js/tweaks-app.jsx`: Consumes the `TweaksPanel` to allow live tweaking of CSS variables (e.g., brand accent colors) and DOM text (e.g., hero headline) directly on the live site.

### E. Backend / Build Pipeline
- `netlify.toml`: Directs Netlify to publish the root directory and use `esbuild` for the functions.
- `netlify/functions/validate-key.js`: An HTTP endpoint that accepts a POST request with a beta key, checks it against the `BETA_KEYS` environment variable, and returns success/failure along with the current app release details imported from `js/flywall-release.js`.
