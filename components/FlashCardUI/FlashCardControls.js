"use client";
import { useState } from "react";
import CreateFlashCard from "./CreateFlashCard"
import { Grid, IconButton } from "@mui/material"
import { ViewCarousel, DashboardCustomize, Edit, Psychology, ElectricBolt } from "@mui/icons-material";
import { useSpring, animated } from 'react-spring';
import { useRouter } from "next/navigation";

const FlashCardControls = (props) => {
    const [iconIsClicked, setIconIsClicked] = useState(false);
    const router = useRouter()
    console.log("Props: " );
    console.log(props);    
    const collectionID = props.collectionID;

    const editClicked = () => {
        console.log("Edit Flashcards Clicked");
    }

    function reviewFCClicked() {
        router.push(`/desk/${collectionID}`)    
    }

    const handleLightningClick = () => {
        setIconIsClicked(!iconIsClicked)
    }

    const springProps = useSpring({
        rotate: iconIsClicked ? 360 : 0,
        backgroundColor: iconIsClicked ? '#1876D2' : 'transparent',
        borderRadius:  '50%',
        width: '3rem',
      });

    const actions = [
        // { icon: <Link href={`/desk/${collectionID}`}><ViewCarouselIcon /></Link>, name: 'Review Flashcards' },
        { icon: <ViewCarousel  style={{ color:"white", fontSize:"2rem" }} />, name: 'Review Flashcards', click: reviewFCClicked },
        { icon: <DashboardCustomize style={{ color:"white", fontSize:"2rem" }}  />, name: 'Add Flashcard', href: "/" },
        { icon: <Edit style={{ color:"white", fontSize:"2rem" }} />, name: 'Edit Flashcards', href: "/", click: editClicked},
        { icon: <Psychology style={{ color:"white", fontSize:"2rem" }} />, name: 'Games', href: "/"},
    ];
  
    return (
        <>
        <div style={{ width:"100%", height: 40, backgroundColor:"transparent", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:25, marginTop:20 }}>
        <div style={{
            width: '40%',
            height: '1px',
            backgroundColor: 'black',
            marginRight: 10,
            marginLeft: 50
        }} />
        <IconButton onClick={handleLightningClick}>
            <animated.div style={springProps}>
                <ElectricBolt style={{fontSize: '3rem', color:"yellow"}} />
            </animated.div>
        </IconButton>
        
        <div style={{
            width: '40%',
            height: '1px',
            backgroundColor: 'black',
            marginLeft: 10,
            marginRight: 50,
        }} />
        
    </div>
    
    { iconIsClicked ?

        <div style={{
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            padding:25,
            borderWidth: 2,
            borderColor: "black",
        }}>
            <CreateFlashCard 
                collectionID={props.collectionID} 
                inputType={"flashcard"}
                topPlaceholder={"Add Flashcard Front"}
                bottomPlaceholder={"Add Flashcard Back"}
                topName={"front"}
                bottomName={"back"}
                flashCardCreated={props.flashCardCreated}

            />
            <Grid container spacing={0}  direction="column" style={{height: "10vh", width:"100%", paddingLeft: 80, paddingRight: 80}}>
                { actions.map((action,idx) => ( 
                    <Grid item key={idx} xs={2} sx={{ display:"flex", justifyContent: 'center',alignItems: "center", boxSizing: "border-box", backgroundColor: "transparent", height:"100%" }}>
                        <IconButton 
                            key={idx}  
                            onClick={action.click}
                            style={{ 
                                borderColor: "red", 
                                backgroundColor: "#1876D2", 
                                borderWidth:"10px", 
                                height:"60px", 
                                width:"60px"
                            }}
                        >
                            {action.icon}
                        </IconButton>
                    </Grid>
                ))}
            </Grid>

        </div>
    : null }
    </>    
    )
}

export default FlashCardControls