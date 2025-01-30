import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button, Paper, Modal, Box, IconButton } from '@mui/material';
import '../../stylings/MovieDetailsPage.css';
import PropTypes from 'prop-types';
import InteractionsCard from '../MovieInteraction/InteractionsCard';
import CloseIcon from "@mui/icons-material/Close";   





function MovieDetailCard({ movieDetails }) {

    const [isOpen, setOpen] = useState(false);

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
        setOpen(true);
        console.log("clicked movie poster");
    }

    function handleClose() {
        setOpen(false);
        console.log("poster closed");
    }


  return (
    <>
        <div>
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 1100,
                    background: "rgba(249, 79, 0 , 0.55)",
                    margin: "40px auto",
                    padding: "10px",
                    borderRadius: "14px"
                }}
            >
            <div className="movie-detail-container">
                <Card sx={{maxWidth: 1000, background:"rgba(19, 19, 20, 0.81)", borderRadius:"14px", border:"3px solid rgba(17, 144, 213, 0.93)"}} variant="outlined">
                    <div className="movie-info-container">
                        <div >
                        <CardActionArea >
                            <CardMedia
                                onClick={handlePosterClick}
                                component="img"
                                height= "300px"
                                width = "auto"
                                image={ fullPosterURL }
                                alt="Movie Poster"
                            />

                        </CardActionArea>
                        <Modal open={ isOpen} onClose={handleClose}>
                            <Box
                            sx={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 2,
                                outline: "none",
                            }}
                            >
                                 <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "grey.500",
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            <img
                                src={ fullPosterURL }
                                alt="Enlarged Poster"
                                style={{
                                width: "100%",
                                maxWidth: "600px",
                                height: "auto",
                                display: "block",
                                margin: "0 auto",
                                }}
                            />
                            </Box>
                        </Modal>
                        </div>
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


    