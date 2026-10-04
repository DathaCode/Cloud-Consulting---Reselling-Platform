import React from 'react';
import Reveal from './Reveal';

const SectionHeading = ({ id, eyebrow, title, highlight, description, align = 'center', className = '' }) => {
    const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';

    return (
        <div className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
            {eyebrow && (
                <Reveal>
                    <span className="eyebrow">
                        <span className="h-1.5 w-1.5 rounded-full bg-glow animate-pulse-soft" />
                        {eyebrow}
                    </span>
                </Reveal>
            )}
            <Reveal delay={0.05}>
                <h2 id={id} className="text-balance text-3xl font-semibold sm:text-4xl md:text-5xl">
                    {title} {highlight && <span className="text-gradient">{highlight}</span>}
                </h2>
            </Reveal>
            {description && (
                <Reveal delay={0.1}>
                    <p className="text-balance text-base text-slate-400 md:text-lg">{description}</p>
                </Reveal>
            )}
        </div>
    );
};

export default SectionHeading;
