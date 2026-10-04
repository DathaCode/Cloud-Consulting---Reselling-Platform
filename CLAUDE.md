# VIN Cloud Solutions — company website

Marketing site for **VIN Cloud Solutions** (Ragama, Sri Lanka): AI solutions & integrations, web/mobile development,
cloud consulting (AWS, Azure, Google, Microsoft 365, Oracle, Atlassian), data migration and managed cloud.
Live domain: **https://cloud.vinsolutions.lk**. Single-page React app with a markdown blog.

## Working rules (from the owner)
- **Never commit, push or create branches.** The owner commits everything. Leave changes in the working tree.
- Ask before anything outward-facing (real form submissions, deploys, publishing).
- **Never name clients** in case studies or copy (no "Hiru News" or any other client). Describe by sector only.
- **Never publish prices or budgets.** Pricing is quoted in LKR after requirement analysis — say that, nothing more.
- Case-study figures for the 4 non-featured engagements are representative values approved by the owner; the 2 featured
  AI products (Sinhala AI Proofreader, Graphic-Cast) are real in-house work.
- Keep the look: slightly dark, techy, brand teal from the logo. Verify UI changes visually (skill `ui-verification`).

## Stack
React 19 · Vite 6 · Tailwind CSS 3 · framer-motion 12 · three.js + @react-three/fiber 9 + drei 10 · react-router 7 ·
lucide-react · react-markdown + gray-matter (blog). Plain **JavaScript/JSX** (no TypeScript). Node ≥ 20 required.
No test runner is configured; `npm run build` + visual checks are the gate.

## Commands
```bash
npm run dev       # http://localhost:5173
npm run build     # must pass before calling work done
npm run preview   # serve dist/ on :4173 (use for screenshots)
```

## Where things live
| Path | What |
|---|---|
| `src/utils/constants.js` | **All site copy & data**: company info, nav, services, AI capabilities, platforms, integrations, process, case studies, FAQ, socials |
| `src/components/sections/` | Home page sections (Hero, Services, AIInnovation, PlatformExplorer, CaseStudies, Integrations, Process, WhyChooseUs, BlogTeaser, FAQ, Contact) |
| `src/components/common/` | Design-system pieces: Button, Badge, Section, SectionHeading, Reveal, SpotlightCard, Dialog, Logo, Icon, BrandIcon, Navbar, Footer, PageLayout, WhatsAppButton |
| `src/components/three/` | 3D explorers (HeroGlobe, NeuralScene, EcosystemScene) + `SceneMount` lazy/visibility wrapper |
| `src/components/contact/` | Multi-step project request form (Formspree) |
| `src/utils/seo.js` | `useSeo()` per-route head tags; defaults live in `index.html` |
| `src/content/blog/*.md` | Blog posts (must also be imported in `src/hooks/useBlogData.js` and added to `public/sitemap.xml`) |
| `public/brand/` | Logo (`vin-logo.png`), mark (`vin-mark.png`), OG image, PWA icons |

Unused Vite starter leftovers: `src/main.js`, `src/counter.js`, `src/style.css`, `src/javascript.svg`, `public/vite.svg`.

## Company facts (source of truth: `COMPANY_INFO` in constants.js)
Email `info@vinsolutions.lk` · Phone/WhatsApp `+94 70 373 4412` · Ragama, Sri Lanka · Facebook page set;
LinkedIn/GitHub/TikTok are empty slots (`SOCIAL_LINKS`) — icons appear when a URL is filled in.
Formspree endpoint `https://formspree.io/f/mppqanpv` (`VITE_FORMSPREE_ENDPOINT` overrides).

## Project skills (`.claude/skills/`) — load the matching one before working
| Skill | Use for |
|---|---|
| `react-frontend` | Components, sections, design tokens, routing, styling conventions |
| `three-scenes` | Anything in `src/components/three/` or adding 3D |
| `site-content` | Editing copy, services, case studies, FAQ, blog posts |
| `seo` | Titles/meta, JSON-LD, sitemap, OG image, domain changes |
| `contact-form` | The request form, Formspree, prefill links |
| `deploy` | Build, Cloudflare, GitHub Actions, Docker, hosting costs |
| `security` | Secrets, env vars, external links, form spam, headers |
| `ui-verification` | Headless-Chrome screenshots and scripted form tests |
| `researcher` | Before adding/upgrading dependencies or using unfamiliar APIs |
| `self-healing` | When something fails; recording new lessons in this file |

## Lessons learned (append new ones here — this is the project memory)
- `react-helmet-async` is incompatible with React 19 and blocked installs; it was removed. Use `useSeo()`.
- drei `<Html>` mounted in a canvas's first commit can silently not render → mount labels one tick later.
- `instancedMesh` colors must be set before first render or the shader compiles without instance colors.
- OrbitControls sets `touch-action: none` → never mount it on coarse pointers (blocks page scroll on phones).
- Forcing `three` into a `manualChunks` chunk pulled Vite's preload helper into it → three got eagerly preloaded. Let lazy imports split it.
- Markdown from Windows checkouts has `\r\n`; regexes must not rely on `.+\n`.
- Very tall headless screenshots (> ~8000px) repeat content — screenshot per section instead.
- Python heredocs in Git Bash break on curly quotes (’) — write the script to a file in the scratchpad and run it.
- On Windows, a shell whose cwd is inside `dist/` makes `vite build` fail with `emptyDir` — cd out first.
