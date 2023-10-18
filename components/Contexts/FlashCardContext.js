"use client";
import { createContext, useState } from 'react';

const FlashCardContext = createContext();

const FlashCardContextProvider = ({ children }) => {
    const [flashCards, setFlashCards] = useState([]);
    const [collection, setCollection] = useState();
    const test = "this is a test"
    const updateFlashCards = (flashCards) => {
        setFlashCards(flashCards);
        console.log(flashCards);
    };

    const updateCollection = (collection) => {
        setCollection(collection);
        console.log("Collection Triggered");
        console.log("collection in context: " + collection);
        console.log(collection.name);
    };

  return (
    <FlashCardContext.Provider value={{ flashCards, updateFlashCards, collection, updateCollection, test }}>
      {children}
    </FlashCardContext.Provider>
  );
};

export { FlashCardContext, FlashCardContextProvider };
