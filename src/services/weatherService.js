const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const AIR_BASE_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

// Fetch by city
export async function fetchWeather(city, unit = "metric") {
  const weatherResponse = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=${unit}`
  );

  if (!weatherResponse.ok) {
    throw new Error("location weather not available");
  }

  const weatherData = await weatherResponse.json();
  return await attachAQI(weatherData);
}

// Fetch by coordinates for auto-detect
export async function fetchWeatherByCoords(lat, lon, unit = "metric") {
  const weatherResponse = await fetch(
    `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  );

  if (!weatherResponse.ok) {
    throw new Error("Location weather not available");
  }

  const weatherData = await weatherResponse.json();
  return await attachAQI(weatherData);
}

// Shared AQI logic for cleaner architecture
async function attachAQI(weatherData) {
  const { lat, lon } = weatherData.coord;

  const airResponse = await fetch(
    `${AIR_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!airResponse.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const airData = await airResponse.json();
  const aqi = airData.list[0].main.aqi;

  return {
    ...weatherData,
    aqi,
  };
}