"use client"

import { Grid } from '@mui/material'
import Gallery from '@components/StudioUI/Gallery'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ResizableFlashCard from '@components/FlashCardUI/ResizableFlashCard'
import Box from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
//import CustomTabPanel from '@components/StudioUI/CustomTabPanel'
import DrawerContainer from '@components/StudioUI/DrawerContainer';
import { useState } from 'react'
import { useSpring, animated } from 'react-spring';


const StudioUIParent = ({params}) => {
    
    const toggleDrawer = () => {
        setExpanded(!expanded)
    };

    const menuItems = ["Themes","Photos", "APIs", "Uploads"]

    const [expanded, setExpanded] = useState(true);

    const containerStyles = {
      position: 'fixed',
      marginTop: 50,
      left: 0,
      width: '100vw',
      height: 'calc(100vh-50px)',
      display: 'flex',
      overflow: 'hidden',
    };
    const purpleDivWidth = expanded ? 525 : 0;
    const editCardContainerWidth = `calc(100vw - 100px - ${purpleDivWidth}px)`;
    const editCardContainerLeftMargin = `calc(100px + ${purpleDivWidth}px)`;
    const containerLeft = expanded ? 525 : 100;
    
    const purpleDivStyles = useSpring({
      width: purpleDivWidth,
      //height: '100%',
      backgroundColor: 'gray',
      position: 'fixed',
      left: 100,
      top: 0,
    });
    const editContainerStyles = useSpring({
        //position:"absolute", 
        marginLeft: expanded ? 400 + 125: 100,
        marginTop:0, 
        width: `calc(100vw - 100px)`, 
        //width: "100%",
        height:`calc(100vh - 100px)`,
        //backgroundColor:"#DBEEF4",
        backgroundColor:"red",
        padding:20,
        // display:"flex",
        // justifyContent:"center",
        // alignItems:"center",
        // //overflow:"hidden"

    })
    // position:"fixed", 
    // marginLeft: purpleDivWidth + 100,
    // marginTop:0, 
    // width: "calc(100vw - 100px)", 
    // height:"100vh", 
    // backgroundColor:"#DBEEF4"
    const redDivStyles = {
      flex: 1,
      height: '100vh',
      marginLeft:100,
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  
    const buttonStyles = {
      backgroundColor: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
    };

    return (
        <div >
           {/* Container for Grid */}
            <div style={{ position:"fixed", height:"100vh", width: 100, backgroundColor: "blue", borderRight:'1px solid #333' }} >
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
                            onClick={toggleDrawer}
                        >
                            <Grid container spacing={0} justify="space-evenly" alignItems="center" direction="column" >
                                <Grid 
                                    item 
                                    padding={1} 
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
                                    <CropOriginalIcon fontSize='large' />
                                </Grid>
                                <Grid
                                    item
                                    padding={1}
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
                                    {item}
                                </Grid>
                            </Grid>
                        </Grid>
                    )) }
                </Grid>  
        </div>

                
                    
                
                {/* Container div for the flashcard preview and flashcard preview */}
                <animated.div 
                    // style={{
                    //     position:"fixed", 
                    //     marginLeft: purpleDivWidth + 100,
                    //     marginTop:0, 
                    //     width: "calc(100vw - 100px)", 
                    //     height:"100vh", 
                    //     backgroundColor:"#DBEEF4"
                    // }}
                    style={editContainerStyles}
                    className='edit-card-container'
                >

                    {/* <animated.div style={purpleDivStyles} /> */}
                
                

                
                   
                    {/* Div for the Customization bar */}
                    <div style={{ 
                        //position:"absolute",
                        backgroundColor: "white", 
                        height: 60, 
                       // width:"calc(100vw - 100px)",
                        width:"100%",
                        //marginLeft: 0,
                        //marginTop:0,
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                    }}>EDITPANEL</div>

                        
                     
                      
                    {/* Div for the flashcard preview START */}
                        {/* <div style={{
                            //position:"fixed", 
                             //marginLeft:900,
                            width: "100%", 
                            height:"60%", 
                            //backgroundColor:"#DBEEF4",
                            backgroundColor:"green",
                            display:"flex",
                            justifyContent:"center",
                            // alignItems:"center", 
                            
                        }}> */}
                        <div style={{ width:"100%", backgroundColor: "green", display:"flex", justifyContent:"center",alignItems:"center" }}>
                   
                            <div style={{ backgroundColor: "white", height:"30vw", width: "45vw",
                             }}>
                                <ResizableFlashCard front={"front"} back={"back"}/>
                            </div>
                            
                        </div>
                        {/* Div for flashcard END */}
                </animated.div>
              
                
                
                   
                    
                    <animated.div style={purpleDivStyles} ><h1 style={{position:"absolute", right:0}}>sdfsd000</h1></animated.div>
  
                
                    <Gallery collectionID={params.collectionID}/>
            </div>
             
        
    )
}

export default StudioUIParent
