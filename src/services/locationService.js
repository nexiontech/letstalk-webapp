// src/services/locationService.js

/**
 * Service for handling geolocation functionality
 */
class LocationService {
  /**
   * Get mock user position for MVP (no geolocation API calls)
   * @returns {Promise<{latitude: number, longitude: number}>} - Mock coordinates
   */
  async getCurrentPosition() {
    console.log('🚀 MVP Mode - Using mock location data');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock location (Johannesburg area with slight variation)
    const baseLocation = this.getDefaultLocation();
    return {
      latitude: baseLocation.latitude + (Math.random() - 0.5) * 0.1, // Small random variation
      longitude: baseLocation.longitude + (Math.random() - 0.5) * 0.1,
    };
  }

  /**
   * Get a default location to use when geolocation is not available
   * @returns {{latitude: number, longitude: number}} - Default coordinates (Johannesburg)
   */
  getDefaultLocation() {
    // Default to Johannesburg, South Africa
    return {
      latitude: -26.2041,
      longitude: 28.0473,
    };
  }
}

export default new LocationService();
