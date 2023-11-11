import { useState } from 'react'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import CropIcon from '@mui/icons-material/Crop';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CroppedCollectionImage = ({ collectionImage, croppedImage, hovered, open, setOpen, handleOpenPreview }) => {
    console.log("Collection image activiated");
    
    croppedImage ? console.log(croppedImage): "no cropped image";
    const CROP_AREA_ASPECT = 3 / 3;
    const testImage = "https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200"
    //const [croppedImage, setCroppedImage] = useState(null)
    //const scale = 100 / croppedArea.width;
    const scale = 100 / croppedImage.crop.width
    const croppedArea = croppedImage.crop 
    
    
    console.log("Scale");
    console.log(scale);    
    console.log("Image");
    console.log(croppedImage ? croppedImage.image : null);
    // const showCroppedImage = async () => {
    //     try {
    //       const croppedImage = await getCroppedImg(
    //         collectionImg,
    //         //dogImg,
    //         croppedArea,
    //         0
    //         //rotation
    //       )
    //       console.log('donee', { croppedImage })
    //       setCroppedImage(croppedImage)
    //     } catch (e) {
    //       console.error(e)
    //     }
    //   }
    //   showCroppedImage()

    //if cropped ar

    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      width: "calc(100% + 0.5px)",
      height: "auto",
      
    };
  
    const imageStyle = {
      //transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height,
    };
    function handleMouseEnter() {
        console.log("Mouse Entered");
        setHovered(true)
    }
    function handleMouseLeave() {
        console.log("Mouse Left");
        setHovered(false)
    }

    // const showCroppedImage = async (croppedImagePixels) => {
    //     console.log("showCroppedImage pixels");
    //     console.log(croppedImagePixels);
    //     try {
    //       const croppedImage = await getCroppedImg(
    //         testImage,
    //         croppedImagePixels,
    //         0 // rotation
    //       )
    //       console.log('donee', { croppedImage })
    //       setCroppedImage({image: croppedImage, crop: croppedImagePixels})
    //     } catch (e) {
    //       console.error(e)
    //     }
    // }


    return (
        <div onClick={handleOpenPreview} style={{ height: "90%", width: "90%"}}>
            { croppedImage ?
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
                    //onClick={clickPhotoPreviewOpen}
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
                    : null }
                </div>
            : "Waiting for image"}
        </div>
  )
}

export const CroppedImagePlaceholder = ({ handleOpenPreview }) => {
    return (
        <IconButton 
            onClick={handleOpenPreview}
            style={{
                position: "absolute", 
                zIndex: 2,
                opacity: 0.5,
            }}
        >
        <AddPhotoAlternateIcon 
            style={{
            color: "white", 
            fontSize: "200px", 
            }}
        />
        </IconButton>
    )
}

export default CroppedCollectionImage