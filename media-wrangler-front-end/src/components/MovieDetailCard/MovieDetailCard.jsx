import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import './MovieDetailCard.css';


//I guess I can add props validation in order to get VSC to stop being so angry...

function MovieDetailCard({ title, releaseDate, overview, poster, rating }) {

  //NOTE: The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation...
  const baseImageUrl = "https://image.tmdb.org/t/p/w300";
  const fullPosterUrl = `${baseImageUrl}${poster}`;


    //NOTE: Styling Notes...
    //The variant="outlined" : can be removed and the default should be a shadow for "elevated"
    //card maxWidth can change based on space needed for other components

    //"movie-info-container" : it is making it flex and moved the details to the right of image
    //The movie info is currently centered with the image, but that can be changed adjusting this css

    //the variant="body2" just seems to make the text smaller, I kept it on Release Date but removed from overview
    //However, we might want to change the font styling in general 


  return (
    <Card sx={{maxWidth: 1000}} variant="outlined">
      <CardActionArea>
      <div className="movie-info-container">
        <CardMedia
          component="img"
          height="140"
          image={ fullPosterUrl }
          alt="Movie Poster"
        />
        <CardContent>            
          <Typography gutterBottom variant="h1" component="div">
            { title }
          </Typography>          
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           <b>Date Released:</b> { releaseDate }
          </Typography>
          <br />
          <Typography variant="body2" sx={{ color: 'black' }}  >
            <b>Overview:</b>{ overview }
          </Typography>          
        </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default MovieDetailCard;