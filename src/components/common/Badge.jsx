import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'border-white/10 bg-white/5 text-slate-300',
        accent: 'border-brand-300/30 bg-brand-400/10 text-brand-200',
        ai: 'border-ai/30 bg-ai/10 text-violet-200',
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
