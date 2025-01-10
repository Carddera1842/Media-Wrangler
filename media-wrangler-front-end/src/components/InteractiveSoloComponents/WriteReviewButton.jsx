import React, { useState } from 'react'
import DrawIcon from '@mui/icons-material/Draw';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

function WriteReviewButton({ title, id, onClick }) {



  return (
    <div>
        <IconButton 
            onClick={ onClick }
        >     
            <DrawIcon 
                sx={{
                    fontSize: "40px"
                }} 
            />
        </IconButton>  
    </div>
  )
}

export default WriteReviewButton

WriteReviewButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string, 
    onClick: PropTypes.func.isRequired
}

/*
TODO: FIGURE THIS ONE OUT ONCE SQL IS TRACKING EVERYTHING:
NOTE: Eventually, I want to figure out how I will check to see if user has already written a one for a movie. Maybe when "review" 
is submitted we can update a state variable that can then be used for conditional rendering of "write review" and "edit review" 
---OR---
Some function/SQL search that checks the database and searches for the movie id in the user/review table. If found, "edit review" renders
Maybe both, IDK yet... 
 */


