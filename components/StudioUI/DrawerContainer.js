import React from 'react'
import { Drawer, makeStyle } from '@mui/material';
import { useSpring, animated } from 'react-spring';

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     '& .MuiBackdrop-root': {
//       // Customize the backdrop styles here
//       backgroundColor: 'rgba(0, 0, 0, 0)', // Make the backdrop transparent
//     },
//   },
// }));

const DrawerContainer = (props) => {

  //const classes = useStyles();
  return (
    <div style={{ position:"relative" }}>
    <Drawer 
        anchor="left"
        open={props.isDrawerOpen}
        onClose={props.toggleDrawer}
        sx={{
          '& .MuiDrawer-root': {
              position: 'absolute'
          },
          '& .MuiPaper-root': {
              position: 'absolute'
          },
      }}
     
    >
    <h1>drawer yo</h1>
    </Drawer>
    </div>

    // <h1>fgd</h1>
  )
}

export default DrawerContainer