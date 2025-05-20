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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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
    { name: 'East London', latitude: -33.0292, longitude: 27.8546 },
    { name: 'Kimberley', latitude: -28.7323, longitude: 24.7623 },
    { name: 'Polokwane', latitude: -23.9045, longitude: 29.4688 },
    { name: 'Nelspruit', latitude: -25.4753, longitude: 30.9694 },
    { name: 'Upington', latitude: -28.4478, longitude: 21.2561 },
    { name: 'George', latitude: -33.9833, longitude: 22.4500 },
  ];

  // More South African locations for search results
  const allSouthAfricanLocations = [
    ...commonLocations,
    { name: 'Soweto', latitude: -26.2485, longitude: 27.8540 },
    { name: 'Pietermaritzburg', latitude: -29.6168, longitude: 30.3928 },
    { name: 'Rustenburg', latitude: -25.6667, longitude: 27.2500 },
    { name: 'Potchefstroom', latitude: -26.7167, longitude: 27.1000 },
    { name: 'Stellenbosch', latitude: -33.9321, longitude: 18.8602 },
    { name: 'Paarl', latitude: -33.7333, longitude: 18.9500 },
    { name: 'Worcester', latitude: -33.6500, longitude: 19.4500 },
    { name: 'Grahamstown', latitude: -33.3000, longitude: 26.5333 },
    { name: 'Midrand', latitude: -25.9667, longitude: 28.1333 },
    { name: 'Centurion', latitude: -25.8500, longitude: 28.1833 },
    { name: 'Sandton', latitude: -26.1000, longitude: 28.0500 },
    { name: 'Randburg', latitude: -26.0833, longitude: 28.0000 },
    { name: 'Roodepoort', latitude: -26.1667, longitude: 27.8667 },
    { name: 'Boksburg', latitude: -26.2167, longitude: 28.2500 },
    { name: 'Benoni', latitude: -26.1833, longitude: 28.3167 },
    { name: 'Vereeniging', latitude: -26.6736, longitude: 27.9319 },
    { name: 'Krugersdorp', latitude: -26.1000, longitude: 27.7667 },
    { name: 'Witbank', latitude: -25.8714, longitude: 29.2332 },
    { name: 'Klerksdorp', latitude: -26.8667, longitude: 26.6667 },
    { name: 'Welkom', latitude: -27.9833, longitude: 26.7333 },
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Filter locations based on search query
    const results = allSouthAfricanLocations.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
    setSearchQuery('');
    setSearchResults([]);

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

            {/* Search input */}
            <div className="location-search">
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="location-search-input"
              />
            </div>

            <div className="location-options">
              {searchQuery.trim() === '' ? (
                // Show common locations when not searching
                commonLocations.map((location) => (
                  <button
                    key={location.name}
                    className="location-option"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <span className="location-name">{location.name}</span>
                  </button>
                ))
              ) : (
                // Show search results
                searchResults.length > 0 ? (
                  searchResults.map((location) => (
                    <button
                      key={location.name}
                      className="location-option"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <span className="location-name">{location.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="no-results">No locations found</div>
                )
              )}
            </div>

            <div className="location-modal-footer">
              <button
                className="use-current-location"
                onClick={() => {
                  handleLocationSelect(null); // null means use current location
                }}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
                <span>Use my current location</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
