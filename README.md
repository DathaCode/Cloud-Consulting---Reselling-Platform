# VIN Cloud Solutions — website

Company website for **VIN Cloud Solutions** (Ragama, Sri Lanka): AI solutions & integrations, web and mobile development,
cloud consulting (AWS, Azure, Google, Microsoft 365, Oracle, Atlassian), data migration and managed cloud.

Live: **https://cloud.vinsolutions.lk** · Hosting: AWS Amplify (manual deploys)

## Features
- Dark, techy single-page site with three interactive **3D explorers** (hero globe, AI neural network, cloud-platform orbit)
- Services, AI, platforms, case studies ("Our work"), integrations, process, FAQ and blog
- Multi-step **project request form** (Formspree) with WhatsApp follow-up, plus a floating WhatsApp button
- SEO: per-page meta tags, JSON-LD (Organization, FAQ, BlogPosting), sitemap, Open Graph image, favicons/PWA icons
- Accessible (keyboard, reduced motion, semantic headings) and mobile-first

## Tech stack
React 19 · Vite 6 · Tailwind CSS 3 · framer-motion · three.js + React Three Fiber + drei · React Router 7 ·
lucide-react · react-markdown + gray-matter (blog). Plain JavaScript (JSX). Node.js 20+.

## Getting started
```bash
npm ci
npm run dev            # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run package:amplify` | Build + create `release/vin-cloud-site-<time>.zip` for AWS Amplify |

Environment variables: see `.env.example` (only `VITE_FORMSPREE_ENDPOINT`, which already defaults to the live form).

## Project structure
```
src/
├── utils/constants.js        # all site copy & data (company info, services, case studies, FAQ…)
├── components/
│   ├── sections/             # home page sections
│   ├── common/               # Button, Section, Navbar, Footer, Dialog, Logo, …
│   ├── contact/              # project request form
│   ├── three/                # 3D scenes (lazy-loaded)
│   └── blog/                 # blog list, cards, article
├── content/blog/*.md         # blog posts
├── pages/                    # Home, Blog, BlogPostPage, NotFound
└── utils/seo.js              # per-page meta tags
public/                       # favicons, brand images, sitemap.xml, robots.txt
deploy/aws-amplify/           # Amplify rewrite rules and custom headers
scripts/package-amplify.mjs   # zips dist/ for Amplify
design/brand-source/          # original logo artwork (not deployed)
```

## Documentation
- [Deployment guide (AWS Amplify)](docs/DEPLOYMENT.md)
- [Content guide](docs/CONTENT_GUIDE.md) — editing text, case studies, contact details and blog posts
- `CLAUDE.md` and `.claude/skills/` — project memory and guidelines for Claude Code

## Contact
info@vinsolutions.lk · +94 70 373 4412 (call / WhatsApp) · Ragama, Sri Lanka

© VIN Cloud Solutions. All rights reserved.
