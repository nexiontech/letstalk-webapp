// src/components/UserProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { validateEmail } from '../utils/authUtils';
import { updateUserAttributes } from '../services/userProfileService';
import './UserProfileForm.css';

const UserProfileForm = ({ user, onUpdateSuccess, onUpdateError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form data with user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        idNumber: user.idNumber || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // ID Number is read-only, no validation needed

    // Validate phone number if provided
    if (
      formData.phoneNumber &&
      !/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)
    ) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Only update attributes that have changed
      const attributesToUpdate = {};
      if (formData.name !== user.name) attributesToUpdate.name = formData.name;
      if (formData.email !== user.email)
        attributesToUpdate.email = formData.email;
      if (formData.phoneNumber !== user.phoneNumber)
        attributesToUpdate.phoneNumber = formData.phoneNumber;
      if (formData.address !== user.address)
        attributesToUpdate.address = formData.address;

      // Only make the API call if there are attributes to update
      if (Object.keys(attributesToUpdate).length > 0) {
        const result = await updateUserAttributes(attributesToUpdate);

        if (result.success) {
          onUpdateSuccess('Profile updated successfully');
          setIsEditing(false);
        } else {
          onUpdateError(result.error || 'Failed to update profile');
        }
      } else {
        // No changes were made
        setIsEditing(false);
      }
    } catch {
      onUpdateError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        idNumber: user.idNumber || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
    }
    setValidationErrors({});
    setIsEditing(false);
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing || isSubmitting}
            className={validationErrors.name ? 'error' : ''}
          />
          {validationErrors.name && (
            <div className="error-message">{validationErrors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing || isSubmitting}
            className={validationErrors.email ? 'error' : ''}
          />
          {validationErrors.email && (
            <div className="error-message">{validationErrors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            disabled={true} // ID Number is always read-only
            className="read-only"
          />
          <div className="form-hint">ID Number cannot be changed</div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing || isSubmitting}
            className={validationErrors.phoneNumber ? 'error' : ''}
          />
          {validationErrors.phoneNumber && (
            <div className="error-message">{validationErrors.phoneNumber}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address (Optional)</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing || isSubmitting}
            rows={3}
          />
        </div>

        <div className="form-actions">
          {!isEditing ? (
            <button
              type="button"
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="save-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
