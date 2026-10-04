import React from 'react';

/**
 * Brand lockup. The mark sits on a light tile because the logo's dark arrow
 * needs a light ground to stay legible on the dark UI.
 */
const Logo = ({ size = 'md', showText = true, className = '' }) => {
    const sizes = {
        sm: { tile: 'h-8 w-8 rounded-lg', img: 'h-5', text: 'text-base' },
        md: { tile: 'h-10 w-10 rounded-xl', img: 'h-7', text: 'text-lg' },
        lg: { tile: 'h-14 w-14 rounded-2xl', img: 'h-9', text: 'text-2xl' },
    };
    const s = sizes[size];

    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <span className={`relative grid place-items-center bg-gradient-to-br from-white to-brand-50 shadow-glow ${s.tile}`}>
                <img src="/brand/vin-mark.png" alt="" aria-hidden="true" className={`${s.img} w-auto`} width="234" height="256" />
            </span>
            {showText && (
                <span className={`font-display font-semibold leading-none tracking-tight text-slate-50 ${s.text}`}>
                    VIN <span className="text-brand-300">Cloud</span>
                    <span className="block pt-1 font-mono text-[0.6rem] font-normal uppercase tracking-[0.3em] text-slate-400">
                        Solutions
                    </span>
                </span>
            )}
        </span>
    );
};

export default Logo;
