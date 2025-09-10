// src/utils/securityTxtUtils.js

/**
 * Utility functions for generating dynamic security.txt
 * Uses white label configuration for contact information
 */

import {
  getAppName,
  getPrimaryDomain,
  getCompanyDomain,
  getSecurityEmail,
  getLanguage,
} from '../config/whiteLabelConfig';

/**
 * Generate security.txt content with white label configuration
 * @returns {string} Security.txt file content
 */
export const generateSecurityTxt = () => {
  const currentYear = new Date().getFullYear();
  const expirationDate = `${currentYear + 1}-12-31T23:59:59.000Z`;
  
  return `# Security Policy for ${getAppName()} Platform (${getPrimaryDomain()})
# Built by ${getCompanyDomain()}

Contact: ${getSecurityEmail()}
Contact: ${getCompanyDomain()}/security
Expires: ${expirationDate}
Encryption: ${getCompanyDomain()}/pgp-key.txt
Acknowledgments: ${getCompanyDomain()}/security/acknowledgments
Policy: ${getCompanyDomain()}/security/policy
Hiring: ${getCompanyDomain()}/careers

# Preferred Languages
Preferred-Languages: ${getLanguage().split('-')[0]}

# Canonical URL
Canonical: ${getPrimaryDomain()}/.well-known/security.txt`;
};

/**
 * Generate security.txt file content for download
 * @returns {Blob} Blob object containing security.txt content
 */
export const generateSecurityTxtBlob = () => {
  const content = generateSecurityTxt();
  return new Blob([content], { type: 'text/plain' });
};
