---
name: self-healing
description: Debugging loop and project memory upkeep for the VIN Cloud site — how to diagnose failures (build errors, blank 3D scenes, broken layout, install conflicts, Windows shell quirks), avoid repeating failed approaches, and record every new lesson in CLAUDE.md so future sessions remember it. Use whenever something fails or the owner corrects you.
---

# Self-healing & project memory

## Loop
1. **Read the whole error** (build output, browser console via `ui-verification`, screenshot).
2. **Check known lessons** in `CLAUDE.md` → "Lessons learned" and the gotchas in the relevant skill before trying anything.
3. **Find the root cause** — inspect the DOM/bundle/state; don't retry the same command hoping for a different result.
4. **Fix one thing**, rebuild, re-verify visually.
5. **Record it** (below) if it was non-obvious.

Escalate: 2 failed attempts at the same idea → change approach; 3 approaches failed → stop and explain to the owner.
Outside our control (Formspree/AWS down, permissions) → tell the owner immediately.

## Memory: where knowledge goes
| Kind | Write it to |
|---|---|
| A non-obvious bug/fix or environment quirk | `CLAUDE.md` → "Lessons learned" (one line: symptom → cause → fix) |
| An owner rule or preference ("don't commit", "no client names") | `CLAUDE.md` → "Working rules" |
| Detailed how-to for one area | the matching `.claude/skills/<area>/SKILL.md` (update in place; keep it current, delete stale lines) |
| A whole new recurring area of work | new skill `.claude/skills/<name>/SKILL.md` with `name` + `description` frontmatter, and add it to the skills table in `CLAUDE.md` |

Keep entries short and factual, dated only when time matters. Remove lessons that become wrong (e.g. after an upgrade).
Never store secrets, tokens or visitor data.

## Diagnosis playbook (seen in this project)
| Symptom | Likely cause | Fix |
|---|---|---|
| `npm install` ERESOLVE mentioning React 19 | package peer range excludes React 19 | find a compatible version / remove the package; no `--force` |
| 3D canvas blank in screenshot | screenshot taken mid-scroll or before lazy chunk loaded | use `shot.mjs` with selector + wait; then check `[pageerror]` |
| One drei `<Html>` label missing (intermittent) | mounted in first canvas commit | gate with `useLabelsReady()` |
| Labels enormous | `distanceFactor` on `<Html>` | remove it; size with CSS |
| Page won't scroll over 3D on phones | OrbitControls on touch device | gate with `isCoarsePointer()` |
| three.js preloaded on first load | `manualChunks` forcing three | remove manualChunks |
| Duplicate blog title | regex didn't match `\r\n` | use `[^\n]*\n` patterns |
| `vite build` → `emptyDir` error (Windows) | a shell cwd inside `dist/` | cd to repo root, rebuild |
| bash heredoc "unexpected EOF" | curly quotes in heredoc | write script file in scratchpad, run it |
| Form test shows CORS error | Puppeteer mock didn't answer preflight | return CORS headers for OPTIONS + POST |
| Amplify: refresh on `/blog` → 404 | SPA rewrite missing | paste `deploy/aws-amplify/rewrites.json` |
| Amplify: blank page, JS served as text/html | rewrite regex catches .js | restore the rule from `rewrites.json` |
| "Refused to load…" in console | CSP lacks a new domain | update `custom-headers.yml`, re-verify |

## Before saying "done"
Build passes · visual check done · CLAUDE.md lessons updated if anything surprising happened · nothing committed.
