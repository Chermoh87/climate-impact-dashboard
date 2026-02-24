import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { fetchWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Footer from "./components/Footer";


function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    if (!selectedCity) return;

    const getWeather = async () => {
      try {
        setLoading(true);
        setError("");
        setWeatherData(null);

        const data = await fetchWeather(selectedCity);
        setWeatherData(data);
      } catch (err) {
        setWeatherData(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getWeather();
  }, [selectedCity]);

 return (
  <div className="page-wrapper">
    <div className="app-container">
      <Header />
      <SearchBar onSearch={handleSearch} />

      {loading && <Loading />}
      {error && !loading && <ErrorMessage message={error} />}
      {weatherData && !loading && !error && (
        <WeatherCard data={weatherData} />
      )}
    </div>

    <Footer />
  </div>
);
}

export default App;



