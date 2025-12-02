import React from 'react';
import { Shield, TrendingDown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';

const iconComponents = {
    Shield,
    TrendingDown,
    CheckCircle,
};

const ValueProp = ({ item, index }) => {
    const IconComponent = iconComponents[item.icon];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
        >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent bg-opacity-10 rounded-full mb-6">
                <IconComponent size={40} className="text-accent" />
            </div>

            <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {item.title}
            </h3>

            <p className="text-slate-600 max-w-sm mx-auto">
                {item.description}
            </p>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    return (
        <Section id="why-choose-us" bgColor="bg-white">
            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-primary-900 mb-4"
                    >
                        Why Choose Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-600"
                    >
                        Three key reasons enterprises trust our cloud solutions
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {WHY_CHOOSE_US.map((item, index) => (
                        <ValueProp key={item.title} item={item} index={index} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default WhyChooseUs;
