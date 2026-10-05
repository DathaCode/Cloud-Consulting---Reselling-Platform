import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Pencil, RotateCcw, Send } from 'lucide-react';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { COMPANY_INFO, WHATSAPP_URL } from '../../utils/constants';
import Icon from '../common/Icon';
import BrandIcon from '../common/BrandIcon';
import {
    FORMSPREE_ENDPOINT, STEPS, SERVICE_OPTIONS, PLATFORM_OPTIONS, STAGE_OPTIONS, TIMELINE_OPTIONS,
    CONTACT_METHODS, EMPTY_REQUEST, labelFor,
} from './requestOptions';

const DRAFT_KEY = 'vin-request-draft';
const MESSAGE_MIN = 20;
const MESSAGE_MAX = 2000;

// Drafts are a convenience only; storage can be unavailable (private mode), so never let it throw.
const loadDraft = () => {
    try {
        const raw = localStorage.getItem(DRAFT_KEY);
        return raw ? { ...EMPTY_REQUEST, ...JSON.parse(raw) } : null;
    } catch {
        return null;
    }
};
const saveDraft = (data) => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch { /* ignore */ }
};
const clearDraft = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
};
const isDirty = (data) => JSON.stringify(data) !== JSON.stringify(EMPTY_REQUEST);

const makeReference = () => {
    const d = new Date();
    const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `VIN-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const validateStep = (step, data) => {
    const e = {};
    if (step === 0 && data.services.length === 0) e.services = 'Pick at least one service so we can route your request.';
    if (step === 1) {
        if (!data.stage) e.stage = 'Let us know where you are with this project.';
        if (data.message.trim().length < MESSAGE_MIN) e.message = `A few more details please (at least ${MESSAGE_MIN} characters).`;
    }
    if (step === 2) {
        if (!validateRequired(data.name)) e.name = 'Your name is required.';
        if (!validateEmail(data.email)) e.email = 'Enter a valid email address.';
        if (data.contactMethod !== 'email' && !validatePhone(data.phone)) e.phone = 'Enter a phone / WhatsApp number with country code.';
        else if (data.phone.trim() && !validatePhone(data.phone)) e.phone = 'This number looks incomplete.';
        if (!data.consent) e.consent = 'Please agree so we can contact you.';
    }
    return e;
};

/* ---------- small building blocks ---------- */

const ErrorText = ({ id, children }) =>
    children ? <p id={id} role="alert" className="mt-2 text-sm text-rose-400">{children}</p> : null;

const Chip = ({ selected, onClick, children, multi = true, dot }) => (
    <button
        type="button"
        role={multi ? 'checkbox' : 'radio'}
        aria-checked={selected}
        onClick={onClick}
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all ${
            selected
                ? 'border-brand-300/60 bg-brand-400/15 text-white shadow-glow'
                : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:text-white'
        }`}
    >
        {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
        {children}
        {selected && multi && <Check size={14} className="text-glow" />}
    </button>
);

const Field = ({ id, label, required, optional, error, children, hint }) => (
    <div>
        <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-slate-300">
            <span>{label} {required && <span className="text-glow">*</span>}</span>
            {optional && <span className="text-xs font-normal text-slate-500">Optional</span>}
        </label>
        {children}
        {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
        <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
);

const StepHeading = ({ title, text }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
        {text && <p className="mt-1 text-sm text-slate-400">{text}</p>}
    </div>
);

/* ---------- steps ---------- */

const NeedsStep = ({ data, toggle, errors }) => (
    <>
        <StepHeading title="What can we help you with?" text="Choose everything that applies. You can refine it later." />
        <div role="group" aria-label="Services" aria-describedby="services-error" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {SERVICE_OPTIONS.map((o) => {
                const selected = data.services.includes(o.id);
                return (
                    <button
                        key={o.id}
                        type="button"
                        role="checkbox"
                        aria-checked={selected}
                        onClick={() => toggle('services', o.id)}
                        className={`relative flex flex-col items-start gap-3 rounded-2xl border p-3.5 text-left text-sm font-medium transition-all ${
                            selected
                                ? 'border-brand-300/60 bg-gradient-to-br from-brand-400/20 to-ai/10 text-white shadow-glow'
                                : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                    >
                        <span className={`grid h-9 w-9 place-items-center rounded-lg ${selected ? 'bg-white/15 text-glow' : 'bg-white/5 text-slate-400'}`}>
                            <Icon name={o.icon} size={18} />
                        </span>
                        {o.label}
                        {selected && (
                            <span className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-glow text-ink-950">
                                <Check size={12} strokeWidth={3} />
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
        <ErrorText id="services-error">{errors.services}</ErrorText>

        <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-slate-300">Platforms involved <span className="text-xs font-normal text-slate-500">· optional</span></p>
            <div role="group" aria-label="Platforms" className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((p) => (
                    <Chip key={p.id} dot={p.color} selected={data.platforms.includes(p.id)} onClick={() => toggle('platforms', p.id)}>
                        {p.label}
                    </Chip>
                ))}
            </div>
        </div>
    </>
);

const ProjectStep = ({ data, set, errors }) => {
    const length = data.message.trim().length;
    return (
        <>
            <StepHeading title="Tell us about the project" text="The more context you share, the more useful our first conversation will be." />
            <div role="radiogroup" aria-label="Project stage" aria-describedby="stage-error" className="grid gap-2.5 sm:grid-cols-2">
                {STAGE_OPTIONS.map((o) => {
                    const selected = data.stage === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => set('stage', o.id)}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                                selected ? 'border-brand-300/60 bg-brand-400/15 shadow-glow' : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                            }`}
                        >
                            <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${selected ? 'border-glow' : 'border-slate-500'}`}>
                                {selected && <span className="h-2 w-2 rounded-full bg-glow" />}
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-slate-100">{o.label}</span>
                                <span className="text-xs text-slate-400">{o.hint}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
            <ErrorText id="stage-error">{errors.stage}</ErrorText>

            <div className="mt-7">
                <div>
                    <p className="mb-3 text-sm font-medium text-slate-300">Timeline <span className="text-xs font-normal text-slate-500">· optional</span></p>
                    <div role="radiogroup" aria-label="Timeline" className="flex flex-wrap gap-2">
                        {TIMELINE_OPTIONS.map((t) => (
                            <Chip key={t} multi={false} selected={data.timeline === t} onClick={() => set('timeline', data.timeline === t ? '' : t)}>{t}</Chip>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-7">
                <Field id="message" label="Project details" required error={errors.message}>
                    <textarea
                        id="message"
                        rows={5}
                        maxLength={MESSAGE_MAX}
                        value={data.message}
                        onChange={(e) => set('message', e.target.value)}
                        placeholder="What are you trying to achieve? Which systems or tools are involved? Who will use it?"
                        aria-invalid={!!errors.message}
                        aria-describedby="message-error message-count"
                        className={`input-field resize-y ${errors.message ? 'border-rose-500/60' : ''}`}
                    />
                </Field>
                <p id="message-count" className={`mt-1.5 text-right font-mono text-[11px] ${length < MESSAGE_MIN ? 'text-slate-500' : 'text-emerald-400'}`}>
                    {length < MESSAGE_MIN ? `${MESSAGE_MIN - length} more characters` : '✓ Great'} · {data.message.length}/{MESSAGE_MAX}
                </p>
            </div>
        </>
    );
};

const ContactStep = ({ data, set, errors }) => {
    const phoneRequired = data.contactMethod !== 'email';
    const input = (name, extra = {}) => ({
        id: name,
        value: data[name],
        onChange: (e) => set(name, e.target.value),
        'aria-invalid': !!errors[name],
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
        className: `input-field ${errors[name] ? 'border-rose-500/60' : ''}`,
        ...extra,
    });

    return (
        <>
            <StepHeading title="How can we reach you?" text="A senior consultant will reply within 24 hours." />
            <div className="grid gap-5 md:grid-cols-2">
                <Field id="name" label="Full name" required error={errors.name}>
                    <input type="text" autoComplete="name" placeholder="Your name" {...input('name')} />
                </Field>
                <Field id="email" label="Business email" required error={errors.email}>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" {...input('email')} />
                </Field>
                <Field id="company" label="Company" optional>
                    <input type="text" autoComplete="organization" placeholder="Your company" {...input('company')} />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" required={phoneRequired} optional={!phoneRequired} error={errors.phone} hint="Include the country code, e.g. +94">
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+94 7X XXX XXXX" {...input('phone')} />
                </Field>
            </div>

            <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-300">Preferred way to reach you</p>
                <div role="radiogroup" aria-label="Preferred contact method" className="flex flex-wrap gap-2">
                    {CONTACT_METHODS.map((m) => (
                        <Chip key={m.id} multi={false} selected={data.contactMethod === m.id} onClick={() => set('contactMethod', m.id)}>
                            {m.id === 'whatsapp' && <BrandIcon name="whatsapp" size={14} className="text-emerald-400" />}
                            {m.label}
                        </Chip>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-400">
                    <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => set('consent', e.target.checked)}
                        aria-describedby="consent-error"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-ink-950 accent-cyan-300"
                    />
                    I agree that VIN Cloud Solutions may contact me about this request. We never share your details.
                </label>
                <ErrorText id="consent-error">{errors.consent}</ErrorText>
            </div>
        </>
    );
};

const ReviewRow = ({ label, value, onEdit }) => (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 py-3.5 last:border-0">
        <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">{label}</dt>
        <dd className="flex-1 whitespace-pre-line break-words text-sm text-slate-200">{value || <span className="text-slate-500">Not provided</span>}</dd>
        <button type="button" onClick={onEdit} className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-white/5 hover:text-brand-200" aria-label={`Edit ${label}`}>
            <Pencil size={14} />
        </button>
    </div>
);

const ReviewStep = ({ data, goTo }) => (
    <>
        <StepHeading title="Review your request" text="Check everything looks right, then send it over." />
        <dl className="rounded-2xl border border-white/10 bg-ink-950/40 px-4">
            <ReviewRow label="Services" value={data.services.map((s) => labelFor(SERVICE_OPTIONS, s)).join(', ')} onEdit={() => goTo(0)} />
            <ReviewRow label="Platforms" value={data.platforms.map((p) => labelFor(PLATFORM_OPTIONS, p)).join(', ')} onEdit={() => goTo(0)} />
            <ReviewRow label="Stage" value={labelFor(STAGE_OPTIONS, data.stage)} onEdit={() => goTo(1)} />
            <ReviewRow label="Timeline" value={data.timeline} onEdit={() => goTo(1)} />
            <ReviewRow label="Details" value={data.message} onEdit={() => goTo(1)} />
            <ReviewRow
                label="Contact"
                value={[data.name, data.company, data.email, data.phone].filter(Boolean).join('\n')}
                onEdit={() => goTo(2)}
            />
            <ReviewRow label="Reach via" value={labelFor(CONTACT_METHODS, data.contactMethod)} onEdit={() => goTo(2)} />
        </dl>
    </>
);

const SuccessView = ({ reference, name, onReset }) => (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-4 text-center" role="status">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.35)]">
            <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-6 text-2xl font-semibold">Thank you{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
        <p className="mt-2 text-slate-400">Your request is in. Reference <span className="font-mono text-brand-200">{reference}</span></p>

        <ol className="mx-auto mt-8 max-w-md space-y-4 text-left">
            {[
                ['Within 24 hours', 'A senior consultant reviews your request and contacts you.'],
                ['Discovery call', 'A free 30-minute session to understand goals and constraints.'],
                ['Proposal', 'After the requirement analysis: a clear scope, timeline and quotation, with no obligation.'],
            ].map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand-300/30 bg-brand-500/10 font-mono text-xs text-brand-200">{i + 1}</span>
                    <span><span className="block text-sm font-semibold text-slate-100">{title}</span><span className="text-sm text-slate-400">{text}</span></span>
                </li>
            ))}
        </ol>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi VIN Cloud, I just sent a project request (${reference}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            >
                <BrandIcon name="whatsapp" size={16} /> Follow up on WhatsApp
            </a>
            <button type="button" onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                <RotateCcw size={16} /> Send another request
            </button>
        </div>
    </motion.div>
);

/* ---------- main form ---------- */

const RequestForm = () => {
    const { search } = useLocation();
    const [data, setData] = useState(() => loadDraft() || EMPTY_REQUEST);
    const [restored, setRestored] = useState(() => !!loadDraft() && isDirty(loadDraft()));
    const [step, setStep] = useState(0);
    const [maxStep, setMaxStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [reference, setReference] = useState('');
    const [gotcha, setGotcha] = useState('');
    const cardRef = useRef(null);

    // Prefill from links like /?service=cloud&platform=aws#contact
    useEffect(() => {
        const params = new URLSearchParams(search);
        const service = params.get('service');
        const platform = params.get('platform');
        if (!service && !platform) return;
        setData((d) => ({
            ...d,
            services: service && SERVICE_OPTIONS.some((o) => o.id === service) && !d.services.includes(service) ? [...d.services, service] : d.services,
            platforms: platform && PLATFORM_OPTIONS.some((o) => o.id === platform) && !d.platforms.includes(platform) ? [...d.platforms, platform] : d.platforms,
        }));
        setStatus('idle');
        setStep(0);
    }, [search]);

    useEffect(() => {
        if (status !== 'success') saveDraft(data);
    }, [data, status]);

    const set = (key, value) => {
        setData((d) => ({ ...d, [key]: value }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
    const toggle = (key, id) => {
        setData((d) => ({ ...d, [key]: d[key].includes(id) ? d[key].filter((x) => x !== id) : [...d[key], id] }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };

    const focusCard = () => {
        requestAnimationFrame(() => {
            const firstError = cardRef.current?.querySelector('[aria-invalid="true"], [role="alert"]');
            const top = cardRef.current?.getBoundingClientRect().top ?? 0;
            if (top < 80) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            firstError?.focus?.();
        });
    };

    const goTo = (target) => {
        setErrors({});
        setStep(target);
        focusCard();
    };

    const next = () => {
        const stepErrors = validateStep(step, data);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length) {
            focusCard();
            return;
        }
        const target = step + 1;
        setStep(target);
        setMaxStep((m) => Math.max(m, target));
        focusCard();
    };

    const submit = async () => {
        if (gotcha) return; // bot
        setStatus('sending');
        const ref = makeReference();
        const services = data.services.map((s) => labelFor(SERVICE_OPTIONS, s)).join(', ');
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    _subject: `New project request ${ref}: ${services} (${data.name})`,
                    reference: ref,
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    phone: data.phone,
                    preferred_contact: labelFor(CONTACT_METHODS, data.contactMethod),
                    services,
                    platforms: data.platforms.map((p) => labelFor(PLATFORM_OPTIONS, p)).join(', '),
                    stage: labelFor(STAGE_OPTIONS, data.stage),
                    timeline: data.timeline,
                    message: data.message,
                    page: window.location.href,
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setReference(ref);
            setStatus('success');
            clearDraft();
        } catch {
            setStatus('error');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (step < STEPS.length - 1) next();
        else submit();
    };

    const reset = () => {
        clearDraft();
        setData(EMPTY_REQUEST);
        setStep(0);
        setMaxStep(0);
        setErrors({});
        setRestored(false);
        setStatus('idle');
    };

    const progress = ((step + 1) / STEPS.length) * 100;

    return (
        <div ref={cardRef} className="scroll-mt-28 rounded-3xl border border-white/10 bg-ink-850/80 shadow-glow backdrop-blur-xl">
            {status === 'success' ? (
                <div className="p-6 md:p-9">
                    <SuccessView reference={reference} name={data.name} onReset={reset} />
                </div>
            ) : (
                <form onSubmit={onSubmit} noValidate aria-label="Project request">
                    {/* Progress */}
                    <div className="border-b border-white/10 px-6 pt-6 md:px-9">
                        <ol className="flex items-center justify-between gap-2">
                            {STEPS.map((s, i) => {
                                const done = i < step;
                                const current = i === step;
                                const reachable = i <= maxStep;
                                return (
                                    <li key={s.id} className="flex-1">
                                        <button
                                            type="button"
                                            disabled={!reachable || current}
                                            onClick={() => goTo(i)}
                                            aria-current={current ? 'step' : undefined}
                                            className="flex w-full items-center gap-2 text-left disabled:cursor-default"
                                        >
                                            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-xs transition-colors ${
                                                current ? 'border-glow bg-glow/15 text-glow' : done ? 'border-brand-300/50 bg-brand-400/20 text-brand-100' : 'border-white/15 text-slate-500'
                                            }`}>
                                                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
                                            </span>
                                            <span className={`hidden text-xs font-medium sm:block ${current ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className="mt-5 h-px w-full bg-white/10">
                            <motion.div className="h-px bg-gradient-to-r from-brand-300 to-glow" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                        </div>
                    </div>

                    <div className="p-6 md:p-9">
                        {restored && step === 0 && (
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand-300/20 bg-brand-500/10 px-4 py-2.5 text-sm text-brand-100">
                                We restored your unfinished request.
                                <button type="button" onClick={reset} className="font-semibold text-brand-200 underline-offset-4 hover:underline">Start over</button>
                            </div>
                        )}

                        {/* Honeypot: hidden from people, tempting for bots */}
                        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                            <label>Leave this empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={gotcha} onChange={(e) => setGotcha(e.target.value)} /></label>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.22 }}
                            >
                                {step === 0 && <NeedsStep data={data} toggle={toggle} errors={errors} />}
                                {step === 1 && <ProjectStep data={data} set={set} errors={errors} />}
                                {step === 2 && <ContactStep data={data} set={set} errors={errors} />}
                                {step === 3 && <ReviewStep data={data} goTo={goTo} />}
                            </motion.div>
                        </AnimatePresence>

                        {status === 'error' && (
                            <div role="alert" className="mt-6 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                                We couldn’t send your request, but your answers are saved. Please try again, or reach us on{' '}
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline">WhatsApp</a> or at{' '}
                                <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold underline">{COMPANY_INFO.email}</a>.
                            </div>
                        )}

                        <div className="mt-8 flex items-center justify-between gap-3">
                            {step > 0 ? (
                                <button type="button" onClick={() => goTo(step - 1)} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
                                    <ArrowLeft size={16} /> Back
                                </button>
                            ) : (
                                <span className="font-mono text-[11px] text-slate-500">Takes about 2 minutes</span>
                            )}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-300 via-glow to-brand-300 bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition-all hover:bg-right disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {status === 'sending' ? (
                                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                                ) : step === STEPS.length - 1 ? (
                                    <>Send request <Send size={16} /></>
                                ) : (
                                    <>Continue <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default RequestForm;
