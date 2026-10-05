# Deployment guide — AWS Amplify Hosting (manual)

How to put **cloud.vinsolutions.lk** online with AWS Amplify Hosting and how to ship updates afterwards.
There is no CI/CD: you build the site on your computer, zip it and upload the zip to Amplify.

---

## 1. How it works

```
your PC                                  AWS Amplify Hosting (managed)
────────                                 ─────────────────────────────────────────
npm run package:amplify  ──► release/vin-cloud-site-<time>.zip ──► upload ──► S3 + CloudFront CDN + HTTPS cert
                                                                               │
visitor ──► https://cloud.vinsolutions.lk ──► CloudFront (global edge) ────────┘
```

- The site is a **static single-page app** (HTML/JS/CSS in `dist/`). No servers, databases or Lambda functions.
- **You do not need to create S3 buckets or CloudFront distributions yourself.** Amplify Hosting provisions and manages
  S3 storage, a CloudFront CDN, the free TLS certificate and cache invalidation for you.
- The contact form posts directly from the browser to **Formspree**, so nothing else needs hosting.

Files in this repo used for deployment:

| File | Purpose |
|---|---|
| `scripts/package-amplify.mjs` (`npm run package:amplify`) | Builds the site and zips `dist/` correctly for Amplify |
| `deploy/aws-amplify/rewrites.json` | Rewrite rule so deep links like `/blog/<post>` work |
| `deploy/aws-amplify/custom-headers.yml` | Security headers + caching rules |
| `.env.example` | Build-time variables (only `VITE_FORMSPREE_ENDPOINT`) |

---

## 2. Before you start (one time)

1. **AWS account** with billing set up. Don't use the root user day to day: create an IAM user (or IAM Identity Center user)
   with **MFA** and the AWS-managed policy **`AdministratorAccess-Amplify`**.
2. **Region:** choose **Asia Pacific (Mumbai) `ap-south-1`** in the console (closest to Sri Lanka for managing the app;
   visitors are served from CloudFront edge locations worldwide regardless).
3. **Budget alert:** Billing → Budgets → create a monthly cost budget (e.g. USD 5) with an email alert to `info@vinsolutions.lk`.
4. On your computer: **Node.js 20+** (`node -v`) and the project dependencies (`npm ci`).
5. Access to the **DNS settings of `vinsolutions.lk`** (wherever the domain's DNS is hosted — your registrar / DNS provider).

---

## 3. Build the deployment package

```bash
npm ci                      # first time, or after dependency changes
npm run package:amplify     # = npm run build + zip
```

Output: `release/vin-cloud-site-<YYYYMMDDhhmm>.zip` (≈ 800 KB, ~21 files, `index.html` at the root).
The `release/` folder is git-ignored; **keep the last few zips** — they are your rollback copies.

> Optional: to use a different Formspree form, create `.env.local` with `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<id>`
> **before** packaging. Values are baked into the build; everything in `VITE_*` is public.

Preview the exact build locally first if you like: `npm run preview` → http://localhost:4173.

---

## 4. Create the Amplify app (first deployment)

1. Open the **AWS Amplify console** (region `ap-south-1`) → **Create new app**.
2. Choose **Deploy without Git** → **Next**.
3. **App name:** `vin-cloud-solutions` · **Branch / environment name:** `production`.
4. **Method:** Drag and drop → drop the zip from `release/` → **Save and deploy**.
5. When the deployment shows **Deployed**, open the default URL shown on the app page
   (looks like `https://production.d1abc2def3.amplifyapp.com`).

At this point the home page works, but refreshing `/blog` would 404 until step 5 is done.

---

## 5. Rewrites (required for a single-page app)

Amplify console → your app → **Hosting → Rewrites and redirects** → **Manage redirects** → **Open text editor**,
replace the contents with `deploy/aws-amplify/rewrites.json`, **Save**:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|jpeg|js|mjs|png|txt|svg|woff|woff2|ttf|map|json|webp|webmanifest|xml)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200",
    "condition": null
  }
]
```

It serves `index.html` for every route that isn't a real file, so React Router can render `/blog`, `/blog/<slug>` and the 404 page,
while JS/CSS/images/`sitemap.xml`/`robots.txt` are still served as files.

---

## 6. Security & caching headers

Amplify console → your app → **Hosting → Custom headers** → **Edit** → paste the full contents of
`deploy/aws-amplify/custom-headers.yml` → **Save**.

What it sets:
- **HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy.**
- **Content-Security-Policy** allowing only this site, Google Fonts and `formspree.io`. It was tested locally with the 3D scenes,
  blog deep links and the request form — no violations. If you later add analytics, chat widgets or other third-party scripts,
  add their domains to the CSP or they will be blocked.
- **Caching:** `/assets/*` (fingerprinted files) cached for 1 year; `index.html` always revalidated so new releases appear immediately.

Redeploy is not needed — headers apply to the live app (allow a few minutes).

---

## 7. Test on the Amplify URL

On `https://production.<app-id>.amplifyapp.com` check:

- [ ] Home page loads; hero globe, AI network and platform explorer render (desktop + phone)
- [ ] Direct visit / refresh of `/blog` and `/blog/cloud-migration-mistakes` works (no 404)
- [ ] `/sitemap.xml` and `/robots.txt` open as files (not the home page)
- [ ] `/this-page-does-not-exist` shows the site's 404 page
- [ ] Browser DevTools console: no red CSP errors
- [ ] Contact form: send **one** real test request → email arrives at `info@vinsolutions.lk` (see section 9)

---

## 8. Connect the custom domain `cloud.vinsolutions.lk`

1. Amplify console → your app → **Hosting → Custom domains** → **Add domain**.
2. Enter **`vinsolutions.lk`** → **Configure domain**.
3. In the subdomain list, **remove the root (`vinsolutions.lk`) and `www` entries** so Amplify doesn't take over your main domain,
   and add the subdomain **`cloud`** → branch **`production`**.
4. Keep **Amplify managed certificate** (free) → **Add domain**.
5. If your DNS is **not** on Route 53, Amplify shows records to create at your DNS provider:

   | Type | Name (host) | Value | Purpose |
   |---|---|---|---|
   | CNAME | `_<random>.vinsolutions.lk` | `_<random>.<...>.acm-validations.aws.` | proves domain ownership for the SSL certificate |
   | CNAME | `cloud` | `<id>.cloudfront.net` | points the site at Amplify |

   - Copy values exactly from the Amplify console (the table above is only the shape).
   - Many DNS panels add the domain automatically — enter the host as `_<random>` / `cloud`, not the full name, or you'll get
     `..vinsolutions.lk.vinsolutions.lk`.
   - **Don't touch existing records** for the root domain, `www`, or **MX/TXT** (your `info@vinsolutions.lk` email depends on them).
6. Wait until the domain status is **Available** (often 15–60 min; DNS can take up to 48 h). HTTPS is issued automatically.
7. Re-run the checklist in section 7 on **https://cloud.vinsolutions.lk**.

---

## 9. Formspree (contact form)

In your Formspree dashboard → form `mppqanpv`:
- **Settings → reCAPTCHA: off.** The site submits in the background (AJAX); Formspree's built-in reCAPTCHA would reject it.
  Spam is still filtered by Formspree and by the form's hidden honeypot field.
- **Notifications:** deliver to `info@vinsolutions.lk` (Account → Linked emails may ask you to verify it).
- **Optional — Restrict to Domain:** `cloud.vinsolutions.lk` (paid Formspree plans). Once set, submissions from the
  `amplifyapp.com` URL or `localhost` are rejected, so set it after go-live.
- Watch the monthly submission limit of your plan.

---

## 10. After go-live (SEO & sharing)

1. **Google Search Console** → add property `https://cloud.vinsolutions.lk` (verify with a DNS TXT record) →
   **Sitemaps** → submit `https://cloud.vinsolutions.lk/sitemap.xml`. Then use **URL inspection → Request indexing** for the home page.
2. **Bing Webmaster Tools** → import from Search Console.
3. **Google Business Profile** for VIN Cloud Solutions (Ragama) with the website link — the biggest boost for local "Sri Lanka" searches.
4. Check the share preview with the **Facebook Sharing Debugger** (and use "Scrape again" after changes) — it uses `/brand/og-image.png`.
5. Validate structured data with the **Rich Results Test** (FAQ, Organization).

---

## 11. Releasing updates

Every time content or code changes:

```bash
npm run package:amplify
```

Amplify console → your app → **production** → **Deploy updates** → drag and drop the new zip → wait for **Deployed** →
spot-check the live site (hard refresh with Ctrl+F5 if you still see the old version).

Remember when content changes:
- New blog post → add it to `public/sitemap.xml` before packaging (see `docs/CONTENT_GUIDE.md`).
- Changed brand images keep the same file names, so they may be cached by browsers for a while.

### Rolling back
Upload the previous zip from `release/` with **Deploy updates**. (That's why you keep the last few zips.)

---

## 12. Optional: deploy from the command line (AWS CLI)

Same manual flow, scripted. Requires AWS CLI v2 configured (`aws configure sso` or access keys of the IAM user from section 2).

One-time app creation (instead of section 4–6 console steps):

```bash
aws amplify create-app --name vin-cloud-solutions --platform WEB --region ap-south-1
# note the appId from the output
aws amplify create-branch --app-id <appId> --branch-name production --region ap-south-1
aws amplify update-app --app-id <appId> --region ap-south-1 \
  --custom-rules file://deploy/aws-amplify/rewrites.json \
  --custom-headers file://deploy/aws-amplify/custom-headers.yml
```

Each release:

```bash
npm run package:amplify
aws amplify create-deployment --app-id <appId> --branch-name production --region ap-south-1
# -> returns "jobId" and "zipUploadUrl"
curl --upload-file release/vin-cloud-site-<time>.zip "<zipUploadUrl>"
aws amplify start-deployment --app-id <appId> --branch-name production --job-id <jobId> --region ap-south-1
aws amplify get-job --app-id <appId> --branch-name production --job-id <jobId> --region ap-south-1   # status: SUCCEED
```

---

## 13. Costs

Amplify Hosting bills for **data served** and **storage**; with manual deploys there are **no build minutes**.
This site is ~2 MB, and each visitor downloads roughly 1–1.5 MB on a first visit (three.js loads only when the 3D sections scroll into view),
so normal business traffic typically costs **a few USD per month or less**. Check the current
[Amplify pricing](https://aws.amazon.com/amplify/pricing/) and your account's free-tier/credits, and keep the budget alert from section 2.

---

## 14. Troubleshooting

| Problem | Cause / fix |
|---|---|
| Refreshing `/blog` gives 404 / AccessDenied | Rewrite rule missing → section 5 |
| Blank page; console says a `.js` file has MIME type `text/html` | Rewrite rule edited and now catches `.js` files → paste `rewrites.json` again |
| Upload fails or site shows "404" right after deploy | Zip has a parent folder instead of `index.html` at the root → always use `npm run package:amplify` (don't zip the `dist` folder itself) |
| Old version still shown | Browser cache → Ctrl+F5; `index.html` is no-cache so it clears quickly |
| Red "Refused to load…" console errors | CSP blocks a new third-party domain → add it to `custom-headers.yml` and re-paste |
| Contact form shows the error message | Formspree reCAPTCHA on, domain restriction set while testing on another URL, or monthly limit reached |
| Custom domain stuck on "Pending verification" | Validation CNAME wrong or duplicated domain suffix (section 8.5); check with `nslookup -type=CNAME cloud.vinsolutions.lk` |
| SSL "not secure" on the custom domain | Certificate still issuing — wait for status **Available** |

---

## Appendix: connecting Git later (optional CI)

If you ever want Amplify to build automatically on every push, create a new Amplify app with **GitHub** as the source and add this
`amplify.yml` to the repo root; rewrites and headers stay the same (headers can then live in `customHttp.yml` at the repo root).

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 20 || nvm install 20
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```
