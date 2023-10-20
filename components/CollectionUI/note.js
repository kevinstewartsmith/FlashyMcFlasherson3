import React, { useState, useContext } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Zoom from "@mui/material/Zoom";
import '@styles/globals.css'
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FlashCardContext } from "@components/Contexts/FlashCardContext";
import Image from "next/image";


const montserrat = Montserrat({
  subsets: ['latin'],
})

function Note(props) {
  const router = useRouter()
  const { updateCollection } = useContext(FlashCardContext)
  console.log("Collection ID in the note component"); 
  console.log(props.id);
  const [mouseEntered, setMouseEntered] = useState(false);
  
  function handleMouse() {
    setMouseEntered(!mouseEntered);
  }

  const clickDelete = async (event) => {

    event.preventDefault();
   
    console.log("delete clicked");
    
    try{

      const response = await fetch(`/api/collection/delete/${props.id}`,{ method: "DELETE" })

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      
    }
  }
  const handleClick = async (event) => {
    event.preventDefault();
    updateCollection(props.id)
    router.push(`/collections/${props.id}`);
  }

  return (
    <div>
      <div
        className="note"
        //onClick={() => {`/collections/${props.id}`}}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
      <div onClick={handleClick}>
       {/* <Link href={`/collections/${props.id}`}> */}
        <div className="note-div">
          <div className="center">
            <Image
              src="https://images.unsplash.com/photo-1525220964737-6c299398493c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHwxfHxhbGFza2F8ZW58MHx8fHwxNjk3NzY5OTMwfDA&ixlib=rb-4.0.3&q=80&w=200"
              alt="collection image"
              width={150}
              height={100}
            />

            <h1 className={montserrat.className}>{props.collectionName}</h1>
            <p>{mouseEntered ? props.description  : null}</p>
            
          </div> 
        </div>
        {/* </Link>  */}
        </div>
      </div>
      {/* </Link> */}
      
      <div className="delete-button-container" onClick={clickDelete}>
        {/* <button className="delete-button" onClick={clickDelete}> <DeleteOutlinedIcon /></button> */}
        
        <DeleteOutlinedIcon className="delete-button" />
      
      </div>
    
    </div>
  );
}

export default Note;
