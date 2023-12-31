import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Cropper from 'react-easy-crop';
import PhotoSearch from '@components/StudioUI/PhotoSearch';
import PhotoCropper from './PhotoCropper';
import { CollectionPhotoCropContextProvider } from '@components/Contexts/CollectionPhotoCropContext';

const TabHeader = (props) => {
  
    const [value, setValue] = useState('1');
    const [selectedImageData, setSelectedImageData] = useState(null);

    const handleChange = (event, newValue) => {
        //setValue(newValue);
        props.setTabValue(newValue)
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={props.tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Crop Photo" value="1" />
                <Tab label="Search Photos" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1">

                <PhotoCropper
                    testImage={props.image}
                    //crop={props.crop}
                    //zoom={props.zoom}
                    //aspect={4 / 4}
                    // onCropChange={props.setCrop}
                    // onCropComplete={props.onCropComplete}
                    // onZoomChange={props.setZoom}
                    // cropSize={{width: 400, height: 400}}
                    // setCroppedAreaPixelsData={props.setCroppedAreaPixelsData}
                    croppedAreaPixelsData={props.croppedAreaPixelsData}
                    setCroppedAreaPixelsData={props.setCroppedAreaPixelsData}
                    handleClose={props.handleClose}
                    image={selectedImageData ? selectedImageData: props.image}

                />
            </TabPanel>
            <TabPanel value="2">
                {/* <div style={{ height: "100%", width: "90%", borderColor:"yellow", borderWidth:"5px", backgroundColor:"green"}}> */}
                
                    <PhotoSearch setSelectedImageData={setSelectedImageData}/>
                
                {/* </div> */}
            </TabPanel>
            
        </TabContext>
        </Box>
    );
  
}

export default TabHeader