import "./App.css";
import { useRef, useState } from "react";
import clear from "./asserts/clear.jpeg";
import cloudy from "./asserts/cloudy.png";
import drizzle from "./asserts/dizzle.png";
import snow from "./asserts/snow.jpeg";
import wind from "./asserts/wind.png";
import humidityIcon from "./asserts/humidity.png";
import rain from "./asserts/rain.jpeg";

function App() {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const allIconsId = {
    "01d": clear,
    "01n": clear,
    "02d": cloudy,
    "02n": cloudy,
    "03d": cloudy,
    "03n": cloudy,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city.trim() === "") {
      alert("Please enter a city name!");
      return;
    }

    try {
      let API_ID = "850ebebe208e9a5aad3a8473538ccd68";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
        return;
      }

      const icon = allIconsId[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setError(null);
    } catch (error) {
      setError("Failed to fetch weather data!");
      setWeatherData(null);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search-bar">
          <input type="text" placeholder="Search City" ref={inputRef} />
          <button onClick={() => search(inputRef.current.value)}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>

            <div className="details">
              <div className="info-box">
                <img src={humidityIcon} alt="Humidity" />
                <p>{weatherData.humidity}% Humidity</p>
              </div>
              <div className="info-box">
                <img src={wind} alt="Wind Speed" />
                <p>{weatherData.windSpeed} Km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
