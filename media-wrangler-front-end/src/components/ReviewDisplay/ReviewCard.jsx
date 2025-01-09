import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ReviewCard({ title, releaseDate, poster, movieId, id, award, dateWatched, isSpoiler, rating, review }) {
  return (
    <div>
      <h1>Review Card: </h1>
      <div className="movie-detail-container">
        <Card sx={{maxWidth: 1000}} variant="outlined">
            <div className="movie-info-container">
                <CardActionArea>            
                <CardMedia
                    component="img"
                    height="300"  
                    width="auto"   
                    image={ poster }
                    alt="Movie Poster"
                />
                </CardActionArea>
                <CardContent>            
                    <Typography gutterBottom variant="h2" component="div">
                        { title } 
                        <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: 'teal' }}>
                            ({yearReleased})
                        </span>
                    </Typography>          
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <b>Date Released: </b> { releaseDate }
                    </Typography>
                    <br />
                    <Typography variant="body2" sx={{ color: 'black' }}  >
                        <b>Overview: </b>{ overview }
                    </Typography>          
                </CardContent>
                </div> 
                <CardActions>
                    <Button onClick={handleWantToWatch}
                        size="small">Want to Watch</Button>
                    <Button onClick={handleWatched}
                        size="small">Watched</Button>
                </CardActions>

          
                
        </Card>
     
       
    </div>
    </div>
  )
}

export default ReviewCard
