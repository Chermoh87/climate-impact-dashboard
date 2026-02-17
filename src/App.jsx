import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { fetchWeather } from "./services/weatherService";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    if (!selectedCity) return;

    const getWeather = async () => {
      try {
        setError("");
        const data = await fetchWeather(selectedCity);
        setWeatherData(data);
      } catch (err) {
        setWeatherData(null);
        setError(err.message);
      }
    };

    getWeather();
  }, [selectedCity]);

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} />

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;



