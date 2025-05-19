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
   * Fetch weather data for the current location
   */
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the user's location
      let userLocation;
      try {
        userLocation = await locationService.getCurrentPosition();
      } catch (locationError) {
        console.warn('Could not get user location:', locationError.message);
        // Fall back to default location
        userLocation = locationService.getDefaultLocation();
      }

      // Save the location
      setLocation(userLocation);

      // Fetch weather data for the location
      const data = await weatherService.getWeatherData(
        userLocation.latitude,
        userLocation.longitude
      );

      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Refresh the weather data or change the temperature unit
   * @param {string} newUnit - Optional new temperature unit
   */
  const refreshWeather = (newUnit) => {
    if (newUnit && newUnit !== unit) {
      setUnit(newUnit);
    } else {
      fetchWeatherData();
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
