# Deployment Guide

This guide explains how to deploy the Vin Cloud Solutions website to Cloudflare Pages.

## Prerequisites

- A [GitHub](https://github.com/) account
- A [Cloudflare](https://dash.cloudflare.com/sign-up) account
- Git installed locally

## Method 1: Automatic Deployment (Recommended)

This method sets up Continuous Deployment (CD). Every time you push to the `main` branch, Cloudflare will automatically build and deploy your site.

### Step 1: Push to GitHub

1. Create a new repository on GitHub 
(e.g., `vin-cloud-solutions`).
2. Push your local code to GitHub:

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Rename branch to main
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/vin-cloud-solutions.git

# Push
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub account and the `vin-cloud-solutions` repository.
4. Click **Begin setup**.

### Step 3: Configure Build Settings

Cloudflare should detect the settings automatically, but verify them:

- **Project name**: `vin-cloud-solutions`
- **Production branch**: `main`
- **Framework preset**: `Vite` (or `React`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`

### Step 4: Add Environment Variables

In the "Environment variables (optional)" section, add the variables from your `.env.local` file:

| Variable Name | Value |
|---------------|-------|
| `VITE_FORMSPREE_ENDPOINT` | `https://formspree.io/f/YOUR_ID` |
| `VITE_COMPANY_NAME` | `Vin Cloud Solutions` |
| `VITE_COMPANY_EMAIL` | `contact@vincloudsolutions.com` |

Click **Save and Deploy**.

Cloudflare will now clone your repo, install dependencies, build the site, and deploy it. This usually takes 1-2 minutes.

## Method 2: Manual Deployment (Drag & Drop)

If you don't want to use GitHub, you can deploy manually.

1. Build the project locally:
   ```bash
   npm run build
   ```
   This creates a `dist` folder.

2. Go to Cloudflare Dashboard > Workers & Pages > Create application > Pages > **Upload assets**.
3. Name your project.
4. Drag and drop the `dist` folder into the upload area.
5. Click **Deploy site**.

## Custom Domain Setup

1. In your Cloudflare Pages project, go to **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g., `vincloudsolutions.com`).
4. Follow the instructions to update your DNS records.
   - If your domain is managed by Cloudflare, it's automatic.
   - If managed elsewhere (GoDaddy, Namecheap), you'll need to add a CNAME record pointing to your Cloudflare Pages subdomain (e.g., `vin-cloud-solutions.pages.dev`).

## Troubleshooting

### Build Failed: "Command not found"

Ensure you selected "Vite" or "React" as the framework preset, or manually set the build command to `npm run build`.

### 404 on Refresh

If you get 404 errors when refreshing pages like `/blog`, ensure your `wrangler.jsonc` (or `wrangler.toml`) is configured correctly, or that you have a `_redirects` file in `public/` (though Cloudflare Pages usually handles SPA routing automatically if configured).

We have configured `wrangler.jsonc` with:
```json
"not_found_handling": "single-page-application"
```
This should handle client-side routing correctly.

### Environment Variables Missing

If the contact form fails or company info is missing, ensure you added the Environment Variables in the Cloudflare dashboard settings for the project.

## Post-Deployment Checklist

- [ ] Verify SSL certificate is active (https works)
- [ ] Test the Contact Form (submit a real message)
- [ ] Check all navigation links
- [ ] Verify mobile responsiveness on a real phone
- [ ] Run a Lighthouse audit in Chrome DevTools
