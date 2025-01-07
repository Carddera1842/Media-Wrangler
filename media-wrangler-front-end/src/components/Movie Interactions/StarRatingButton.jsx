import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function StarRatingButton({ title, id } ) {

    const [userRating, setUserRating] = useState(0);   
 
  return (
    <Stack spacing={1} direction="row" >
        <Rating 
            name="half-rating" 
            defaultValue={0} 
            precision={0.5} 
            onChange={(e) => setUserRating(e.target.value)}
        />

        {/* NOTE: Leaving here to keep an eye on functionality for now-- especially if adding more props */}
        {/* <p>{(userRating > 0 ? `Gave "${ title }" ${ userRating } Stars! (id# ${id})` : null)}</p> */}
        
    </Stack>
  );
}

StarRatingButton.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
}
