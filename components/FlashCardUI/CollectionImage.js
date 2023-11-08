import { useState } from 'react'
import Image from 'next/image'
import getCroppedImg from '@utils/cropImage';


const CollectionImage = ({  collectionImg, croppedImage }) => {
    console.log("Collection image activiated");

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
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height,
    };

    return (
    <div
      className="output"
      style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%`, borderRadius:"50%" }}
    >
    Cropped Image top
      <Image src={croppedImage.image} alt="" style={imageStyle} width={100} height={100}/>
      Cropped Image bottom
    </div>
    )
}

export default CollectionImage