import React from 'react';
import { INTEGRATIONS } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Reveal from '../common/Reveal';
import Badge from '../common/Badge';
import Icon from '../common/Icon';

const Integrations = () => (
    <Section id="integrations" labelledBy="integrations-title">
        <Container>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32">
                        <SectionHeading
                            id="integrations-title"
                            align="left"
                            eyebrow="Integrations & development"
                            title="If it has an API,"
                            highlight="we can connect it."
                            description="Any kind of development and integration: identity, business systems, collaboration suites and custom platforms working as one, with secure and observable data flows."
                        />
                        <Reveal delay={0.15}>
                            <pre className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-ink-950/80 p-5 font-mono text-xs leading-relaxed text-slate-400">
{`POST /v1/sync
`}<span className="text-brand-300">{`{
  "source":  "Salesforce",
  "target":  "Oracle Fusion",
  "auth":    "Entra ID SSO",
  "notify":  ["Teams", "Jira"]
}`}</span>{`
`}<span className="text-emerald-400">{`→ 200 OK · synced in 184ms`}</span>
                            </pre>
                        </Reveal>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                    {INTEGRATIONS.map((item, i) => (
                        <Reveal key={item.title} delay={(i % 2) * 0.08}>
                            <SpotlightCard as="article" className="h-full">
                                <div className="flex h-full flex-col p-6 md:p-7">
                                    <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                                        <Icon name={item.icon} size={20} />
                                    </span>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {item.examples.map((e) => <Badge key={e}>{e}</Badge>)}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    </Section>
);

export default Integrations;
