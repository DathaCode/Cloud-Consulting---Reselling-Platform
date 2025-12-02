# Content Management Guide

This guide explains how to manage and update the content of the Vin Cloud Solutions website.

## Text Content

Most of the static text content is centralized in `src/utils/constants.js`. This makes it easy to update without touching the React components.

### Company Information

Update `COMPANY_INFO` in `src/utils/constants.js`:

```javascript
export const COMPANY_INFO = {
  name: 'Vin Cloud Solutions',
  tagline: 'Cloud Solutions & Consulting Experts',
  email: 'contact@vincloudsolutions.com',
  phone: '+1 (555) 000-0000',
  website: 'www.vincloudsolutions.com',
};
```

### Navigation Links

Update `NAV_LINKS` to change the menu items.

### Services

Update the `SERVICES` array to modify the service cards on the homepage. Each service has:
- `icon`: 'Layers', 'Cloud', or 'Package' (maps to Lucide icons)
- `title`: Service name
- `description`: Short description
- `features`: Array of bullet points

### Testimonials / Case Studies

Update `CASE_STUDIES` to add or change success stories.

### FAQ

Update `FAQ_ITEMS` to change the questions and answers on the homepage.

## Images

Images are stored in the `public/images/` directory.

- **Blog Images**: `public/images/blog/`
- **Hero Background**: `public/images/hero/`
- **Service Icons**: `public/images/services/`

To update an image, replace the file with a new one of the same name, or upload a new file and update the reference in the code/markdown.

### Image Optimization

Always optimize images before uploading to ensure fast load times.
- Use JPG for photos
- Use PNG/SVG for logos and graphics
- Keep file sizes under 200KB where possible (500KB max for hero images)
- Tools: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

## Blog Posts

See [BLOG_GUIDE.md](./BLOG_GUIDE.md) for detailed instructions on managing blog posts.

## Colors and Branding

The color scheme is defined in `tailwind.config.js`.

```javascript
colors: {
  primary: {
    900: '#001F3F',    // Deep Navy (main brand)
    700: '#0047AB',    // Ocean Blue (secondary)
    500: '#1E90FF',    // Sky Blue (accents)
    100: '#E0F0FF',    // Light Blue (backgrounds)
  },
  accent: '#FFB700',   // Gold/Amber (highlights)
}
```

To change the brand colors, update these hex codes. The changes will propagate throughout the site.

## SEO Metadata

Default SEO tags are in `src/utils/seo.js`.

```javascript
const defaultDescription = 'Expert cloud consulting for Atlassian Cloud...';
```

Update this file to change the global default meta description and keywords.

## Form Configuration

The contact form uses Formspree. To change the destination email or form settings:
1. Log in to [Formspree](https://formspree.io/)
2. Modify the form settings there
3. If you create a *new* form, update the `VITE_FORMSPREE_ENDPOINT` in your `.env` variables.
