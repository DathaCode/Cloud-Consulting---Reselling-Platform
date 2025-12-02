import React from 'react';
import { formatDateShort } from '../../utils/formatDate';
import { Clock } from 'lucide-react';
import Badge from '../common/Badge';

const BlogCard = ({ post, onClick }) => {
    return (
        <article
            onClick={onClick}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            {post.featured_image && (
                <div className="h-48 bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold opacity-50">
                        {post.title[0]}
                    </span>
                </div>
            )}

            <div className="p-6">
                {post.category && (
                    <Badge variant="accent" className="mb-3">
                        {post.category}
                    </Badge>
                )}

                <h3 className="text-xl font-bold text-primary-900 mb-3 hover:text-primary-700 transition-colors">
                    {post.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                        <span>{formatDateShort(post.date)}</span>
                        {post.author && <span>• {post.author}</span>}
                    </div>

                    {post.readingTime && (
                        <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{post.readingTime}</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
