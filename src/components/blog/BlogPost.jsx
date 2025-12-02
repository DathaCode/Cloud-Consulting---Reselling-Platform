import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import Badge from '../common/Badge';

const BlogPost = ({ post, onBack }) => {
    if (!post) {
        return null;
    }

    return (
        <article className="max-w-4xl mx-auto">
            {/* Back button */}
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-primary-700 hover:text-primary-500 mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                <span>Back to Blog</span>
            </button>

            {/* Header */}
            <div className="mb-8">
                {post.category && (
                    <Badge variant="accent" className="mb-4">
                        {post.category}
                    </Badge>
                )}

                <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    {post.author && (
                        <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span>{post.author}</span>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{formatDate(post.date)}</span>
                    </div>

                    {post.readingTime && (
                        <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{post.readingTime} read</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Featured Image Placeholder */}
            {post.featured_image && (
                <div className="h-96 bg-gradient-to-br from-primary-700 to-primary-500 rounded-xl mb-8 flex items-center justify-center">
                    <span className="text-white text-8xl font-bold opacity-50">
                        {post.title[0]}
                    </span>
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-primary-900 mt-8 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-primary-900 mt-6 mb-3" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-primary-900 mt-4 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="text-slate-700 mb-4 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700" {...props} />,
                        code: ({ node, inline, ...props }) =>
                            inline ?
                                <code className="bg-slate-100 px-2 py-1 rounded text-sm text-primary-700" {...props} /> :
                                <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-accent pl-4 italic text-slate-600 my-4" {...props} />,
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                            <Badge key={idx} variant="default">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
};

export default BlogPost;
