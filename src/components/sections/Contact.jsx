import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { validateEmail, validateRequired } from '../../utils/validation';
import Container from '../common/Container';
import Section from '../common/Section';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!validateRequired(formData.name)) {
            newErrors.name = 'Name is required';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!validateRequired(formData.message)) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setStatus('loading');

        try {
            const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

            const response = await fetch(formEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    service: '',
                    message: '',
                });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <Section id="contact" bgColor="bg-gradient-to-br from-primary-900 to-primary-700">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Ready to Transform Your Cloud Strategy?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-xl text-primary-100"
                        >
                            Get expert guidance tailored to your business needs. We'll contact you within 24 hours.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-2xl p-8 md:p-10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Business Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="you@company.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Your Company"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Service of Interest
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    <option value="">Select an option...</option>
                                    <option value="atlassian">Atlassian Products</option>
                                    <option value="cloud-consulting">Cloud Consulting (AWS/Oracle)</option>
                                    <option value="cloud-reselling">Cloud Reselling</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Project Details / Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                                    placeholder="Tell us about your project, timeline, and specific needs..."
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-accent text-primary-900 font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : 'Request Consultation'}
                            </button>

                            {status === 'success' && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                    ✓ Thank you! Your consultation request has been received. We'll review your details and contact you within 24 hours.
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    ✗ Something went wrong. Please try again or contact us directly at contact@vincloudsolutions.com
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default Contact;
