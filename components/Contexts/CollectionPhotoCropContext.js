"use client";
import { createContext, useState, useEffect } from 'react';

const CollectionPhotoCropContext = createContext();

const CollectionPhotoCropContextProvider = ({ children }) => {
    const [croppedAreaPixelsData, setCroppedAreaPixelsData] = useState(null);
    const [selectedImageData, setSelectedImageData] = useState(null);
    
    function updateCroppedAreaPixelsData(data) {
        setCroppedAreaPixelsData(data)
    }

    useEffect(() => {
        // This callback will be triggered after 'count' state is updated
        console.log('Image data updated');
        console.log(selectedImageData);
        // You can perform other actions here based on the updated state
      }, [selectedImageData]); // Specify the dependency to watch for changes

  return (
    <CollectionPhotoCropContext.Provider value={{ croppedAreaPixelsData, setCroppedAreaPixelsData, selectedImageData, setSelectedImageData }}>
      {children}
    </CollectionPhotoCropContext.Provider>
  );
};

export { CollectionPhotoCropContext, CollectionPhotoCropContextProvider };
