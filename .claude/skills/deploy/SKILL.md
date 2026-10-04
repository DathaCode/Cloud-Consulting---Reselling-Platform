---
name: deploy
description: Build, hosting and delivery for the VIN Cloud site — Vite production build, Cloudflare (Pages workflow and wrangler Workers config), GitHub Actions, the local Docker dev container, environment variables and hosting costs. Use for anything about building, deploying, CI, Docker or running costs. Never deploy or push without the owner asking.
---

# Build & deploy

> The owner commits and deploys. Don't run `git commit/push`, `wrangler deploy` or `wrangler pages deploy` unless explicitly asked.

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

## Hosting: Cloudflare (static SPA)
- `.github/workflows/deploy.yml`: on push/PR to `main` → `npm ci` → `npm run build` → `cloudflare/wrangler-action@v3`
  `pages deploy dist --project-name=vin-cloud-solutions`. Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (GitHub repo secrets).
- `wrangler.jsonc` describes a **Workers static-assets** deployment (`assets.directory: dist`, `not_found_handling: single-page-application`).
- ⚠ The two are inconsistent (Pages vs Workers). Pick one with the owner before changing CI. For Pages, SPA fallback works automatically when
  there is no top-level `404.html`. `@cloudflare/vite-plugin` is installed but not wired into `vite.config.js`.
- ⚠ The workflow also deploys on `pull_request` — PRs publish preview deployments; confirm that's intended.
- Custom domain `cloud.vinsolutions.lk` is configured in the Cloudflare dashboard (owner).

## Environment variables (build-time, public)
`.env.example` documents them. Only `VITE_*` vars reach the browser and they are **public** once built:
`VITE_FORMSPREE_ENDPOINT` (defaults to the live form). Put real values in `.env.local` (git-ignored via `*.local`) or in CI/Cloudflare settings.

## Docker (local dev only)
`dockerfile` runs the Vite dev server on 5173. ⚠ It still uses `node:18-alpine` and `--legacy-peer-deps`; the project now needs Node 20+
and installs cleanly without legacy peer deps — update to `node:20-alpine` + `npm ci` when touching it. It is not used for production hosting.
`.dockerignore` excludes node_modules, dist, .git, .env.local.

## Running costs (keep at ~zero)
- Cloudflare Pages/Workers static hosting: free tier is sufficient for this site (static assets, no server code).
- Formspree: free plan has a monthly submission cap — upgrade only if leads exceed it.
- Google Fonts + no analytics by default. Adding analytics/chat widgets costs performance — ask first.
- Keep the three.js chunk lazy; bandwidth and LCP matter more than server cost here.

## Pre-handoff checklist
□ `npm run build` passes · □ no `three` modulepreload in `dist/index.html` · □ key sections screenshotted desktop + mobile ·
□ sitemap updated for new routes/posts · □ no secrets or client names/prices added · □ changes left uncommitted for the owner.
