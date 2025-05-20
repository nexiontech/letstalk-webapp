// src/hooks/useWeather.js
import { useState, useEffect } from 'react';
import weatherService from '../services/weatherService';
import locationService from '../services/locationService';

/**
 * Custom hook for fetching and managing weather data
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoFetch - Whether to fetch weather data automatically on mount
 * @param {string} options.temperatureUnit - The temperature unit to use (C or F)
 * @returns {Object} - Weather data and state
 */
const useWeather = ({ autoFetch = true, temperatureUnit = 'C' } = {}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(temperatureUnit);



  /**
   * Refresh the weather data or change the temperature unit
   * @param {string} newUnit - Optional new temperature unit
   * @param {Object} customLocation - Optional custom location coordinates
   */
  const refreshWeather = (newUnit, customLocation) => {
    if (newUnit && newUnit !== unit) {
      setUnit(newUnit);
    } else {
      fetchWeatherData(customLocation);
    }
  };

  /**
   * Fetch weather data for a specific location or the current location
   * @param {Object} customLocation - Optional custom location coordinates with name
   */
  const fetchWeatherData = async (customLocation) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the user's location or use custom location if provided
      let userLocation;
      let locationName = null;

      if (customLocation) {
        // Use the provided custom location
        userLocation = customLocation;
        // If the custom location has a name property, save it
        if (customLocation.name) {
          locationName = customLocation.name;
        }
        console.log('Using custom location:', userLocation, 'with name:', locationName);
      } else {
        try {
          // Try to get the user's current location
          userLocation = await locationService.getCurrentPosition();
        } catch (locationError) {
          console.warn('Could not get user location:', locationError.message);
          // Fall back to default location
          userLocation = locationService.getDefaultLocation();
          locationName = 'Johannesburg'; // Default location name
        }
      }

      // Save the location
      setLocation(userLocation);

      // Fetch weather data for the location
      const data = await weatherService.getWeatherData(
        userLocation.latitude,
        userLocation.longitude
      );

      // If we have a custom location name, override the one from the API
      if (locationName) {
        data.current.location = locationName;
      }

      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather data on mount if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchWeatherData();
    }
  }, [autoFetch]);

  return {
    weatherData,
    location,
    isLoading,
    error,
    temperatureUnit: unit,
    fetchWeatherData,
    refreshWeather
  };
};

export default useWeather;
