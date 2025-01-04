import React, { useState } from 'react'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import IconButton from '@mui/material/IconButton';

function LikeButton() {

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
        >     <FavoriteTwoToneIcon 
                    sx={{ 
                        color: isLiked ? 'red' : (isMouseOver ? 'purple' : 'blue'), 
                        fontSize: isLiked ? "50px" : "40px",
                    }} 
                />
        </IconButton>
      
    </div>
  )
}

export default LikeButton

