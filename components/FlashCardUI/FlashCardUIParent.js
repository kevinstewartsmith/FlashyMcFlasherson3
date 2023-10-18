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
    <div>  
            <h1 className='centered-heading'>{collection.name}</h1> 
            <h1 className='centered-heading'>{collection.description}</h1>
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
  )
}

export default FlashCardUIParent