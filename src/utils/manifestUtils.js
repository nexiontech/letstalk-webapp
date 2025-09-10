// src/utils/manifestUtils.js

/**
 * Utility functions for generating dynamic web app manifest
 * Uses white label configuration for branding
 */

import {
  getAppName,
  getAppShortName,
  getAppDescription,
  getPrimaryColor,
  getFaviconPath,
  getLanguage,
  getCountryName,
} from '../config/whiteLabelConfig';

/**
 * Generate web app manifest object with white label configuration
 * @returns {Object} Web app manifest object
 */
export const generateWebAppManifest = () => {
  return {
    name: `${getAppName()} - Citizen Engagement Platform`,
    short_name: getAppShortName(),
    description: `${getCountryName()}'s premier citizen engagement platform for municipal and government services`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: getPrimaryColor(),
    orientation: "portrait-primary",
    scope: "/",
    lang: getLanguage(),
    dir: "ltr",
    categories: ["government", "utilities", "productivity"],
    icons: [
      {
        src: getFaviconPath(),
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: getFaviconPath(),
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };
};

/**
 * Generate manifest JSON string
 * @returns {string} JSON string of the manifest
 */
export const generateManifestJSON = () => {
  return JSON.stringify(generateWebAppManifest(), null, 2);
};
