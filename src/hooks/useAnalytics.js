import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  trackEvent,
  trackLogin,
  trackSignUp,
  trackSearch,
  trackDownload,
  trackExternalLink,
  trackFormSubmission,
  trackVideo,
  trackEngagement,
  trackScrollDepth,
  setUserProperties,
  trackException,
  trackTiming,
} from '../utils/analytics';

/**
 * Custom hook for Google Analytics integration
 * Provides easy-to-use analytics tracking functions
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views automatically when location changes
  useEffect(() => {
    const page_title = document.title;
    const page_location = window.location.href;

    // Small delay to ensure the page title is updated
    const timeoutId = setTimeout(() => {
      trackPageView(page_title, page_location);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  // Memoized tracking functions
  const analytics = {
    // Page tracking
    trackPage: useCallback((title, location) => {
      trackPageView(title, location);
    }, []),

    // Event tracking
    trackEvent: useCallback((action, category, label, value) => {
      trackEvent(action, category, label, value);
    }, []),

    // Authentication tracking
    trackLogin: useCallback(method => {
      trackLogin(method);
    }, []),

    trackSignUp: useCallback(method => {
      trackSignUp(method);
    }, []),

    // Search tracking
    trackSearch: useCallback(searchTerm => {
      trackSearch(searchTerm);
    }, []),

    // Download tracking
    trackDownload: useCallback((fileName, fileExtension) => {
      trackDownload(fileName, fileExtension);
    }, []),

    // External link tracking
    trackExternalLink: useCallback((url, linkText) => {
      trackExternalLink(url, linkText);
    }, []),

    // Form tracking
    trackFormSubmission: useCallback((formName, formDestination) => {
      trackFormSubmission(formName, formDestination);
    }, []),

    // Video tracking
    trackVideo: useCallback((videoTitle, action, currentTime) => {
      trackVideo(videoTitle, action, currentTime);
    }, []),

    // Engagement tracking
    trackEngagement: useCallback(engagementTime => {
      trackEngagement(engagementTime);
    }, []),

    // Scroll tracking
    trackScrollDepth: useCallback(percentScrolled => {
      trackScrollDepth(percentScrolled);
    }, []),

    // User properties
    setUserProperties: useCallback(properties => {
      setUserProperties(properties);
    }, []),

    // Error tracking
    trackException: useCallback((description, fatal = false) => {
      trackException(description, fatal);
    }, []),

    // Performance tracking
    trackTiming: useCallback((name, value, category, label) => {
      trackTiming(name, value, category, label);
    }, []),

    // Custom business events
    trackBusinessEvent: useCallback((eventName, parameters = {}) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
      }
    }, []),

    // E-commerce tracking (if needed)
    trackPurchase: useCallback(
      (transactionId, value, currency = 'ZAR', items = []) => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'purchase', {
            transaction_id: transactionId,
            value: value,
            currency: currency,
            items: items,
          });
        }
      },
      []
    ),

    // Service interaction tracking
    trackServiceInteraction: useCallback(
      (serviceName, action, details = null) => {
        const eventParams = {
          event_category: 'service_interaction',
          event_label: serviceName,
          service_name: serviceName,
          interaction_type: action,
        };

        if (details) {
          eventParams.interaction_details = details;
        }

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'service_interaction', eventParams);
        }
      },
      []
    ),

    // Government service tracking
    trackGovernmentService: useCallback(
      (serviceName, action, department = null) => {
        const eventParams = {
          event_category: 'government_service',
          event_label: serviceName,
          service_name: serviceName,
          action_type: action,
        };

        if (department) {
          eventParams.department = department;
        }

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'government_service_access', eventParams);
        }
      },
      []
    ),

    // Issue reporting tracking
    trackIssueReport: useCallback((issueType, priority, location = null) => {
      const eventParams = {
        event_category: 'issue_reporting',
        event_label: issueType,
        issue_type: issueType,
        priority: priority,
      };

      if (location) {
        eventParams.issue_location = location;
      }

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'issue_reported', eventParams);
      }
    }, []),

    // Community engagement tracking
    trackCommunityEngagement: useCallback(
      (action, contentType, contentId = null) => {
        const eventParams = {
          event_category: 'community_engagement',
          event_label: action,
          engagement_type: action,
          content_type: contentType,
        };

        if (contentId) {
          eventParams.content_id = contentId;
        }

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'community_engagement', eventParams);
        }
      },
      []
    ),
  };

  return analytics;
};

/**
 * Hook for tracking scroll depth automatically
 */
export const useScrollTracking = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    let maxScrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set();

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;

        // Track milestone scroll depths
        scrollThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
            analytics.trackScrollDepth(threshold);
            trackedThresholds.add(threshold);
          }
        });
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [analytics]);
};

/**
 * Hook for tracking user engagement time
 */
export const useEngagementTracking = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    const startTime = Date.now();
    let isActive = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
      } else {
        isActive = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track engagement time when component unmounts or page unloads
    const trackEngagementTime = () => {
      if (isActive) {
        const engagementTime = Date.now() - startTime;
        analytics.trackEngagement(engagementTime);
      }
    };

    window.addEventListener('beforeunload', trackEngagementTime);

    return () => {
      trackEngagementTime();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', trackEngagementTime);
    };
  }, [analytics]);
};

// Utility function for throttling
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
