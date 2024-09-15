import React from "react";
import "../styles/Home.css";
import { useSound } from "../data/soundContext";
import backgroundimagehome from "../assets/fondo_home.jpg";
import { Link } from "react-router-dom";
import Language from "../components/Language";
import { useLanguage } from "../data/LanguageContext";

const translations = {
  es: {
    welcome: "¡BIENVENIDO/A",
    app: "A TU APP",
    weather: "DEL CLIMA!",
    continue: "CONTINUAR",
  },
  en: {
    welcome: "WELCOME",
    app: "TO YOUR APP",
    weather: "OF WEATHER!",
    continue: "CONTINUE",
  },
};

const Home = () => {
  const { playSound } = useSound();
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <div className="home-page-container">
      <div className="language-container">
        <Language />
      </div>
      <img
        className="background-image-home"
        src={backgroundimagehome}
        alt="background_home"
      />
      <div className="home-message-container">
        <div className="messages_home">
          <h1 className="first-m">{t.welcome}</h1>
          <h1 className="second-m">{t.app}</h1>
          <h1 className="third-m">{t.weather}</h1>
        </div>
        <div>
          <Link className="h-submit" to="/login" onClick={playSound}>
            {t.continue}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
