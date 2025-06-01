// src/utils/seoUtils.js

/**
 * SEO Utilities for Let's Talk Platform
 * Comprehensive SEO tools for South African market optimization
 */

// Site configuration
export const SITE_CONFIG = {
  domain: 'https://letstalkbi.co.za',
  siteName: "Let's Talk",
  company: 'Saya-Setona',
  companyUrl: 'https://saya-setona.co.za',
  defaultImage: 'https://letstalkbi.co.za/og-image.jpg',
  twitterHandle: '@SayaSetona',
  language: 'en-ZA',
  country: 'ZA',
  region: 'South Africa',
};

// Page definitions for sitemap and SEO
export const SITE_PAGES = [
  {
    path: '/',
    title: "Let's Talk - South Africa's Premier Citizen Engagement Platform",
    description:
      "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform.",
    keywords:
      'citizen engagement, municipal services, South Africa, government services, community platform',
    priority: 1.0,
    changefreq: 'daily',
    type: 'home',
  },
  {
    path: '/about-us',
    title: "About Us - Let's Talk Platform",
    description:
      "Learn about Let's Talk, South Africa's leading citizen engagement platform built by Saya-Setona to connect communities with government services.",
    keywords:
      'about us, Saya-Setona, citizen engagement platform, South Africa, company information',
    priority: 0.8,
    changefreq: 'monthly',
    type: 'about',
  },
  {
    path: '/our-services',
    title: 'Our Services - Municipal & Government Services',
    description:
      'Discover our comprehensive range of municipal and government services including water services, electricity, community engagement, and more.',
    keywords:
      'municipal services, government services, water services, electricity, community engagement, service delivery',
    priority: 0.9,
    changefreq: 'weekly',
    type: 'service',
  },
  {
    path: '/faq',
    title: "Frequently Asked Questions - Let's Talk Help Center",
    description:
      "Find answers to common questions about using Let's Talk platform, municipal services, account management, and technical support.",
    keywords:
      'FAQ, help, support, questions, answers, user guide, platform help',
    priority: 0.7,
    changefreq: 'monthly',
    type: 'faq',
  },
  {
    path: '/press-releases',
    title: "Press Releases & News - Let's Talk Platform Updates",
    description:
      "Stay updated with the latest news, announcements, and press releases from Let's Talk and Saya-Setona.",
    keywords:
      'press releases, news, announcements, updates, media, Saya-Setona news',
    priority: 0.6,
    changefreq: 'weekly',
    type: 'news',
  },
  {
    path: '/login',
    title: "Sign In - Let's Talk Platform",
    description:
      "Sign in to your Let's Talk account to access municipal services, report issues, and engage with your community.",
    keywords: 'login, sign in, user account, authentication, access platform',
    priority: 0.5,
    changefreq: 'yearly',
    type: 'login',
    noIndex: true,
  },
  {
    path: '/register',
    title: "Create Account - Join Let's Talk Platform",
    description:
      "Create your free Let's Talk account to start accessing municipal services, reporting issues, and engaging with your community.",
    keywords: 'register, sign up, create account, join platform, new user',
    priority: 0.6,
    changefreq: 'yearly',
    type: 'register',
  },
  {
    path: '/privacy-policy',
    title: "Privacy Policy - Let's Talk Platform",
    description:
      "Read our comprehensive privacy policy to understand how we protect and handle your personal information on the Let's Talk platform.",
    keywords:
      'privacy policy, data protection, personal information, GDPR, privacy rights',
    priority: 0.4,
    changefreq: 'quarterly',
    type: 'legal',
  },
  {
    path: '/terms-of-service',
    title: "Terms of Service - Let's Talk Platform",
    description:
      "Review the terms and conditions for using the Let's Talk citizen engagement platform and our services.",
    keywords:
      'terms of service, terms and conditions, user agreement, platform rules',
    priority: 0.4,
    changefreq: 'quarterly',
    type: 'legal',
  },
  {
    path: '/cookie-policy',
    title: "Cookie Policy - Let's Talk Platform",
    description:
      "Learn about how we use cookies and similar technologies to improve your experience on the Let's Talk platform.",
    keywords:
      'cookie policy, cookies, tracking, website analytics, user experience',
    priority: 0.3,
    changefreq: 'quarterly',
    type: 'legal',
  },
];

// Generate XML sitemap
export const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const urlEntries = SITE_PAGES.map(
    page => `
  <url>
    <loc>${SITE_CONFIG.domain}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
};

// Generate robots.txt
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /dashboard
Disallow: /profile
Disallow: /service-issues
Disallow: /report-issue
Disallow: /services
Disallow: /CommunityHub

# Disallow authentication pages from indexing
Disallow: /login
Disallow: /register
Disallow: /forgot-password

# Allow important pages
Allow: /
Allow: /about-us
Allow: /our-services
Allow: /faq
Allow: /press-releases
Allow: /privacy-policy
Allow: /terms-of-service
Allow: /cookie-policy

# Sitemap location
Sitemap: ${SITE_CONFIG.domain}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Block common bot patterns that might cause issues
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 10

User-agent: DotBot
Disallow: /`;
};

// Generate structured data for breadcrumbs
export const generateBreadcrumbStructuredData = breadcrumbs => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.domain}${crumb.path}`,
    })),
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = faqs => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Generate service structured data
export const generateServiceStructuredData = service => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.domain,
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    serviceType: service.type || 'Government Service',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ZAR',
    },
  };
};

// SEO performance tracking
export const trackSEOEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'SEO',
      event_label: eventData.label || '',
      value: eventData.value || 0,
      custom_parameters: eventData,
    });
  }
};

// Meta tag helpers
export const getPageSEOData = pathname => {
  const page = SITE_PAGES.find(p => p.path === pathname) || SITE_PAGES[0];
  return {
    ...page,
    canonical: `${SITE_CONFIG.domain}${page.path}`,
    image: page.image || SITE_CONFIG.defaultImage,
  };
};

// SEO keywords generator for South African context
export const generateSEOKeywords = (baseKeywords = [], pageType = '') => {
  const saKeywords = [
    'South Africa',
    'SA',
    'municipal services',
    'local government',
    'citizen engagement',
    'government services',
    'community platform',
    'Saya-Setona',
    'letstalkbi',
    'service delivery',
  ];

  const pageSpecificKeywords = {
    home: ['citizen platform', 'municipal reporting', 'community engagement'],
    services: [
      'government services',
      'municipal services',
      'service delivery',
      'public services',
    ],
    community: [
      'community hub',
      'citizen engagement',
      'local community',
      'neighborhood',
    ],
    issues: [
      'service issues',
      'municipal problems',
      'infrastructure',
      'utilities',
    ],
    about: ['about us', 'company information', 'Saya-Setona', 'platform'],
    contact: ['contact us', 'support', 'help', 'customer service'],
    faq: ['frequently asked questions', 'help', 'support', 'answers'],
    login: ['sign in', 'login', 'user account', 'authentication'],
    register: ['sign up', 'create account', 'registration', 'join'],
  };

  return [
    ...baseKeywords,
    ...saKeywords,
    ...(pageSpecificKeywords[pageType] || []),
  ].join(', ');
};

// Social media sharing URLs
export const generateSocialShareUrls = (url, title, description) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=SayaSetona`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
};
