import { SERVICES, PLATFORMS } from '../../utils/constants';

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mppqanpv';

export const STEPS = [
    { id: 'needs', label: 'Your needs' },
    { id: 'project', label: 'Project' },
    { id: 'contact', label: 'Contact' },
    { id: 'review', label: 'Review' },
];

export const SERVICE_OPTIONS = [
    ...SERVICES.map((s) => ({ id: s.id, label: s.short, icon: s.icon })),
    { id: 'data-migration', label: 'Data Migration', icon: 'Database' },
    { id: 'managed', label: 'Managed Cloud & Support', icon: 'ShieldCheck' },
];

export const PLATFORM_OPTIONS = [...PLATFORMS.map((p) => ({ id: p.id, label: p.name, color: p.color })), { id: 'unsure', label: 'Not sure yet' }];

export const STAGE_OPTIONS = [
    { id: 'idea', label: 'New idea', hint: 'Exploring what’s possible' },
    { id: 'planning', label: 'Planning & scoping', hint: 'Requirements are taking shape' },
    { id: 'improve', label: 'Improve existing system', hint: 'Modernize, migrate or extend' },
    { id: 'support', label: 'Urgent issue / support', hint: 'Something needs fixing now' },
];

export const TIMELINE_OPTIONS = ['ASAP', 'Within 1 month', '1–3 months', '3–6 months', 'Flexible'];

export const CONTACT_METHODS = [
    { id: 'email', label: 'Email' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'phone', label: 'Phone call' },
];

export const EMPTY_REQUEST = {
    services: [],
    platforms: [],
    stage: '',
    timeline: '',
    message: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    contactMethod: 'email',
    consent: false,
};

export const labelFor = (options, id) => options.find((o) => o.id === id)?.label || id;
