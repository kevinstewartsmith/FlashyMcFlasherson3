import { useState } from 'react'
import Image from 'next/image'
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import IconButton from '@mui/material/IconButton';
import CropIcon from '@mui/icons-material/Crop';
import PhotoPreviewDialog from './PhotoPreviewDialog';
import getCroppedImg from "@utils/cropImage"
import CroppedCollectionImage from './CroppedCollectionImage';
import { CroppedImagePlaceholder } from './CroppedCollectionImage';


const CollectionImageSelector = ({ collectionImg }) => {
    //Preview Dialog Variables
    const [open, setOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    //const [croppedArea, setCroppedArea] = useState(null);
    //const [showCroppedImage, setShowCroppedImage] = useState(false);
    //const [testImage, setTestImage] = useState(null);
    //const [croppedImage, setCroppedImage] = useState(null);
    //function setCroppedArea(){}
  
  
    console.log("Collection image activiated");
    const [hovered, setHovered] = useState(false)
    console.log(croppedImage);
    const CROP_AREA_ASPECT = 3 / 3;
    const testImage = "https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200"
    //const scale = 100 / croppedImage.crop.width || 100
    const scale = croppedImage ? 100 / croppedImage.crop.width : 100
    //const croppedArea = croppedImage.crop
    const croppedArea = croppedImage ? croppedImage.crop : null
    
    let transform = null
    //if transform is not null, then set transform
    // if (croppedArea) {  
    //   transform = {
    //     x: `${-croppedArea.x * scale}%`,
    //     y: `${-croppedArea.y * scale}%`,
    //     scale,
    //     width: "calc(100% + 0.5px)",
    //     height: "auto",
    //   };
    // }
    // const transform = {
    //   x: `${-croppedArea.x * scale}%`,
    //   y: `${-croppedArea.y * scale}%`,
    //   scale,
    //   width: "calc(100% + 0.5px)",
    //   height: "auto",
    // };
    
    //If transform is not null, then set imageStyle
    // let imageStyle = null
    // if (transform) {
    //   imageStyle = {
    //     //transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    //     width: transform.width,
    //     height: transform.height,
    //   };
    // }


    // const imageStyle = {
    //   //transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    //   width: transform.width,
    //   height: transform.height,
    // };
    function handleMouseEnter() {
        console.log("Mouse Entered");
        setHovered(true)
    }
    function handleMouseLeave() {
        console.log("Mouse Left");
        setHovered(false)
    }
    function handleOpenPreview() {
      setOpen(true)
      //clickPhotoPreviewOpen()
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
    
    <div
      className="output"
      style={{ 
        //paddingBottom: `${100 / CROP_AREA_ASPECT}%`, 
        //backgroundColor:"orange",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "auto",
        width: "90%",
        height: "90%",
        position: "relative",
        right: "0",
        
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* { croppedImage ?
      <div style={{     
            position: 'relative',
            flex: 1,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: "50%",
            overflow: "hidden"
          
      }}>
          <Image src={croppedImage.image} alt="" style={imageStyle} width={3000} height={3000} 
          //layout='responsive' 
          />
          { hovered ?
          <IconButton 
            onClick={clickPhotoPreviewOpen}
            style={{
                position: "absolute", 
                zIndex: 2,
                opacity: 0.5,
            }}
          >
            <CropIcon 
              style={{
                color: "white", 
                fontSize: "200px", 
              }}
            />
          </IconButton>
          : null}
      </div>
      : "Waiting for image"}  */}
      {croppedImage ? 
        <CroppedCollectionImage 
          croppedImage={croppedImage} 
          clickPhotoPreviewOpen={clickPhotoPreviewOpen} 
          hovered={hovered} 
          open={open} 
          setOpen={setOpen}
          handleOpenPreview={handleOpenPreview} /> 
        : <CroppedImagePlaceholder handleOpenPreview={handleOpenPreview} />}

        <PhotoPreviewDialog 
        testImage={testImage} 
        //setCroppedArea={setCroppedArea} 
        showCroppedImage={showCroppedImage} 
        open={open}
        setOpen={setOpen}
      />


    </div>

     
    )
}

export default CollectionImageSelector