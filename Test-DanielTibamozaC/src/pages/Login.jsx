import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import backgroundimagehome from "../assets/fondo_home.jpg";
import Language from "../components/Language";
import { useLanguage } from "../data/LanguageContext";

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,20}$/;
  return regex.test(password) && !password.includes(" ");
};

const validateDateOfBirth = (date) => {
  const currentYear = new Date().getFullYear();
  const selectedYear = new Date(date).getFullYear();
  return selectedYear <= currentYear && selectedYear >= 1900;
};

const validateName = (name) => {
  const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/;
  return regex.test(name);
};

const validateMobile = (mobile) => {
  const regex = /^\d{10}$/; // Example for 10-digit mobile number
  return regex.test(mobile);
};

const showAlert = (title, text, icon) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Aceptar",
  });
};

const Login = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "nombre" || name === "apellidos") && !validateName(value)) {
      return;
    }

    if (name === "password" && value.includes(" ")) {
      showAlert("Weather Web", translations.errorPassword, "error");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowPasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    const fields = {
      nombre: translations.name,
      apellidos: translations.lastname,
      fechaNacimiento: translations.birthdate,
      sexo: translations.gender,
      email: translations.email,
      password: translations.password,
      mobile: translations.mobile,
    };

    for (const field in fields) {
      if (!formData[field]) {
        newErrors.push(fields[field]);
      }
    }

    if (formData.password && !validatePassword(formData.password)) {
      newErrors.push(translations.password);
      showAlert("Weather Web", translations.passwordError, "error");
    } else if (formData.fechaNacimiento && !validateDateOfBirth(formData.fechaNacimiento)) {
      newErrors.push(translations.birthdate);
      showAlert("Weather Web", translations.errorDate, "warning");
    } else if (formData.mobile && !validateMobile(formData.mobile)) {
      newErrors.push(translations.mobile);
      showAlert("Weather Web", translations.errorMobile, "warning");
    } else if (newErrors.length > 0) {
      setErrors(newErrors);
      showAlert("Weather Web", `${translations.missingFields} ${newErrors.join(", ")}`, "warning");
    } else {
      localStorage.setItem("userData", JSON.stringify(formData));
      showAlert("Weather Web", translations.success, "success").then((result) => {
        if (result.isConfirmed) {
          navigate("/weather");
        }
      });
      setErrors([]);
      setFormData({
        nombre: "",
        apellidos: "",
        fechaNacimiento: "",
        sexo: "",
        email: "",
        password: "",
        mobile: "",
      });
    }
  };

  return (
    <>
      <img
        className="background-image-home"
        src={backgroundimagehome}
        alt="fondo_climas_home"
      />
      <div className="login-users-container">
        <div className="language-container">
          <Language />
        </div>
        <div className="login-users">
          <h2 className="title-login">{translations.title}</h2>
          <form className="form-login" onSubmit={handleSubmit}>
            <div className="name">
              <label>{translations.name}:</label>
              <input
                className="i-name"
                type="text"
                name="nombre"
                maxLength="50"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="lastname">
              <label>{translations.lastname}:</label>
              <input
                className="i-lastName"
                type="text"
                name="apellidos"
                maxLength="50"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>
            <div className="birthdate">
              <label>{translations.birthdate}:</label>
              <input
                className="i-birthDate"
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="genre">
              <label>{translations.gender}:</label>
              <select
                className="s-genre"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              >
                <option value="">{translations.select}</option>
                <option value="Masculino">{translations.male}</option>
                <option value="Femenino">{translations.female}</option>
                <option value="Otro">{translations.other}</option>
              </select>
            </div>
            <div className="email">
              <label>{translations.email}:</label>
              <input
                className="i-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mobile">
              <label>{translations.mobile}:</label>
              <input
                className="i-mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="password">
              <label>{translations.password}:</label>
              <input
                className="i-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="show-password">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={handleShowPasswordToggle}
                />
                <label htmlFor="showPassword">{translations.showPassword}</label>
              </div>
            </div>
            <button className="l-submit" type="submit">
              {translations.submit}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
