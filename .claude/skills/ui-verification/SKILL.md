---
name: ui-verification
description: Visually verify VIN Cloud site changes with headless Chrome — per-section screenshots on desktop and mobile, 3D/WebGL rendering, console errors, and a scripted end-to-end test of the request form with Formspree mocked. Use after any UI, content, 3D or form change, before reporting work as done.
---

# UI verification

A build passing is not enough — look at the result. Scripts live in `scripts/` next to this file.

## Setup (once per session, outside the repo)
`puppeteer-core` is **not** a project dependency — never add it to package.json. Install it in the session scratchpad and copy the scripts there:
```bash
S="<scratchpad dir>"
cd "$S" && npm init -y >/dev/null && npm i puppeteer-core@23
cp "<repo>/.claude/skills/ui-verification/scripts/"*.mjs "$S"/
```
Uses the installed Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`, override with `CHROME_PATH`).

## Run
```bash
cd <repo> && npm run build
npx vite preview --port 4173 --strictPort      # run in background
cd "$S"
node shot.mjs http://localhost:4173/ hero.png 1440 900
node shot.mjs http://localhost:4173/ work.png 1440 1000 "#work"
node shot.mjs http://localhost:4173/ m-contact.png 390 844 "#contact"           # mobile (touch emulation)
node shot.mjs http://localhost:4173/ dialog.png 1440 900 "#work" "document.querySelector('#work button').click()"
node form-flow.mjs http://localhost:4173 1440 form                             # prints FORMSPREE PAYLOAD, saves form-1..5.png
```
Then `Read` the PNGs and actually inspect them. Stop the preview server afterwards
(`netstat -ano | grep :4173` → `taskkill //PID <pid> //F //T`).

## What to check
- Desktop 1440 and mobile 390: no horizontal scroll, no clipped/overlapping text, wrapped stat values, readable contrast.
- 3D: scene visible (not blank), labels present and not oversized, mobile still scrolls (no OrbitControls on touch).
- Console: no `[pageerror]`; `THREE.Clock` deprecation warnings are expected and filtered.
- Form: payload has all fields, no budget field, prefill from `?service=&platform=` works, success screen shows a reference.
- Logo always sits on a light tile; brand colors only from tokens.

## Pitfalls
- Hash URLs (`/#work`) screenshot mid-scroll → pass the selector argument instead; the script disables smooth scrolling.
- Screenshots taller than ~8000px repeat content — shoot sections separately.
- WebGL needs `--use-angle=swiftshader --enable-unsafe-swiftshader` (already in the scripts).
- Never let tests hit the real Formspree endpoint — that emails the owner. Interception must answer the CORS preflight.
