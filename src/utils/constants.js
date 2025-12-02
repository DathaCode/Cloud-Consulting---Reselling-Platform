export const COMPANY_INFO = {
    name: 'Vin Cloud Solutions',
    tagline: 'Cloud Solutions & Consulting Experts',
    email: 'contact@vincloudsolutions.com',
    phone: '+1 (555) 000-0000',
    website: 'www.vincloudsolutions.com',
};

export const SOCIAL_LINKS = {
    linkedin: 'https://linkedin.com/company/vin-cloud-solutions',
    twitter: 'https://twitter.com/vincloudsol',
    github: 'https://github.com/vin-cloud-solutions',
};

export const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
];

export const SERVICES = [
    {
        id: 'atlassian',
        icon: 'Layers',
        title: 'Atlassian Cloud Solutions',
        description: 'Expert configuration, migration, and optimization of Jira, Confluence, and Bitbucket Cloud. We help teams collaborate more effectively with streamlined workflows.',
        features: [
            'Jira Cloud setup & configuration',
            'Confluence knowledge base optimization',
            'Bitbucket CI/CD pipeline setup',
            'Custom workflow design',
            'Team training & support',
            'Migration from Server to Cloud (zero downtime)',
        ],
    },
    {
        id: 'cloud-consulting',
        icon: 'Cloud',
        title: 'AWS & Oracle Cloud Infrastructure',
        description: 'Design, optimize, and migrate your infrastructure to the cloud. Our consultants reduce costs while improving performance and security across your entire cloud ecosystem.',
        features: [
            'Cloud architecture design',
            'Cost optimization (save 20-40%)',
            'AWS & Oracle Cloud expertise',
            'Security & compliance consulting',
            'Infrastructure-as-Code (IaC) setup',
            '24/7 technical support',
        ],
    },
    {
        id: 'cloud-reselling',
        icon: 'Package',
        title: 'Cloud Products & Enterprise Licensing',
        description: 'Access competitive pricing on cloud products, software licenses, and enterprise solutions. We negotiate volume discounts and simplify your procurement process.',
        features: [
            'Competitive cloud product pricing',
            'Enterprise licensing solutions',
            'Volume discount negotiations',
            'License optimization',
            'Multi-vendor support',
            'Dedicated account management',
        ],
    },
];

export const WHY_CHOOSE_US = [
    {
        icon: 'Shield',
        title: 'Security First',
        description: 'Enterprise-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance. Your data is protected with industry-leading standards.',
    },
    {
        icon: 'TrendingDown',
        title: 'Cost Optimization',
        description: 'Save 20-40% on cloud infrastructure with our expert guidance. We identify inefficiencies and implement sustainable cost-saving strategies.',
    },
    {
        icon: 'CheckCircle',
        title: 'Expert Migration',
        description: 'Zero downtime, zero data loss. Our proven migration methodology ensures your teams stay productive during the transition to the cloud.',
    },
];

export const CASE_STUDIES = [
    {
        company: 'Global Tech Startup',
        challenge: 'High cloud infrastructure costs and fragmented tools preventing collaboration',
        solution: 'Migrated to Atlassian Cloud + AWS optimized infrastructure with cost analysis',
        results: [
            '32% reduction in cloud costs',
            '60% faster deployment cycles',
            '100+ team members now seamlessly collaborating',
        ],
    },
    {
        company: 'Enterprise Financial Services',
        challenge: 'Legacy infrastructure preventing scalability and causing compliance concerns',
        solution: 'Complete migration to Oracle Cloud Infrastructure with security hardening',
        results: [
            '99.99% uptime SLA achieved',
            'HIPAA & PCI DSS compliance maintained',
            'Scalability for 10x growth',
        ],
    },
];

export const FAQ_ITEMS = [
    {
        question: 'How long does a cloud migration typically take?',
        answer: 'Timeline varies based on complexity. Simple migrations take 2-4 weeks, while enterprise migrations take 2-3 months. We\'ll provide a detailed timeline during your consultation.',
    },
    {
        question: 'What\'s your pricing model?',
        answer: 'We offer flexible consulting packages and reselling pricing based on volume. Contact us for a custom quote tailored to your needs.',
    },
    {
        question: 'Do you provide post-migration support?',
        answer: 'Yes! We offer 24/7 technical support as part of our service packages. We\'ll ensure your teams are trained and supported.',
    },
    {
        question: 'Are you certified for Atlassian products?',
        answer: 'Yes, our team holds current Atlassian certifications and has 10+ years of combined experience.',
    },
    {
        question: 'What\'s your experience with GDPR/compliance?',
        answer: 'We specialize in compliance-aware cloud architecture. All our solutions follow SOC 2, ISO 27001, and GDPR standards.',
    },
];

export const PARTNERS = [
    { name: 'Atlassian', description: 'Jira, Confluence, Bitbucket' },
    { name: 'AWS', description: 'Amazon Web Services' },
    { name: 'Oracle', description: 'Oracle Cloud Infrastructure' },
];
