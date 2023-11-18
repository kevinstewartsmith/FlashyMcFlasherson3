import { useState, useCallback, useContext }  from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop'
//import tab header
import TabHeader from '@components/PhotoSelector/TabHeader';
import { CollectionPhotoCropContext } from '@components/Contexts/CollectionPhotoCropContext'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function PhotoPreviewDialog(props) {
  //const [open, setOpen] = useState(false);
  //const [crop, setCrop] = useState({ x: 0, y: 0 })
  //const [zoom, setZoom] = useState(1)
  const { croppedAreaPixelsData, setCroppedAreaPixelsData } = useContext(CollectionPhotoCropContext)
  //const [croppedAreaPixelsData, setCroppedAreaPixelsData] = useState(null)

  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const handleClose = () => {
    props.setOpen(false);
    props.showCroppedImage(croppedAreaPixelsData)
  };

  const chooseImageClicked = () => {
    console.log("Choose Image Clicked");
    setTabValue('1')
  }

  const [tabValue, setTabValue] = useState('1');
  
  const handleTabChangeChange = (event, newValue) => {
      setValue(newValue);
  }

  //const onCropComplete = () => (croppedArea, croppedAreaPixels) => { setCroppedAreaPixelsData(croppedAreaPixels) }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
         Customize Photo

        </DialogTitle>
       
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {/* <h1>{croppedAreaPixelsData ? croppedAreaPixelsData.x : "no crop data"}</h1>
          
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
          </div> */}
          <TabHeader 
            
            //crop={crop}
            //zoom={zoom}
            //aspect={4 / 4}
            //onCropChange={setCrop}
            //onCropComplete={onCropComplete}
            //onZoomChange={setZoom}
            croppedAreaPixelsData={croppedAreaPixelsData}
            setCroppedAreaPixelsData={setCroppedAreaPixelsData}
            handleClose={handleClose}
            image={props.testImage}
            setTabValue={setTabValue}
            tabValue={tabValue}
          
         />
        </DialogContent>
        
        <DialogActions>
        { tabValue === '1' ?
        
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> :
          <Button autoFocus onClick={chooseImageClicked}>
            Choose Image
          </Button> }
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}