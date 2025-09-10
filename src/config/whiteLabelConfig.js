// src/config/whiteLabelConfig.js

/**
 * White Label Configuration System
 * 
 * This file centralizes all branding elements to enable easy white labeling
 * of the application. All branding elements can be overridden via environment
 * variables with the VITE_WL_ prefix (White Label).
 * 
 * Environment Variable Pattern: VITE_WL_[SECTION]_[KEY]
 * Example: VITE_WL_APP_NAME=MyApp
 */

import { getEnvVariable } from '../utils/envUtils';

// Default branding configuration (fallback values)
const DEFAULT_CONFIG = {
  // Application Information
  app: {
    name: "Let's Talk",
    shortName: "LetsTalk", 
    fullName: "Let's Talk - Citizen Engagement Platform",
    tagline: "Your community service platform",
    description: "Stay connected with essential services in your community. Report issues, track resolutions, and engage with your local government.",
    version: "1.0.0",
  },

  // Company Information
  company: {
    name: "Saya-Setona",
    fullName: "Saya Setona Innovations",
    description: "Technology company specializing in citizen engagement platforms and government service digitization.",
    foundingYear: "2024",
  },

  // Domain and URLs
  domains: {
    primary: "https://letstalkbi.co.za",
    company: "https://saya-setona.co.za",
    support: "https://support.letstalkbi.co.za",
  },

  // Contact Information
  contact: {
    email: "info@letstalkbi.co.za",
    support: "support@letstalkbi.co.za",
    security: "security@saya-setona.co.za",
    phone: "+27-11-123-4567",
  },

  // Social Media
  social: {
    twitter: "@SayaSetona",
    facebook: "SayaSetona", 
    linkedin: "company/saya-setona",
    youtube: "SayaSetona",
    instagram: "sayasetona",
  },

  // Geographic/Regional Settings
  region: {
    country: "ZA",
    countryName: "South Africa",
    language: "en-ZA",
    currency: "ZAR",
    timezone: "Africa/Johannesburg",
    region: "South Africa",
  },

  // Visual Branding
  branding: {
    primaryColor: "#0E4649",
    secondaryColor: "#ffffff", 
    accentColor: "#007bff",
    logoPath: "/logo.png",
    faviconPath: "/favicon.png",
    ogImagePath: "/og-image.jpg",
    appScreenshotPath: "/app-screenshot.jpg",
    twitterCardPath: "/twitter-card.jpg",
  },

  // SEO Configuration
  seo: {
    keywords: [
      "citizen engagement",
      "municipal services", 
      "government services",
      "community platform",
      "service delivery",
      "local government",
      "public services"
    ],
    googleAnalyticsId: "G-76N7K7JX41",
    googleAdsenseId: "ca-pub-4572960626705389",
  },

  // Features and Capabilities
  features: {
    multiLanguage: true,
    paymentProcessing: true,
    serviceReporting: true,
    communityHub: true,
    governmentServices: true,
    realTimeAlerts: true,
  },
};

/**
 * Get white label configuration value with environment variable override
 * @param {string} section - Configuration section (app, company, domains, etc.)
 * @param {string} key - Configuration key within the section
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Configuration value
 */
export const getWhiteLabelConfig = (section, key, defaultValue = null) => {
  // Create environment variable name: VITE_WL_SECTION_KEY
  const envKey = `VITE_WL_${section.toUpperCase()}_${key.toUpperCase()}`;
  
  // Get value from environment variable or default config
  const envValue = getEnvVariable(envKey);
  if (envValue) {
    // Handle boolean values
    if (envValue.toLowerCase() === 'true') return true;
    if (envValue.toLowerCase() === 'false') return false;
    
    // Handle array values (comma-separated)
    if (envValue.includes(',')) {
      return envValue.split(',').map(item => item.trim());
    }
    
    return envValue;
  }
  
  // Fallback to default config
  const sectionConfig = DEFAULT_CONFIG[section];
  if (sectionConfig && sectionConfig[key] !== undefined) {
    return sectionConfig[key];
  }
  
  return defaultValue;
};

/**
 * Get complete white label configuration with environment overrides
 * @returns {Object} Complete white label configuration
 */
export const getCompleteWhiteLabelConfig = () => {
  const config = {};
  
  // Build configuration with environment variable overrides
  Object.keys(DEFAULT_CONFIG).forEach(section => {
    config[section] = {};
    Object.keys(DEFAULT_CONFIG[section]).forEach(key => {
      config[section][key] = getWhiteLabelConfig(section, key);
    });
  });
  
  return config;
};

/**
 * Convenience functions for commonly used values
 */
export const getAppName = () => getWhiteLabelConfig('app', 'name');
export const getAppShortName = () => getWhiteLabelConfig('app', 'shortName');
export const getAppFullName = () => getWhiteLabelConfig('app', 'fullName');
export const getAppTagline = () => getWhiteLabelConfig('app', 'tagline');
export const getAppDescription = () => getWhiteLabelConfig('app', 'description');

export const getCompanyName = () => getWhiteLabelConfig('company', 'name');
export const getCompanyFullName = () => getWhiteLabelConfig('company', 'fullName');

export const getPrimaryDomain = () => getWhiteLabelConfig('domains', 'primary');
export const getCompanyDomain = () => getWhiteLabelConfig('domains', 'company');

export const getSupportEmail = () => getWhiteLabelConfig('contact', 'support');
export const getSecurityEmail = () => getWhiteLabelConfig('contact', 'security');
export const getContactPhone = () => getWhiteLabelConfig('contact', 'phone');

export const getPrimaryColor = () => getWhiteLabelConfig('branding', 'primaryColor');
export const getLogoPath = () => getWhiteLabelConfig('branding', 'logoPath');
export const getFaviconPath = () => getWhiteLabelConfig('branding', 'faviconPath');

export const getCountry = () => getWhiteLabelConfig('region', 'country');
export const getCountryName = () => getWhiteLabelConfig('region', 'countryName');
export const getLanguage = () => getWhiteLabelConfig('region', 'language');

// Export the default configuration for reference
export { DEFAULT_CONFIG };
