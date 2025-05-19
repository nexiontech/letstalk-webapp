// src/services/userProfileService.js
import { updateUserAttributes as amplifyUpdateUserAttributes } from 'aws-amplify/auth';
import { getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { decodeJWT } from '../utils/jwtDecode';
import { store } from '../store/store';
import { updateUserProfile } from './amplifyAuthService';

/**
 * Update user attributes in Cognito and update local state
 * @param {Object} attributes - The attributes to update
 * @returns {Promise<Object>} - Result of the update operation
 */
export const updateUserAttributes = async (attributes) => {
  try {
    console.log('Updating user attributes:', attributes);

    // Convert attributes to Cognito format if needed
    const cognitoAttributes = {};
    
    // Map standard attributes
    if (attributes.name) cognitoAttributes.name = attributes.name;
    if (attributes.email) cognitoAttributes.email = attributes.email;
    if (attributes.phoneNumber) cognitoAttributes.phone_number = attributes.phoneNumber;
    
    // Map custom attributes
    if (attributes.address) cognitoAttributes['custom:address'] = attributes.address;

    // Update attributes in Cognito
    await amplifyUpdateUserAttributes(cognitoAttributes);
    
    // Get updated user attributes from Cognito
    const userAttributes = await fetchUserAttributes();
    const { tokens } = await fetchAuthSession();
    const idToken = tokens.idToken.toString();
    const decodedToken = decodeJWT(idToken);
    
    // Create updated user object
    const updatedUser = {
      idNumber: userAttributes['custom:idNumber'] || decodedToken?.['custom:idNumber'] || '',
      email: userAttributes.email || decodedToken?.email || '',
      name: userAttributes.name || decodedToken?.name || '',
      phoneNumber: userAttributes.phone_number || '',
      address: userAttributes['custom:address'] || '',
      role: 'citizen' // Default role
    };
    
    console.log('Updated user attributes:', updatedUser);
    
    // Update Redux store
    store.dispatch(updateUserProfile(updatedUser));
    
    // Update localStorage
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    
    return {
      success: true,
      user: updatedUser
    };
  } catch (error) {
    console.error('Error updating user attributes:', error);
    
    // Handle specific error cases
    if (error.name === 'InvalidParameterException') {
      return {
        success: false,
        error: 'Invalid parameter: ' + error.message
      };
    } else if (error.name === 'UserNotFoundException') {
      return {
        success: false,
        error: 'User not found. Please log in again.'
      };
    } else if (error.name === 'AliasExistsException') {
      return {
        success: false,
        error: 'Email address is already in use by another account.'
      };
    } else if (error.name === 'CodeMismatchException') {
      return {
        success: false,
        error: 'Verification code is incorrect. Please try again.'
      };
    } else if (error.name === 'ExpiredCodeException') {
      return {
        success: false,
        error: 'Verification code has expired. Please request a new one.'
      };
    } else if (error.name === 'NotAuthorizedException') {
      return {
        success: false,
        error: 'Not authorized to perform this action. Please log in again.'
      };
    }
    
    return {
      success: false,
      error: error.message || 'Failed to update profile. Please try again.'
    };
  }
};
