import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { useSeo } from '../utils/seo';

const NotFound = () => {
    useSeo({ title: 'Page not found', path: '/404' });

    return (
        <PageLayout>
            <Section padding="pt-40 pb-28" className="overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
                <Container>
                    <div className="mx-auto flex max-w-xl flex-col items-center text-center">
                        <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-white to-brand-50 shadow-glow-lg">
                            <img src="/brand/vin-logo.png" alt="VIN Cloud Solutions logo" className="h-16 w-auto" width="575" height="627" />
                        </div>
                        <p className="mt-8 font-mono text-sm text-brand-300">Error 404</p>
                        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">This page drifted off the cloud.</h1>
                        <p className="mt-4 text-slate-400">The page you’re looking for doesn’t exist or has been moved.</p>
                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <Button href="/"><ArrowLeft size={16} /> Back to home</Button>
                            <Button href="/blog" variant="secondary">Browse insights</Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </PageLayout>
    );
};

export default NotFound;
