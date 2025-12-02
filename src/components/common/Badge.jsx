import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-primary-100 text-primary-700',
        accent: 'bg-accent bg-opacity-20 text-primary-900',
        success: 'bg-green-100 text-green-700',
    };

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
