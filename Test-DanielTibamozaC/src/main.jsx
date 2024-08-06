import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SoundProvider } from "./data/soundContext.jsx";
import { LanguageProvider } from "./data/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
    <SoundProvider>
      <App />
    </SoundProvider>
    </LanguageProvider>
  </React.StrictMode>
);
