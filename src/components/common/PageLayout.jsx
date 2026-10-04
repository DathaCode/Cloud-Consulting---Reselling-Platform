import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const PageLayout = ({ children, className = '' }) => (
    <div className={`flex min-h-screen flex-col ${className}`}>
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-300 focus:px-4 focus:py-2 focus:text-ink-950"
        >
            Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
    </div>
);

export default PageLayout;
