import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import StarRating from './StarRating';
import LikeButton from './LikeButton';
import PropTypes from 'prop-types';
import WriteReviewButton from './WriteReviewButton';
import Typography from '@mui/material/Typography';


function MovieInteractions({ title, id }) {
  
  
    const buttons = [
        <Button key="one" className="button-container">
            <div className="button-content">
                <span className="button-label">Rate:</span>
                <StarRating title={ title } id={ id }/>
            </div>
        </Button>,
        <Button key="two" className="button-container">
            <div className="button-content">
                <span className="button-label">Like:</span>
                <LikeButton title={ title } id={ id } />
            </div>
        </Button>,
        <Button key="three" className="button-container">
            <div className="button-content">
                <span className="button-label">Write Review:</span>
                <WriteReviewButton title={ title } id={ id } />
            </div>
        </Button>
    ];
       
    //NOTE: We can pick if there is a style out of the three we like better & changes to css can be altered to match our color scheme
    
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
                border: '2px solid teal',     
                borderRadius: '8px',           
            }}
        >
            {buttons}
        </ButtonGroup>
        {/* <ButtonGroup 
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
        >
            {buttons}
        </ButtonGroup> */}
        {/* <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
        >
            {buttons}
        </ButtonGroup> */}
        </Box>
    </div>
  );
}

export default MovieInteractions;

MovieInteractions.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
}
