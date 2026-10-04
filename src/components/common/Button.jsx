import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    href,
    type = 'button',
    disabled = false,
    ...props
}) => {
    const baseStyles =
        'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-3 text-sm md:text-base',
        lg: 'px-7 py-4 text-base',
    };

    const variants = {
        primary:
            'bg-gradient-to-r from-brand-300 via-glow to-brand-300 bg-[length:200%_auto] text-ink-950 shadow-glow hover:bg-right hover:shadow-glow-lg',
        secondary: 'glass text-slate-100 hover:border-brand-300/40 hover:bg-white/[0.06]',
        ghost: 'text-slate-300 hover:bg-white/5 hover:text-white',
    };

    const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

    // Internal links go through the router so query params (form prefill) don't reload the page.
    if (href && href.startsWith('/')) {
        return (
            <Link to={href} className={classes} onClick={onClick} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} onClick={onClick} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
            {children}
        </button>
    );
};

export default Button;
