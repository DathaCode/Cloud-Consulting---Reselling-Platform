import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import BlogPost from '../components/blog/BlogPost';
import { useBlogData } from '../hooks/useBlogData';
import { getMetaTags } from '../utils/seo';

const BlogPostPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { getPostBySlug } = useBlogData();

    const post = getPostBySlug(slug);

    const handleBack = () => {
        navigate('/blog');
    };

    if (!post) {
        return (
            <>
                <Navbar />
                <Section padding="pt-32 pb-16">
                    <Container>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-primary-900 mb-4">Post Not Found</h1>
                            <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist.</p>
                            <button
                                onClick={handleBack}
                                className="text-primary-700 hover:text-primary-500 font-semibold underline"
                            >
                                Back to Blog
                            </button>
                        </div>
                    </Container>
                </Section>
                <Footer />
            </>
        );
    }

    const metaTags = getMetaTags({
        title: post.title,
        description: post.excerpt,
        keywords: post.tags ? post.tags.join(', ') : '',
        ogImage: post.featured_image,
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

                <Section bgColor="bg-white" padding="pt-32 pb-16">
                    <Container>
                        <BlogPost post={post} onBack={handleBack} />
                    </Container>
                </Section>

                <Footer />
            </div>
        </>
    );
};

export default BlogPostPage;
