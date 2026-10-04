import React, { useRef } from 'react';

/** Card with a cursor-following glow and gradient hairline border. */
const SpotlightCard = ({ children, className = '', as: Component = 'div', glow = 'rgba(103,232,249,0.12)', ...props }) => {
    const ref = useRef(null);

    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    return (
        <Component
            ref={ref}
            onMouseMove={handleMove}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-colors duration-300 hover:border-brand-300/30 ${className}`}
            {...props}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${glow}, transparent 45%)` }}
            />
            <div className="relative h-full">{children}</div>
        </Component>
    );
};

export default SpotlightCard;
