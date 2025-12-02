import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogData } from '../../hooks/useBlogData';
import BlogCard from '../blog/BlogCard';
import Container from '../common/Container';
import Section from '../common/Section';
import Button from '../common/Button';

const BlogTeaser = () => {
    const navigate = useNavigate();
    const { getLatestPosts, loading } = useBlogData();
    const latestPosts = getLatestPosts(3);

    if (loading || latestPosts.length === 0) {
        return null;
    }

    return (
        <Section bgColor="bg-white">
            <Container>
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                    >
                        Latest Articles
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-600"
                    >
                        Insights, best practices, and expert tips for cloud transformation
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    {latestPosts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            post={post}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                        />
                    ))}
                </motion.div>

                <div className="text-center">
                    <Button
                        href="/blog"
                        variant="outline"
                        className="inline-flex items-center space-x-2"
                    >
                        <span>View All Articles</span>
                        <ArrowRight size={20} />
                    </Button>
                </div>
            </Container>
        </Section>
    );
};

export default BlogTeaser;
