// src/components/weather/WeatherWidget.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './WeatherWidget.css';

const WeatherWidget = ({
  weatherData,
  isLoading,
  error,
  onRefresh,
  className = '',
}) => {
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

  // We don't need the weather icon for the simplified version

  // Format temperature in Celsius only
  const formatTemperature = temp => {
    return `${temp}°C`;
  };

  return (
    <div className={`weather-widget ${className}`}>
      <div className="weather-info">
        <span className="weather-temp">
          {formatTemperature(current.temperature)}
        </span>
        <span className="weather-condition">{current.condition}</span>
      </div>
      <div className="weather-location">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>{current.location}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
