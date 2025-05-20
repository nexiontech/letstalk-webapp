// src/components/weather/WeatherWidget.jsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog,
  faQuestion,
  faLocationArrow,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './WeatherWidget.css';

const WeatherWidget = ({
  weatherData,
  isLoading,
  error,
  onRefresh,
  className = ''
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to get the appropriate weather icon based on the weather code
  const getWeatherIcon = (code) => {
    // Map weather codes to FontAwesome icons
    const iconMap = {
      0: faSun, // Clear sky
      1: faSun, // Mainly clear
      2: faCloudSun, // Partly cloudy
      3: faCloud, // Overcast
      45: faSmog, // Fog
      48: faSmog, // Depositing rime fog
      51: faCloudRain, // Light drizzle
      53: faCloudRain, // Moderate drizzle
      55: faCloudShowersHeavy, // Dense drizzle
      56: faCloudRain, // Light freezing drizzle
      57: faCloudShowersHeavy, // Dense freezing drizzle
      61: faCloudRain, // Slight rain
      63: faCloudRain, // Moderate rain
      65: faCloudShowersHeavy, // Heavy rain
      66: faCloudRain, // Light freezing rain
      67: faCloudShowersHeavy, // Heavy freezing rain
      71: faSnowflake, // Slight snow fall
      73: faSnowflake, // Moderate snow fall
      75: faSnowflake, // Heavy snow fall
      77: faSnowflake, // Snow grains
      80: faCloudRain, // Slight rain showers
      81: faCloudRain, // Moderate rain showers
      82: faCloudShowersHeavy, // Violent rain showers
      85: faSnowflake, // Slight snow showers
      86: faSnowflake, // Heavy snow showers
      95: faBolt, // Thunderstorm
      96: faBolt, // Thunderstorm with slight hail
      99: faBolt // Thunderstorm with heavy hail
    };

    return iconMap[code] || faQuestion;
  };

  // Common South African locations for quick selection
  const commonLocations = [
    { name: 'Johannesburg', latitude: -26.2041, longitude: 28.0473 },
    { name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 },
    { name: 'Durban', latitude: -29.8587, longitude: 31.0218 },
    { name: 'Pretoria', latitude: -25.7461, longitude: 28.1881 },
    { name: 'Port Elizabeth', latitude: -33.9608, longitude: 25.6022 },
    { name: 'Bloemfontein', latitude: -29.0852, longitude: 26.1596 },
  ];

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);

    // Call onRefresh with the new location if provided
    if (onRefresh && location) {
      onRefresh(null, { latitude: location.latitude, longitude: location.longitude });
    }
  };

  // If there's an error, show error state
  if (error) {
    return (
      <div className={`weather-widget weather-widget-error ${className}`}>
        <div className="weather-error">
          <span>Weather unavailable</span>
          {onRefresh && (
            <button className="weather-refresh-btn" onClick={onRefresh}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if (isLoading || !weatherData) {
    return (
      <div className={`weather-widget weather-widget-loading ${className}`}>
        <div className="weather-loading">
          <span>Loading weather...</span>
        </div>
      </div>
    );
  }

  const { current } = weatherData;

  // Format temperature in Celsius only
  const formatTemperature = (temp) => {
    return `${temp}°C`;
  };

  return (
    <div className={`weather-widget ${className}`}>
      <div className="weather-content">
        {/* Weather icon based on condition */}
        <div className="weather-icon">
          <FontAwesomeIcon
            icon={getWeatherIcon(current.weatherCode)}
            size="2x"
          />
        </div>

        <div className="weather-details">
          <div className="weather-info">
            <span className="weather-temp">{formatTemperature(current.temperature)}</span>
            <span className="weather-condition">{current.condition}</span>
          </div>
          <div
            className="weather-location"
            onClick={() => setShowLocationModal(true)}
            title="Click to change location"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{current.location}</span>
          </div>
        </div>
      </div>

      {/* Location selection modal */}
      {showLocationModal && (
        <div className="location-modal">
          <div className="location-modal-content">
            <div className="location-modal-header">
              <h3>Select Location</h3>
              <button
                className="close-button"
                onClick={() => setShowLocationModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="location-options">
              {commonLocations.map((location) => (
                <button
                  key={location.name}
                  className="location-option"
                  onClick={() => handleLocationSelect(location)}
                >
                  {location.name}
                </button>
              ))}
            </div>
            <div className="location-modal-footer">
              <button
                className="use-current-location"
                onClick={() => {
                  handleLocationSelect(null); // null means use current location
                }}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
                Use my current location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
