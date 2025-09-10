// src/services/userProfileService.js
import { getMockUser } from '../utils/envUtils';

/**
 * Update user attributes for MVP (mock implementation)
 * @param {Object} attributes - The attributes to update
 * @returns {Promise<Object>} - Result of the update operation
 */
export const updateUserAttributes = async attributes => {
  console.log('🚀 MVP Mode - Mock updating user attributes:', attributes);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get current mock user
  const currentUser = getMockUser();

  // Create updated user object
  const updatedUser = {
    ...currentUser,
    ...attributes,
    // Ensure required fields are preserved
    idNumber: attributes.idNumber || currentUser.idNumber,
    email: attributes.email || currentUser.email,
    name: attributes.name || currentUser.name,
    role: 'citizen', // Default role
  };

  console.log('🚀 MVP Mode - Updated user attributes:', updatedUser);

  // Update localStorage for persistence
  localStorage.setItem('auth_user', JSON.stringify(updatedUser));

  return {
    success: true,
    user: updatedUser,
  };
};
