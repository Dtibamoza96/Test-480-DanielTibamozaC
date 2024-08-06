import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { SoundProvider } from "./data/soundContext";
import Weather from "./pages/Weather";

function App() {
  return (
    <SoundProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </SoundProvider>
  );
}

export default App;
