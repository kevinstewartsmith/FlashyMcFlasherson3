"use client";
import { FlashCardContextProvider } from "@components/Contexts/FlashCardContext";
import DeskParent from "@components/DeskUI/DeskParent";

const Desk = ({params}) => {
    
  return (
    <>
      <div>{params.collectionID}</div>
      <DeskParent collectionID={params.collectionID} />
    </>
   
  )
}

export default Desk
