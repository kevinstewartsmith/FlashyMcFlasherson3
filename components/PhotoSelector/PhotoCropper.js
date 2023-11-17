import { useState, useContext } from 'react'
import Cropper from 'react-easy-crop'
import { CollectionPhotoCropContext } from '@components/Contexts/CollectionPhotoCropContext'


const PhotoCropper = (props) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const { croppedAreaPixelsData, setCroppedAreaPixelsData, updateCroppedAreaPixelsData } = useContext(CollectionPhotoCropContext)
    //const [croppedAreaPixelsData, setCroppedAreaPixelsData] = useState(null)
    const onCropComplete = (croppedArea, croppedAreaPixels) => { setCroppedAreaPixelsData(croppedAreaPixels) }
  return (
    <>
        <h1>{croppedAreaPixelsData ? croppedAreaPixelsData.x : "no crop data"}</h1>
          
        <div style={{ position: 'relative', width: "500px", height:"500px" }}>
            <Cropper
                image={props.testImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropSize={{ width: 400, height: 400 }}
            />
          </div>
    </>
  )
}

export default PhotoCropper