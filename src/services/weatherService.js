// src/services/weatherService.js

/**
 * Weather service for fetching weather data from Open-Meteo API
 */
class WeatherService {
  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
  }

  /**
   * Get weather data for a specific location
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @returns {Promise<Object>} - Weather data
   */
  async getWeatherData(latitude, longitude) {
    try {
      // Build the API URL with required parameters
      const url = new URL(this.baseUrl);

      // Add required parameters
      url.searchParams.append('latitude', latitude);
      url.searchParams.append('longitude', longitude);
      url.searchParams.append('timezone', 'auto');

      // Add current weather parameters
      url.searchParams.append('current', 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation_probability');

      // Add hourly forecast parameters for the next 24 hours
      url.searchParams.append('hourly', 'temperature_2m,weather_code,precipitation_probability');
      url.searchParams.append('forecast_hours', '24');

      // Make the API request
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return this.formatWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  /**
   * Format the raw weather data into a more usable structure
   * @param {Object} data - Raw weather data from the API
   * @returns {Object} - Formatted weather data
   */
  formatWeatherData(data) {
    if (!data || !data.current) {
      throw new Error('Invalid weather data received');
    }

    // Get the weather condition based on the weather code
    const weatherCondition = this.getWeatherCondition(data.current.weather_code);

    return {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        condition: weatherCondition,
        weatherCode: data.current.weather_code,
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        precipitationProbability: data.current.precipitation_probability,
        location: data.timezone.split('/').pop().replace('_', ' ') // Extract location from timezone
      },
      hourly: data.hourly ? {
        time: data.hourly.time,
        temperature: data.hourly.temperature_2m,
        weatherCode: data.hourly.weather_code,
        precipitationProbability: data.hourly.precipitation_probability
      } : null,
      units: {
        temperature: data.current_units?.temperature_2m || '°C',
        windSpeed: data.current_units?.wind_speed_10m || 'km/h'
      }
    };
  }

  /**
   * Get the weather condition description based on the WMO weather code
   * @param {number} code - WMO weather code
   * @returns {string} - Weather condition description
   */
  getWeatherCondition(code) {
    // WMO Weather interpretation codes (WW)
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };

    return weatherCodes[code] || 'Unknown';
  }

  /**
   * Get the appropriate weather icon based on the WMO weather code and whether it's day or night
   * @param {number} code - WMO weather code
   * @param {boolean} isDay - Whether it's day or night
   * @returns {string} - FontAwesome icon name
   */
  getWeatherIcon(code, isDay = true) {
    // Map weather codes to FontAwesome icons
    const iconMap = {
      0: isDay ? 'sun' : 'moon', // Clear sky
      1: isDay ? 'sun' : 'moon', // Mainly clear
      2: isDay ? 'cloud-sun' : 'cloud-moon', // Partly cloudy
      3: 'cloud', // Overcast
      45: 'smog', // Fog
      48: 'smog', // Depositing rime fog
      51: 'cloud-rain', // Light drizzle
      53: 'cloud-rain', // Moderate drizzle
      55: 'cloud-showers-heavy', // Dense drizzle
      56: 'cloud-rain', // Light freezing drizzle
      57: 'cloud-showers-heavy', // Dense freezing drizzle
      61: 'cloud-rain', // Slight rain
      63: 'cloud-rain', // Moderate rain
      65: 'cloud-showers-heavy', // Heavy rain
      66: 'cloud-rain', // Light freezing rain
      67: 'cloud-showers-heavy', // Heavy freezing rain
      71: 'snowflake', // Slight snow fall
      73: 'snowflake', // Moderate snow fall
      75: 'snowflake', // Heavy snow fall
      77: 'snowflake', // Snow grains
      80: 'cloud-rain', // Slight rain showers
      81: 'cloud-rain', // Moderate rain showers
      82: 'cloud-showers-heavy', // Violent rain showers
      85: 'snowflake', // Slight snow showers
      86: 'snowflake', // Heavy snow showers
      95: 'bolt', // Thunderstorm
      96: 'bolt', // Thunderstorm with slight hail
      99: 'bolt' // Thunderstorm with heavy hail
    };

    return iconMap[code] || 'question';
  }
}

export default new WeatherService();
