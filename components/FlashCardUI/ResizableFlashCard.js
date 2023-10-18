"use client"
import React, { useState } from "react";
import { useSpring, a } from "@react-spring/web";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import "@styles/globals.css";
// import { Textfit } from 'react-textfit';
import FittedTextContainer from '@components/FittedTextContainer';
import CardFittedTextContainer from "@components/CardFittedTextContainer";
//import { Textfit } from 'react-textfit';
import FabricText from "@components/ResponsiveText/FabricText";

export default function FlashCard(props) {
  const [flipped, set] = useState(true);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

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

  return (
    <div style={{height:"100%", width:"100%"}}>
      <div className="flash-card" onClick={() => set((state) => !state)} style={{ height:"100%", width:"100%" }}>
            <a.div
              className="c front"
              style={{
                opacity,
                transform,
                rotateX: "180deg",
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                height: "100%",
                width: "100%"
              }}
            >
              <div className="center-parent" style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <FabricText text={props.front}/>
              </div>
            </a.div>
              <a.div
                className="c back"
                style={{
                  opacity: opacity.to((o) => 1 - o),
                  transform,
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:"center",
                  height: "100%",
                  width: "100%"
                }}
              >
                <div className="center-parent" style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <FabricText text={props.back}/>
                </div>
              </a.div>          
          </div>  
      </div>
  );
}