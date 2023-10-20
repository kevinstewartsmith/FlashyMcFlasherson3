import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { FlashCardContext } from "@components/Contexts/FlashCardContext";
import { useRouter } from 'next/navigation';


    


export default function CollectionCard(props) {
    const randomPhotos = [
        "https://images.unsplash.com/photo-1695032553861-0a0cba7cd31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc3Nzc2ODR8&ixlib=rb-4.0.3&q=80&w=200",
        "https://images.unsplash.com/photo-1696689984179-8b6e6d69070c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc3NzgxNDJ8&ixlib=rb-4.0.3&q=80&w=200",
        "https://images.unsplash.com/photo-1697234109712-c072a141e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc3NzgxNjJ8&ixlib=rb-4.0.3&q=80&w=200",
        "https://images.unsplash.com/photo-1697234109712-c072a141e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc3NzgxNjJ8&ixlib=rb-4.0.3&q=80&w=200",
        "https://images.unsplash.com/photo-1696513301944-90abb561b935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM4MzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTc3NzgxOTB8&ixlib=rb-4.0.3&q=80&w=200"
    ]
    // variable representing random index of randomPhotos array
    //const randomIndex = Math.floor(Math.random() * randomPhotos.length)


    const router = useRouter()
    const { updateCollection } = useContext(FlashCardContext)

    const handleClick = async (event) => {
        event.preventDefault();
        updateCollection(props.id)
        router.push(`/collections/${props.id}`);
    }

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 10 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={randomPhotos[Math.floor(Math.random() * randomPhotos.length)]}
          alt="green iguana"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { props.collectionName }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}