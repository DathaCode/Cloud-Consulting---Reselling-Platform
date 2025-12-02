import React from 'react';
import { Layers, Cloud, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';

const iconComponents = {
    Layers,
    Cloud,
    Package,
};

const ServiceCard = ({ service, index }) => {
    const IconComponent = iconComponents[service.icon];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
            <div className="w-14 h-14 bg-gradient-to-br from-primary-700 to-primary-500 rounded-lg flex items-center justify-center mb-6">
                <IconComponent size={28} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {service.title}
            </h3>

            <p className="text-slate-600 mb-6">
                {service.description}
            </p>

            <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                        <svg
                            className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-slate-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const Services = () => {
    return (
        <Section id="services" bgColor="bg-slate-50">
            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-600 max-w-3xl mx-auto"
                    >
                        Transform your cloud infrastructure with expert guidance
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default Services;
