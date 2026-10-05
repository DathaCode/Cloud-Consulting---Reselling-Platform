import React, { useMemo, useState } from 'react';
import PageLayout from '../components/common/PageLayout';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import BlogList from '../components/blog/BlogList';
import BlogSearch from '../components/blog/BlogSearch';
import { useBlogData } from '../hooks/useBlogData';
import { useSeo } from '../utils/seo';

const Blog = () => {
    const { posts, searchPosts } = useBlogData();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');

    useSeo({
        title: 'Insights: Cloud, AI & Modernization Articles',
        description: 'Expert articles on cloud migration, Atlassian, AWS, Oracle, Microsoft 365, AI and digital transformation from VIN Cloud Solutions.',
        path: '/blog',
    });

    const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))], [posts]);
    const filteredPosts = useMemo(() => {
        const base = searchQuery.trim() ? searchPosts(searchQuery) : posts;
        return category === 'All' ? base : base.filter((p) => p.category === category);
    }, [posts, searchPosts, searchQuery, category]);

    return (
        <PageLayout>
            <Section padding="pt-36 pb-12 md:pt-44" className="overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
                    <div className="absolute -top-32 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
                </div>
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="eyebrow">Insights</span>
                        <h1 className="mt-5 text-4xl font-semibold md:text-6xl">
                            Ideas for building <span className="text-gradient">what’s next.</span>
                        </h1>
                        <p className="mt-5 text-lg text-slate-400">
                            Practical guides on cloud, AI, collaboration and modernization from our engineers.
                        </p>
                        <div className="mt-9">
                            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
                        </div>
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    aria-pressed={category === c}
                                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                        category === c ? 'border-brand-300/50 bg-brand-400/15 text-white' : 'border-white/10 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            <Section padding="pb-24">
                <Container>
                    {searchQuery && (
                        <p className="mb-6 text-sm text-slate-400" aria-live="polite">
                            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for “{searchQuery}”
                        </p>
                    )}
                    <BlogList posts={filteredPosts} />
                </Container>
            </Section>
        </PageLayout>
    );
};

export default Blog;
