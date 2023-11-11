import { useState } from 'react'
import Image from 'next/image'
import getCroppedImg from '@utils/cropImage';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import IconButton from '@mui/material/IconButton';
import CropIcon from '@mui/icons-material/Crop';
import PhotoPreviewDialog from './PhotoPreviewDialog';

const CollectionImage = ({  collectionImg, croppedImage, clickPhotoPreviewOpen, setOpen }) => {
    console.log("Collection image activiated");
    const [hovered, setHovered] = useState(false)
    console.log(croppedImage);
    const CROP_AREA_ASPECT = 3 / 3;
    const testImage = "https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200"
    //const [croppedImage, setCroppedImage] = useState(null)
    //const scale = 100 / croppedArea.width;
    const scale = 100 / croppedImage.crop.width
    const croppedArea = croppedImage.crop
    
    
    console.log("Scale");
    console.log(scale);    
    console.log("Image");
    console.log(croppedImage.image);
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
    function handleOpen() {
      //setOpen(true)
      clickPhotoPreviewOpen()
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
        position: "relative",
        
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    
    <div style={{     
        position: 'relative',
        flex: 1,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "50%",
        overflow: "hidden"
        
        }}
    >
        <Image src={croppedImage.image} alt="" style={imageStyle} width={3000} height={3000} 
        //layout='responsive' 
        />
        { hovered ?
        <IconButton 
          //onClick={showCroppedImage}
          onClick={clickPhotoPreviewOpen}
          style={{
              position: "absolute", 
              zIndex: 2,
              opacity: 0.5,
          }}
        >
          <CropIcon 
                style={{
                  //position: "absolute", 
                  color: "white", 
                  fontSize: "200px", 
                  //right:0, 
                  //bottom:0,
                  //zIndex: 2,
          }}/>
        </IconButton>
       
        : null}
        {/* <img src={croppedImage.image} alt="" style={{maxWidth:"100%", maxHeight:"100%"}}/> */}
        
    </div>

    </div>
    )
}

export default CollectionImage