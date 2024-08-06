import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Weather.css";
import backgroundimagehome from "../assets/fondo_home.jpg";
import Language from "../components/Language";
import { useLanguage } from "../data/LanguageContext";

const API_KEY = "b5da7bdef55cef5ed31a1a403656e873";
const CITIES = {
  london: { lat: 51.5074, lon: -0.1278 },
  toronto: { lat: 43.65107, lon: -79.347015 },
  singapore: { lat: 1.352083, lon: 103.819836 },
  madrid: { lat: 40.4168, lon: -3.7038 },
};

const Weather = () => {
  const { translations } = useLanguage();
  const [city, setCity] = useState("london");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { lat, lon } = CITIES[city];
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError(translations.errorFetchingData || "Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, translations]);

  const getCurrentDate = () => {
    const { daysOfWeek, monthsOfYear } = translations;
    const now = new Date();
    const day = now.getDate();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const year = now.getFullYear();
    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  const getDailyForecast = () => {
    if (!weatherData) return [];
    const dailyData = {};
    weatherData.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toISOString().split("T")[0];
      if (!dailyData[day]) {
        dailyData[day] = { min: entry.main.temp, max: entry.main.temp };
      } else {
        dailyData[day].min = Math.min(dailyData[day].min, entry.main.temp);
        dailyData[day].max = Math.max(dailyData[day].max, entry.main.temp);
      }
    });
    return Object.keys(dailyData).map((day) => ({
      date: day,
      ...dailyData[day],
    }));
  };

  if (loading) return <div>{translations.loading || "Loading..."}</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return null;

  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`;

  const hourlyForecast = weatherData.list.filter((_, index) => index % 1 === 0).slice(0, 40);
  const dailyForecast = getDailyForecast();

  return (
    <>
      <div className="container">
        <div className="language-container">
          <Language />
        </div>
        <img className="background-image-home" src={backgroundimagehome} alt="background" />
        <div
          className="sidebar"
          ref={sidebarRef}
          onMouseEnter={() => sidebarRef.current.classList.add("expanded")}
          onMouseLeave={() => sidebarRef.current.classList.remove("expanded")}
        >
          <h2>{translations.selectCity || "Select a city"}</h2>
          <ul>
            {Object.keys(CITIES).map((cityKey) => (
              <li
                key={cityKey}
                className={city === cityKey ? "active" : ""}
                onClick={() => setCity(cityKey)}
              >
                {cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="weather-content">
          <h1 className="title-weather">
            {translations.weatherInfo || "Weather Information for"}: {city.charAt(0).toUpperCase() + city.slice(1)}
          </h1>
          <div className="date-container">
            <h2>{getCurrentDate()}</h2>
          </div>
          <div className="information-weather">
            <div className="current-weather">
              <h2>{translations.currentWeather || "Current Weather"}</h2>
              <img className="i-weather" src={weatherIcon} alt={weatherData.list[0].weather[0].description} />
              <p className="text-current-style">{translations.temperature || "Temperature"}: {weatherData.list[0].main.temp}°C</p>
              <p className="text-current-style">{translations.feelsLike || "Feels Like"}: {weatherData.list[0].main.feels_like}°C</p>
              <p className="text-current-style">{translations.humidity || "Humidity"}: {weatherData.list[0].main.humidity}%</p>
              <p className="text-current-style">{translations.condition || "Condition"}: {weatherData.list[0].weather[0].description}</p>
            </div>

            <div className="daily-weather">
              <h2>{translations.dailyForecast || "Daily Forecast"}</h2>
              <p>{translations.next5Days || "and the next 5 days:"}</p>
              {dailyForecast.map((day, index) => {
                const date = new Date(day.date);
                const dayOfWeek = date.toLocaleDateString(translations.locale || "es-ES", { weekday: "long" });
                return (
                  <div key={index} className="daily-weather-item">
                    <p className="text-title-daily-style">{dayOfWeek}</p>
                    <p className="text-daily-style">{translations.max || "Max"}: {day.max}°C</p>
                    <p className="text-daily-style">{translations.min || "Min"}: {day.min}°C</p>
                  </div>
                );
              })}
            </div>

            <div className="hourly-weather">
              <h2>{translations.hourlyForecast || "Hourly Forecast"}</h2>
              {hourlyForecast.map((hour, index) => {
                const date = new Date(hour.dt * 1000);
                const dayOfWeek = date.toLocaleDateString(translations.locale || "es-ES", { weekday: "long" });
                const hours = date.getHours();
                const formattedTime = `${dayOfWeek}, ${hours}:00`;

                return (
                  <div key={index} className="hourly-weather-item">
                    <p className="text-hourly-style">{formattedTime}</p>
                    <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
                    <p className="text-hourly-style">{hour.main.temp}°C</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
