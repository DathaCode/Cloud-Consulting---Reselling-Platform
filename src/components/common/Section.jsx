import React from 'react';

const Section = ({
    children,
    className = '',
    id = '',
    bgColor = 'bg-white',
    padding = 'py-16 md:py-24'
}) => {
    return (
        <section id={id} className={`${bgColor} ${padding} ${className}`}>
            {children}
        </section>
    );
};

export default Section;
