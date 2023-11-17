"use client"
import { useEffect, useState, useContext } from 'react';
import CreateFlashCard from '@components/FlashCardUI/CreateFlashCard';
import FlashCardFeed from '@components/FlashCardUI/FlashCardFeed';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, } from '@mui/material';
import  ViewCarouselIcon  from '@mui/icons-material/ViewCarousel';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EditIcon from '@mui/icons-material/Edit';
import { FlashCardContext } from '@components/Contexts/FlashCardContext';
import { useRouter } from 'next/navigation';
import PhotoPreviewDialog from './PhotoPreviewDialog';
import CollectionImageSelector from './CollectionImageSelector';
import getCroppedImg from "@utils/cropImage"
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
//import provider for cropped area
import { CollectionPhotoCropContext } from '@components/Contexts/CollectionPhotoCropContext'

const FlashCardUIParent = (props) => {
    const [photoPreviewOpen, setPhotoPreviewOpen] = useState(false)
    //const testImage = "https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200"
    const testImage = "https://images.unsplash.com/photo-1583417319070-4a69db38a482?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHwyfHx2aWV0bmFtfGVufDB8fHx8MTY5OTQ0ODgwNnww&ixlib=rb-4.0.3&q=85"
    const router = useRouter();
    const [flashCardItems, setFlashCardItems] = useState([]);
    const collectionID = props.collectionID
    const [practiceModeOff , setPracticeModeOff] = useState(true);
    const [croppedArea, setCroppedArea] = useState(null);
    const { flashCards, updateFlashCards, collection, updateCollection  } = useContext(FlashCardContext);
    const [croppedImage, setCroppedImage] = useState(null)//useState({image:null, crop: null})
    const [open, setOpen] = useState(false);
    const actions = [
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
        updateFlashCards(data)
    }

    const showCroppedImage = async (croppedImagePixels) => {
        console.log("showCroppedImage pixels");
        console.log(croppedImagePixels);
        try {
          const croppedImage = await getCroppedImg(
            testImage,
            croppedImagePixels,
            0 // rotation
          )
          console.log('donee', { croppedImage })
          setCroppedImage({image: croppedImage, crop: croppedImagePixels})
        } catch (e) {
          console.error(e)
        }
      }

        function clickPhotoPreviewOpen() {
            setOpen(!open)
            console.log("Photo Preview Open");
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
                height: "250px",
                overflow: "hidden", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>  
             
                {/* { croppedImage ? 
                    <CollectionImage 
                        croppedArea={croppedArea} 
                        collectionImg={testImage} 
                        croppedImage={croppedImage} 
                        //setOpen={{setOpen}} 
                        clickPhotoPreviewOpen={clickPhotoPreviewOpen}
                        testImage={testImage} 
                        setCroppedArea={setCroppedArea} 
                        showCroppedImage={showCroppedImage} 
                        open={open}
                        setOpen={setOpen}

                    /> 
                : "Well I'm Outta Ideas"} */}
               
                <CollectionImageSelector 
                        croppedArea={croppedArea} 
                        collectionImg={testImage} 
                        croppedImage={croppedImage} 
                        //setOpen={{setOpen}} 
                        clickPhotoPreviewOpen={clickPhotoPreviewOpen}
                        testImage={testImage} 
                        setCroppedArea={setCroppedArea} 
                        showCroppedImage={showCroppedImage} 
                        open={open}
                        setOpen={setOpen}

                    /> 
                
                
             </div> 
            <h1 className='centered-heading'>{collection.name}</h1> 
            <h1 className='centered-heading'>{collection.description}</h1>
            <h1>{open}</h1>
            {/* <PhotoPreviewDialog 
                testImage={testImage} 
                setCroppedArea={setCroppedArea} 
                showCroppedImage={showCroppedImage} 
                open={open}
                setOpen={setOpen}
            /> */}
            <CreateFlashCard 
                collectionID={props.collectionID} 
                inputType={"flashcard"}
                topPlaceholder={"Add Flashcard Front"}
                bottomPlaceholder={"Add Flashcard Back"}
                topName={"front"}
                bottomName={"back"}
            />
        </div>
        <div style={{
                border: "1px solid transparent",
                flex: 4, /* Make the right div take up 4 times the space of the left div */
                backgroundColor: "transparent", /* Add background color for demonstration */
                width: "80vw", /* Set the right div to 80% of viewport width */
                padding: "10px" 
        }}>  

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