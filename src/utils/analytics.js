/**
 * Google Analytics Utility Functions
 * Provides helper functions for tracking events and page views
 */

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-76N7K7JX41';

/**
 * Track a page view
 * @param {string} page_title - The title of the page
 * @param {string} page_location - The URL of the page
 */
export const trackPageView = (page_title, page_location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title,
      page_location,
    });
  }
};

/**
 * Track a custom event
 * @param {string} action - The action being tracked
 * @param {string} category - The category of the event
 * @param {string} label - Optional label for the event
 * @param {number} value - Optional numeric value for the event
 */
export const trackEvent = (action, category, label = null, value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventParams = {
      event_category: category,
    };

    if (label) eventParams.event_label = label;
    if (value !== null) eventParams.value = value;

    window.gtag('event', action, eventParams);
  }
};

/**
 * Track user login
 * @param {string} method - Login method (e.g., 'email', 'google', 'facebook')
 */
export const trackLogin = method => {
  trackEvent('login', 'engagement', method);
};

/**
 * Track user registration
 * @param {string} method - Registration method
 */
export const trackSignUp = method => {
  trackEvent('sign_up', 'engagement', method);
};

/**
 * Track search events
 * @param {string} search_term - The search term used
 */
export const trackSearch = search_term => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term,
    });
  }
};

/**
 * Track file downloads
 * @param {string} file_name - Name of the downloaded file
 * @param {string} file_extension - Extension of the file
 */
export const trackDownload = (file_name, file_extension) => {
  trackEvent('file_download', 'engagement', file_name, null);

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      file_name,
      file_extension,
    });
  }
};

/**
 * Track external link clicks
 * @param {string} url - The external URL being clicked
 * @param {string} link_text - The text of the link
 */
export const trackExternalLink = url => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      transport_type: 'beacon',
    });
  }
};

/**
 * Track form submissions
 * @param {string} form_name - Name/ID of the form
 * @param {string} form_destination - Where the form leads to
 */
export const trackFormSubmission = (form_name, form_destination = null) => {
  const eventParams = {
    event_category: 'form',
    event_label: form_name,
  };

  if (form_destination) {
    eventParams.form_destination = form_destination;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', eventParams);
  }
};

/**
 * Track video interactions
 * @param {string} video_title - Title of the video
 * @param {string} action - Action taken (play, pause, complete, etc.)
 * @param {number} video_current_time - Current time in the video
 */
export const trackVideo = (video_title, action, video_current_time = null) => {
  const eventParams = {
    event_category: 'video',
    event_label: video_title,
  };

  if (video_current_time !== null) {
    eventParams.video_current_time = video_current_time;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `video_${action}`, eventParams);
  }
};

/**
 * Track user engagement time
 * @param {number} engagement_time_msec - Time in milliseconds
 */
export const trackEngagement = engagement_time_msec => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      engagement_time_msec,
    });
  }
};

/**
 * Track scroll depth
 * @param {number} percent_scrolled - Percentage of page scrolled
 */
export const trackScrollDepth = percent_scrolled => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${percent_scrolled}%`,
      value: percent_scrolled,
    });
  }
};

/**
 * Set user properties
 * @param {Object} properties - User properties to set
 */
export const setUserProperties = properties => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      custom_map: properties,
    });
  }
};

/**
 * Track exceptions/errors
 * @param {string} description - Description of the error
 * @param {boolean} fatal - Whether the error was fatal
 */
export const trackException = (description, fatal = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description,
      fatal,
    });
  }
};

/**
 * Track timing events
 * @param {string} name - Name of the timing event
 * @param {number} value - Time value in milliseconds
 * @param {string} category - Category of the timing event
 * @param {string} label - Optional label
 */
export const trackTiming = (
  name,
  value,
  category = 'performance',
  label = null
) => {
  const eventParams = {
    event_category: category,
    value,
  };

  if (label) eventParams.event_label = label;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, eventParams);
  }
};
