import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../../utils/constants';
import Button from '../common/Button';
import Container from '../common/Container';
import Section from '../common/Section';

const Hero = () => {
    return (
        <Section
            id="home"
            className="relative overflow-hidden min-h-screen flex items-center"
            bgColor="bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500"
            padding="pt-32 pb-20 md:pt-40 md:pb-32"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        {COMPANY_INFO.tagline}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-primary-100 mb-8"
                    >
                        Expert guidance for Atlassian Products, AWS & Oracle Cloud Infrastructure, and enterprise cloud reselling solutions
                    </motion.p>

                    {/* Supporting Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg text-primary-100 mb-12 max-w-2xl mx-auto"
                    >
                        Streamline your cloud strategy with certified experts. Cost optimization, secure migrations, and expert consulting all in one place.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                    >
                        <Button href="#contact" variant="primary" className="text-lg">
                            Start Your Consultation
                        </Button>
                        <Button href="#services" variant="outline" className="text-lg bg-white border-white text-primary-900 hover:bg-primary-100">
                            Explore Our Services
                        </Button>
                    </motion.div>

                    {/* Partner Logos */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12"
                    >
                        <p className="text-primary-100 text-sm mb-6">Trusted by enterprises using:</p>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            <div className="text-white font-bold text-xl opacity-80 hover:opacity-100 transition-opacity">
                                Atlassian
                            </div>
                            <div className="text-white font-bold text-xl opacity-80 hover:opacity-100 transition-opacity">
                                AWS
                            </div>
                            <div className="text-white font-bold text-xl opacity-80 hover:opacity-100 transition-opacity">
                                Oracle
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <a href="#services">
                        <ChevronDown
                            size={32}
                            className="text-white animate-bounce cursor-pointer"
                        />
                    </a>
                </motion.div>
            </Container>
        </Section>
    );
};

export default Hero;
