"use client"
import React, { useState, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Alert from '@mui/material/Alert';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//import globals from styles folder
import "@styles/globals.css";
import { CollectionContext } from "../Contexts/CollectionContext";

function CreateCollection(props) {
  const router = useRouter()
  const { data: session } = useSession()
  const [expanded, setExpansion] = useState(false);
  const [collectionData, setCollectionData] = useState({ name: "", description: "" });
  const {toggleTrigger} = useContext(CollectionContext);

  function handleClick() {  
    setExpansion(!expanded);
  }

  function handleInputText(event) {
    const { name, value } = event.target;

    setCollectionData((prevValue) => {
      if (name === "title" || name ==="cardFront") {
        return {
          name: value,
          description: prevValue.content
        };
      } else if (name === "content" || name == "cardBack") {
        return {
          name: prevValue.name,
          description: value
        };
      }
    });
  }

  const submitNote = async (event) => {
    const name = collectionData.name
    const description = collectionData.description
      
   
      //props.onAdd();
      console.log("Add something");      
      setCollectionData({ name: "",description: "" });
      event.preventDefault();  
      try{
        const response = await fetch('/api/collection/new', {
          method: 'POST',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify({
            userId: session?.user.id,
            name: name, 
            description: description}),
          // headers: {"Content-Type": "application/json", 'Accept': 'application/json'}
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        toggleTrigger()
      }
  }

  return (
    <div>  
      <form className="create-note">
        <input
          name={props.topName}
          placeholder={props.topPlaceholder}
          onClick={handleClick}
          onChange={handleInputText}
          type="text"
          value={collectionData.name}
        />
        {expanded ? (
          <textarea
            name={props.bottomName}
            onChange={handleInputText}
            value={collectionData.description}
            placeholder={props.bottomPlaceholder}
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
  );
}
export default CreateCollection;
