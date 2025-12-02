export const getMetaTags = ({ title, description, keywords, ogImage, url }) => {
    const baseTitle = 'Vin Cloud Solutions';
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const defaultDescription = 'Expert cloud consulting for Atlassian Cloud, AWS, and Oracle infrastructure. Secure migrations, cost optimization, and enterprise licensing.';

    return {
        title: fullTitle,
        meta: [
            { name: 'description', content: description || defaultDescription },
            { name: 'keywords', content: keywords || 'cloud consulting, Atlassian, AWS, Oracle, cloud migration' },

            // Open Graph
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: description || defaultDescription },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: url || 'https://vincloudsolutions.com' },
            { property: 'og:image', content: ogImage || '/images/og-default.jpg' },

            // Twitter Card
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: description || defaultDescription },
            { name: 'twitter:image', content: ogImage || '/images/og-default.jpg' },
        ],
    };
};
