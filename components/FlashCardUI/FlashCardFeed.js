import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import Note from '../CollectionUI/note'
import FlashCard from './FlashCard'

const FlashCardList = ({data}) => {
    
    return (
        <div style={{ width:"100%", overflow:"auto" }}> 

            <Grid
                container
                spacing={0}
                justify="space-evenly"
                alignItems="center"
            >
                { data.map((flashCard,idx) => (
                    <Grid item padding={0} xs={4} key={idx}>
                        <FlashCard 
                            key={flashCard._id}
                            id={flashCard._id}
                            front={flashCard.front}
                            back={flashCard.back}
                        />  
                    </Grid>
                ))} 
            </Grid>
        </div>   
    )
}

const FlashCardFeed = (props) => {

  return (
    <>
        <FlashCardList data={props.flashCardItems} />
    </>
    
  )
}

export default FlashCardFeed