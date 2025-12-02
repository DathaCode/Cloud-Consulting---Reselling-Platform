import matter from 'gray-matter';

// Calculate reading time based on word count
export const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
};

// Parse markdown frontmatter
export const parseMarkdown = (markdown) => {
    const { data, content } = matter(markdown);
    return {
        frontMatter: data,
        content,
        readingTime: calculateReadingTime(content),
    };
};

// Generate slug from title
export const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};
