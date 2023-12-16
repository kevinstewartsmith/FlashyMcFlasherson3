"use client"
import "@styles/globals.css";
import { useSpring, animated } from "react-spring";
import { useState, useContext } from "react";
import Gallery from "@components/StudioUI/Gallery";
import CloseIcon from '@mui/icons-material/Close';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { Grid } from "@mui/material";
import BrushIcon from '@mui/icons-material/Brush';
import TravelExploreIcon from '@mui/icons-material/TravelExplore'; 
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel"
import FlashCard from "@components/FlashCardUI/FlashCard";
import PhotoSearch from "@components/StudioUI/PhotoSearch";
import StudioSlider from "@components/StudioUI/StudioSlider";
import { StudioContext } from '@components/Contexts/StudioContext';
import { studioDrawerAnimationObj, navOptionAnimationObj, studioPreviewAnimationObj, photoGalleryAnimationObj,studioGalleryAnimationObj,drawerContainerAnimationObj } from "@utils/springAnimationObjects";

const Studio = ({params}) => {
    const [menuActiveItem, setMenuActiveItem] = useState(null);
    const developerModeOn = false;
    const { sliderValue } = useContext(StudioContext)
    const menuItems = [
        { name: "Themes", icon: <BrushIcon fontSize='large' />, component: <div></div> },
        { name: "Photos", icon: <CropOriginalIcon fontSize='large' />, component: <div></div> },
        { name: "APIs", icon: <TravelExploreIcon fontSize='large' />, component: <div></div> },
        { name: "Uploads", icon:<UploadFileIcon fontSize='large' />, component: <div></div> }
    ]
    const [open, setOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [shrinkDrawerContainer, setShrinkDrawerContainer] = useState(false);
    const studioDrawerAnimation = useSpring(studioDrawerAnimationObj(open, galleryOpen, developerModeOn))
    const navOptionAnimation = useSpring(navOptionAnimationObj(open, galleryOpen, developerModeOn))
    const studioPreviewAnimation = useSpring(studioPreviewAnimationObj(open, galleryOpen, developerModeOn))
    const photoGalleryAnimation = useSpring(photoGalleryAnimationObj(open, galleryOpen, developerModeOn))
    const studioGalleryAnimation = useSpring(studioGalleryAnimationObj(open, galleryOpen, developerModeOn))
    const drawerContainerAnimation = useSpring(drawerContainerAnimationObj(shrinkDrawerContainer, developerModeOn))
   
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
            <animated.div className="studio-drawer" style={studioDrawerAnimation}>
                <animated.div className="drawer-container" style={drawerContainerAnimation}>
                    <animated.div style={navOptionAnimation}>  
                        <h1 style={{fontSize:"1.5em"}}><strong>Photos</strong></h1>
                        <button style={{ position:"absolute", right:20, top: 25}}>
                            <CloseIcon onClick={closeDrawer} />
                        </button>
                        <PhotoSearch developerModeOn={developerModeOn} galleryOpen={galleryOpen}/>
                        </animated.div>
                </animated.div>
            </animated.div>
                    
            <animated.div className="studio-preview" style={studioPreviewAnimation}>
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
                    <ViewCarouselIcon fontSize='large' color='white'/>
                </div>
                <div style={{postion:"relative", marginBottom:"80px",width: "100%", height: "100%", backgroundColor: "transparent",opacity:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <div className="studio-canvas-container" >          
                        <h1>Look at me1!</h1>
                        <FlashCard sliderValue={sliderValue}  front={"front"} back={"back"}/>             
                    </div>           
                </div>
                {/* <StudioSlider open={open} galleryOpen={galleryOpen} developerModeOn={developerModeOn}/> */}
            </animated.div>

            <animated.div className="gallery-container" style={studioGalleryAnimation}>
                <StudioSlider open={open} galleryOpen={galleryOpen} developerModeOn={developerModeOn}/>
                <Gallery collectionID={params.collectionID} toggleGallery={galleryOpenClicked}/>
            </animated.div>
        </div>
    )
}

export default Studio
