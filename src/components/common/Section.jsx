import React from 'react';

const Section = ({
    children,
    className = '',
    id,
    bgColor = '',
    padding = 'py-20 md:py-28',
    labelledBy,
}) => {
    return (
        <section id={id} aria-labelledby={labelledBy} className={`relative ${bgColor} ${padding} ${className}`}>
            {children}
        </section>
    );
};

export default Section;
