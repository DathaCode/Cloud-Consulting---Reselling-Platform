import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';

const BlogList = ({ posts }) => {
    const navigate = useNavigate();

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No blog posts found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <BlogCard
                    key={post.slug}
                    post={post}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                />
            ))}
        </div>
    );
};

export default BlogList;
