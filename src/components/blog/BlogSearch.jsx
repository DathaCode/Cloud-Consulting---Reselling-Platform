import React from 'react';
import { Search } from 'lucide-react';

const BlogSearch = ({ value, onChange, placeholder = 'Search articles…' }) => (
    <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
        <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Search articles"
            className="input-field rounded-2xl py-3.5 pl-11"
        />
    </div>
);

export default BlogSearch;
