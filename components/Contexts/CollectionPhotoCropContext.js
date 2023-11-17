"use client";
import { createContext, useState, useEffect } from 'react';

const CollectionPhotoCropContext = createContext();

const CollectionPhotoCropContextProvider = ({ children }) => {
    const [croppedAreaPixelsData, setCroppedAreaPixelsData] = useState(null);

    
    function updateCroppedAreaPixelsData(data) {
        setCroppedAreaPixelsData(data)
    }

  return (
    <CollectionPhotoCropContext.Provider value={{ croppedAreaPixelsData, setCroppedAreaPixelsData }}>
      {children}
    </CollectionPhotoCropContext.Provider>
  );
};

export { CollectionPhotoCropContext, CollectionPhotoCropContextProvider };
