import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardActionArea, CardActions, IconButton  } from '@mui/material';

export default function ActionAreaCard({giphy,title='oops',giphyId,isFavorited, addToFavorites, favorites }) {
  return (
    <Card className="margins" sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={giphy}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title} 
          </Typography>
          
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => addToFavorites(giphyId)}>
          <FavoriteIcon className={`${isFavorited ? 'favorited' : ''}`}  />
        </IconButton>
      </CardActions>
      </CardActionArea>
    </Card>
  );
}
