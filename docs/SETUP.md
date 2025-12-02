# Local Setup Guide

This guide will help you set up the Vin Cloud Solutions website on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
  
- **Git** (for cloning the repository)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git -- version`

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/vin-cloud-solutions.git
cd vin-cloud-solutions
```

##Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React
- Gray Matter (for blog)
- React Helmet Async

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Formspree Contact Form
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Company Information (optional - defaults in constants.js)
VITE_COMPANY_NAME=Vin Cloud Solutions
VITE_COMPANY_EMAIL=contact@vincloudsolutions.com
VITE_COMPANY_PHONE=+1 (555) 000-0000

# Social Media (optional)
VITE_LINKEDIN_URL=https://linkedin.com/company/vin-cloud-solutions
VITE_TWITTER_URL=https://twitter.com/vincloudsol
VITE_GITHUB_URL=https://github.com/vin-cloud-solutions
```

### Getting a Formspree Endpoint

1. Go to [formspree.io](https://formspree.io/)
2. Sign up for a free account (50 submissions/month)
3. Create a new form
4. Copy the form endpoint (e.g., `https://formspree.io/f/abcd1234`)
5. Paste it into `.env.local`

## Step 4: Start Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

Your terminal should show:
```
VITE v5.x.x ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 5: Verify Installation

Open your browser to `http://localhost:5173` and verify:

- ✅ Homepage loads with Hero section
- ✅ Navigation menu works
- ✅ All sections render correctly
- ✅ Blog page loads (`/blog`)
- ✅ Contact form renders
- ✅ No console errors in browser dev tools

## Development Workflow

### Hot Module Replacement (HMR)

Vite provides instant hot module replacement. Any changes you make to files will automatically reflect in the browser without a full page reload.

### File Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── sections/        # Page sections
│   └── blog/            # Blog components
├── pages/               # Route pages
├── content/blog/        # Markdown blog posts
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── styles/              # Global styles
```

### Making Changes

1. **Edit Components**: Modify files in `src/components/`
2. **Update Content**: Edit `src/utils/constants.js`
3. **Add Blog Posts**: Create new `.md` files in `src/content/blog/`
4. **Style Changes**: Update `tailwind.config.js` or `src/index.css`

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Try deleting `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear the build cache:

```bash
rm -rf dist .vite
npm run build
```

### Formspree Not Working

1. Verify `.env.local` exists and has correct endpoint
2. Check browser console for errors
3. Ensure email is valid in form submission
4. Check Formspree dashboard for blocked submissions

## Testing Production Build

To test the production build locally:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to see the production build.

## Next Steps

- [Blog Guide](./BLOG_GUIDE.md) - Learn how to add blog posts
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Cloudflare Pages
- [Content Guide](./CONTENT_GUIDE.md) - Customize website content

## Support

If you encounter issues:
- Check the [GitHub Issues](https://github.com/your-username/vin-cloud-solutions/issues)
- Contact: contact@vincloudsolutions.com
