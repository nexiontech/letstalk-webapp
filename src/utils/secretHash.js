// src/utils/secretHash.js

/**
 * Calculate the SECRET_HASH for AWS Cognito authentication using Web Crypto API
 * @param {string} username - The username (ID Number in our case)
 * @param {string} clientId - The Cognito App Client ID
 * @param {string} clientSecret - The Cognito App Client Secret
 * @returns {Promise<string>} - The calculated SECRET_HASH
 */
export async function calculateSecretHash(username, clientId, clientSecret) {
  if (!username || !clientId || !clientSecret) {
    console.error('Missing required parameters for SECRET_HASH calculation');
    return null;
  }

  try {
    // Convert strings to ArrayBuffer
    const encoder = new TextEncoder();
    const message = encoder.encode(username + clientId);
    const keyData = encoder.encode(clientSecret);

    // Import the key
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Sign the message
    const signature = await window.crypto.subtle.sign(
      'HMAC',
      key,
      message
    );

    // Convert to Base64
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  } catch (error) {
    console.error('Error calculating SECRET_HASH:', error);
    return null;
  }
}
