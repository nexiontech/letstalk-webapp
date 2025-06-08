# Maintenance Mode Implementation

This document describes the maintenance mode feature implemented for the Let's Talk webapp.

## Overview

The maintenance mode feature allows administrators to display a full-screen maintenance overlay when the site is undergoing maintenance. This ensures users are informed about the maintenance and provides them with appropriate contact information.

## Features

- **Full-screen maintenance overlay** that covers the entire application
- **Responsive design** that works on both desktop and mobile devices
- **Material UI theme integration** using the existing design system
- **SEO meta tags** indicating the site is temporarily unavailable
- **Configurable messages** via environment variables or configuration file
- **Proper layering** - displays after security validation but before normal app content
- **Smooth animations** with fade-in effects

## Configuration

### Environment Variables

The maintenance mode can be controlled using the following environment variables:

```bash
# Enable/disable maintenance mode
VITE_MAINTENANCE_MODE=true

# Custom maintenance message
VITE_MAINTENANCE_MESSAGE="We are currently performing scheduled maintenance to improve your experience."

# Estimated completion time message
VITE_MAINTENANCE_ESTIMATED_TIME="We expect to be back online within the next few hours. Please check back soon."

# Contact email for support
VITE_MAINTENANCE_CONTACT_EMAIL="support@saya-setona.co.za"
```

### Configuration File

Alternatively, you can modify the configuration in `src/config/maintenanceConfig.js`:

```javascript
export const maintenanceConfig = {
  isEnabled: false, // Set to true to enable maintenance mode
  message: 'Your custom maintenance message here',
  estimatedTime: 'Your estimated completion time here',
  contactEmail: 'your-support@email.com',
};
```

## Usage

### Enabling Maintenance Mode

**Method 1: Environment Variable (Recommended for production)**
```bash
# Set environment variable
export VITE_MAINTENANCE_MODE=true

# Or create/update .env.local file
echo "VITE_MAINTENANCE_MODE=true" >> .env.local

# Restart the application
npm run dev
```

**Method 2: Configuration File (Recommended for development)**
```javascript
// Edit src/config/maintenanceConfig.js
export const maintenanceConfig = {
  isEnabled: true, // Change this to true
  // ... other settings
};
```

### Disabling Maintenance Mode

**Method 1: Environment Variable**
```bash
# Remove or set to false
export VITE_MAINTENANCE_MODE=false

# Or update .env.local file
echo "VITE_MAINTENANCE_MODE=false" >> .env.local
```

**Method 2: Configuration File**
```javascript
// Edit src/config/maintenanceConfig.js
export const maintenanceConfig = {
  isEnabled: false, // Change this to false
  // ... other settings
};
```

## Technical Implementation

### Component Structure

- **MaintenanceMode.jsx** - The main maintenance mode component
- **maintenanceConfig.js** - Configuration file for maintenance settings
- **envUtils.js** - Updated to include maintenance mode configuration helpers
- **App.jsx** - Integrated maintenance mode check into the main application flow

### Integration Points

1. **Security Validation** - Maintenance mode displays after security validation
2. **SEO Integration** - Proper meta tags for search engines
3. **Theme Integration** - Uses Material UI theme colors and typography
4. **Responsive Design** - Adapts to different screen sizes

### Z-Index Layering

The maintenance mode uses a z-index of 9999, which ensures it displays:
- **Above** normal application content
- **Below** security validation overlays (z-index 10000+)

## Customization

### Styling

The maintenance mode component uses Material UI's theming system. You can customize the appearance by modifying:

- Colors: Uses `theme.palette.primary.main` and `theme.palette.secondary.main`
- Typography: Uses theme typography variants
- Spacing: Uses Material UI's spacing system
- Shadows: Uses theme shadow definitions

### Messages

You can customize the maintenance messages by:

1. Setting environment variables (highest priority)
2. Modifying the configuration file
3. Updating the default values in `envUtils.js`

### Logo

The maintenance mode displays the logo from `public/logo.png`. Ensure this file exists and is properly sized.

## Testing

### Manual Testing

1. Enable maintenance mode using one of the methods above
2. Navigate to any page of the application
3. Verify the maintenance screen displays correctly
4. Test on different screen sizes (desktop, tablet, mobile)
5. Verify the contact email link works
6. Disable maintenance mode and verify normal operation resumes

### Automated Testing

Consider adding tests for:
- Maintenance mode component rendering
- Configuration loading
- Environment variable handling
- SEO meta tag generation

## Deployment Considerations

### Production Deployment

1. **Environment Variables**: Use your deployment platform's environment variable system
2. **Build Process**: Ensure environment variables are available during build
3. **Monitoring**: Set up monitoring to detect when maintenance mode is enabled
4. **Communication**: Notify users in advance when possible

### Emergency Maintenance

For emergency maintenance:

1. Set `VITE_MAINTENANCE_MODE=true` in your deployment environment
2. Redeploy or restart the application
3. The maintenance screen will be displayed immediately

## Troubleshooting

### Common Issues

1. **Maintenance mode not showing**: Check environment variable spelling and case sensitivity
2. **Logo not displaying**: Verify `public/logo.png` exists and is accessible
3. **Styling issues**: Ensure Material UI theme is properly loaded
4. **SEO tags not updating**: Check that SEOHead component is functioning correctly

### Debug Information

The maintenance configuration is logged to the console during development. Check the browser console for configuration details.

## Future Enhancements

Potential improvements for the maintenance mode feature:

1. **Scheduled Maintenance**: Automatic enable/disable based on date/time
2. **IP Whitelisting**: Allow certain IP addresses to bypass maintenance mode
3. **Partial Maintenance**: Enable maintenance mode for specific routes only
4. **Progress Indicators**: Show maintenance progress or estimated completion
5. **Multi-language Support**: Maintenance messages in multiple languages

## Git Branch

This feature was implemented in the branch: `feature/LT-301-maintenance-mode-screen`

## Files Modified/Created

- `src/components/MaintenanceMode.jsx` (new)
- `src/config/maintenanceConfig.js` (new)
- `src/utils/envUtils.js` (modified)
- `src/App.jsx` (modified)
- `MAINTENANCE_MODE_README.md` (new)
