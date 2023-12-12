"use client";
import { createContext, useState, useEffect } from 'react';

const StudioContext = createContext();

const StudioContextProvider = ({ children }) => {
    const [sliderValue, setSliderValue] = useState(100);

    const updateSliderValue = (newValue) => {
        setSliderValue(newValue);
        console.log("sliderVale in Context: " + newValue);
      };


  return (
    <StudioContext.Provider value={{ sliderValue, updateSliderValue }}>
      {children}
    </StudioContext.Provider>
  );
};

export { StudioContext, StudioContextProvider };