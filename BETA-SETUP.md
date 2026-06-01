# Beta access — how it works & setup

The download page (`download.html`) gates the installers behind a beta key:

- **"I have a beta key"** → key is checked by a Netlify Function against your
  list of valid keys. On success the download buttons are revealed (and
  remembered in the browser via `localStorage`).
- **"Request a key"** → the visitor's email is captured via **Netlify Forms**.
  You then email them a key.

## 1. Where you see the collected emails

Netlify Dashboard → your site → **Forms** → **`beta-signup`**.

Every email submitted shows up there. To get notified on each new signup:
**Forms → Settings & usage → Form notifications → Add notification → Email
notification**, and point it at your inbox.

> Free tier allows 100 form submissions/month.

## 2. How to add / manage valid beta keys

Valid keys live in an environment variable so they never reach the browser.

Netlify Dashboard → your site → **Site configuration → Environment variables →
Add a variable**:

- **Key:** `BETA_KEYS`
- **Value:** comma-separated list, e.g.
  `FLY-1A2B-3C4D-5E6F, FLY-9Z8Y-7X6W-5V4U`

Matching is case-insensitive and ignores surrounding whitespace. After changing
`BETA_KEYS`, **redeploy** (or "Clear cache and deploy") so the function picks up
the new value.

**Workflow:** when a request email comes in, generate a unique key, add it to
`BETA_KEYS`, redeploy, then email the key to that person.

## 3. The download links are still placeholders

The Mac / Windows / App Store buttons in `download.html` point to `#`. Swap
those `href="#"` values for your real release URLs when ready.

## 4. Local testing

The key check requires the Netlify Functions runtime, so test with the Netlify
CLI rather than opening the file directly:

```bash
npm install -g netlify-cli
netlify dev          # serves the site + functions locally
```

Set a local key for testing by creating a `.env` file (already gitignored):

```
BETA_KEYS=FLY-TEST-0000-0000
```

## Files involved

- `download.html` — gate UI + client logic
- `netlify/functions/validate-key.js` — server-side key validation
- `netlify.toml` — tells Netlify where the function lives
