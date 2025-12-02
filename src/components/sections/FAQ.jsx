import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';

const FAQItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="border-b border-slate-200 last:border-b-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left hover:text-primary-700 transition-colors"
            >
                <h3 className="text-lg font-semibold text-slate-900 pr-8">
                    {item.question}
                </h3>
                <ChevronDown
                    className={`w-5 h-5 text-primary-700 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-slate-600 pb-6">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <Section bgColor="bg-slate-50">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-xl text-slate-600"
                        >
                            Get answers to common questions about our services
                        </motion.p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        {FAQ_ITEMS.map((item, index) => (
                            <FAQItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default FAQ;
