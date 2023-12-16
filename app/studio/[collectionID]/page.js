"use client"
import "@styles/globals.css";
//import react-spring and animated
import { useSpring, animated } from "react-spring";
import { useState, useContext } from "react";
import Gallery from "@components/StudioUI/Gallery";
import CloseIcon from '@mui/icons-material/Close';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { Grid, Slider } from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel"
import { green } from "@mui/material/colors";
import FlashCard from "@components/FlashCardUI/FlashCard";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { set } from "mongoose";
//import next image
import Image from "next/image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import PhotoSearch from "@components/StudioUI/PhotoSearch";
import StudioSlider from "@components/StudioUI/StudioSlider";
//Import studio context provider
import { StudioContext } from '@components/Contexts/StudioContext';
import { StudioContextProvider } from "@components/Contexts/StudioContext";
import { studioDrawerAnimationObj, navOptionAnimationObj, studioPreviewAnimationObj, photoGalleryAnimationObj,studioGalleryAnimationObj,drawerContainerAnimationObj } from "@utils/springAnimationObjects";

const Studio = ({params}) => {
    const [menuActiveItem, setMenuActiveItem] = useState(null);
    const [flashCardActiveItem, setFlashCardActiveItem] = useState(null)
    const [photoInputValue, setPhotoInputValue] = useState("")
    const [photoSearchResults, setPhotoSearchResults] = useState([])
    const developerModeOn = false;
    const { sliderValue } = useContext(StudioContext)

    const menuItems = [
        { name: "Themes", icon: <BrushIcon fontSize='large' />, component: <div></div> },
        { name: "Photos", icon: <CropOriginalIcon fontSize='large' />, component: <div></div> },
        { name: "APIs", icon: <TravelExploreIcon fontSize='large' />, component: <div></div> },
        { name: "Uploads", icon:<UploadFileIcon fontSize='large' />, component: <div></div> }
    ]
    //const [sliderValue, setSliderValue] = useState(100);
    // const handleSliderChange = (event, newValue) => {
    //     setSliderValue(newValue);   
    // };
    const [open, setOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [shrinkDrawerContainer, setShrinkDrawerContainer] = useState(false);
    const initialLeft = open ? 0 : 425;
    const finalLeft = open ? 425 : 0;

    const studioDrawerAnimation = useSpring(studioDrawerAnimationObj(open, galleryOpen, developerModeOn))
    const navOptionAnimation = useSpring(navOptionAnimationObj(open, galleryOpen, developerModeOn))
    const studioPreviewAnimation = useSpring(studioPreviewAnimationObj(open, galleryOpen, developerModeOn))
    const photoGalleryAnimation = useSpring(photoGalleryAnimationObj(open, galleryOpen, developerModeOn))
    const studioGalleryAnimation = useSpring(studioGalleryAnimationObj(open, galleryOpen, developerModeOn))
    const drawerContainerAnimation = useSpring(drawerContainerAnimationObj(shrinkDrawerContainer, developerModeOn))
    // const studioDrawerAnimation = useSpring({
    //     width: open ? 390 : 390,
    //     transform: open ?  "translateX(60px)" :  "translateX(-440px)",
    //     height: galleryOpen ? "calc(100vh - 235px)" : "calc(100vh - 50px)",
    //     backgroundColor: developerModeOn ? "yellow" : "white",
    //     config: { duration: 275 }
       
    // })

    // const navOptionAnimation = useSpring({
    //     from: {
    //         height: "calc(100vh - 70px)",
    //         backgroundColor:developerModeOn? "yellow": "white",
    //         margin: 20,
            
    //     },
    //     to: {
    //         height: galleryOpen ? "calc(100vh - 270px)" : "calc(100vh - 90px)",
    //         config: { duration: 1000 }
    //     },
    // });
    
    
 
    // const studioPreviewAnimation = useSpring({
    //     from: {
    //         width: "calc(100vw - 65px)",
    //         marginLeft: 65,
    //         height: "calc(100vh - 50px)",
    //         backgroundColor: "light-pink",
    //     },
    //     to: {
    //         width: open ? "calc(100vw - 450px)" : "calc(100vw - 65px)",
    //         marginLeft: open ? 450 : 65,
    //         height: galleryOpen ? "calc(100vh - 235px)" : "calc(100vh - 50px)",
    //         backgroundColor: developerModeOn ? "yellow" : "lightgrey",
    //         borderWidth: 0,
    //         borderColor: developerModeOn ? "orange" : "lightgrey",
    //         config: { duration: 1000 }
    //     },
    // });
     

    // const photoGalleryAnimation = useSpring({
    //     from: {
    //          marginTop:20, 
    //          backgroundColor: developerModeOn ? "yellow" : "white", 
    //          overflow: "auto",
    //          height: "calc(100vh - 200px)", 
    //     },
    //     to: {
    //         marginTop:20, 
    //         backgroundColor: developerModeOn ? "yellow" : "white", 
    //         overflow: "auto",
    //         height: galleryOpen? "calc(100vh - 380px)": "calc(100vh - 200px)", 
    //         config: { duration: 1000 }
    //     },
    // })
    
    // const studioGalleryAnimation = useSpring({
    //     from: {
    //         transform:  "translateY(50px)"
    //     },
    //     to: { 
    //         transform: galleryOpen ?  "translateY(0px)" :  "translateY(50px)",
    //         config: { duration: 200 }
    //     },
    // });

    // const drawerContainerAnimation = useSpring({
    //     from: {
    //         height: "calc(100vh - 50px)",
    //         backgroundColor: developerModeOn ? "pink" : "white",
    //     },
    //     to: {
    //         height: shrinkDrawerContainer ? "calc(100vh - 250px)" : "calc(100vh - 50px)",
    //         config: { duration: 1000 }
    //     },
    // });

    // const sliderDivAnimation = useSpring({
    //     from: {
    //         width: "calc(100vw - 85px)",
    //         //marginLeft: 85,
    //         //marginRight: 85,
    //         height: "40px",
    //         backgroundColor: "white",
    //         //bottom: "40px",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         position: "absolute",
    //         borderColor: "black",
    //         borderWidth: 1,
    //         bottom: "0px",
    //     },
    //     to: {
    //         width: open ? "calc(100vw - 480px)" : "calc(100vw - 85px)",
    //         //marginLeft: open ? 450 : 65,
    //         //height: galleryOpen ? "calc(100vh - 235px)" : "calc(100vh - 50px)",
    //         bottom: galleryOpen ? "185px" : "0px",
    //         //backgroundColor: developerModeOn ? "lightgreen" : "lightgrey",
    //         //borderWidth: 10,
    //         borderColor: developerModeOn ? "teal" : "lightgrey",
    //         config: { duration: 1000 }
    //     },
    // });

    // function openClicked() {
    //     setOpen(!open);
    // }
    function galleryOpenClicked() {
        console.log("gallery clicked");
        setShrinkDrawerContainer(!shrinkDrawerContainer);
        setGalleryOpen(!galleryOpen);
    }
    function closeDrawer() {
        setMenuActiveItem(null)
        open ? setOpen(false) : null
    }
    function openDrawer(menuItemIdx) {
        setMenuActiveItem(menuItemIdx)
        open ? null : setOpen(!open)
    }

    // function handlePhotoInputChange(e) {
    //     console.log(e.target.value);
    //     setPhotoInputValue(e.target.value)
    // }
    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //       console.log('Enter pressed');
    //         getPhotos()
    //     }
    //   };
      async function getPhotos() {
        const response = await fetch(`/api/images/search?query=${photoInputValue}`);
        //const response = await fetch(`/api/test`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        console.log(data.results[0].urls.thumb);
        console.log(typeof data.results);
        setPhotoSearchResults(data.results)

    }
    // const marks = [
        
    //     { value: 50, label: '50' },
    //     { value: 75, label: '75' },
    //     { value: 100, label: '100' },
    //     { value: 125, label: '125' },
    //     { value: 150, label: '150' },
    //   ];
 
    return (
        
        <div style={{marginTop:0, height:"calc(100vh-250px)", backgroundColor: developerModeOn ? "blue" : "light-gray"}}>
            <div className='studio-sidenav'>


                <Grid container spacing={0} justify="space-evenly" alignItems="center" direction="column" style={{ top:0 }}>
                    { menuItems.map((item, idx) => (
                        <Grid 
                            item 
                            padding={1} 
                            xs={3} 
                            sm={3} 
                            md={3} 
                            key={"flash" + idx} 
                            width={"100%"} 
                            justify="space-evenly" 
                            display={"flex"} 
                            alignItems="center" 
                            justifyContent={"center"}
                            borderRadius={1}
                            onClick={() => openDrawer(idx)}
                            style={{
                                backgroundColor: menuActiveItem === idx ? "lightblue" : "transparent", // Apply conditional background color
                                transition: "background-color 0.3s ease" // Add transition effect
                            }}
                        >
                            <Grid container spacing={0} justify="space-evenly" alignItems="center" direction="column" >
                                <Grid 
                                    item 
                                    padding={0} 
                                    xs={6} 
                                    sm={6} 
                                    md={6} 
                                    key={"flash" + idx} 
                                    width={"100%"} 
                                    justify="space-evenly" 
                                    display={"flex"} 
                                    alignItems="center" 
                                    justifyContent={"center"}
                                >
                                    {/* <CropOriginalIcon fontSize='large' /> */}
                                    { item.icon }
                                </Grid>
                                <Grid
                                    item
                                    padding={0}
                                    xs={6}
                                    sm={6}
                                    md={6}
                                    key={"flash" + idx}
                                    width={"100%"}
                                    justify="space-evenly"
                                    display={"flex"}
                                    alignItems="center"
                                    justifyContent={"center"}
                                >
                                    <h8 style={{ fontSize:12 }}>{item.name}</h8>
                                </Grid>
                            </Grid>
                        </Grid>
                    )) }
                </Grid>  
            </div>
            {/* <div className="studio-container"> */}
                {/* <animated.div className="canvas-and-drawer" style={galleryOpenAnimation}> */}
                    <animated.div className="studio-drawer" style={studioDrawerAnimation}>
                        <animated.div className="drawer-container" style={drawerContainerAnimation}>

                            <animated.div style={navOptionAnimation}>

                                
                                <h1 style={{fontSize:"1.5em"}}><strong>Photos</strong></h1>
                                <button style={{ position:"absolute", right:20, top: 25}}>
                                    <CloseIcon onClick={closeDrawer} />
                                </button>

                                <PhotoSearch 
                                    //photoGalleryAnimation={photoGalleryAnimation} 
                                    developerModeOn={developerModeOn}
                                    galleryOpen={galleryOpen}

                                />
                             </animated.div>
                             
                             
                        </animated.div>
                    </animated.div>
                    
                        <animated.div className="studio-preview" style={studioPreviewAnimation}>
                            {/* <button onClick={openClicked}>Click me</button> */}
                            <div 
                                onClick={galleryOpenClicked}
                                style={{ 
                                height: 50, 
                                width: 50, 
                                backgroundColor:"lightblue",
                                position: "absolute",
                                top: 70,
                                right: 5,
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                                borderRadius: 10,
                                borderColor: "black",
                                borderWidth: 1,
                                
                            }}>
                                <ViewCarouselIcon 
                                    fontSize='large'
                                    color='white'
                                />
                            </div>
                            
                            <div style={{postion:"relative", marginBottom:"80px",width: "100%", height: "100%", backgroundColor: "transparent",opacity:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <div className="studio-canvas-container" >
                                    
                                        <h1>Look at me1!</h1>
                                        <FlashCard sliderValue={sliderValue}  front={"front"} back={"back"}/>
                                        {/* <div style={{ position:"relative", bottom:"80px" }}>bottom</div> */}
                                </div> 
                                
                            </div>

                            {/* <StudioSlider open={open} galleryOpen={galleryOpen} developerModeOn={developerModeOn}/> */}
                        </animated.div>
                    
                {/* </animated.div> */}
                <animated.div className="gallery-container" style={studioGalleryAnimation}>
                    <StudioSlider open={open} galleryOpen={galleryOpen} developerModeOn={developerModeOn}/>
                    <Gallery collectionID={params.collectionID} toggleGallery={galleryOpenClicked}/>
                </animated.div>
            {/* </div> */}
        </div>
     
    )
}

export default Studio
