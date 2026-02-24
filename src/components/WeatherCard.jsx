function WeatherCard({ data }) {

  const getAQILabel = (aqi) => {
    switch (aqi) {
      case 1:
        return "🟢 Good";
      case 2:
        return "🟡 Fair";
      case 3:
        return "🟠 Moderate";
      case 4:
        return "🔴 Poor";
      case 5:
        return "🟣 Very Poor";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="weather-card">
      <h2 className="weather-city">{data.name}</h2>

      <div className="weather-details">
        <p><strong>Temperature:</strong> {data.main.temp} °C</p>
        <p><strong>Humidity:</strong> {data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
      </div>

      <div className="aqi-section">
        <p><strong>Air Quality:</strong> {getAQILabel(data.aqi)}</p>
      </div>

      {data.weather && data.weather[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="weather-icon"
        />
        
      )}
    </div>
  );
}

export default WeatherCard;
