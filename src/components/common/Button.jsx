import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    onClick,
    href,
    type = 'button',
    disabled = false,
    ...props
}) => {
    const baseStyles = 'font-bold py-3 px-6 rounded-lg transition-all duration-200 inline-block text-center';

    const variants = {
        primary: 'bg-accent text-primary-900 hover:opacity-90',
        secondary: 'bg-primary-700 text-white hover:bg-primary-500',
        outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white',
    };

    const classes = `${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
