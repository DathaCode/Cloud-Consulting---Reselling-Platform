import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Partners from '../components/sections/Partners';
import CaseStudies from '../components/sections/CaseStudies';
import BlogTeaser from '../components/sections/BlogTeaser';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            <main>
                <Hero />
                <Services />
                <WhyChooseUs />
                <Partners />
                <CaseStudies />
                <BlogTeaser />
                <FAQ />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default Home;
