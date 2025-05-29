/**
 * Google Consent Mode v2 Utility Functions
 * Implements Google's official consent mode guidelines
 */

// Regions where consent banners are required (EEA + UK)
const CONSENT_REQUIRED_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 
  'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 
  'SE', 'IS', 'LI', 'NO', 'GB'
];

/**
 * Get user's region/country code
 * This is a simplified implementation - in production you might use:
 * - IP geolocation service
 * - Browser language detection
 * - User preference setting
 */
export const getUserRegion = () => {
  // Simple implementation using browser language
  const language = navigator.language || navigator.userLanguage;
  const region = language.split('-')[1];
  return region ? region.toUpperCase() : 'US';
};

/**
 * Check if consent banner should be shown based on user's region
 */
export const shouldShowConsentBanner = () => {
  const userRegion = getUserRegion();
  return CONSENT_REQUIRED_REGIONS.includes(userRegion);
};

/**
 * Set region-specific default consent values
 * Following Google's best practices for regional compliance
 */
export const setRegionalConsentDefaults = () => {
  if (typeof window === 'undefined' || !window.gtag) return;

  const userRegion = getUserRegion();
  
  if (CONSENT_REQUIRED_REGIONS.includes(userRegion)) {
    // For EEA/UK regions - deny by default, require explicit consent
    window.gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'region': [userRegion],
      'wait_for_update': 500
    });
  } else {
    // For other regions - can grant by default if your privacy policy allows
    // This is just an example - adjust based on your organization's policy
    window.gtag('consent', 'default', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted',
      'region': [userRegion]
    });
  }
};

/**
 * Update consent mode with proper v2 parameters
 */
export const updateConsentMode = (consents) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    'ad_storage': consents.advertising ? 'granted' : 'denied',
    'ad_user_data': consents.advertising ? 'granted' : 'denied',
    'ad_personalization': consents.personalization ? 'granted' : 'denied',
    'analytics_storage': consents.analytics ? 'granted' : 'denied'
  });

  // Update Google Analytics configuration based on consent
  if (consents.analytics) {
    window.gtag('config', 'G-76N7K7JX41', {
      'allow_google_signals': consents.advertising,
      'allow_ad_personalization_signals': consents.personalization
    });
  }
};

/**
 * Track consent events for analytics
 */
export const trackConsentEvent = (eventName, consents, method = 'unknown') => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, {
    'event_category': 'consent',
    'event_label': method,
    'analytics_consent': consents.analytics ? 'granted' : 'denied',
    'advertising_consent': consents.advertising ? 'granted' : 'denied',
    'personalization_consent': consents.personalization ? 'granted' : 'denied',
    'user_region': getUserRegion(),
    'consent_timestamp': new Date().toISOString()
  });
};

/**
 * Check if consent has expired (optional - implement based on your policy)
 * Google recommends re-asking for consent periodically
 */
export const isConsentExpired = () => {
  const consentTimestamp = localStorage.getItem('consent-timestamp');
  if (!consentTimestamp) return true;

  const consentDate = new Date(consentTimestamp);
  const now = new Date();
  const daysSinceConsent = (now - consentDate) / (1000 * 60 * 60 * 24);
  
  // Re-ask for consent after 365 days (adjust based on your policy)
  return daysSinceConsent > 365;
};

/**
 * Get stored consent preferences
 */
export const getStoredConsent = () => {
  try {
    const stored = localStorage.getItem('consent-preferences');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Error reading stored consent:', error);
    return null;
  }
};

/**
 * Store consent preferences with timestamp
 */
export const storeConsent = (consents) => {
  try {
    localStorage.setItem('consent-preferences', JSON.stringify(consents));
    localStorage.setItem('consent-timestamp', new Date().toISOString());
    localStorage.setItem('consent-region', getUserRegion());
  } catch (error) {
    console.warn('Error storing consent:', error);
  }
};

/**
 * Initialize consent mode on page load
 * Call this early in your app initialization
 */
export const initializeConsentMode = () => {
  // Set regional defaults
  setRegionalConsentDefaults();

  // Check for stored consent
  const storedConsent = getStoredConsent();
  
  if (storedConsent && !isConsentExpired()) {
    // Apply stored consent
    updateConsentMode(storedConsent);
    return { hasStoredConsent: true, consents: storedConsent };
  }

  return { hasStoredConsent: false, consents: null };
};

/**
 * Handle consent banner visibility based on region and stored preferences
 */
export const shouldShowBanner = () => {
  // Always show in consent-required regions if no valid stored consent
  if (shouldShowConsentBanner()) {
    const storedConsent = getStoredConsent();
    return !storedConsent || isConsentExpired();
  }
  
  // For other regions, only show if explicitly requested or no stored consent
  return false;
};

/**
 * Debug function to log current consent state
 */
export const debugConsentState = () => {
  if (typeof window === 'undefined') return;
  
  console.log('Consent Debug Info:', {
    userRegion: getUserRegion(),
    shouldShowBanner: shouldShowBanner(),
    storedConsent: getStoredConsent(),
    consentExpired: isConsentExpired(),
    gtagAvailable: !!window.gtag,
    dataLayerLength: window.dataLayer ? window.dataLayer.length : 0
  });
};
