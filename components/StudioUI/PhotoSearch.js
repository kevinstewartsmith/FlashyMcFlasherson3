import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSpring, animated } from "react-spring";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const PhotoSearch = (props) => {
    
    const [photoInputValue, setPhotoInputValue] = useState("")
    const [photoSearchResults, setPhotoSearchResults] = useState([])

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
                                    
            <animated.div style={props.photoGalleryAnimation} >
                                        
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

            </animated.div>
        </div>
  )
}

export default PhotoSearch