// src/utils/adSenseUtils.js

/**
 * AdSense Content Quality Utilities
 * Ensures pages meet Google AdSense content policies before showing ads
 */

/**
 * Check if a page has sufficient content quality for AdSense
 * @param {Object} options - Configuration options
 * @returns {Object} Content quality assessment
 */
export const assessContentQuality = (options = {}) => {
  const {
    minWordCount = 300,
    minParagraphs = 3,
    minHeadings = 2,
    requireImages = false,
    requireLinks = false,
  } = options;

  const assessment = {
    isQualified: false,
    wordCount: 0,
    paragraphCount: 0,
    headingCount: 0,
    imageCount: 0,
    linkCount: 0,
    issues: [],
    recommendations: [],
  };

  try {
    // Get page content
    const textContent =
      document.body.innerText || document.body.textContent || '';
    const words = textContent
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);
    assessment.wordCount = words.length;

    // Count content elements
    assessment.paragraphCount = document.querySelectorAll('p').length;
    assessment.headingCount = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    ).length;
    assessment.imageCount = document.querySelectorAll('img').length;
    assessment.linkCount = document.querySelectorAll('a[href]').length;

    // Check minimum requirements
    const checks = [
      {
        condition: assessment.wordCount >= minWordCount,
        issue: `Content too short (${assessment.wordCount} words, minimum ${minWordCount})`,
        recommendation: `Add more substantial content to reach at least ${minWordCount} words`,
      },
      {
        condition: assessment.paragraphCount >= minParagraphs,
        issue: `Not enough paragraphs (${assessment.paragraphCount}, minimum ${minParagraphs})`,
        recommendation: `Structure content into at least ${minParagraphs} paragraphs`,
      },
      {
        condition: assessment.headingCount >= minHeadings,
        issue: `Not enough headings (${assessment.headingCount}, minimum ${minHeadings})`,
        recommendation: `Add at least ${minHeadings} headings to structure content`,
      },
    ];

    if (requireImages) {
      checks.push({
        condition: assessment.imageCount > 0,
        issue: 'No images found',
        recommendation: 'Add relevant images to enhance content quality',
      });
    }

    if (requireLinks) {
      checks.push({
        condition: assessment.linkCount > 0,
        issue: 'No links found',
        recommendation: 'Add relevant internal or external links',
      });
    }

    // Evaluate checks
    checks.forEach(check => {
      if (!check.condition) {
        assessment.issues.push(check.issue);
        assessment.recommendations.push(check.recommendation);
      }
    });

    // Determine if qualified
    assessment.isQualified = assessment.issues.length === 0;

    return assessment;
  } catch (error) {
    console.error('Error assessing content quality:', error);
    assessment.issues.push('Error analyzing content');
    return assessment;
  }
};

/**
 * Check if current page should show ads based on route and content
 * @param {string} pathname - Current page path
 * @returns {boolean} Whether ads should be shown
 */
export const shouldShowAds = pathname => {
  // Pages that should never show ads (expanded list)
  const excludedPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/404',
    '/error',
    '/loading',
    '/dashboard',
    '/profile',
    '/service-issues',
    '/report-issue',
    '/CommunityHub',
    '/services',
    '/utilities',
  ];

  // Check if path is excluded
  if (excludedPaths.some(path => pathname.includes(path))) {
    console.log('AdSense: Path excluded from ads:', pathname);
    return false;
  }

  // Only allow ads on specific content-rich pages
  const allowedPaths = [
    '/',
    '/about-us',
    '/faq',
    '/our-services',
    '/press-releases',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ];

  // Check if path is in allowed list
  const isAllowedPath = allowedPaths.some(path =>
    pathname === path || (path !== '/' && pathname.startsWith(path))
  );

  if (!isAllowedPath) {
    console.log('AdSense: Path not in allowed list:', pathname);
    return false;
  }

  // For allowed pages, do content assessment
  const assessment = assessContentQuality({ minWordCount: 400 });
  console.log('AdSense: Content assessment for', pathname, ':', assessment);
  return assessment.isQualified;
};

/**
 * Get appropriate ad slots for different page types
 * @param {string} pathname - Current page path
 * @returns {Array} Array of ad slot configurations
 */
export const getAdSlotsForPage = pathname => {
  const slots = [];

  // Homepage ads
  if (pathname === '/') {
    slots.push(
      {
        slot: '2059283552', // [LTB WebApp] Homepage Header Ad
        format: 'auto',
        position: 'header',
        minContentLength: 500,
      },
      {
        slot: '4214673608', // [LTB WebApp] Homepage Content Ad
        format: 'rectangle',
        position: 'sidebar',
        minContentLength: 300,
      }
    );
  }

  // Content pages
  if (
    pathname.includes('/about') ||
    pathname.includes('/services') ||
    pathname.includes('/faq')
  ) {
    slots.push({
      slot: '6544714660', // [LTB WebApp] Content Pages Ad
      format: 'auto',
      position: 'content',
      minContentLength: 400,
    });
  }

  // Blog/article pages - Currently using existing content slot
  // Future: Create dedicated blog slot IDs for better targeting
  if (pathname.includes('/blog')) {
    slots.push(
      {
        slot: '6544714660', // Use existing content page slot for now
        format: 'auto',
        position: 'article-content',
        minContentLength: 800,
      }
    );
  }

  return slots;
};

/**
 * Load AdSense script dynamically
 * @returns {Promise} Promise that resolves when script is loaded
 */
export const loadAdSenseScript = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (
      window.adsbygoogle ||
      document.querySelector('script[src*="adsbygoogle"]')
    ) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4572960626705389';
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      console.log('AdSense script loaded successfully');
      resolve();
    };

    script.onerror = () => {
      console.error('Failed to load AdSense script');
      reject(new Error('Failed to load AdSense script'));
    };

    document.head.appendChild(script);
  });
};

/**
 * Initialize AdSense ads on the page
 * @param {Array} adElements - Array of ad elements to initialize
 */
export const initializeAds = (adElements = []) => {
  try {
    if (!window.adsbygoogle) {
      console.warn('AdSense script not loaded');
      return;
    }

    adElements.forEach((_, index) => {
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log(`AdSense ad ${index + 1} initialized`);
      }, index * 100); // Stagger initialization
    });
  } catch (error) {
    console.error('Error initializing AdSense ads:', error);
  }
};

export default {
  assessContentQuality,
  shouldShowAds,
  getAdSlotsForPage,
  loadAdSenseScript,
  initializeAds,
};
