# Weather Widget

## Overview

The Weather Widget is a component displayed on the dashboard that provides users with current weather information for their location. It features a clean, simplified design that shows only essential information: location, temperature in Celsius, and current weather condition, along with a corresponding weather icon.

The widget also allows users to manually change their location through a clickable location text, which opens a modal with common South African locations and a search functionality.

## Features

- Display of current temperature in Celsius
- Display of current weather condition (Clear sky, Partly cloudy, etc.)
- Weather icon that corresponds to the current condition
- Location display with the name of the current city/town
- Interactive location selection through a modal
- Search functionality for finding specific South African locations
- "Use my current location" option for geolocation-based weather data
- Error handling for unavailable weather data
- Loading state while fetching weather information

## Implementation

### Key Files

- **Weather Widget Component**: [`src/components/weather/WeatherWidget.jsx`](../../src/components/weather/WeatherWidget.jsx)
- **Weather Widget Styles**: [`src/components/weather/WeatherWidget.css`](../../src/components/weather/WeatherWidget.css)
- **Weather Hook**: [`src/hooks/useWeather.js`](../../src/hooks/useWeather.js)
- **Weather Service**: [`src/services/weatherService.js`](../../src/services/weatherService.js)
- **Location Service**: [`src/services/locationService.js`](../../src/services/locationService.js)
- **Dashboard Integration**: [`src/pages/DashboardPage.jsx`](../../src/pages/DashboardPage.jsx)

### Weather Widget Component

The Weather Widget component (`src/components/weather/WeatherWidget.jsx`) is responsible for displaying the weather information and handling user interactions. It includes:

- Weather icon display based on current conditions
- Temperature and condition display
- Clickable location text
- Location selection modal with search functionality
- Error and loading states

```jsx
const WeatherWidget = ({
  weatherData,
  isLoading,
  error,
  onRefresh,
  className = ''
}) => {
  // Component state and logic
  
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
        // Modal content for location selection
      )}
    </div>
  );
};
```

### Weather Hook

The `useWeather` hook (`src/hooks/useWeather.js`) manages the weather data fetching and state. It provides:

- Weather data fetching from the API
- Location management (current or custom)
- Error and loading states
- Refresh functionality

```javascript
const useWeather = ({ autoFetch = true, temperatureUnit = 'C' } = {}) => {
  // Hook state and logic
  
  /**
   * Fetch weather data for a specific location or the current location
   * @param {Object} customLocation - Optional custom location coordinates with name
   */
  const fetchWeatherData = async (customLocation) => {
    // Implementation
  };
  
  /**
   * Refresh the weather data or change the temperature unit
   * @param {string} newUnit - Optional new temperature unit
   * @param {Object} customLocation - Optional custom location coordinates
   */
  const refreshWeather = (newUnit, customLocation) => {
    // Implementation
  };
  
  // Effect for initial data fetching
  
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
```

### Weather Service

The Weather Service (`src/services/weatherService.js`) handles the API communication with the Open-Meteo weather API. It includes:

- API request construction
- Data formatting
- Weather condition mapping
- Weather icon mapping

```javascript
class WeatherService {
  /**
   * Get weather data for a specific location
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @returns {Promise<Object>} - Weather data
   */
  async getWeatherData(latitude, longitude) {
    // Implementation
  }
  
  /**
   * Format the raw weather data into a more usable structure
   * @param {Object} data - Raw weather data from the API
   * @returns {Object} - Formatted weather data
   */
  formatWeatherData(data) {
    // Implementation
  }
  
  /**
   * Get the weather condition description based on the WMO weather code
   * @param {number} code - WMO weather code
   * @returns {string} - Weather condition description
   */
  getWeatherCondition(code) {
    // Implementation
  }
}
```

### Location Service

The Location Service (`src/services/locationService.js`) handles geolocation functionality:

- Getting the user's current position
- Providing a default location when geolocation is unavailable

```javascript
class LocationService {
  /**
   * Get the user's current position
   * @returns {Promise<{latitude: number, longitude: number}>} - The user's coordinates
   */
  getCurrentPosition() {
    // Implementation
  }
  
  /**
   * Get a default location to use when geolocation is not available
   * @returns {{latitude: number, longitude: number}} - Default coordinates (Johannesburg)
   */
  getDefaultLocation() {
    // Implementation
  }
}
```

## Integration with Dashboard

The Weather Widget is integrated into the dashboard page (`src/pages/DashboardPage.jsx`) in the header section:

```jsx
<div className="dashboard-header">
  <div className="greeting-container">
    <h1 className="greeting-heading">
      {getGreeting()}{hasRealName ? `, ${firstName}` : ''}
    </h1>
    <p className="date-display">{formattedDate}</p>
  </div>
  <WeatherWidget
    weatherData={weatherData}
    isLoading={isWeatherLoading}
    error={weatherError}
    onRefresh={refreshWeather}
    className="dashboard-weather-widget"
  />
</div>
```

## User Experience

### Default View

The default view of the Weather Widget shows:
- A weather icon representing the current condition
- The current temperature in Celsius
- The current weather condition (e.g., "Clear sky", "Partly cloudy")
- The current location name

### Location Selection

When users click on the location text:
1. A modal opens with a list of common South African locations
2. Users can search for specific locations
3. Users can select a location from the list or search results
4. Users can choose to use their current location

### Error and Loading States

The widget handles different states gracefully:
- Loading state while fetching weather data
- Error state when weather data is unavailable
- Retry functionality when errors occur

## Future Enhancements

Potential future enhancements for the Weather Widget include:

- Weather forecast for upcoming days
- Additional weather details (humidity, wind speed, etc.) in an expandable view
- Weather alerts for severe conditions
- User-saved favorite locations
- Automatic location updates based on user movement
- Temperature unit toggle (Celsius/Fahrenheit)
- Dark mode support with appropriate icon and color changes
