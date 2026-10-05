---
name: security
description: Security rules for the VIN Cloud static React site — what may and may not ship to the browser, env vars, Formspree spam protection, external links, HTML injection, dependencies and recommended response headers. Apply to every code change; load it explicitly when touching forms, env vars, third-party scripts, links or headers.
---

# Security (static SPA on AWS)

There is no backend: everything in `dist/` is public. Threats are leaked secrets, XSS via content, spam, supply chain and privacy.

## Rules
1. **No secrets in the client.** Any `VITE_*` value is embedded in the bundle. Only public identifiers belong there
   (the Formspree form ID is public by design). API keys (Gemini, cloud credentials…) must never be added to this repo or `.env*` that gets built.
2. Real env values go in `.env.local` (git-ignored) locally, or Amplify → Environment variables for production builds; `.env.example` holds placeholders/public values only.
3. **No raw HTML injection.** `dangerouslySetInnerHTML` is allowed only for JSON-LD built from our own constants (`FAQ.jsx`). Blog markdown
   renders through `react-markdown` without `rehype-raw` — keep it that way.
4. External links: `target="_blank"` always with `rel="noopener noreferrer"` (WhatsApp, Facebook, Maps, socials).
5. Forms: keep client validation **and** the honeypot `_gotcha`; Formspree does server-side spam filtering. Never log form payloads to the console in production code.
6. Personal data: the form collects name/email/phone with explicit consent checkbox — don't add tracking or fields without telling the owner.
   Drafts in localStorage stay on the visitor's device and are cleared on submit.
7. Third-party scripts: only Google Fonts today. Ask before adding analytics, chat widgets or CDNs; prefer self-hosted.
8. Dependencies: run `npm audit --omit=dev` when adding/upgrading; prefer well-maintained packages (see `researcher`). Don't use `--force`/`--legacy-peer-deps` to silence real incompatibilities.
9. Content safety: no client names, no prices (business confidentiality — see `site-content`).

## Response headers — source of truth: `customHttp.yml` in the repo root (applied by Amplify on every build)
Current policy (keep this copy in sync with the file):
```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://formspree.io; frame-ancestors 'none'; base-uri 'self'
```
Notes: inline JSON-LD `<script type="application/ld+json">` is data, not executed, but strict CSPs may still flag it — test after enabling.
three.js shaders need no `unsafe-eval`. Verified locally with 0 violations (3D, blog deep links, form). Any new third-party domain
(analytics, fonts, embeds) must be added to the CSP, then re-verify (see `deploy` → Verifying headers/CSP locally).

## Quick check before finishing
□ no new secrets/keys · □ new external links have rel noopener · □ no new innerHTML · □ form still has honeypot + consent · □ `npm audit` clean for new deps
