import React, { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import PropTypes from 'prop-types';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../../Services/AuthContext';
import { submitMovieLike, removeMovieLike } from '../../Services/MovieLikeService';

/*
    TODO: The "Add to Lists" and "Your Journal" buttons need to be handled once these features are setup and ready for it.

    TODO: The "liked" button counter needs some focus, figure out how to save the counts so we can display the total "likes" across all reviews
*/

function InteractionsCard({ movieDetails }) {

    const [rating, setRating] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    
    
    const { user } = useAuth();
    const navigate = useNavigate();

    function onChangeRating(e) {
        setRating(e.target.value);
    }

    const movieId = movieDetails.id;
    const userId = user.id;

    async function handleLikeClick() {
        setLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        console.log("movieDetails.id: ", movieId);
        console.log("user.id :", userId);
   
        const data = {
            movieId,
            userId
        }

        try {
            if (!isLiked) {
                const result = await submitMovieLike(data);
                if (result === "Success") {
                    console.log("Success liking the movie:", result);
                    setLiked(true);  
                    setLikeCount(likeCount);  
                }
            } else {
                const result = await removeMovieLike(movieId, userId);
                if (result === "Success") {
                    console.log("Success removing the like movie:", result);
                    setLiked(false);  
                    setLikeCount(likeCount);  
                } else {
                    setLikeCount(likeCount - 1);  
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setLiked(!isLiked);  
            setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);  
        }
    }
   




    //state comes fom the navigate of react-router-dom. Everything from the movie object we want to pass to the movieReview is put in the state
    function handleWriteReviewClick() {
        if(!user) {
            alert("You must be logged in to write a review");
            navigate('/login');
        }
        navigate("/reviews/create", {
            state: { movieDetails, user }
        });
    }

    function handleJournalClick() {
        if(!user) {
            alert("You must be logged in to visit your journal");
            navigate('/login');
        }
        navigate(`/reviews/user/${user.id}`, {
            state: { user }

        });
    }
      
    
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate</span>
                <StarRatingButton
                    name="half-rating" 
                    title={ movieDetails.title }
                    defaultValue={0} 
                    precision={0.5} 
                    onChange={ onChangeRating }
                />
            </div>
        </Button>,
        <Button 
            key="two" 
            className="button-container"
            name="like-button"
            title={ movieDetails.title }
            value={ isLiked }                    
            onClick={ handleLikeClick }
        > 
            <div className="button-content">
               <FavoriteIcon sx={{ fontSize: '40px', color: isLiked ? 'red' : 'gray', 
          transition: 'color 0.3s',  }} /> 
               <br />
               <span className="button-label">Likes { likeCount }</span>                
            </div>
        </Button>,
        <Button 
            key="three" 
            className="button-container"
            name="write-review"
            title={ movieDetails.title }
            onClick={ handleWriteReviewClick } 
        >
            <div className="button-content">
                <span className="button-label">Write Review</span>   
            </div>
            </Button>,
            <Button key="four" className="button-container">
                <div className="button-content">
                    <span className="button-label"> Add to Lists </span>
                    <AddIcon />
                </div>
            </Button>,
            <Button 
                key="five" 
                className="button-container"
                name="route-to-journal"
                onClick={ handleJournalClick }
            >
                <div className="button-content">
                    <span className="button-label">Your Journal</span>
                </div>
            </Button>
    ];
    
    return (
      <div >
        <Box 
        sx={{
            display: 'flex',
            '& > *': {
            m: 1,
            },
        }}
        >      
            <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                sx={{
                    backgroundColor:"rgb(41, 43, 45)",  
                    borderRadius: '8px',   
                    border: "2px solid #ff8f00"        
                }}
            >
                {buttons}
            </ButtonGroup>
        </Box>
    </div>
  );
}

export default InteractionsCard;

InteractionsCard.propTypes = {
    movieId: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.array,
    poster: PropTypes.string,
    releaseDate: PropTypes.string
}

