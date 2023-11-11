import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Cropper from 'react-easy-crop';

const TabHeader = (props) => {
  
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Customize Photo" value="1" />
                <Tab label="Search Photos" value="2" />
            </TabList>
            </Box>
            <TabPanel value="1">
                {/* <h1>{props.croppedAreaPixelsData ? props.croppedAreaPixelsData.x : "no crop data"}</h1> */}
{/*           
                <div style={{ position: 'relative', width: "500px", height:"500px" }}>
                    <Cropper
                        image={props.testImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 4}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropSize={{width: 400, height: 400}}
                    />
                </div> */}
            </TabPanel>
            <TabPanel value="2">Search Photos</TabPanel>
            
        </TabContext>
        </Box>
    );
  
}

export default TabHeader