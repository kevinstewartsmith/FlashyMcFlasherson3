import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
//import styles from "./styles.module.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { PropaneSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import "@styles/globals.css";
export default function FlashCard(props) {
  const [flipped, set] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  // function deleteFlashCard() {
  //   console.log("Flashcard deleted: " + props.id)
  //   const id = props.id
  //   props.onDelete(id)
  // }

  function deleteFlashCard() {
    console.log("FC UI Deleted card ID: " + props.id);
    const flashCard = props.id
    fetch("/deleteFlashCard", {     
        method: 'POST',
        body: JSON.stringify({"collectionID": props.collectionID, "flashCardID": props.id}),
        headers: {"Content-Type": "application/json", 'Accept': 'application/json'}//{
    }).then(function(response){
    return response.json();
    }).then(function(response){
        console.log(response);
         
        props.onDelete()          
    }).catch(err => {
        console.log("Error Reading data " + err);
    });
    
}
const width = props.sliderValue * 0.01 * ((297/2 * 3.78) + (297%2 * 3.78))
const height = props.sliderValue * 0.01 * ((210/2 * 3.78) + (210%2 * 3.78))



  return (
    <div style={{ width:width, height: height, backgroundColor:"green", display: "flex", justifyContent: "center", alignItems:"center" }}>
      {/* <div> */}
        <div className="flash-card note-div" style={{  width:width, height: height}}>
          <div className="flash" onClick={() => set((state) => !state)} style={{  width:width, height: height}}>

            <a.div
              className="c front"
              style={{ 
                opacity,
                transform,
                rotateX: "180deg",
                borderRadius: 7,
                width: width, 
                height: height
              }}
            >
              <div className="center">
                <h1>{props.front}</h1>
              </div>
            </a.div>
            <a.div
              className="c back"
              style={{
                opacity: opacity.to((o) => 1 - o),
                transform,
                borderRadius: 7,
                width:width, 
                height: height
              }}
            >
              <div className="center">
                <h1>{props.back}</h1>
                {/* <h1>{props.collectionID}</h1> */}
              </div>
            </a.div>
          </div>
          <DeleteOutlinedIcon className="delete-button" onClick={deleteFlashCard}/>  
        </div>  
      {/* </div> */}
    </div>
  );
}