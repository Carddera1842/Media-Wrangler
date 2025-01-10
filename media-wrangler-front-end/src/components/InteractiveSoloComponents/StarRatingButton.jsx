import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function StarRatingButton({ defaultValue, precision, onChange, name, id, title } ) {

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

StarRatingButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
}
