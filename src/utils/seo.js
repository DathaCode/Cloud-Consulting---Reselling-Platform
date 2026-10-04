import { useEffect } from 'react';
import { SITE_URL } from './constants';

const BASE_TITLE = 'VIN Cloud Solutions';
const DEFAULT_DESCRIPTION =
    'VIN Cloud Solutions (Ragama, Sri Lanka) helps organizations across South Asia modernize and scale with AI-powered implementations, web & mobile software development, and cloud consulting for AWS, Azure, Google Cloud, Microsoft 365, Oracle and Atlassian.';
const DEFAULT_IMAGE = `${SITE_URL}/brand/og-image.png`;

const upsertMeta = (attr, key, content) => {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

/**
 * Updates the document head for the current route. The static tags in index.html
 * are the defaults; this keeps a single copy of each tag up to date as users navigate.
 */
export const useSeo = ({ title, description, keywords, image, path = '/', type = 'website', jsonLd } = {}) => {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | AI, Software Development & Cloud Consulting in Sri Lanka`;
        const desc = description || DEFAULT_DESCRIPTION;
        const url = `${SITE_URL}${path}`;
        const img = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;

        document.title = fullTitle;
        upsertMeta('name', 'description', desc);
        if (keywords) upsertMeta('name', 'keywords', keywords);
        upsertCanonical(url);

        upsertMeta('property', 'og:title', fullTitle);
        upsertMeta('property', 'og:description', desc);
        upsertMeta('property', 'og:url', url);
        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:image', img);
        upsertMeta('name', 'twitter:title', fullTitle);
        upsertMeta('name', 'twitter:description', desc);
        upsertMeta('name', 'twitter:image', img);

        let script;
        if (jsonLd) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.route = 'true';
            script.textContent = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }
        return () => script?.remove();
    }, [title, description, keywords, image, path, type, jsonLd]);
};
