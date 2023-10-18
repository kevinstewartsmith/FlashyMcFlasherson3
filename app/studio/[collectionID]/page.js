"use client"
import "@styles/globals.css";
//import react-spring and animated
import { useSpring, animated } from "react-spring";
import { useState } from "react";
import Gallery from "@components/StudioUI/Gallery";
import CloseIcon from '@mui/icons-material/Close';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { Grid } from "@mui/material";
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


const Studio = ({params}) => {
    const [menuActiveItem, setMenuActiveItem] = useState(null);
    const [flashCardActiveItem, setFlashCardActiveItem] = useState(null)
    const [photoInputValue, setPhotoInputValue] = useState("")
    const [photoSearchResults, setPhotoSearchResults] = useState([])
    
    const menuItems = [
        { name: "Themes", icon: <BrushIcon fontSize='large' /> },
        { name: "Photos", icon: <CropOriginalIcon fontSize='large' /> },
        { name: "APIs", icon: <TravelExploreIcon fontSize='large' /> },
        { name: "Uploads", icon:<UploadFileIcon fontSize='large' /> }
    ]

    const [open, setOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [shrinkDrawerContainer, setShrinkDrawerContainer] = useState(false);
    const initialLeft = open ? 0 : 425;
    const finalLeft = open ? 425 : 0;


    const studioDrawerAnimation = useSpring({
        width: open ? 390 : 390,
        transform: open ?  "translateX(0px)" :  "translateX(-425px)",
       
    })
    
 
    const studioPreviewAnimation = useSpring({
        from: {
            width: "calc(100vw - 80px)",
            left: 0,
            height: "calc(100vh - 50px)",
        },
        to: {
            width: open ? "calc(100vw - 505px)" : "calc(100vw - 80px)",
            left: open ? 425 : 0,
            height: galleryOpen ? "calc(100vh - 250px)" : "calc(100vh - 50px)",
        },
    });
    
    const studioGalleryAnimation = useSpring({
        from: {
            transform:  "translateY(200px)"
        },
        to: { 
            transform: galleryOpen ?  "translateY(0px)" :  "translateY(200px)"
        },
    });

    const drawerContainerAnimation = useSpring({
        from: {
            height: "calc(100vh - 50px)",
        },
        to: {
            height: shrinkDrawerContainer ? "calc(100vh - 250px)" : "calc(100vh - 50px)",
        },
    });

    function openClicked() {
        setOpen(!open);
    }
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

    function handlePhotoInputChange(e) {
        console.log(e.target.value);
        setPhotoInputValue(e.target.value)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          console.log('Enter pressed');
            getPhotos()
        }
      };
      async function getPhotos() {
        const response = await fetch(`/api/images/search?query=pizza`);

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const data = await response.json();
        
        console.log(data.results[0].urls.thumb);
        console.log(typeof data.results);
        setPhotoSearchResults(data.results)

    }
 
    return (
        <div>
            <div className='studio-sidenav'>
                {/* NavBar
                <button onClick={openClicked}>Click me</button> */}
                {/* <button onClick={galleryOpenClicked}>Open Gallery</button> */}

                <Grid container spacing={0} justify="space-evenly" alignItems="center" direction="column" >
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
            <div className="studio-container">
                {/* <animated.div className="canvas-and-drawer" style={galleryOpenAnimation}> */}
                    <animated.div className="studio-drawer" style={studioDrawerAnimation}>
                        <animated.div className="drawer-container" style={drawerContainerAnimation}>
                            <button style={{ position:"fixed", right:0, top: 0}}>
                                <CloseIcon onClick={closeDrawer} />
                            </button>
                            <div style={{
                                backgroundColor:"white",
                                margin: 20,
                                height: "100%",
                            }}>

                                
                                <h1 style={{fontSize:"1.5em"}}><strong>Photos</strong></h1>
                                
                                <TextField
                                    variant="outlined"
                                    placeholder="Search photos from Unsplash..."
                                    width="100%"
                                    onChange={handlePhotoInputChange}
                                    onKeyDown={handleKeyPress}
                                    InputProps={{
                                        // endAdornment: (
                                        // <InputAdornment position="end">
                                        //     <IconButton>
                                        //     <SearchIcon />
                                        //     </IconButton>
                                        // </InputAdornment>
                                        // ),
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton>
                                                <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                
                                <div style={{ marginTop:20 }}>
                                    
                                        {
                                        photoSearchResults.length > 0 ? 
                                            photoSearchResults.map((photo,idx) => (
                                                <div key={idx}>
                                                    <Image
                                                        src={photo.urls.thumb}
                                                        alt="Picture of the author"
                                                        width={100}
                                                        height={100}        
                                                    />
                                                </div>
                                            ))
                                        : null
                                    }

                                </div>
                               

                             </div>
                             
                             
                        </animated.div>
                    </animated.div>
                    
                        <animated.div className="studio-preview" style={studioPreviewAnimation}>
                            {/* <button onClick={openClicked}>Click me</button> */}
                            <div 
                                onClick={galleryOpenClicked}
                                style={{ 
                                height: 50, 
                                width: 50, 
                                backgroundColor:"red",
                                position:"absolute",
                                top: 5,
                                right: 5,
                                display: "flex",
                                justifyContent:"center",
                                alignItems: "center",
                                borderRadius: 10,
                                borderColor: "green"
                                

                            }}>
                                <ViewCarouselIcon 
                                    fontSize='large'
                                    color='white'
                                />
                            </div>
                            
                            <div style={{width: "100%", height: "100%", backgroundColor: "transparent",opacity:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <div className="studio-canvas-container" >
                                    
                                        <h1>Look at me1!</h1>
                                        <FlashCard/>
                                    </div>       
                                </div>
                            
                        </animated.div>
                    
                {/* </animated.div> */}
                <animated.div className="gallery-container" style={studioGalleryAnimation}>
                    <Gallery collectionID={params.collectionID} toggleGallery={galleryOpenClicked}/>
                </animated.div>
            </div>
        </div>
    )
}

export default Studio
