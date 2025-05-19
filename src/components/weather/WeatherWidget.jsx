// src/components/weather/WeatherWidget.jsx
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
  faWind,
  faTint,
  faQuestion,
  faSmog,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './WeatherWidget.css';

const WeatherWidget = ({
  weatherData,
  isLoading,
  error,
  onRefresh,
  temperatureUnit = 'C',
  className = ''
}) => {
  // If there's an error, show error state
  if (error) {
    return (
      <div className={`weather-widget weather-widget-error ${className}`}>
        <div className="weather-error">
          <FontAwesomeIcon icon={faExclamationTriangle} className="weather-error-icon" />
          <span>Unable to load weather data</span>
          {onRefresh && (
            <button className="weather-refresh-btn" onClick={onRefresh}>
              Try Again
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
          <div className="weather-loading-spinner"></div>
          <span>Loading weather data...</span>
        </div>
      </div>
    );
  }

  const { current } = weatherData;

  // Get the appropriate weather icon based on the weather code
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

  // Format temperature based on selected unit
  const formatTemperature = (temp) => {
    if (temperatureUnit === 'F') {
      // Convert Celsius to Fahrenheit
      return `${Math.round((temp * 9/5) + 32)}°F`;
    }
    return `${temp}°C`;
  };

  return (
    <div className={`weather-widget ${className}`}>
      <div className="weather-icon-container">
        <FontAwesomeIcon
          icon={getWeatherIcon(current.weatherCode)}
          className="weather-icon"
        />
      </div>
      <div className="weather-info">
        <div className="weather-temp-container">
          <span className="weather-temp">{formatTemperature(current.temperature)}</span>
          {temperatureUnit === 'C' ? (
            <button
              className="unit-toggle"
              onClick={() => onRefresh && onRefresh('F')}
              title="Switch to Fahrenheit"
            >
              °F
            </button>
          ) : (
            <button
              className="unit-toggle"
              onClick={() => onRefresh && onRefresh('C')}
              title="Switch to Celsius"
            >
              °C
            </button>
          )}
        </div>
        <span className="weather-condition">{current.condition}</span>
      </div>
      <div className="weather-details">
        <div className="weather-detail">
          <FontAwesomeIcon icon={faTint} className="detail-icon" />
          <span>{current.humidity}%</span>
        </div>
        <div className="weather-detail">
          <FontAwesomeIcon icon={faWind} className="detail-icon" />
          <span>{current.windSpeed} {weatherData.units.windSpeed}</span>
        </div>
        {current.precipitationProbability !== undefined && (
          <div className="weather-detail">
            <FontAwesomeIcon icon={faCloudRain} className="detail-icon" />
            <span>{current.precipitationProbability}%</span>
          </div>
        )}
      </div>
      <div className="weather-location">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>{current.location}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
