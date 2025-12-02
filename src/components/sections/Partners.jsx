import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';

const Partners = () => {
    return (
        <Section bgColor="bg-slate-50">
            <Container>
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                    >
                        Our Partners & Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-600"
                    >
                        Certified expertise across leading cloud platforms and enterprise tools
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PARTNERS.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-2xl font-bold text-primary-900 mb-3">
                                {partner.name}
                            </h3>
                            <p className="text-slate-600">
                                {partner.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center text-slate-500 mt-12 italic"
                >
                    More partners coming soon. Check back for updates.
                </motion.p>
            </Container>
        </Section>
    );
};

export default Partners;
