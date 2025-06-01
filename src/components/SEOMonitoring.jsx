// src/components/SEOMonitoring.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Monitoring Component
 * Tracks page views, user interactions, and SEO performance
 * Integrates with Google Analytics and other tracking tools
 */
const SEOMonitoring = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views for SEO analytics
    const trackPageView = () => {
      // Google Analytics 4 page view tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-76N7K7JX41', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
          content_group1: getContentGroup(location.pathname),
          content_group2: "Let's Talk Platform",
          content_group3: 'Saya-Setona',
        });

        // Custom SEO event tracking
        window.gtag('event', 'page_view', {
          event_category: 'SEO',
          event_label: location.pathname,
          page_title: document.title,
          page_location: window.location.href,
          custom_parameters: {
            platform: 'web',
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
          },
        });
      }

      // Track Core Web Vitals for SEO
      trackCoreWebVitals();

      // Track structured data presence
      trackStructuredData();

      // Monitor page performance
      trackPagePerformance();
    };

    // Delay tracking to ensure page is fully loaded
    const timer = setTimeout(trackPageView, 100);

    return () => clearTimeout(timer);
  }, [location]);

  // Get content group based on page path
  const getContentGroup = pathname => {
    if (pathname === '/') return 'Homepage';
    if (pathname.includes('/about')) return 'About';
    if (pathname.includes('/services')) return 'Services';
    if (pathname.includes('/faq')) return 'Support';
    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/community')) return 'Community';
    if (pathname.includes('/login') || pathname.includes('/register'))
      return 'Authentication';
    return 'Other';
  };

  // Track Core Web Vitals for SEO performance
  const trackCoreWebVitals = () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (window.gtag) {
            window.gtag('event', 'LCP', {
              event_category: 'Web Vitals',
              value: Math.round(entry.startTime),
              event_label: location.pathname,
              non_interaction: true,
            });
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (window.gtag) {
            window.gtag('event', 'FID', {
              event_category: 'Web Vitals',
              value: Math.round(entry.processingStart - entry.startTime),
              event_label: location.pathname,
              non_interaction: true,
            });
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        if (window.gtag) {
          window.gtag('event', 'CLS', {
            event_category: 'Web Vitals',
            value: Math.round(clsValue * 1000),
            event_label: location.pathname,
            non_interaction: true,
          });
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  };

  // Track structured data presence for SEO
  const trackStructuredData = () => {
    if (typeof window !== 'undefined') {
      const structuredDataScripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      const hasStructuredData = structuredDataScripts.length > 0;

      if (window.gtag) {
        window.gtag('event', 'structured_data_present', {
          event_category: 'SEO',
          event_label: location.pathname,
          value: hasStructuredData ? 1 : 0,
          custom_parameters: {
            structured_data_count: structuredDataScripts.length,
            page_path: location.pathname,
          },
        });
      }
    }
  };

  // Track page performance metrics
  const trackPagePerformance = () => {
    if (typeof window !== 'undefined' && window.performance) {
      // Wait for page to fully load
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];

          if (navigation && window.gtag) {
            // Page load time
            window.gtag('event', 'page_load_time', {
              event_category: 'Performance',
              value: Math.round(
                navigation.loadEventEnd - navigation.fetchStart
              ),
              event_label: location.pathname,
              non_interaction: true,
            });

            // DOM content loaded time
            window.gtag('event', 'dom_content_loaded', {
              event_category: 'Performance',
              value: Math.round(
                navigation.domContentLoadedEventEnd - navigation.fetchStart
              ),
              event_label: location.pathname,
              non_interaction: true,
            });

            // First byte time
            window.gtag('event', 'time_to_first_byte', {
              event_category: 'Performance',
              value: Math.round(
                navigation.responseStart - navigation.fetchStart
              ),
              event_label: location.pathname,
              non_interaction: true,
            });
          }
        }, 1000);
      });
    }
  };

  // Track SEO-related user interactions
  useEffect(() => {
    const trackSEOInteractions = () => {
      // Track external link clicks
      document.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
          if (window.gtag) {
            window.gtag('event', 'external_link_click', {
              event_category: 'SEO',
              event_label: link.href,
              custom_parameters: {
                source_page: location.pathname,
                link_text: link.textContent.trim(),
              },
            });
          }
        }
      });

      // Track search interactions (if search functionality exists)
      const searchInputs = document.querySelectorAll(
        'input[type="search"], input[placeholder*="search" i]'
      );
      searchInputs.forEach(input => {
        input.addEventListener('keydown', event => {
          if (event.key === 'Enter' && input.value.trim()) {
            if (window.gtag) {
              window.gtag('event', 'site_search', {
                event_category: 'SEO',
                search_term: input.value.trim(),
                event_label: location.pathname,
              });
            }
          }
        });
      });

      // Track scroll depth for engagement metrics
      let maxScroll = 0;
      const trackScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            100
        );

        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent;
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'Engagement',
              value: scrollPercent,
              event_label: location.pathname,
              non_interaction: true,
            });
          }
        }
      };

      window.addEventListener('scroll', trackScrollDepth, { passive: true });
    };

    trackSEOInteractions();
  }, [location]);

  return null; // This component doesn't render anything
};

export default SEOMonitoring;

// SEO performance utilities
export const generateSEOReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    title: document.title,
    metaDescription:
      document.querySelector('meta[name="description"]')?.content || '',
    metaKeywords:
      document.querySelector('meta[name="keywords"]')?.content || '',
    canonicalUrl: document.querySelector('link[rel="canonical"]')?.href || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
    ogDescription:
      document.querySelector('meta[property="og:description"]')?.content || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    structuredDataCount: document.querySelectorAll(
      'script[type="application/ld+json"]'
    ).length,
    hasH1: !!document.querySelector('h1'),
    imageCount: document.querySelectorAll('img').length,
    linkCount: document.querySelectorAll('a').length,
    wordCount: document.body.textContent.split(/\s+/).length,
  };

  return report;
};

// Track SEO events manually
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
