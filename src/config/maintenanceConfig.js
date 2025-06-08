// src/config/maintenanceConfig.js

/**
 * Maintenance Mode Configuration
 *
 * This file provides a centralized configuration for maintenance mode settings.
 * It can be used as an alternative to environment variables for easier management.
 *
 * Priority order:
 * 1. Environment variables (VITE_MAINTENANCE_*)
 * 2. This configuration file
 * 3. Default values
 */

export const maintenanceConfig = {
  // Set to true to enable maintenance mode
  // This will be overridden by VITE_MAINTENANCE_MODE environment variable
  isEnabled: true,

  // Main maintenance message displayed to users
  // This will be overridden by VITE_MAINTENANCE_MESSAGE environment variable
  message:
    'We are currently performing scheduled maintenance to improve your experience. Our team is working to enhance the platform and will have everything back online shortly.',

  // Estimated time or completion message
  // This will be overridden by VITE_MAINTENANCE_ESTIMATED_TIME environment variable
  estimatedTime:
    'We expect to be back online within the next few hours. Please check back soon.',

  // Contact email for support during maintenance
  // This will be overridden by VITE_MAINTENANCE_CONTACT_EMAIL environment variable
  contactEmail: 'support@saya-setona.co.za',

  // Optional: Specific start and end times for maintenance (ISO format)
  // These are not currently used but can be implemented for scheduled maintenance
  scheduledStart: null, // e.g., '2025-01-15T02:00:00Z'
  scheduledEnd: null, // e.g., '2025-01-15T06:00:00Z'

  // Optional: Allow certain IP addresses to bypass maintenance mode
  // This is not currently implemented but can be added for testing
  allowedIPs: [],

  // Optional: Show maintenance mode only for specific routes
  // This is not currently implemented but can be added for partial maintenance
  restrictedRoutes: [],
};

/**
 * Get the effective maintenance configuration
 * Combines environment variables, config file, and defaults
 *
 * @returns {Object} - Effective maintenance configuration
 */
export const getEffectiveMaintenanceConfig = () => {
  return {
    isEnabled:
      import.meta.env.VITE_MAINTENANCE_MODE === 'true' ||
      maintenanceConfig.isEnabled,
    message:
      import.meta.env.VITE_MAINTENANCE_MESSAGE || maintenanceConfig.message,
    estimatedTime:
      import.meta.env.VITE_MAINTENANCE_ESTIMATED_TIME ||
      maintenanceConfig.estimatedTime,
    contactEmail:
      import.meta.env.VITE_MAINTENANCE_CONTACT_EMAIL ||
      maintenanceConfig.contactEmail,
    scheduledStart: maintenanceConfig.scheduledStart,
    scheduledEnd: maintenanceConfig.scheduledEnd,
    allowedIPs: maintenanceConfig.allowedIPs,
    restrictedRoutes: maintenanceConfig.restrictedRoutes,
  };
};

export default maintenanceConfig;
