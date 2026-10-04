# Vin Cloud Solutions - Cloud Consulting & Reselling Platform

A modern, professional single-page application for cloud consulting and product reselling services. Built with React, Vite, and Tailwind CSS, deployed on Cloudflare Pages.

## 🚀 Features

- **Modern Tech Stack**: React 18 + Vite 5 + Tailwind CSS
- **Responsive Design**: Mobile-first design that works on all devices
- **Blog System**: Markdown-based blog with frontmatter support
- **Contact Form**: Integrated with Formspree for lead generation
- **SEO Optimized**: per-route meta tags via `useSeo` (src/utils/seo.js), JSON-LD structured data, sitemap & Open Graph image
- **Zero-Cost Hosting**: Deployed on Cloudflare Pages (FREE)
- **Smooth Animations**: Framer Motion for professional animations

## 📋 Services

- **Atlassian Cloud Solutions**: Jira, Confluence, Bitbucket configuration and migration
- **AWS & Oracle Cloud Infrastructure**: Architecture design, cost optimization, migrations
- **Cloud Products & Licensing**: Competitive pricing and enterprise solutions

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Routing**: React Router 6
- **Blog**: Markdown with gray-matter for frontmatter
- **Forms**: Formspree integration
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D**: three.js + React Three Fiber (lazy-loaded)
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 🏃 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vin-cloud-solutions.git
cd vin-cloud-solutions

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Environment Variables

Create a `.env.local` file with:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_COMPANY_NAME=Vin Cloud Solutions
VITE_COMPANY_EMAIL=info@vinsolutions.lk
VITE_COMPANY_PHONE=+1 (555) 000-0000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components (Button, Navbar, Footer)
│   ├── sections/        # Page sections (Hero, Services, Contact)
│   └── blog/            # Blog-specific components
├── pages/               # Route pages (Home, Blog, BlogPost, NotFound)
├── content/blog/        # Markdown blog posts
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── styles/              # Global styles
└── App.jsx              # Main app with routing
```

## 📝 Adding Blog Posts

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: "Your Blog Post Title"
date: "2025-12-02"
author: "Your Name"
category: "Category"
tags: ["tag1", "tag2"]
excerpt: "Brief description"
slug: "url-slug"
---

# Your Content Here

Write your blog post in markdown...
```

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Connect GitHub Repository**:
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub account
   - Select this repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)

3. **Add GitHub Secrets** (for automatic deployments):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

4. **Deploy**: Push to `main` branch to trigger automatic deployment

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using Wrangler
npm run deploy
```

## 📖 Documentation

- [Setup Guide](./docs/SETUP.md) - Local development setup
- [Blog Guide](./docs/BLOG_GUIDE.md) - Adding and managing blog posts
- [Deployment Guide](./docs/DEPLOYMENT.md) - Cloudflare Pages deployment
- [Content Guide](./docs/CONTENT_GUIDE.md) - Content management

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    900: '#001F3F',  // Deep Navy
    700: '#0047AB',  // Ocean Blue
    500: '#1E90FF',  // Sky Blue
    100: '#E0F0FF',  // Light Blue
  },
  accent: '#FFB700',  // Gold
}
```

### Company Information

Update `src/utils/constants.js`:

```javascript
export const COMPANY_INFO = {
  name: 'Your Company Name',
  email: 'your@email.com',
  phone: '+1 (555) 000-0000',
};
```

## 🧪 Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run deploy      # Deploy to Cloudflare Pages
npm run lint        # Run ESLint
```

## 📈 Performance

- **Lighthouse Score**: 90+ on all metrics
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Build Size**: ~200KB (gzipped)

## 🔒 Security

- HTTPS enforced via Cloudflare
- Environment variables for sensitive data
- Content Security Policy headers
- Form validation and sanitization

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues:
- Email: info@vinsolutions.lk
- Website: cloud.vinsolutions.lk

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/)

---

Made with ❤️ by Vin Cloud Solutions
