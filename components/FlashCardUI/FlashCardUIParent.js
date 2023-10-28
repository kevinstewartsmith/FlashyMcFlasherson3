"use client"
import { useEffect, useState, useContext } from 'react';
import CreateFlashCard from '@components/FlashCardUI/CreateFlashCard';
import FlashCardFeed from '@components/FlashCardUI/FlashCardFeed';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, } from '@mui/material';
import  ViewCarouselIcon  from '@mui/icons-material/ViewCarousel';
import Link from "next/link"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EditIcon from '@mui/icons-material/Edit';
import { FlashCardContextProvider, FlashCardContext } from '@components/Contexts/FlashCardContext';
import { useRouter } from 'next/navigation';
import Image from "next/image"

const FlashCardUIParent = (props) => {
    const router = useRouter();
    const [flashCardItems, setFlashCardItems] = useState([]);
    const collectionID = props.collectionID
    //const [collection, setCollection] = useState({});
    const [practiceModeOff , setPracticeModeOff] = useState(true);
    const { flashCards, updateFlashCards, collection, updateCollection  } = useContext(FlashCardContext);
    const actions = [
        // { icon: <Link href={`/desk/${collectionID}`}><ViewCarouselIcon /></Link>, name: 'Review Flashcards' },
        { icon: <ViewCarouselIcon onClick={togglePracticeMode} />, name: 'Review Flashcards', click: reviewFCClicked },
        { icon: <DashboardCustomizeIcon />, name: 'Add Flashcard', href: "/" },
        { icon: <EditIcon />, name: 'Edit Flashcards', href: "/", click: editClicked},
        { icon: <PsychologyIcon/>, name: 'Games', href: "/"},
    ];

    function editClicked() {
        console.log("Edit Mode Clicked");

    }

    function reviewFCClicked() {
        router.push(`/desk/${collectionID}`)    
    }

    function togglePracticeMode() {
        console.log("Toggle Practice Mode");
        setPracticeModeOff(!practiceModeOff)
    }

    useEffect(() => {     
        fetchCollections()
        fetchFlashCards()
    },[]);
    

    const fetchCollections = async () => {
        //await fetch(`/api/prompt/${promptId}`)
        const res = await fetch(`/api/collection/gallery/${collectionID}`)
        const data = await res.json()
        console.log(data);
        
        updateCollection(data)
    }

    const fetchFlashCards = async () => {
        console.log("Fetching Flashcards");
        const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
        const data = await res.json()
        console.log("Flashcards data in main colection page");
        console.log(data);
        //setFlashCardItems(data)
        updateFlashCards(data)
    }
  
  
  
    return (
    <div style={{
        display: "flex", 
        width: "100%"
    }}>
        <div style={{
            flex: 1,
            backgroundColor: "transparent",
            width: "20vw",
            padding: "10px",
        }}>
        
            <div className="image-container" style={{
                    width: "100%", 
                    height: "150px",
                    overflow: "hidden", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //borderRadius: "50%"
                }}>  
            

                <Image 
                    src="https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200" // Replace with the actual path to your image
                    alt="Your Image"
                    width={150} // Set the desired width
                    height={150} // Set the desired height
                    layout="responsive" // Maintain aspect ratio
                />
             </div> 
            <h1 className='centered-heading'>{collection.name}</h1> 
            <h1 className='centered-heading'>{collection.description}</h1>
        </div>
        <div style={{
                border: "1px solid transparent",
                //marginLeft: "20vw",
                flex: 4, /* Make the right div take up 4 times the space of the left div */
                backgroundColor: "transparent", /* Add background color for demonstration */
                width: "80vw", /* Set the right div to 80% of viewport width */
                padding: "10px" 
            }}>  
            
            <CreateFlashCard 
                collectionID={props.collectionID} 
                //onAdd={collectionChanged}
                inputType={"flashcard"}
                topPlaceholder={"Add Flashcard Front"}
                bottomPlaceholder={"Add Flashcard Back"}
                topName={"front"}
                bottomName={"back"}
                //selectedCollection={selectedCollection}
                //selectedCollection={props.selectedCollection} 
                //collectionChanged={collectionChanged}
            />
            <FlashCardFeed collectionID={props.collectionID} flashCardItems={flashCards} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ 
                    position: 'fixed', bottom: 32, right: 32,
                    '& .MuiFab-primary': { width: 80, height: 80 }
                }}
                icon={<SpeedDialIcon />}
            >
                { actions.map((action) => (
                    
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            sx={{backgroundColor: "red", width: 72, height: 72}}
                            onClick={action.click}
                        />
                    
                )) }
            </SpeedDial>
 
        </div>
    </div>
    
  )
}

export default FlashCardUIParent