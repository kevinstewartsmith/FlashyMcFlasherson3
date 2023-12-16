import React from 'react'
//import react spring
import { useSpring, animated } from 'react-spring';
import Slider from '@mui/material/Slider';
import { useState, useContext } from 'react';
import { StudioContext } from '@components/Contexts/StudioContext';


const StudioSlider = ({open, galleryOpen, developerModeOn}) => {
    const {updateSliderValue, sliderValue} = useContext(StudioContext)
    //const [sliderValue, setSliderValue] = useState(100);
    const handleSliderChange = (event, newValue) => {
        updateSliderValue(newValue);   
    };

    const marks = [
        
        { value: 50, label: '50' },
        { value: 75, label: '75' },
        { value: 100, label: '100' },
        { value: 125, label: '125' },
        { value: 150, label: '150' },
      ];

    const sliderDivAnimation = useSpring({
        from: {
            width: "calc(100vw - 85px)",
            height: "40px",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            borderColor: "black",
            borderWidth: 1,
            bottom: "0px",
            left: 40,
            
        },
        to: {
            width: open ? "calc(100vw - 480px)" : "calc(100vw - 85px)",
            bottom: galleryOpen ? "185px" : "0px",
            borderColor: developerModeOn ? "teal" : "lightgrey",
            config: { duration: 1000 },
            
        },
    });
    
    return (
        
            <animated.div className="slider-div" style={sliderDivAnimation}>bottom
                <h1>{sliderValue}</h1>
                <Slider
                    value={sliderValue}
                    onChange={handleSliderChange}
                    aria-labelledby="mui-slider"
                    min={50}
                    max={150}
                    marks={marks}
                    step={1}
                    sx={{width: "50%", position: "absolute", bottom: 0}}
                />
            </animated.div>
      
    )
}

export default StudioSlider