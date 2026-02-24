
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  // Fetch weather data
  const weatherResponse = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!weatherResponse.ok) {
    throw new Error("City not found");
  }

  const weatherData = await weatherResponse.json();

  const { lat, lon } = weatherData.coord;

  // Fetch air quality data
  const airResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!airResponse.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const airData = await airResponse.json();

  const aqi = airData.list[0].main.aqi;

  // Merge weather + AQI
  return {
    ...weatherData,
    aqi,
  };
}