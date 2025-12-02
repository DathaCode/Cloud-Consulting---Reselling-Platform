# Blog Guide

Learn how to add, edit, and manage blog posts for the Vin Cloud Solutions website.

## Blog System Overview

The blog uses markdown files with frontmatter for metadata. Posts are:
- Stored in `src/content/blog/`
- Parsed at build time
- Rendered with React Markdown
- Searchable by title, excerpt, and tags

## Adding a New Blog Post

### Step 1: Create Markdown File

Create a new file in `src/content/blog/` with this naming pattern:
```
YYYY-MM-title-slug.md
```

Example: `2025-12-02-cloud-security-best-practices.md`

### Step 2: Add Frontmatter

At the top of your markdown file, add frontmatter (metadata):

```markdown
---
title: "Your Blog Post Title"
date: "2025-12-02"
author: "Your Name"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
featured_image: "/images/blog/your-image.jpg"
excerpt: "A brief 150-200 character summary of your post that appears in previews."
slug: "url-friendly-slug"
---
```

### Frontmatter Field Details

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (appears in preview and full post) |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `author` | No | Author name (defaults to "Vin Cloud Solutions") |
| `category` | No | Category badge (e.g., "Atlassian", "Cloud Infrastructure") |
| `tags` | No | Array of tags for filtering and SEO |
| `featured_image` | No | Path to featured image (relative to public/) |
| `excerpt` | Yes | Short summary for preview cards |
| `slug` | Yes | URL slug (must be unique) |

### Step 3: Write Content

After the frontmatter, write your content in markdown:

```markdown
# Main Heading

Your introduction paragraph...

## Section Heading

More content with **bold** and *italic* text.

### Subsection

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Another item

> Blockquote for important callouts

```code blocks```

[Links work too](https://example.com)
```

## Supported Markdown Features

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~ (not styled by default)
```

### Lists
```markdown
Unordered:
- Item 1
- Item 2

Ordered:
1. First
2. Second
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text for image](/images/blog/image.jpg)
```

### Code
```markdown
Inline `code` with backticks

```javascript
// Code block with syntax highlighting
function example() {
  return "Hello World";
}
```
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## Blog Post Template

Copy this template for new posts:

```markdown
---
title: "Your Compelling Title Here"
date: "2025-12-02"
author: "Vin Cloud Solutions"
category: "Cloud Infrastructure"
tags: ["AWS", "Migration", "Best Practices"]
featured_image: "/images/blog/featured-image.jpg"
excerpt: "A concise summary that entices readers to click and read more. Keep it under 200 characters for best results."
slug: "your-url-slug-here"
---

# Main Title (usually same as frontmatter title)

## Introduction

Start with a hook that explains the problem or topic.

## The Challenge

Describe the pain point or problem in detail.

### Subsection if needed

More details...

## The Solution

Provide your expert solution or approach.

### Step 1: First Action

Details...

### Step 2: Next Action

Details...

## Best Practices

- Bullet point 1
- Bullet point 2
- Bullet point 3

## Real-World Example

Provide a case study or example:

**Challenge**: Description
**Solution**: What you did
**Results**: Metrics and outcomes

## Conclusion

Summarize key takeaways.

## Call to Action

Invite readers to contact you for help with this topic.
```

## Updating the Blog Index

After creating your markdown file, you need to import it in `src/hooks/useBlogData.js`:

```javascript
// Import the new blog post
import post6 from '../content/blog/2025-12-your-new-post.md?raw';

// Add to rawPosts array
const rawPosts = [post1, post2, post3, post4, post5, post6];
```

**Important**: The `?raw` import is required to import the markdown as a string.

## Testing Your Blog Post

1. Start the dev server: `npm run dev`
2. Navigate to `/blog`
3. Verify your post appears in the list
4. Click on your post
5. Check:
   - Title displays correctly
   - Date is formatted properly
   - Category badge shows
   - Content renders with proper styling
   - Tags appear at the bottom
   - "Back to Blog" button works

## Blog Post Best Practices

### Writing Tips

1. **Use Clear Headlines**: H2 and H3 headings for scannability
2. **Short Paragraphs**: 2-3 sentences max for web reading
3. **Bullet Points**: Break up dense information
4. **Examples**: Always include real-world examples
5. **CTAs**: End with a call to action

### SEO Optimization

1. **Title**: Include primary keyword, keep under 60 characters
2. **Excerpt**: Compelling summary with keywords, ~150 characters
3. **Tags**: 3-5 relevant tags for categorization
4. **Headings**: Use H2-H3 hierarchy for structure
5. **Links**: Link to related internal blog posts and external resources

### Content Length

- **Short posts** (500-800 words): Quick tips, news
- **Medium posts** (1000-1500 words): How-tos, tutorials
- **Long posts** (2000+ words): Comprehensive guides, comparisons

### Images

If adding images:
1. Save images to `public/images/blog/`
2. Optimize images (< 500KB each)
3. Use descriptive filenames (e.g., `aws-cost-optimization-chart.jpg`)
4. Reference in markdown: `![Description](/images/blog/filename.jpg)`

## Managing Existing Posts

### Editing a Post

1. Locate the markdown file in `src/content/blog/`
2. Edit the content or frontmatter
3. Save the file
4. Changes reflect immediately in dev mode

### Deleting a Post

1. Delete the markdown file from `src/content/blog/`
2. Remove the import from `src/hooks/useBlogData.js`
3. Remove from `rawPosts` array

### Changing Post Date

Update the `date` field in frontmatter to change publish date. Blog posts are automatically sorted by date (newest first).

## Categories and Tags

### Suggested Categories

- Atlassian
- Cloud Infrastructure
- Best Practices
- Migration
- Security
- Cost Optimization

### Suggested Tags

- AWS
- Oracle Cloud
- GCP
- Jira
- Confluence
- Migration
- Cost Savings
- DevOps
- Security

## Troubleshooting

### Post Not Appearing

1. Check frontmatter syntax (valid YAML)
2. Verify import in `useBlogData.js`
3. Check for JavaScript errors in console
4. Restart dev server

### Markdown Not Rendering

1. Verify markdown syntax
2. Check for special characters in frontmatter
3. Ensure code blocks use proper syntax

### Broken Links

- Use absolute paths for internal links: `/blog/slug`
- Use full URLs for external links: `https://example.com`

## Future Enhancements

Consider adding:
- Related posts suggestions
- Comment system (Disqus, etc.)
- Read time estimation
- Social sharing buttons
- Author pages
- RSS feed

## Support

For questions about the blog system:
- Email: contact@vincloudsolutions.com
- Check `src/hooks/useBlogData.js` for blog logic
- Review existing posts for examples
