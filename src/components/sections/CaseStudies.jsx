import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';

const CaseStudyCard = ({ study, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 md:p-10"
        >
            <h3 className="text-2xl font-bold text-primary-900 mb-2">
                {study.company}
            </h3>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Challenge</h4>
                <p className="text-slate-700">{study.challenge}</p>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Solution</h4>
                <p className="text-slate-700">{study.solution}</p>
            </div>

            <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Results</h4>
                <ul className="space-y-2">
                    {study.results.map((result, idx) => (
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
                            <span className="text-slate-800 font-medium">{result}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

const CaseStudies = () => {
    return (
        <Section bgColor="bg-white">
            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                    >
                        Case Studies & Results
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-600 max-w-3xl mx-auto"
                    >
                        Real results from companies we've helped transform their cloud infrastructure
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {CASE_STUDIES.map((study, index) => (
                        <CaseStudyCard key={study.company} study={study} index={index} />
                    ))}
                </div>

                {/* Future expansion note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-slate-500 mb-4">Want to see more success stories?</p>
                    <a
                        href="#contact"
                        className="text-primary-700 hover:text-primary-500 font-semibold underline"
                    >
                        Contact us to learn about similar results for your industry
                    </a>
                </motion.div>
            </Container>
        </Section>
    );
};

export default CaseStudies;
