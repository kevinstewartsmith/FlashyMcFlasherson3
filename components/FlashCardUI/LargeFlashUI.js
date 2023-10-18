"use client"
import { useEffect, useContext, useState, useCallback } from 'react';
import FlashCardFeed from '@components/FlashCardUI/FlashCardFeed';
import {  Container, Box, Grid } from '@mui/material';
import { FlashCardContext } from '@components/Contexts/FlashCardContext';
import Item from '@mui/material/Grid';
import { Roboto } from "next/font/google";
//import { Textfit } from 'react-textfit';
import FlashCardControls from './FlashCardControls';

import FittedTextContainer from '@components/FittedTextContainer';

const roboto_bold = Roboto({
    subsets: ['latin'],
    weight: "700",
})
const roboto_italic = Roboto({
    subsets: ['latin'],
    weight: "400",
    style: "italic"
})

const LargeFlashUI = (props) => {
    window.addEventListener('resize', () => {
        console.log("resize");
      });
    const collectionID = props.collectionID
    const { flashCards, updateFlashCards, collection, updateCollection  } = useContext(FlashCardContext);
    const [newFlashCards, setNewFlashCards] = useState(0);


    const [componentFlashCards, setComponentFlashCards] = useState([]);
    const [componentCollection, setComponentCollection] = useState([]);

    updateCollection(componentCollection)
    updateFlashCards(componentFlashCards)


    //DONT USE
    // const fetchCollections = async () => {
    //     const res = await fetch(`/api/collection/gallery/${collectionID}`)
    //     const data = await res.json()
    //     updateCollection(data)
    // }

    // const fetchFlashCards = async () => {
    //     const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
    //     const data = await res.json()
    //     updateFlashCards(data)
    // }


    //MAYBE USE THIS
//     useEffect(() => {     
        const fetchCollections = async () => {
            const res = await fetch(`/api/collection/gallery/${collectionID}`)
            const data = await res.json()
            updateCollection(data)
        }
    
        const fetchFlashCards = async () => {
            const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
            const data = await res.json()
            updateFlashCards(data)
        }

        function flashCardCreated() {
            setNewFlashCards(newFlashCards + 1)
            //fetchCollections()
            //fetchFlashCards()
        }

//         fetchCollections()
//         fetchFlashCards()
// }, [newFlashCards]);
    //newFlashCards

    // useEffect(() => {
        // const fetchCollections = useCallback(async () => {
        //     const res = await fetch(`/api/collection/gallery/${collectionID}`)
        //     const data = await res.json()
        //     updateCollection(data)
        // }, [collectionID, updateCollection])

        // const fetchFlashCards = useCallback(async () => {
        //     const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
        //     const data = await res.json()
        //     updateFlashCards(data)
        // }, [props.collectionID, updateFlashCards])

        const upDateCollectionContext = () => {
            console.log("updating collection context"); 
            updateCollection(componentCollection)
        }

        const updateFlashCardContext = () => {
            console.log("updating flashcard context");
            updateFlashCards(componentFlashCards)
        }

        useEffect(() => {     
            newFlashCards
            const fetchCollections = async () => {
                const res = await fetch(`/api/collection/gallery/${collectionID}`)
                const data = await res.json()
                //updateCollection(data)
                setComponentCollection(data)
                //upDateCollectionContext()
            }
        
            const fetchFlashCards = async () => {
                const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
                const data = await res.json()
                //updateFlashCards(data)
                setComponentFlashCards(data)
                //updateFlashCardContext()
            }
            console.log("fetching collections");
            fetchCollections()
            console.log("fetching flashcards");
            fetchFlashCards()
            
        },[newFlashCards, collectionID, props.collectionID]);


        // useEffect(() => {     
        // // const fetchCollections = useCallback(async () => {
        // //     const res = await fetch(`/api/collection/gallery/${collectionID}`)
        // //     const data = await res.json()
        // //     updateCollection(data)
        // //     //setComponentCollection(data)
        // }, [newFlashCards])
    
        // const fetchFlashCards = async () => {
        //     const res = await fetch(`/api/collection/gallery/${props.collectionID}/flashcards`)
        //     const data = await res.json()
        //     //updateFlashCards(data)
        //     setComponentFlashCards(data)
        // }

//         fetchCollections()
//         fetchFlashCards()
// }, [collectionID, props.collectionID, updateCollection, updateFlashCards, newFlashCards]);
    

  
    return (
        <>  
            <Box sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Grid container spacing={0}  direction="row" style={{height: "85vh"}}>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: "transparent"  }}>
                        <Container maxWidth="100%"  style={{maxHeight: "100%",backgroundColor:"transparent", position:"relative"}} sx={{ margin: '0 auto', display: 'flex' }}>   
                            <div style={{
                                backgroundColor: "transparent",
                                width:"100%",     
                            }}>
                                <Grid container direction="column" spacing={0} >
                                    <Grid item xs={4} sx={{ alignItems: 'center',justifyContent:'center', backgroundColor: "transparent", width:"100%" }}>
                                        {/* <Textfit className={roboto_bold.className} style={{ width:"auto", backgroundColor:"transparent",}} mode="single" min={10} max={100}>
                                            {collection.name }
                                        </Textfit>
                                        <Textfit className={roboto_italic.className} style={{ margin:"0 0", width:"auto" }} mode="single" min={2} max={60}>
                                            {collection.description }
                                        </Textfit> */}
                                        {/* <ReactFitText 
                                            className={roboto_bold.className} 
                                            //style={{ width:"auto", backgroundColor:"transparent",}} 
                                            compressor={0.2}
                                            minFontSize={10}
                                            maxFontSize={100}
                                        >
                                               { collection.name }
                                        </ReactFitText>
                                        <ReactFitText compressor={0.2}>HELLO WORLD</ReactFitText> */}
                                        <Grid container direction="column" spacing={0} >
                                            <Grid item xs={4} sx={{ alignItems: 'center',justifyContent:'center', backgroundColor: "transparent", width:"100%" }}>
                                                <FittedTextContainer style={{display: "block"}} text={ collection.name } />
                                            </Grid>
                                            <Grid item xs={4} sx={{ alignItems: 'center',justifyContent:'center', backgroundColor: "transparent", width:"100%" }}>
                                                <FittedTextContainer style={{display: "block"}} text={ collection.description } />
                                            </Grid>
                                        </Grid> 

                                    </Grid>
                                    <Grid item xs={8} sx={{  justifyContent: 'center',alignItems:"center", boxSizing: "border-box", backgroundColor: "transparent", width:"100%" }}>
                                        <FlashCardControls collectionID={props.collectionID} flashCardCreated={flashCardCreated} />  
                                    </Grid>
                                </Grid>        
                            </div>
                        </Container>   
                    </Grid>
                    <Grid item xs={8}>
                        <Item><FlashCardFeed collectionID={props.collectionID} flashCardItems={flashCards} /></Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default LargeFlashUI