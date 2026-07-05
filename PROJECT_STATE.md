# Project State

**Project:** Flywall Website (`flywall-website`)
**Objective:** Marketing and distribution site for the Flywall desktop app.
**Architecture:** Vanilla HTML/CSS/JS static site hosted on Netlify, with one serverless function for beta access gating. No build step.

## Executive Summary
This project acts as the landing page and beta distribution hub for Flywall. It is built for raw performance using vanilla web technologies. It features complex, interactive CSS/JS mockups in the hero section to demonstrate the product's "local AI" value proposition. Beta downloads are secured via a Netlify Function that validates keys against environment variables.

## Current Priorities
1. Prepare for actual beta distribution.
2. Ensure `js/flywall-release.js` is updated with real binary URLs when they are available.

## Agent Instructions
Before performing any work, review the detailed documentation in `/docs/project-memory/`, specifically:
1. `agent-handoff.md` (for immediate context)
2. `architecture.md` (for system constraints)
3. `coding-standards.md` (to ensure code style matches)

**CRITICAL RULE:** Do NOT attempt to install a frontend framework (React, Vue, Vite, etc.) for the main site. The vanilla, zero-build architecture is intentional.
