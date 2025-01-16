import React, { useState } from 'react'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

function LoveButton({ title, id }) {

    const [isMouseOver, setMouseOver] = useState(false); 
    const [isLiked, setLiked] = useState(false);

    function handleMouseOver() {
        setMouseOver(true);
    }

    function handleMouseOut() {
        setMouseOver(false);
    }

    function handleClick() {
        setLiked(!isLiked); 
        console.log("Heart button clicked!");
      };

  return (
    <div>
        <IconButton 
            onClick={handleClick}
            onMouseOver={handleMouseOver} 
            onMouseOut={handleMouseOut}
        >     
            <FavoriteTwoToneIcon 
                sx={{ 
                    color: isLiked ? 'red' : (isMouseOver ? 'purple' : 'blue'), 
                    fontSize: isLiked ? "50px" : "40px",
                }} 
            />
        </IconButton>

        {/* NOTE: Leaving here to keep an eye on functionality for now-- especially if adding more props */}
        {/* <p>{isLiked ? `You Liked "${title}" with id of ${id}` : null}</p> */}
      
    </div>
  )
}

export default LoveButton

LoveButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
}
