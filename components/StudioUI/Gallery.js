"use client"
import { useRef, useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FlashCard from '@components/FlashCardUI/FlashCard';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';


const Gallery = ({items, collectionID, toggleGallery}) => {
  const carouselRef = useRef(null);
  const padding = {
    paddingLeft: 40,     // in pixels
    paddingRight: 40
  }

  const responsive = {
    0: { items: 3 },
    568: { items: 5 },
    1024: { items: 5 },
  };
  const [componentCollection, setComponentCollection] = useState([])
  const [componentFlashCards, setComponentFlashCards] = useState([])
  const [newFlashCards, setNewFlashCards] = useState(0)
  //const [collectionID, setCollectionID] = useState("")
  const [selectedFlashCard, setSelectedFlashCard] = useState(null)

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };


  const getInnerWidth = () => {
    try {
      // if client
      return window.innerWidth;
    } catch {
    // if server, set any desired value
      return 1024;
    }   
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  }

  function flashCardCreated() {
    setNewFlashCards(newFlashCards + 1)
    //fetchCollections()
    //fetchFlashCards()
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
        const res = await fetch(`/api/collection/gallery/${collectionID}/flashcards`)
        const data = await res.json()
        //updateFlashCards(data)
        setComponentFlashCards(data)
        //updateFlashCardContext()
        console.log(data);
    }
    console.log("fetching collections");
    fetchCollections()
    console.log("fetching flashcards");
    fetchFlashCards()
    
},[newFlashCards, collectionID]);

  return (
    <>
      <Grid container spacing={0} justify="space-evenly" alignItems="center" direction="row" style={{height: "100%", widows:"100%"}} >
        <Grid item padding={1} xs={0.5} sm={0.5} md={0.5} key={"flash" + 1} width={30} justify="space-evenly" display={"flex"} alignItems="center" justifyContent={"center"} >
          {/* <button onClick={handlePrevClick}>Prev button</button> */}
          <NavigateBeforeIcon fontSize='large' onClick={handlePrevClick} />
        </Grid>
        <Grid item padding={1} xs={11} sm={11} md={11} key={"flash" + 2} width={30} justify="space-evenly" display={"flex"} alignItems="center" justifyContent={"center"} style={{height: "100%"}}>
          <AliceCarousel 
            mouseTracking 
            disableDotsControls={true}          
            responsive={responsive}
            autoHeight={false}
            style={{ height:"100%", width:"100%",backgroundColor:"red" }}
            ssrSilentMode={false}
            //items={items} 
            innerWidth={getInnerWidth()} 
            stagePadding={padding}
            ref={carouselRef}
            disableButtonsControls={true}
            items={componentFlashCards.map((item,idx) => (
              // <div key={ "gallery_" + item.idx } style={{ backgroundColor: item.backgroundColor, width: item.width, height: item.height }}>{item.content}</div>
              <div 
                key={"galleryContainer_" + idx} 
                onClick={() => setSelectedFlashCard(idx)}
                style={{ 
                  backgroundColor:"white", 
                  width:"30vh", 
                  height:"25vh", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignContent: "center", 
                  borderColor: "green",
                  borderRadius: 10,
                  borderWidth: 10,
                  borderColor: selectedFlashCard === idx ? "blue" : "transparent", // Apply conditional background color
              }} >
                {/* <div style={{ width:"50%",height:"50%", backgroundColor:"green"}}>
                  <h1>{item.front}</h1>

                </div> */}
                <FlashCard 
                  key={item._id}
                  id={item._id}
                  front={item.front}
                  back={item.back}
                  width={"100%"}
                  height={"18vh"}
                />
                
              </div>
            ))}
          />
        </Grid>
        <Grid 
          item 
          padding={1} 
          xs={0.5} 
          sm={0.5} 
          md={0.5} 
          key={"flash" + 1} 
          width={30} 
          justify="space-evenly" 
          display={"flex"} 
          alignItems="center" 
          justifyContent={"center"}
        >
          {/* <button onClick={handleNextClick}>Next button</button> */}
          <NavigateNextIcon fontSize='large' onClick={handleNextClick} />
        </Grid>
      </Grid>
    </>
  );
}

export default Gallery;