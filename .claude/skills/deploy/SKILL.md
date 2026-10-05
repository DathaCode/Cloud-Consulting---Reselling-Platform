---
name: deploy
description: Build and hosting for the VIN Cloud site — Vite production build, AWS Amplify Hosting connected to GitHub (amplify.yml build spec, customHttp.yml headers/CSP, SPA rewrites), custom domain, environment variables and hosting costs. Use for anything about building, deploying, CI, Docker or running costs. Never deploy or push without the owner asking.
---

# Build & deploy

> The owner commits and pushes; a push to `main` can publish the site. Don't run `git commit/push`, `aws amplify` commands or change Amplify settings unless explicitly asked.

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

## Hosting: AWS Amplify Hosting connected to GitHub
Full human guide: `docs/DEPLOYMENT.md`. Summary:
- Repo `https://github.com/DathaCode/Cloud-Consulting---Reselling-Platform`, production branch **`main`**, Amplify app
  `vin-cloud-solutions` in `ap-south-1`. Amplify manages S3 + CloudFront + TLS — no separate S3/CloudFront.
- **`amplify.yml`** (repo root): `nvm install/use 20` → `npm ci --cache .npm --prefer-offline` → `npm run build`; artifacts `dist/**`;
  cache `.npm/**` (git-ignored). Frontend only — never add a `backend:` section or an `amplify/` folder (Gen 2 backend).
- **`customHttp.yml`** (repo root): response headers applied on every build — the single source of truth for CSP/security/caching.
- **`deploy/aws-amplify/rewrites.json`**: SPA rewrite, pasted once into Hosting → Rewrites and redirects (not read from the repo).
- Releases: push to `main` (auto build on) or **Run build** (auto build off) — owner's choice; failed builds don't replace the live site.
  Rollback: Deployments → **Redeploy this version**, or `git revert` + push.
- Git-connected apps can't take manual zip uploads (the old zip script was removed).
- There are **no GitHub Actions**. Claude never pushes, runs `aws amplify start-job`, or changes Amplify settings unless asked.
- Custom domain: add `vinsolutions.lk` with **only the `cloud` subdomain** → `main`; DNS CNAMEs at the owner's provider; never touch MX/TXT.

## Before the owner pushes
- `npm ci` must succeed from the committed `package-lock.json` (Amplify uses `npm ci`). After any dependency change, re-run a
  clean-copy build: copy the repo without `node_modules/dist/.git` to the scratchpad and run the `amplify.yml` commands.
- New files the build needs must be committed (Amplify only sees what's pushed).

## Verifying headers/CSP locally
Serve `dist/` with the CSP from `customHttp.yml` and the same rewrite regex (a ~25-line Node `http` server in the scratchpad),
then run `ui-verification` scripts against it and check for "Refused to…" console errors. Done on 2026-10-05: 0 violations.

## Environment variables (build-time, public)
`.env.example` documents them. Only `VITE_*` vars reach the browser and they are **public** once built:
`VITE_FORMSPREE_ENDPOINT` (defaults to the live form). Locally use `.env.local` (git-ignored); for production set them in Amplify → Hosting → Environment variables (baked in at build time).

## Running costs (keep at ~zero)
- Amplify Hosting bills build minutes (~2–3 min per release), data served and storage. ~2 MB site → a few USD/month at most.
  Owner should keep an AWS Budgets alert. Don't quote exact AWS prices in docs — link the pricing page (free-tier rules changed in 2025).
- Formspree: free plan has a monthly submission cap — upgrade only if leads exceed it.
- Google Fonts + no analytics by default. Adding analytics/chat widgets costs performance — ask first.
- Keep the three.js chunk lazy; bandwidth and LCP matter more than server cost here.

## Pre-handoff checklist
□ `npm run build` passes · □ no `three` modulepreload in `dist/index.html` · □ key sections screenshotted desktop + mobile ·
□ sitemap updated for new routes/posts · □ no secrets or client names/prices added · □ new third-party domains added to the CSP ·
□ clean `npm ci` + build works · □ changes left uncommitted for the owner.
