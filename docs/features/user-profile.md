# User Profile Management

## Overview

The User Profile Management feature allows users to view and edit their personal information. It integrates with AWS Cognito for authentication and profile data storage, and includes the South African ID number parser to automatically extract and display additional information from the user's ID number.

## Features

- View and edit personal information
- Automatic extraction of information from South African ID numbers
- Form validation for user inputs
- Error handling for API calls
- Integration with AWS Cognito for data storage

## Implementation

### Key Files

- **Profile Page**: [`src/pages/UserProfilePage.jsx`](../../src/pages/UserProfilePage.jsx)
- **Profile Form**: [`src/components/UserProfileForm.jsx`](../../src/components/UserProfileForm.jsx)
- **ID Number Info**: [`src/components/IdNumberInfo.jsx`](../../src/components/IdNumberInfo.jsx)
- **Profile Service**: [`src/services/userProfileService.js`](../../src/services/userProfileService.js)
- **ID Number Parser**: [`src/utils/idNumberParser.js`](../../src/utils/idNumberParser.js)

### User Profile Page

The User Profile Page (`src/pages/UserProfilePage.jsx`) is the main component for the user profile feature. It includes:

- A section for displaying ID number information
- A form for editing personal information
- Error and success message handling

```jsx
<Paper elevation={3} className="profile-paper">
  <Typography variant="h2" className="section-title">
    <FontAwesomeIcon icon={faIdCard} className="section-icon" />
    ID Information
  </Typography>
  <Typography variant="body1" className="section-description">
    Information extracted from your South African ID number
  </Typography>

  {user?.idNumber && <IdNumberInfo idNumber={user.idNumber} />}
</Paper>

<Paper elevation={3} className="profile-paper">
  <Typography variant="h2" className="section-title">
    <FontAwesomeIcon icon={faUser} className="section-icon" />
    Personal Information
  </Typography>
  <Typography variant="body1" className="section-description">
    Update your personal information and contact details
  </Typography>

  <UserProfileForm 
    user={user} 
    onUpdateSuccess={handleUpdateSuccess} 
    onUpdateError={handleUpdateError} 
  />
</Paper>
```

### User Profile Form

The User Profile Form (`src/components/UserProfileForm.jsx`) allows users to edit their personal information. It includes:

- Form fields for name, email, phone number, and address
- Form validation
- Edit/Save/Cancel buttons
- Loading indicators

```jsx
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

    {/* Other form fields... */}

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
```

### User Profile Service

The User Profile Service (`src/services/userProfileService.js`) handles API calls to update user attributes in Cognito:

```javascript
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
    
    // Update Redux store and localStorage
    store.dispatch(updateUserProfile(updatedUser));
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    
    return {
      success: true,
      user: updatedUser
    };
  } catch (error) {
    // Error handling...
  }
};
```

## Navigation and Access

The user profile page is accessible through:

1. The dashboard sidebar user profile section
2. The "My Profile" link in the sidebar footer
3. Direct navigation to `/profile` (protected route)

```jsx
<div 
  className="user-profile-section" 
  onClick={() => {
    navigate('/profile');
    if (mobileMenuOpen) setMobileMenuOpen(false);
  }}
  style={{ cursor: 'pointer' }}
  title="View and edit your profile"
>
  <div className="user-avatar">
    {userInitial}
  </div>
  <div className="user-info">
    <div className="user-name">{hasRealName ? userName : 'User'}</div>
    {user?.idNumber && (
      <div className="user-id-number">
        ID: {user.idNumber.replace(/(\d{6})(\d{4})(\d{3})/, '$1 $2 $3')}
      </div>
    )}
  </div>
  <FontAwesomeIcon icon={faCog} className="profile-edit-icon" />
</div>
```

## Form Validation

The User Profile Form includes validation for:

- Name (required)
- Email (required, valid format)
- Phone number (valid format if provided)

```javascript
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

  // Validate phone number if provided
  if (formData.phoneNumber && !/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

## Error Handling

The User Profile feature includes comprehensive error handling for:

- Form validation errors
- API call failures
- Authentication errors
- Invalid ID numbers

Errors are displayed to the user with clear messages and instructions for resolution.

## Future Enhancements

Planned enhancements for the User Profile feature include:

- Profile picture upload and management
- Additional security options (MFA, security questions)
- Expanded profile information (preferences, notification settings)
- Integration with other services (e.g., address verification)
