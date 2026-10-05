---
name: deploy
description: Build, packaging and hosting for the VIN Cloud site — Vite production build, `npm run package:amplify`, manual AWS Amplify Hosting (no CI/CD), rewrites, security headers/CSP, custom domain, environment variables and hosting costs. Use for anything about building, deploying, CI, Docker or running costs. Never deploy or push without the owner asking.
---

# Build & deploy

> The owner commits and deploys manually. Don't run `git commit/push`, AWS CLI deploys or any other deploy command unless explicitly asked.

## Build
```bash
npm ci            # Node >= 20 (react-router 7 / Vite 6 require it)
npm run build     # -> dist/
npm run preview   # serve dist on http://localhost:4173
```
Healthy output: main `index-*.js` ≈ 220 kB gzip, three.js chunk ≈ 260 kB gzip (lazy), CSS ≈ 8 kB gzip.
`chunkSizeWarningLimit: 1100` in `vite.config.js` silences the expected three.js warning. Do **not** add `manualChunks` for three
(it pulled Vite's preload helper into the chunk → three got preloaded on every page).
The gray-matter `eval` warning during build is a known, harmless upstream warning.
`vite-plugin-node-polyfills` exists only because gray-matter needs `Buffer` in the browser.

## Hosting: AWS Amplify Hosting, manual zip deploys (no CI/CD)
Full human guide: `docs/DEPLOYMENT.md`. Summary:
- `npm run package:amplify` → `release/vin-cloud-site-<YYYYMMDDhhmm>.zip` (git-ignored; old zips = rollback copies).
  The zip is written by `scripts/package-amplify.mjs` (Node built-ins only): `index.html` at the root, forward-slash paths,
  verified byte-identical to `dist/` after extraction.
- Amplify app `vin-cloud-solutions`, branch `production`, region `ap-south-1`, created with **Deploy without Git**; updates via
  **Deploy updates** (drag zip) or AWS CLI `create-deployment` → upload to `zipUploadUrl` → `start-deployment`.
- Amplify manages S3 + CloudFront + TLS — **no separate S3/CloudFront setup**.
- `deploy/aws-amplify/rewrites.json`: SPA rewrite (non-file paths → `/index.html` 200). Paste into Hosting → Rewrites and redirects.
- `deploy/aws-amplify/custom-headers.yml`: HSTS, CSP, nosniff, frame DENY, referrer, permissions; `assets/**` immutable 1 year,
  `index.html` no-cache. Paste into Hosting → Custom headers.
- Custom domain: add `vinsolutions.lk` in Amplify, **only the `cloud` subdomain** (exclude root/www); owner adds the ACM validation
  CNAME + `cloud` CNAME at the DNS provider without touching MX/TXT (email).
- No `amplify.yml` in the repo on purpose (only needed for Git-connected CI builds; snippet is in the guide's appendix).
  Don't create an `amplify/` folder either — Amplify Gen 2 treats it as a backend definition.
- Never run `aws amplify …` commands that change resources unless the owner asks.

## Verifying headers/CSP locally
Serve `dist/` with the CSP from `custom-headers.yml` and the same rewrite regex (a ~25-line Node `http` server in the scratchpad),
then run `ui-verification` scripts against it and check for "Refused to…" console errors. Done on 2026-10-05: 0 violations.

## Environment variables (build-time, public)
`.env.example` documents them. Only `VITE_*` vars reach the browser and they are **public** once built:
`VITE_FORMSPREE_ENDPOINT` (defaults to the live form). Put real values in `.env.local` (git-ignored via `*.local`) before running `npm run build` — they are baked in at build time.

## Running costs (keep at ~zero)
- Amplify Hosting bills data served + storage; manual deploys use no build minutes. ~2 MB site → a few USD/month at most.
  Owner should keep an AWS Budgets alert. Don't quote exact AWS prices in docs — link the pricing page (free-tier rules changed in 2025).
- Formspree: free plan has a monthly submission cap — upgrade only if leads exceed it.
- Google Fonts + no analytics by default. Adding analytics/chat widgets costs performance — ask first.
- Keep the three.js chunk lazy; bandwidth and LCP matter more than server cost here.

## Pre-handoff checklist
□ `npm run build` passes · □ no `three` modulepreload in `dist/index.html` · □ key sections screenshotted desktop + mobile ·
□ sitemap updated for new routes/posts · □ no secrets or client names/prices added · □ new third-party domains added to the CSP ·
□ `npm run package:amplify` works · □ changes left uncommitted for the owner.
