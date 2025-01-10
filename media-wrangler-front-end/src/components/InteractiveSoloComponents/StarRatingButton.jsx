import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function StarRatingButton({ defaultValue, precision, onChange, name, movieId, title } ) {

  return (
    <>    
     <Stack spacing={1} direction="row" >
        <Rating 
            name={ name } 
            defaultValue={ defaultValue }
            precision={ precision } 
            onChange={ onChange }
            sx={{
              '& .MuiRating-iconFilled': {
                  color: '#ff9800', // Color for filled stars (e.g., amber)
              },
              '& .MuiRating-iconEmpty': {
                  color: '#e0e0e0', // Color for empty stars (e.g., light gray)
              },
              '& .MuiRating-iconHover': {
                  color: '#ffcc00', // Hover color for stars (e.g., yellow)
              },
          }}
        />      
    </Stack>    
    </>   
  );
}


//TODO: Add props validation -- believe I must require title and movieId for proper storage in database
//Actually, I think that these (movieId, title) would be set in the interactionsCard.jsx and don't need to be here
StarRatingButton.propTypes = {
  name: PropTypes.string.isRequired,  
  defaultValue: PropTypes.string.isRequired,
  precision: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired, 
  movieId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

