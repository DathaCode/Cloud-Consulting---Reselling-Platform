# Deployment guide — AWS Amplify Hosting (GitHub)

How to put **cloud.vinsolutions.lk** online with AWS Amplify Hosting connected to the GitHub repository, and how to release updates.

Repository: `https://github.com/DathaCode/Cloud-Consulting---Reselling-Platform` · Production branch: **`main`**

---

## 1. How it works

```
git push origin main ──► AWS Amplify (build: amplify.yml) ──► S3 + CloudFront CDN + HTTPS ──► https://cloud.vinsolutions.lk
```

- The site is a **static single-page app**. Amplify clones the repo, runs `npm ci` + `npm run build` (Node 20), and publishes `dist/`.
- **No S3 bucket or CloudFront distribution to create yourself** — Amplify Hosting manages storage, the global CDN,
  the free TLS certificate and cache invalidation.
- There is **no GitHub Actions workflow**; Amplify does the building. The contact form posts to Formspree from the browser.

Files in the repo that Amplify uses (they must be **committed and pushed**):

| File | Purpose |
|---|---|
| `amplify.yml` | Build settings: Node 20, `npm ci --cache .npm`, `npm run build`, publish `dist/` |
| `customHttp.yml` | Security headers (CSP, HSTS…) and caching rules, applied on every build |
| `deploy/aws-amplify/rewrites.json` | SPA rewrite rule — pasted once into the console (section 5) |
| `package-lock.json` | Must be in sync with `package.json` (`npm ci` fails otherwise) |

---

## 2. Before you start (one time)

1. **AWS account** with billing set up. Use an IAM / IAM Identity Center user with **MFA** and the AWS-managed policy
   **`AdministratorAccess-Amplify`** — not the root user.
2. **Region:** **Asia Pacific (Mumbai) `ap-south-1`** (closest to Sri Lanka for managing the app; visitors are served from CloudFront worldwide).
3. **Budget alert:** Billing → Budgets → monthly cost budget (e.g. USD 5) with an email alert to `info@vinsolutions.lk`.
4. **Push the code:** make sure everything (including `amplify.yml`, `customHttp.yml`, `deploy/`, `design/`) is committed and pushed to `main`.
   Quick local check first: `npm ci && npm run build`.
5. Access to the **DNS settings of `vinsolutions.lk`**.

> Already created an app with **Deploy without Git**? Amplify can't convert it. Create the new Git app below, move the custom domain
> to it (section 8), then delete the old app.

---

## 3. Create the Amplify app from GitHub

1. AWS Amplify console (`ap-south-1`) → **Create new app** → **GitHub** → **Next**.
2. Authorize AWS Amplify in GitHub. When GitHub asks where to install the **AWS Amplify GitHub App**, choose
   **Only select repositories** → `Cloud-Consulting---Reselling-Platform` (least access).
3. Select the repository and branch **`main`** → **Next**.
4. **App settings**
   - App name: `vin-cloud-solutions`
   - Build settings: Amplify detects **`amplify.yml`** from the repo — keep it (don't edit it in the console).
   - Leave "My monorepo" unchecked. Service role: let Amplify create the default one.
   - Advanced → **Environment variables**: none needed (the Formspree endpoint has a built-in default; add
     `VITE_FORMSPREE_ENDPOINT` only if you switch forms).
5. **Save and deploy.** The first build takes ~3–4 minutes (Provision → Build → Deploy).
   Open the default URL when done: `https://main.<app-id>.amplifyapp.com`.

### Choose how releases happen
App → **Hosting → Branch settings** (or the branch's **Actions**) → **Auto build**:

| Mode | How a release happens | When to choose |
|---|---|---|
| **Auto build ON** (default) | Every push to `main` builds and goes live | Do work on another branch (e.g. `dev`) and merge to `main` only when ready |
| **Auto build OFF** | Push whenever; go live by clicking **Run build** on `main` | You want a manual "publish" button |

Keep **pull request previews** off unless you want preview URLs (they cost build minutes and are publicly reachable).

---

## 4. Check the build log

Build → **Build** step log should show `node -v` → `v20.x`, `npm ci` finishing, and `✓ built in …`.
Expected, harmless warnings: `Use of eval in gray-matter` and the browserslist "data is old" notice.

---

## 5. Rewrites (required for a single-page app)

App → **Hosting → Rewrites and redirects** → **Manage redirects** → **Open text editor** → replace with the contents of
`deploy/aws-amplify/rewrites.json` → **Save**:

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

Every path that isn't a real file is answered with `index.html`, so React Router renders `/blog`, `/blog/<slug>` and the 404 page,
while JS/CSS/images/`sitemap.xml`/`robots.txt` are served as files. Applies immediately (no rebuild).

---

## 6. Security & caching headers (`customHttp.yml`)

Applied automatically on each build — nothing to paste. Contents:
- **HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy**
- **Content-Security-Policy** allowing only this site, Google Fonts and `formspree.io` (tested: 3D scenes, blog deep links and the
  form work with zero violations). **Adding analytics, chat widgets or any third-party script?** Add its domain to the CSP in
  `customHttp.yml`, or the browser will block it.
- **Caching:** `/assets/*` (fingerprinted) cached for a year; `index.html` revalidated every time so releases appear immediately.

Verify after the first build (Git Bash / PowerShell `curl.exe`):
```bash
curl -I https://main.<app-id>.amplifyapp.com/
# expect: content-security-policy, strict-transport-security, x-frame-options: DENY, cache-control: no-cache
```
If the headers are missing, open App → **Hosting → Custom headers**: the console shows the active headers and you can paste
`customHttp.yml` there as a fallback.

---

## 7. Test on the Amplify URL

- [ ] Home page loads; hero globe, AI network and platform explorer render (desktop + phone)
- [ ] Refresh / direct visit of `/blog` and `/blog/cloud-migration-mistakes` works
- [ ] `/sitemap.xml` and `/robots.txt` open as files
- [ ] `/this-page-does-not-exist` shows the site's 404 page
- [ ] DevTools console: no red "Refused to…" CSP errors
- [ ] Contact form: send **one** real test request → email arrives at `info@vinsolutions.lk` (section 9)

---

## 8. Custom domain `cloud.vinsolutions.lk`

1. App → **Hosting → Custom domains** → **Add domain** → enter **`vinsolutions.lk`** → **Configure domain**.
2. **Remove the root (`vinsolutions.lk`) and `www` entries**, add subdomain **`cloud`** → branch **`main`**.
3. Keep the **Amplify managed certificate** → **Add domain**.
4. If DNS is not on Route 53, create the records Amplify shows at your DNS provider:

   | Type | Host | Value | Purpose |
   |---|---|---|---|
   | CNAME | `_<random>` (.vinsolutions.lk) | `_<random>.<...>.acm-validations.aws.` | SSL certificate validation |
   | CNAME | `cloud` | `<id>.cloudfront.net` | points the site at Amplify |

   - Copy values exactly from the console. Most DNS panels append the domain — enter `_<random>` and `cloud`, not full names.
   - **Don't change** existing root, `www`, **MX** or **TXT** records — `info@vinsolutions.lk` email depends on them.
5. Wait for status **Available** (often under an hour, up to 48 h for DNS). HTTPS is automatic.
6. Re-run the section 7 checklist on **https://cloud.vinsolutions.lk**.

Moving the domain from an older Amplify app: remove it from the old app first, then add it here; update the `cloud` CNAME to the new value.

---

## 9. Formspree (contact form)

Formspree dashboard → form `mppqanpv`:
- **reCAPTCHA: off** — the site submits in the background (AJAX); Formspree's reCAPTCHA would reject it. Spam is still filtered by
  Formspree and the form's honeypot.
- **Notifications** → `info@vinsolutions.lk` (verify the address under Account → Linked emails if asked).
- **Restrict to Domain** (optional, paid plans) → `cloud.vinsolutions.lk` — set it after go-live; it blocks tests from
  `amplifyapp.com` and `localhost`.
- Watch your plan's monthly submission limit.

---

## 10. After go-live (SEO & sharing)

1. **Google Search Console** → add `https://cloud.vinsolutions.lk` (verify via DNS TXT) → **Sitemaps** → submit
   `https://cloud.vinsolutions.lk/sitemap.xml` → URL inspection → **Request indexing** for the home page.
2. **Bing Webmaster Tools** → import from Search Console.
3. **Google Business Profile** for VIN Cloud Solutions (Ragama) linking to the site — the biggest lever for local searches.
4. **Facebook Sharing Debugger** → check the preview (`/brand/og-image.png`), "Scrape again" after changes.
5. **Rich Results Test** → FAQ and Organization structured data.

---

## 11. Releasing updates

```bash
npm run build          # optional local check — catches errors before Amplify does
git add -A && git commit -m "..." && git push origin main
```
- **Auto build ON:** the push starts a build; it's live in ~2–3 minutes.
- **Auto build OFF:** Amplify console → `main` → **Run build**.

Watch the build under the branch; a failed build **doesn't** replace the live site. Hard-refresh (Ctrl+F5) if you still see the old version.

Content reminders: new blog post → add it to `public/sitemap.xml`; dependency changes → commit `package-lock.json` too.

### Rolling back
Branch → **Deployments** list → pick the last good build → **Redeploy this version**. Or `git revert` the bad commit and push.

---

## 12. Optional: AWS CLI

```bash
aws amplify list-apps --region ap-south-1                                  # find appId
aws amplify start-job --app-id <appId> --branch-name main --job-type RELEASE --region ap-south-1   # = "Run build"
aws amplify list-jobs --app-id <appId> --branch-name main --max-items 5 --region ap-south-1        # status
aws amplify update-app --app-id <appId> --custom-rules file://deploy/aws-amplify/rewrites.json --region ap-south-1
```

---

## 13. Costs

Amplify Hosting charges for **build minutes** (≈ 2–3 min per release), **data served** and **storage**. With a ~2 MB site and
normal business traffic this is typically **a few USD per month or less**. Check the current
[Amplify pricing](https://aws.amazon.com/amplify/pricing/), your free-tier/credits, and keep the budget alert from section 2.
Turning auto build off, or working on a non-connected branch, avoids paying for builds you don't publish.

---

## 14. Troubleshooting

| Problem | Cause / fix |
|---|---|
| Build fails at `npm ci` ("lock file out of sync") | Run `npm install` locally, commit `package-lock.json`, push |
| Build fails with Node/engine errors | Check the log shows `v20.x`; `amplify.yml` must not be overridden in the console build settings |
| Build passes but the site is blank / 404 | Build output must be `dist` (`baseDirectory: dist` in `amplify.yml`) |
| Refresh on `/blog` gives 404 / AccessDenied | Rewrite rule missing → section 5 |
| JS file served as `text/html`, blank page | Rewrite rule edited too broadly → paste `rewrites.json` again |
| Security headers missing | Check Hosting → Custom headers; confirm `customHttp.yml` is committed at the repo root; rebuild |
| Red "Refused to load…" console errors | New third-party domain not in the CSP → edit `customHttp.yml`, push |
| Contact form shows the error message | Formspree reCAPTCHA on, domain restriction while testing elsewhere, or monthly limit reached |
| Custom domain "Pending verification" | Validation CNAME wrong or doubled suffix; check `nslookup -type=CNAME cloud.vinsolutions.lk` |
| Amplify can't see the repo | GitHub → Settings → Applications → AWS Amplify → grant access to the repository |
