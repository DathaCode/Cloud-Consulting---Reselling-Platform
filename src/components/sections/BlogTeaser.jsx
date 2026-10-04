import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useBlogData } from '../../hooks/useBlogData';
import BlogCard from '../blog/BlogCard';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

const BlogTeaser = () => {
    const { getLatestPosts, loading } = useBlogData();
    const latestPosts = getLatestPosts(3);

    if (loading || latestPosts.length === 0) {
        return null;
    }

    return (
        <Section id="insights" labelledBy="insights-title">
            <Container>
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <SectionHeading
                        id="insights-title"
                        align="left"
                        eyebrow="Insights"
                        title="Latest from"
                        highlight="our engineers."
                        description="Practical guides on cloud, collaboration and modernization."
                    />
                    <Reveal>
                        <Button href="/blog" variant="secondary">
                            All articles <ArrowRight size={16} />
                        </Button>
                    </Reveal>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {latestPosts.map((post, i) => (
                        <Reveal key={post.slug} delay={i * 0.08}>
                            <BlogCard post={post} />
                        </Reveal>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default BlogTeaser;
