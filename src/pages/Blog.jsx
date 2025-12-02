import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import BlogList from '../components/blog/BlogList';
import BlogSearch from '../components/blog/BlogSearch';
import { useBlogData } from '../hooks/useBlogData';
import { getMetaTags } from '../utils/seo';

const Blog = () => {
    const { posts, searchPosts } = useBlogData();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(searchPosts(query));
        }
    };

    const metaTags = getMetaTags({
        title: 'Blog - Cloud Strategy & Best Practices',
        description: 'Expert articles on cloud migrations, Atlassian products, AWS, Oracle, and cloud cost optimization.',
        keywords: 'cloud blog, migration guide, best practices, cloud tips, Atlassian, AWS, Oracle',
    });

    return (
        <>
            <Helmet>
                <title>{metaTags.title}</title>
                {metaTags.meta.map((tag, index) => (
                    <meta key={index} {...tag} />
                ))}
            </Helmet>

            <div className="min-h-screen">
                <Navbar />

                <Section bgColor="bg-gradient-to-br from-primary-900 to-primary-700" padding="pt-32 pb-16">
                    <Container>
                        <div className="text-center text-white mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
                            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                                Insights, best practices, and expert tips for cloud transformation
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <BlogSearch value={searchQuery} onChange={handleSearch} />
                        </div>
                    </Container>
                </Section>

                <Section bgColor="bg-white">
                    <Container>
                        {searchQuery && (
                            <p className="mb-6 text-slate-600">
                                {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        )}

                        <BlogList posts={filteredPosts} />
                    </Container>
                </Section>

                <Footer />
            </div>
        </>
    );
};

export default Blog;
