import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button, Paper } from '@mui/material';
import '../../stylings/MovieDetailsPage.css';
import PropTypes from 'prop-types';
import InteractionsCard from '../MovieInteractionComponent/InteractionsCard';
import MovieDetailsNav from "../nav/MovieDetailsNav";
 
   

function MovieDetailCard({ movieDetails }) {

    console.log('Received movieDetails:', movieDetails);

    const baseImageURL = "https://image.tmdb.org/t/p/w300";
    const fullPosterURL = `${baseImageURL}${movieDetails.posterPath}`;
    
    const yearReleased = new Date(movieDetails.releaseDate).getFullYear();

    //NOTE: console.logs are temporary, just checking for basic functionality before moving forward
    function handleWantToWatch() {
        console.log("clicked want to watch button!");
    }

    function handleWatched() {
        console.log("clicked watched button!");
    }

    function handlePosterClick() {
        console.log("clicked movie poster");
    }


  return (
    <>  
        <div>
            <Paper 
                elevation={0} 
                sx={{
                    maxWidth: 1000, 
                    background: "rgba(55, 160, 146, 0.77)", 
                    margin: "40px auto", 
                    padding: "10px",  
                    borderRadius: "14px"           
                }} 
            >       
            <div className="movie-detail-container">
                <Card sx={{maxWidth: 1000, background: "rgba(19, 19, 20, 0.81)", borderRadius: "14px"}} variant="outlined">
                    <div className="movie-info-container">
                        <CardActionArea >     
                            <CardMedia
                                onClick={handlePosterClick}
                                component="img"
                                height="300"  
                                width="auto"   
                                image={ fullPosterURL }
                                alt="Movie Poster"
                            />
                        </CardActionArea>    
                        <CardContent sx={{ color: 'white' }}>            
                            <Typography gutterBottom variant="h4" component="div">
                                { movieDetails.title } 
                                <span style={{ marginLeft: '8px', fontSize: '2rem', color: '#ff8f00' }}>
                                    ({yearReleased})
                                </span>
                            </Typography>          
                            <Typography variant="body2" >
                                <b>Date Released: </b> { movieDetails.releaseDate }
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body1"   >
                                <b>Overview: </b>{ movieDetails.overview }
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
                <InteractionsCard movieDetails={ movieDetails } />     
            </div>
        </Paper>
        <div className="interactions-container">
            {/* <MovieDetailsNav /> */}
        </div>
        </div>
    </>
  );
}

export default MovieDetailCard;

MovieDetailCard.propTypes = {
    movieId: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string, 
    overview: PropTypes.string, 
    poster: PropTypes.string,
    genre: PropTypes.array

}


    