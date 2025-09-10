// src/utils/themeUtils.js

/**
 * Theme utilities for white label configuration
 * Dynamically updates CSS custom properties based on white label settings
 */

import { getWhiteLabelConfig } from '../config/whiteLabelConfig';

/**
 * Convert hex color to RGB values
 * @param {string} hex - Hex color code
 * @returns {Object} RGB values
 */
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Generate lighter shade of a color
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to lighten (0-100)
 * @returns {string} Lighter hex color
 */
const lightenColor = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const factor = percent / 100;
  const r = Math.round(rgb.r + (255 - rgb.r) * factor);
  const g = Math.round(rgb.g + (255 - rgb.g) * factor);
  const b = Math.round(rgb.b + (255 - rgb.b) * factor);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Generate darker shade of a color
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to darken (0-100)
 * @returns {string} Darker hex color
 */
const darkenColor = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const factor = 1 - (percent / 100);
  const r = Math.round(rgb.r * factor);
  const g = Math.round(rgb.g * factor);
  const b = Math.round(rgb.b * factor);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Apply white label theme to CSS custom properties
 */
export const applyWhiteLabelTheme = () => {
  const root = document.documentElement;

  // Get white label colors
  const primaryColor = getWhiteLabelConfig('branding', 'primaryColor');
  const secondaryColor = getWhiteLabelConfig('branding', 'secondaryColor');
  const accentColor = getWhiteLabelConfig('branding', 'accentColor');

  // Debug logging
  console.log('🔍 White label config debug:', {
    primaryColor,
    secondaryColor,
    accentColor,
    envVars: {
      VITE_WL_BRANDING_PRIMARYCOLOR: import.meta.env.VITE_WL_BRANDING_PRIMARYCOLOR,
      VITE_WL_BRANDING_SECONDARYCOLOR: import.meta.env.VITE_WL_BRANDING_SECONDARYCOLOR,
      VITE_WL_BRANDING_ACCENTCOLOR: import.meta.env.VITE_WL_BRANDING_ACCENTCOLOR,
    }
  });
  
  // Generate color variations
  const primaryLight = lightenColor(primaryColor, 20);
  const primaryDark = darkenColor(primaryColor, 20);
  const accentLight = lightenColor(accentColor, 20);
  const accentDark = darkenColor(accentColor, 20);
  
  // Update CSS custom properties
  root.style.setProperty('--wl-primary-color', primaryColor);
  root.style.setProperty('--wl-primary-light', primaryLight);
  root.style.setProperty('--wl-primary-dark', primaryDark);
  root.style.setProperty('--wl-secondary-color', secondaryColor);
  root.style.setProperty('--wl-accent-color', accentColor);
  root.style.setProperty('--wl-accent-light', accentLight);
  root.style.setProperty('--wl-accent-dark', accentDark);
  
  // Update component-specific colors
  root.style.setProperty('--wl-navbar-bg', primaryColor);
  root.style.setProperty('--wl-btn-primary-bg', primaryColor);
  root.style.setProperty('--wl-btn-primary-hover', primaryDark);
  root.style.setProperty('--wl-input-focus', accentColor);
  
  // Update gradients
  root.style.setProperty('--wl-gradient-primary', `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`);
  root.style.setProperty('--wl-gradient-accent', `linear-gradient(135deg, ${accentColor}, ${accentLight})`);
  
  console.log('🎨 White label theme applied:', {
    primary: primaryColor,
    secondary: secondaryColor,
    accent: accentColor
  });
};

/**
 * Get theme color for meta tags
 * @returns {string} Primary color for theme-color meta tag
 */
export const getThemeColor = () => {
  return getWhiteLabelConfig('branding', 'primaryColor');
};

/**
 * Generate favicon URL based on white label configuration
 * @returns {string} Favicon URL
 */
export const getFaviconUrl = () => {
  const faviconPath = getWhiteLabelConfig('branding', 'faviconPath');
  const primaryDomain = getWhiteLabelConfig('domains', 'primary');
  
  // If favicon path is absolute URL, use it directly
  if (faviconPath.startsWith('http')) {
    return faviconPath;
  }
  
  // If it's a relative path, combine with domain
  return `${primaryDomain}${faviconPath}`;
};

/**
 * Update favicon dynamically
 */
export const updateFavicon = () => {
  const faviconUrl = getFaviconUrl();
  
  // Update existing favicon links
  const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
  faviconLinks.forEach(link => {
    link.href = faviconUrl;
  });
  
  // If no favicon links exist, create one
  if (faviconLinks.length === 0) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }
};

/**
 * Initialize white label theme on page load
 */
export const initializeWhiteLabelTheme = () => {
  // Apply theme colors
  applyWhiteLabelTheme();
  
  // Update favicon
  updateFavicon();
  
  // Update theme-color meta tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.content = getThemeColor();
  }
};
