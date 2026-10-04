import React from 'react';
import { PROCESS_STEPS } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Icon from '../common/Icon';

const Process = () => (
    <Section id="process" labelledBy="process-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="process-title"
                eyebrow="How we deliver"
                title="A proven path from"
                highlight="idea to impact."
                description="Transparent, iterative and outcome-driven — so you see progress every sprint."
            />

            <div className="relative mt-16">
            <div aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent md:block" />
            <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
                {PROCESS_STEPS.map((step, i) => (
                    <Reveal as="li" key={step.step} delay={i * 0.08} className="relative">
                        <div className="relative z-10 mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-brand-300/30 bg-ink-850 text-brand-200 shadow-glow md:mx-0">
                            <Icon name={step.icon} size={22} />
                        </div>
                        <div className="text-center md:text-left">
                            <span className="font-mono text-xs text-brand-300">{step.step}</span>
                            <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                        </div>
                    </Reveal>
                ))}
            </ol>
            </div>
        </Container>
    </Section>
);

export default Process;
