# Project Overview

**Project Name:** Flywall Website (`flywall-website`)
**Mission Statement:** Provide a high-performance, visually stunning marketing and beta-distribution gateway for the Flywall desktop app.
**Product Vision:** A beautiful, standalone static site that explains Flywall's core value—a local-only "second you" that captures meetings and documents—while securely managing the beta rollout.
**Target Users:** 
- **Website Visitors:** Founders, product managers, consultants, and executives looking for a local-first memory tool.
- **Beta Users:** Users who have received a beta key and need to download the macOS, Windows, or Linux clients.

## Core Features
- High-performance static HTML/CSS/JS architecture (no heavy frontend frameworks).
- Interactive, animated app mockups driven by vanilla JavaScript (Kanban drag-and-drop, live transcription simulation).
- Responsive, themed design (Light and Dark modes).
- Beta Access Gate using Netlify Forms (for requests) and Netlify Functions (for validation).
- Live design "Tweaks Panel" built with standalone React for quick in-browser brand/copy adjustments.

## Non-Goals
- We are NOT building the Flywall desktop app here. This is exclusively the marketing website.
- We are NOT using heavy frameworks like Next.js or Nuxt.js for the main site, optimizing instead for fast static delivery.

## Success Criteria
- The website loads instantly.
- The interactive hero mockups successfully convey the "magic" of the local AI product.
- The beta gate securely prevents unauthorized access to the binaries.
- Code remains simple, vanilla, and maintainable.

## Business Objectives
- Drive beta signups.
- Validate the value proposition of a local-only AI tool.
- Distribute the beta binaries securely.
