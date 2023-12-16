import {useContext} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSpring, animated } from "react-spring";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { CollectionPhotoCropContext } from '@components/Contexts/CollectionPhotoCropContext'

const PhotoSearch = (props) => {
    
    const [photoInputValue, setPhotoInputValue] = useState("")
    const [photoSearchResults, setPhotoSearchResults] = useState([])
    //const [selectedImageData, setSelectedImageData] = useState(null);
    const { selectedImageData, setSelectedImageData } = useContext(CollectionPhotoCropContext)

    const photoGalleryAnimation = useSpring({
        from: {
             marginTop:20, 
             backgroundColor: props.developerModeOn ? "yellow" : "white", 
             overflow: "auto",
             height: "calc(100vh - 200px)", 
        },
        to: {
            marginTop:20, 
            backgroundColor: props.developerModeOn ? "yellow" : "white", 
            overflow: "auto",
            height: props.galleryOpen? "calc(100vh - 380px)": "calc(100vh - 200px)", 
            config: { duration: 1000 }
        },
    })


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
        const response = await fetch(`/api/images/search?query=${photoInputValue}`);
        //const response = await fetch(`/api/test`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        //console.log(data.results[0].urls.thumb);
        console.log(typeof data.results);
        console.log(data.results);
        setPhotoSearchResults(data.results)

    }

    
    function imageClicked(idx) {
        // Retrieve the data of the clicked image using the idx
        const selectedImage = photoSearchResults[idx];
        console.log("Image clicked2:", selectedImage);
        setSelectedImageData(selectedImage.urls);
    }
   

    return (
        <div 
            className="photo-search" 
            style={{ 
                maxHeight: "50vh", 
                backgroundColor:"gray", 
                borderWidth:"3px", 
                borderColor:"yellow" 
            }}
        >
        {/* //Component Start */}                            
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
                fullWidth
            />
                                    
            <animated.div style={photoGalleryAnimation} >
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                    <Masonry gutter='15px'>           
                    {
                    photoSearchResults.length > 0 ? 
                        photoSearchResults.map((photo,idx) => (
                          
                            
                            
                                
                                <div key={idx} onClick={() => imageClicked(idx)}>
                                <Image
                                    //key={idx}
                                    src={photo.urls.thumb}
                                    alt="Picture of the author"
                                    width={100}
                                    height={100}
                                    //onClick={imageClicked}
                                    data-src={photo}        
                                />
                                </div>
                           
                            
                        ))
                    : null
                }
                    </Masonry>
                </ResponsiveMasonry>
            </animated.div>
        </div>
  )
}

export default PhotoSearch