// src/components/SEOHead.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Head Component
 * Dynamically updates meta tags, title, and structured data for each page
 * Optimized for South African market and letstalkbi.co.za domain
 */
const SEOHead = ({
  title = "Let's Talk - South Africa's Premier Citizen Engagement Platform",
  description = "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform built by Saya-Setona.",
  keywords = "South Africa, municipal services, citizen engagement, government services, community platform, service issues, water services, electricity, local government, Saya-Setona, letstalkbi",
  image = "https://letstalkbi.co.za/og-image.jpg",
  type = "website",
  structuredData = null,
  noIndex = false,
  canonical = null,
}) => {
  const location = useLocation();
  const currentUrl = `https://letstalkbi.co.za${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    // Update document title
    document.title = `${title} | Saya-Setona`;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:site_name', "Let's Talk", true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', title, true);
    updateMetaTag('og:locale', 'en_ZA', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:site', '@SayaSetona');
    updateMetaTag('twitter:creator', '@SayaSetona');

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Add structured data if provided
    if (structuredData) {
      // Remove existing structured data for this page
      const existingScript = document.querySelector('script[data-seo-structured-data]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-structured-data', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Add hreflang for South African English
    let hreflangLink = document.querySelector('link[hreflang="en-za"]');
    if (!hreflangLink) {
      hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', 'en-za');
      document.head.appendChild(hreflangLink);
    }
    hreflangLink.setAttribute('href', currentUrl);

    // Add x-default hreflang
    let defaultHreflangLink = document.querySelector('link[hreflang="x-default"]');
    if (!defaultHreflangLink) {
      defaultHreflangLink = document.createElement('link');
      defaultHreflangLink.setAttribute('rel', 'alternate');
      defaultHreflangLink.setAttribute('hreflang', 'x-default');
      document.head.appendChild(defaultHreflangLink);
    }
    defaultHreflangLink.setAttribute('href', currentUrl);

  }, [title, description, keywords, image, type, currentUrl, canonicalUrl, structuredData, noIndex]);

  return null; // This component doesn't render anything
};

export default SEOHead;

// SEO utility functions
export const generatePageStructuredData = (pageType, pageData) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": `https://letstalkbi.co.za${pageData.path}`,
    "inLanguage": "en-ZA",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Let's Talk",
      "url": "https://letstalkbi.co.za"
    },
    "author": {
      "@type": "Organization",
      "name": "Saya-Setona",
      "url": "https://saya-setona.co.za"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Saya-Setona",
      "url": "https://saya-setona.co.za"
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  switch (pageType) {
    case 'service':
      return {
        ...baseData,
        "@type": "Service",
        "serviceType": pageData.serviceType || "Government Service",
        "provider": {
          "@type": "Organization",
          "name": "Let's Talk Platform"
        },
        "areaServed": {
          "@type": "Country",
          "name": "South Africa"
        }
      };

    case 'faq':
      return {
        ...baseData,
        "@type": "FAQPage",
        "mainEntity": pageData.faqs?.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) || []
      };

    case 'contact':
      return {
        ...baseData,
        "@type": "ContactPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "Saya-Setona",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "areaServed": "ZA",
            "availableLanguage": ["English", "Afrikaans"]
          }
        }
      };

    case 'about':
      return {
        ...baseData,
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Organization",
          "name": "Saya-Setona",
          "description": pageData.description,
          "foundingDate": "2024",
          "areaServed": {
            "@type": "Country",
            "name": "South Africa"
          }
        }
      };

    default:
      return baseData;
  }
};


