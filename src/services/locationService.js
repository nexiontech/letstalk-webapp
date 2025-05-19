// src/services/locationService.js

/**
 * Service for handling geolocation functionality
 */
class LocationService {
  /**
   * Get the user's current position
   * @returns {Promise<{latitude: number, longitude: number}>} - The user's coordinates
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported by the browser
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      // Options for the geolocation request
      const options = {
        enableHighAccuracy: true, // Use high accuracy if available
        timeout: 10000, // Time to wait for a position (10 seconds)
        maximumAge: 300000 // Accept cached positions up to 5 minutes old
      };

      // Request the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          let errorMessage;
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access was denied by the user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'The request to get user location timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred while retrieving location';
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  /**
   * Get a default location to use when geolocation is not available
   * @returns {{latitude: number, longitude: number}} - Default coordinates (Johannesburg)
   */
  getDefaultLocation() {
    // Default to Johannesburg, South Africa
    return {
      latitude: -26.2041,
      longitude: 28.0473
    };
  }
}

export default new LocationService();
