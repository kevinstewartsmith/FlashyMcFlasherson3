"use client"

import React, { useState, useContext, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from '@mui/material/Alert';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//import globals from styles folder
import "@styles/globals.css";


const CreateFlashCard = (props) => {

    const router = useRouter()
    const { data: session } = useSession()
    const [expanded, setExpansion] = useState(false);
    const [flashCardData, setFlashCardData] = useState({ front: "", back: "" });
    //const {toggleTrigger} = useContext(CollectionContext);


    function handleClick() {  
        setExpansion(!expanded);
    }
    
      function handleInputText(event) {
        const { name, value } = event.target;
    
        setFlashCardData((prevValue) => {
          if (name === "front" ) {
            return {
              front: value,
              back: prevValue.back
            };
          } else if (name === "back" ) {
            return {
              front: prevValue.front,
              back: value
            };
          }
        });
        console.log(flashCardData);
      }

    //   useEffect(() => {
    //     console.log(flashCardData);
    // }, [handleInputText,flashCardData])
    
      const submitNote = async (event) => {
        const front = flashCardData.front
        const back = flashCardData.back
          
       
          //props.onAdd();
          console.log("Add some shit");      
          setFlashCardData({ front: "", back: "" });
          event.preventDefault();  
          try{
            const response = await fetch('/api/flashcard/new', {
              method: 'POST',
              // We convert the React state to JSON and send it as the POST body
              body: JSON.stringify({
                userId: session?.user.id,
                front,
                back, 
                collectionID: props.collectionID }),
              // headers: {"Content-Type": "application/json", 'Accept': 'application/json'}
            });
    
            if (response.ok) {
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          } 
        //   finally {
        //     //toggleTrigger()
        //   }
    }
    return (
        <div>  
        <form className="create-note">
          <input
            name={"front"}
            placeholder={"Add Flashcard Front"}
            onClick={handleClick}
            onChange={handleInputText}
            type="text"
            value={flashCardData.front}
          />
          {expanded ? (
            <textarea
              name={"back"}
              onChange={handleInputText}
              value={flashCardData.back}
              placeholder={"Add Flashcard Back"}
              //rows={rows}
              type="text"
            />
          ) : null}
          
          <Zoom in={expanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    )
}

export default CreateFlashCard