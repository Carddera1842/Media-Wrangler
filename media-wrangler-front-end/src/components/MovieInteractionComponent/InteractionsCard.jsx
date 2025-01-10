import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import StarRatingButton from '../InteractiveSoloComponents/StarRatingButton';
import LoveButton from '../InteractiveSoloComponents/LoveButton';
import WriteReviewButton from '../InteractiveSoloComponents/WriteReviewButton';
import { useNavigate } from "react-router-dom";




function InteractionsCard({ title, movieId }) {

    const [rating, setRating] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    

    const navigate = useNavigate();

    function handleLikeClick() {
        setLiked(!isLiked); // Toggle isLiked
        if (isLiked) {
            setLikeCount(likeCount - 1); // Decrease likeCount if it was liked
        } else {
            setLikeCount(likeCount + 1); // Increase likeCount if it wasn't liked
        }
    }

    function handleWriteReviewClick() {
        navigate("/reviews/create");
        console.log("user wants to write a review");
    }
      
    
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate:</span>
                <StarRatingButton
                    name="half-rating" 
                    title={ title }
                    movieId={ movieId }
                    defaultValue={0} 
                    precision={0.5} 
                    onChange={(e) => setRating(e.target.value)}
                />
                <p>{rating}</p>
            </div>
        </Button>,
        <Button key="two" className="button-container">
            <div className="button-content">
                <span className="button-label">Like:</span>
                <LoveButton 
                    name="like-button"
                    title={ title } 
                    movieId={ movieId } 
                    value={ isLiked }                    
                    onClick={ handleLikeClick }                   
                />
                    <p>{likeCount}</p>
            </div>
        </Button>,
        <Button key="three" className="button-container">
            <div className="button-content">
                <span className="button-label">Write Review:</span>
                <WriteReviewButton 
                    name="write-review"
                    title={ title } 
                    movieId={ movieId }
                    onClick={ handleWriteReviewClick }  
                />
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
    title: PropTypes.string
}


/* --- FUNCTIONALITY CHECK LIST:---

** StarRatingButton: it is setting the users rating correctly, not sure if title and movieId are working it 

** LovedButton: clicking adds or removes to the liked count. The heart goes from gray to red when liked or not. 

** WriteReviewButton: With a double click, it takes user to "/reviews/create"

*/