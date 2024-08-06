import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    title: "User Registration",
    name: "Name",
    lastname: "Last Name",
    birthdate: "Date of Birth",
    gender: "Gender",
    email: "Email",
    password: "Password",
    showPassword: "Show Password",
    submit: "Register",
    errorPassword: "Password can not contain spaces.",
    errorDate: "Date of birth must be in the format dd-mm-yyyy and the year must be less than or equal to the current year.",
    success: "User registered successfully",
    missingFields: "The following fields are missing or incorrect: ",
    select: "Select",
    male: "Male",
    female: "Female",
    other: "Other",
    date: "dd-mm-yyyy",
    selectCity: "Select a city",
    weatherInfo: "Weather Information for",
    currentWeather: "Current Weather",
    temperature: "Temperature",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    condition: "Condition",
    dailyForecast: "Daily Forecast",
    next5Days: "and the next 5 days:",
    hourlyForecast: "Hourly Forecast",
    max: "Max",
    min: "Min",
    loading: "Loading...",
    errorFetchingData: "Error fetching weather data",
    of: "of",
    locale: "en-US",
    daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    passwordError: "The password must be 8 to 20 characters long, including uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special characters (! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~)."
  },
  es: {
    title: "Registro de Usuario",
    name: "Nombre",
    lastname: "Apellidos",
    birthdate: "Fecha de Nacimiento",
    gender: "Género",
    email: "Correo Electrónico",
    password: "Contraseña",
    showPassword: "Mostrar contraseña",
    submit: "Registrarse",
    errorPassword: "La contraseña no debe contener espacios.",
    errorDate: "La fecha de nacimiento debe estar en el formato dd-mm-yyyy y el año debe ser menor o igual al año actual.",
    success: "Usuario registrado con éxito",
    missingFields: "Faltan los siguientes campos por rellenar o son incorrectos: ",
    select: "Seleccione",
    male: "Masculino",
    female: "Femenino",
    other: "Otro",
    date: "dd-mm-aaaa",
    selectCity: "Selecciona una ciudad",
    weatherInfo: "Información del clima de",
    currentWeather: "Clima Actual",
    temperature: "Temperatura",
    feelsLike: "Sensación Térmica",
    humidity: "Humedad",
    condition: "Condición",
    dailyForecast: "Pronóstico Diario",
    next5Days: "y los próximos 5 días:",
    hourlyForecast: "Pronóstico por Horas",
    max: "Máx",
    min: "Min",
    loading: "Cargando...",
    errorFetchingData: "Error al obtener los datos del clima",
    of: "de",
    locale: "es-ES",
    daysOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    monthsOfYear: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
   passwordError: "La contraseña debe contener de 8 a 20 caracteres, incluyendo letras mayúsculas (A-Z), minúsculas (a-z), números (0-9) y caracteres especiales (! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~)."
  },
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const switchLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => React.useContext(LanguageContext);

export { LanguageProvider, useLanguage };