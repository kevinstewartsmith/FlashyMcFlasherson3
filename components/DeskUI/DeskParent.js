import Deck from "./Deck"
import React, { useState, useEffect, useContext } from "react";
import BackButton from "@components/Buttons/BackButton";
import { FlashCardContext } from "@components/Contexts/FlashCardContext";
import '@styles/globals.css'
const DeskParent = (props) => {
    const { flashCards, test} = useContext(FlashCardContext)

    return (
        <div >
        <BackButton onClick={ () => {} }/>
        
        <div className="desk-parent">   
            <div className="desk"> 
                <div className="deck-container">
                    <Deck
                        flashCards={flashCards}
                    />
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default DeskParent
