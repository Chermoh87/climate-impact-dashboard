import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { fetchWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";

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

      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;



