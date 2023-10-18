"use client"
import { useState, useEffect, useContext } from 'react'
import { Grid } from '@mui/material'
import Note from '@components/CollectionUI/note'
import { CollectionContext } from '../Contexts/CollectionContext'

const CollectionList = ({data}) => {
    return (
        <div className='collection-feed'> 
            <Grid
                container
                //rowSpacing={1}
                spacing={2}
                //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justify="space-evenly"
                alignItems="center"
            >       
                {data.map((collection,idx) => (
                    <Grid key={idx} item padding={1} xs={4} >
                        <Note
                            key={idx}
                            id={collection._id}
                            collectionName={collection.name}
                            description={collection.description}

                        />
                    </Grid>
                ))}
            </Grid>    
        </div>   
    )
}
        


const CollectionFeed = (props) => {
    const [collectionItems,setCollectionItems] = useState([]);
    const { trigger,restoreScrollPosition } = useContext(CollectionContext);
    

    useEffect(() => {
        
        fetchCollections()
         
    },[trigger]);



    const fetchCollections = async () => {
        const res = await fetch('/api/collection/all')
        const data = await res.json()
        console.log(data);
        
        setCollectionItems(data)

    }

    //Add one to clickcount to trigger useEffect

  return (
    <div>       
        <CollectionList data={collectionItems} />
    </div>
  )
}

export default CollectionFeed