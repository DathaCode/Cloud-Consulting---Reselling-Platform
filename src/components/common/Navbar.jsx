import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { COMPANY_INFO, NAV_LINKS } from '../../utils/constants';
import Button from './Button';
import Container from './Container';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollPosition = useScrollPosition();
    const isScrolled = scrollPosition > 50;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white bg-opacity-95'
                }`}
        >
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">V</span>
                        </div>
                        <span className="text-primary-900 font-bold text-lg md:text-xl hidden sm:inline">
                            {COMPANY_INFO.name}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-800 hover:text-primary-700 font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button href="#contact" variant="primary">
                            Request Consultation
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200">
                        <div className="flex flex-col space-y-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-slate-800 hover:text-primary-700 font-medium transition-colors py-2"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button href="#contact" variant="primary" className="w-full">
                                Request Consultation
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </nav>
    );
};

export default Navbar;
