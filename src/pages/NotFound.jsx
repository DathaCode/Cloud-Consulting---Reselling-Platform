import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <Section bgColor="bg-gradient-to-br from-primary-900 to-primary-700" className="flex-grow flex items-center">
                <Container>
                    <div className="text-center text-white">
                        <h1 className="text-9xl font-bold mb-4 opacity-50">404</h1>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Oops! Page Not Found</h2>
                        <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
                            The page you're looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => navigate('/')}
                                variant="primary"
                            >
                                Go Back Home
                            </Button>
                            <Button
                                onClick={() => navigate('/blog')}
                                variant="outline"
                                className="bg-white border-white text-primary-900 hover:bg-primary-100"
                            >
                                Browse Blog
                            </Button>
                        </div>

                        <div className="mt-16">
                            <p className="text-primary-100 mb-4">Or try these:</p>
                            <div className="flex flex-wrap justify-center gap-6 text-primary-100">
                                <a href="/#services" className="hover:text-accent transition-colors">Services</a>
                                <span>•</span>
                                <a href="/#contact" className="hover:text-accent transition-colors">Contact Us</a>
                                <span>•</span>
                                <a href="/blog" className="hover:text-accent transition-colors">Blog</a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </div>
    );
};

export default NotFound;
