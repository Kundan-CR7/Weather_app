import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: "--",
    windSpeed: "--",
    temperature: "--",
    location: "--",
    icon: clear_icon,
  });
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city.trim() === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData({
        humidity: "--",
        windSpeed: "--",
        temperature: "--",
        location: "--",
        icon: clear_icon,
      });
      console.log("Error in fetching weather data");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="heading">Weatherly</p>
      <div className="weather">
        <div className="search-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Check weather..."
            className="input"
          />
          {/* <img
            src={search_icon}
            onClick={() => search(inputRef.current.value)}
            className="search_icon"
          /> */}
          <svg
            viewBox="0 0 24 24"
            class="search__icon"
            onClick={() => search(inputRef.current.value)}
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
        <p className="current-time">{currentTime}</p>
        <img src={weatherData.icon} className="weather-icon" alt="weather" />
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="humidity" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="wind speed" />
            <div>
              <p>{weatherData.windSpeed} Km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
