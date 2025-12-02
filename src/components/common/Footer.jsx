import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS, NAV_LINKS } from '../../utils/constants';
import Container from './Container';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white">
            <Container>
                <div className="py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">V</span>
                                </div>
                                <span className="text-white font-bold text-xl">
                                    {COMPANY_INFO.name}
                                </span>
                            </div>
                            <p className="text-slate-300 mb-4 max-w-md">
                                {COMPANY_INFO.tagline}. Expert guidance for Atlassian Products, AWS & Oracle Cloud Infrastructure, and enterprise cloud solutions.
                            </p>
                            <div className="flex space-x-4">
                                {SOCIAL_LINKS.linkedin && (
                                    <a
                                        href={SOCIAL_LINKS.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-300 hover:text-accent transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {SOCIAL_LINKS.twitter && (
                                    <a
                                        href={SOCIAL_LINKS.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-300 hover:text-accent transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter size={20} />
                                    </a>
                                )}
                                {SOCIAL_LINKS.github && (
                                    <a
                                        href={SOCIAL_LINKS.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-300 hover:text-accent transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-slate-300 hover:text-accent transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold mb-4">Contact</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-2">
                                    <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                                    <a
                                        href={`mailto:${COMPANY_INFO.email}`}
                                        className="text-slate-300 hover:text-accent transition-colors"
                                    >
                                        {COMPANY_INFO.email}
                                    </a>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <Phone size={18} className="text-accent mt-1 flex-shrink-0" />
                                    <a
                                        href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                                        className="text-slate-300 hover:text-accent transition-colors"
                                    >
                                        {COMPANY_INFO.phone}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-slate-400 text-sm">
                            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
                        </p>
                        <p className="text-slate-400 text-sm">
                            Powered by Cloudflare Pages
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
