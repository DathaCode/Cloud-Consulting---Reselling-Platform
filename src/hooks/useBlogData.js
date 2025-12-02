import { useState, useEffect } from 'react';
import { parseMarkdown, generateSlug } from '../utils/blogParser';

// Import all blog posts
import post1 from '../content/blog/2025-01-getting-started-atlassian.md?raw';
import post2 from '../content/blog/2025-01-aws-vs-oracle.md?raw';
import post3 from '../content/blog/2025-02-cloud-migration-mistakes.md?raw';
import post4 from '../content/blog/2025-02-jira-best-practices.md?raw';
import post5 from '../content/blog/2025-02-confluence-knowledge-management.md?raw';

const rawPosts = [post1, post2, post3, post4, post5];

export const useBlogData = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const parsedPosts = rawPosts.map(raw => {
            const { frontMatter, content, readingTime } = parseMarkdown(raw);
            const slug = frontMatter.slug || generateSlug(frontMatter.title);

            return {
                ...frontMatter,
                content,
                readingTime,
                slug,
            };
        });

        // Sort by date (newest first)
        parsedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        setPosts(parsedPosts);
        setLoading(false);
    }, []);

    const getPostBySlug = (slug) => {
        return posts.find(post => post.slug === slug);
    };

    const getLatestPosts = (count = 3) => {
        return posts.slice(0, count);
    };

    const filterPostsByTag = (tag) => {
        return posts.filter(post => post.tags && post.tags.includes(tag));
    };

    const filterPostsByCategory = (category) => {
        return posts.filter(post => post.category === category);
    };

    const searchPosts = (query) => {
        const lowerQuery = query.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    };

    return {
        posts,
        loading,
        getPostBySlug,
        getLatestPosts,
        filterPostsByTag,
        filterPostsByCategory,
        searchPosts,
    };
};
