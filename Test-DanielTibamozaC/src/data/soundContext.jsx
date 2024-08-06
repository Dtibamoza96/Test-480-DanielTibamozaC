import React, { createContext, useState, useContext } from 'react';
import soundFile from '../assets/intro-logo-13488.mp3';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [sound] = useState(new Audio(soundFile));

  const playSound = () => {
    sound.currentTime = 0; // Reinicia el sonido
    sound.play().catch(error => {
      console.error('Error al reproducir el sonido:', error);
    });
  };

  return (
    <SoundContext.Provider value={{ playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  return useContext(SoundContext);
};