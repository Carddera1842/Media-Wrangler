import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './ReviewCard.css';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';



function ReviewCard({ title, releaseDate, poster, movieId, awardValue, awardIcon, dateWatched, isSpoiler, rating, review, isLiked, tags }) {

    //Shouldn't need this here once I am retrieving an actual MovieReview
    const yearReleased = new Date(releaseDate).getFullYear(); 

  return (
    <div>
        <div className="user-review-container">
            <Card sx={{ maxWidth: 1200, border: isSpoiler ? "5px solid #d50000" : "5px solid #00695c"}} variant="outlined">
                <div className="movie-info-container">
                    <CardActionArea>  
                        <Typography className="spoiler-alert" >                                                   
                            {(isSpoiler && <p className="spoiler-alert"><PriorityHighIcon />Contains Spoilers </p>)}
                        </Typography>          
                        <CardMedia sx={{margin:"10px"}}
                            component="img"  
                            image={ poster }
                            alt="Movie Poster"
                            className="movie-poster"
                        />
                        <Typography sx={{textAlign: "center"}}>
                            { rating } 
                        </Typography> 
                    </CardActionArea>
                    <CardContent className="user-review">            
                        <Typography gutterBottom variant="h4" component="div">
                        {(isLiked && <FavoriteIcon sx={{ fontSize: '30px', color: "red" }} /> )} { title }
                            <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: '#00695c' }}>
                                ({yearReleased})
                            </span>
                            <hr 
                                style={{ background: isSpoiler ? "#d50000" : "teal" }}                        
                            />
                        </Typography>                           
                        <Typography variant="body1" sx={{ color: 'text.primary', textAlign: 'center', fontSize: '22px' }}>
                            <b>{ awardIcon } { awardValue } </b>
                        </Typography>
                        <br /> 
                        <Typography variant='body2' sx={{ color: 'text.secondary'}}>
                          Watched on { dateWatched }
                        </Typography>
                        <br />                   
                        <Typography variant="body1" sx={{ color: 'black' }}  >
                            { review }
                        </Typography> 
                        <br /> 
                        <Typography>
                            <b>Your Tags:</b>
                        </Typography>    
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem sx={{borderWidth: 1, borderColor: isSpoiler ? '#d50000' : "#00695c" }} />}
                            spacing={2}
                        >
                            { tags.map((tag, index) => (
                                <div key={tag.id}> 
                                    {/* <p>{tag}</p> */}
                                    <Typography variant="body2" sx={{ color: 'text.secondary'}}>{tag}</Typography>
                                </div>))}
                        </Stack> 
                    </CardContent>
                </div>                
                <CardActions>
                    <Button
                        size="small">Edit Review</Button>
                    <Button
                        size="small">Delete Review</Button>
                </CardActions>                          
            </Card>
        </div>
    </div>
  );
}

export default ReviewCard

ReviewCard.PropTypes = {
    title: PropTypes.string.isRequired, 
    releaseDate: PropTypes.string.isRequired, 
    poster: PropTypes.any,     //maybe there isn't a poster available. idk. highly unlikely
    movieId: PropTypes.number.isRequired, 
    award: PropTypes.string, 
    dateWatched: PropTypes.string.isRequired, 
    isSpoiler: PropTypes.bool.isRequired, 
    rating: PropTypes.number.isRequired, 
    review: PropTypes.string.isRequired, 
    isLiked: PropTypes.bool,
    tags: PropTypes.array
}


// Not sure where to put the heart yet:  {(isLiked && <FavoriteIcon sx={{ fontSize: '20px', color: "red" }} />  )}