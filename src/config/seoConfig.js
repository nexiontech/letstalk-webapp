// src/config/seoConfig.js

/**
 * Comprehensive SEO Configuration for Let's Talk Platform
 * Centralized SEO settings for letstalkbi.co.za
 * Built by Saya-Setona (saya-setona.co.za)
 */

export const SEO_CONFIG = {
  // Site Information
  site: {
    name: "Let's Talk",
    fullName: "Let's Talk - South Africa's Premier Citizen Engagement Platform",
    domain: 'https://letstalkbi.co.za',
    description:
      "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform built by Saya-Setona.",
    keywords: [
      'South Africa',
      'citizen engagement',
      'municipal services',
      'government services',
      'community platform',
      'service delivery',
      'local government',
      'public services',
      'Saya-Setona',
      'letstalkbi',
    ],
    language: 'en-ZA',
    country: 'ZA',
    region: 'South Africa',
  },

  // Company Information
  company: {
    name: 'Saya-Setona',
    url: 'https://saya-setona.co.za',
    logo: 'https://letstalkbi.co.za/logo.png',
    foundingDate: '2024',
    description:
      'South African technology company specializing in citizen engagement platforms and government service digitization.',
  },

  // Social Media
  social: {
    twitter: '@SayaSetona',
    facebook: 'SayaSetona',
    linkedin: 'company/saya-setona',
    youtube: 'SayaSetona',
  },

  // Default Meta Tags
  defaultMeta: {
    title:
      "Let's Talk - South Africa's Premier Citizen Engagement Platform | Saya-Setona",
    description:
      "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform built by Saya-Setona for seamless citizen-government interaction.",
    keywords:
      'South Africa, citizen engagement, municipal services, government services, community platform, service delivery, local government, public services, Saya-Setona, letstalkbi',
    image: 'https://letstalkbi.co.za/og-image.jpg',
    appScreenshot: 'https://letstalkbi.co.za/app-screenshot.jpg',
    twitterCard: 'https://letstalkbi.co.za/twitter-card.jpg',
    type: 'website',
  },

  // Page-specific SEO configurations
  pages: {
    home: {
      title: "Let's Talk - South Africa's Premier Citizen Engagement Platform",
      description:
        "Connect with municipal services, report issues, access government services, and engage with your community. South Africa's premier citizen engagement platform.",
      keywords:
        'citizen engagement platform, municipal services South Africa, government services online, community platform, service reporting, local government, public services, civic engagement, digital government, smart city solutions',
      priority: 1.0,
      changefreq: 'daily',
    },
    about: {
      title: "About Us - Let's Talk Platform | Saya-Setona",
      description:
        "Learn about Let's Talk, South Africa's leading citizen engagement platform built by Saya-Setona. Discover our mission to connect communities with government services.",
      keywords:
        'about Saya-Setona, citizen engagement platform, company information, mission vision values, South African technology company, government services platform, digital transformation, civic technology',
      priority: 0.8,
      changefreq: 'monthly',
    },
    services: {
      title:
        "Our Services - Municipal & Government Services | Let's Talk Platform",
      description:
        'Discover our comprehensive range of municipal and government services including water services, electricity, community engagement, document services, payments, and more.',
      keywords:
        'municipal services, government services, water services, electricity services, community engagement, service delivery, public services, document services, payment services, emergency alerts, service tracking',
      priority: 0.9,
      changefreq: 'weekly',
    },
    faq: {
      title:
        "Frequently Asked Questions - Let's Talk Help Center | Saya-Setona",
      description:
        "Find answers to common questions about using Let's Talk platform, municipal services, account management, payments, security, and technical support.",
      keywords:
        'FAQ, help center, support, questions and answers, user guide, platform help, municipal services help, account support, payment help, security questions, troubleshooting',
      priority: 0.7,
      changefreq: 'monthly',
    },
    login: {
      title: "Sign In - Let's Talk Platform",
      description:
        "Sign in to your Let's Talk account to access municipal services, report issues, and engage with your community.",
      keywords: 'login, sign in, user account, authentication, access platform',
      priority: 0.5,
      changefreq: 'yearly',
      noIndex: true,
    },
    register: {
      title: "Create Account - Join Let's Talk Platform",
      description:
        "Create your free Let's Talk account to start accessing municipal services, reporting issues, and engaging with your community.",
      keywords: 'register, sign up, create account, join platform, new user',
      priority: 0.6,
      changefreq: 'yearly',
    },
  },

  // Structured Data Templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Saya-Setona',
      alternateName: 'Saya Setona Innovations',
      url: 'https://saya-setona.co.za',
      logo: 'https://letstalkbi.co.za/logo.png',
      sameAs: ['https://letstalkbi.co.za'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        areaServed: 'ZA',
        availableLanguage: ['English', 'Afrikaans'],
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'ZA',
        addressRegion: 'South Africa',
      },
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: "Let's Talk",
      alternateName: "Let's Talk Citizen Engagement Platform",
      url: 'https://letstalkbi.co.za',
      description:
        "South Africa's premier citizen engagement platform for municipal services, government services, and community interaction.",
      publisher: {
        '@type': 'Organization',
        name: 'Saya-Setona',
        url: 'https://saya-setona.co.za',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://letstalkbi.co.za/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-ZA',
      copyrightYear: '2025',
      copyrightHolder: {
        '@type': 'Organization',
        name: 'Saya-Setona',
      },
    },
  },

  // SEO Performance Tracking
  tracking: {
    googleAnalytics: 'G-76N7K7JX41',
    googleAdsense: 'ca-pub-4572960626705389',
    googleSearchConsole: true,
    bingWebmaster: true,
    yandexWebmaster: false,
  },

  // Technical SEO Settings
  technical: {
    enableSitemap: true,
    enableRobotsTxt: true,
    enableStructuredData: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableCanonicalUrls: true,
    enableHreflang: true,
    enablePreconnect: true,
    enableDnsPrefetch: true,
    enableCriticalCSS: false,
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableGzip: true,
    enableBrotli: true,
    enableCaching: true,
    enableCDN: false,
  },

  // Local SEO (South African focus)
  local: {
    country: 'South Africa',
    language: 'en-ZA',
    currency: 'ZAR',
    timezone: 'Africa/Johannesburg',
    majorCities: [
      'Johannesburg',
      'Cape Town',
      'Durban',
      'Pretoria',
      'Port Elizabeth',
      'Bloemfontein',
      'East London',
      'Pietermaritzburg',
      'Kimberley',
      'Polokwane',
    ],
    provinces: [
      'Gauteng',
      'Western Cape',
      'KwaZulu-Natal',
      'Eastern Cape',
      'Limpopo',
      'Mpumalanga',
      'North West',
      'Free State',
      'Northern Cape',
    ],
  },

  // Content Guidelines
  content: {
    minTitleLength: 30,
    maxTitleLength: 60,
    minDescriptionLength: 120,
    maxDescriptionLength: 160,
    minKeywords: 5,
    maxKeywords: 15,
    minWordCount: 300,
    optimalWordCount: 1000,
    maxWordCount: 3000,
    headingStructure: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    imageAltRequired: true,
    internalLinksMin: 3,
    externalLinksMax: 5,
  },

  // Performance Targets
  performance: {
    coreWebVitals: {
      LCP: 2.5, // Largest Contentful Paint (seconds)
      FID: 100, // First Input Delay (milliseconds)
      CLS: 0.1, // Cumulative Layout Shift
    },
    pagespeed: {
      mobile: 90,
      desktop: 95,
    },
    accessibility: {
      score: 95,
      wcagLevel: 'AA',
    },
  },
};

// SEO utility functions
export const getSEOConfig = pageName => {
  return {
    ...SEO_CONFIG.defaultMeta,
    ...SEO_CONFIG.pages[pageName],
  };
};

export const generateMetaTags = config => {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    canonical: `${SEO_CONFIG.site.domain}${config.path || ''}`,
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${SEO_CONFIG.site.domain}${config.path || ''}`,
      siteName: SEO_CONFIG.site.name,
      images: [
        {
          url: config.image || SEO_CONFIG.defaultMeta.image,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: SEO_CONFIG.site.language,
      type: config.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [config.image || SEO_CONFIG.defaultMeta.image],
      creator: SEO_CONFIG.social.twitter,
    },
  };
};

export default SEO_CONFIG;
