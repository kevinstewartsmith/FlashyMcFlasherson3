"use client"
import { useContext, useEffect } from 'react'
import { CollectionContext } from '../Contexts/CollectionContext';
import CreateCollection from './CreateCollection'
import CollectionFeed from './CollectionFeed'
import { Grid, Item, Box } from '@mui/material';


const LargeCollectionUI = () => {
  const { scrollPosition, updateScrollPosition } = useContext(CollectionContext);
  
  // useEffect(() => {
  //   // Restore the scroll position on component mount
  //   window.scrollTo(0, scrollPosition);
  // }, []);

  // useEffect(() => {
  //   // Update the scroll position when it changes
  //   const handleScroll = () => {
  //     updateScrollPosition(window.pageYOffset);
  //     console.log("scrollPosition: " + scrollPosition);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [updateScrollPosition]);

  return (
    <div >
    
        <CreateCollection
          //onAdd={collectionChanged}
          inputType={"collection"}
          topPlaceholder={"Add Collection"}
          bottomPlaceholder={"Description (optional)"}
          topName={"title"}
          bottomName={"content"}
          //selectedCollection={selectedCollection}

        />
        <CollectionFeed  />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>

            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
    </div>
  )
}

export default LargeCollectionUI