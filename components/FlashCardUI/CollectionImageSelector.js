import { useState, useContext } from 'react'
import Image from 'next/image'
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import IconButton from '@mui/material/IconButton';
import CropIcon from '@mui/icons-material/Crop';
import PhotoPreviewDialog from './PhotoPreviewDialog';
import getCroppedImg from "@utils/cropImage"
import CroppedCollectionImage from './CroppedCollectionImage';
import { CroppedImagePlaceholder } from './CroppedCollectionImage';
import { CollectionPhotoCropContext } from '@components/Contexts/CollectionPhotoCropContext'

const CollectionImageSelector = ({ collectionImg }) => {
    //Preview Dialog Variables
    const [open, setOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    console.log("Collection image activiated");
    const [hovered, setHovered] = useState(false)
    console.log(croppedImage);
    const CROP_AREA_ASPECT = 3 / 3;
    const testImage = "https://images.unsplash.com/photo-1557750255-c76072a7aad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHNlYXJjaHw3fHx2aWV0bmFtfGVufDB8fHx8MTY5ODI5ODc4OXww&ixlib=rb-4.0.3&q=80&w=200"
    //const scale = 100 / croppedImage.crop.width || 100
    const scale = croppedImage ? 100 / croppedImage.crop.width : 100
    //const croppedArea = croppedImage.crop
    const croppedArea = croppedImage ? croppedImage.crop : null
    const { selectedImageData } = useContext(CollectionPhotoCropContext)

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
          //testImage,
          selectedImageData,
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