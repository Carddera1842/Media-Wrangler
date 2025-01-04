import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';


export default function StarRating({ title } ) {

    const [userRating, setUserRating] = useState(0);   
 
  return (
    <Stack spacing={1} direction="row" >
        <Rating 
            name="half-rating" 
            defaultValue={0} 
            precision={0.5} 
            onChange={(e) => setUserRating(e.target.value)}
        />
        <p>{(userRating > 0 ? `Gave "${ title }" ${ userRating } Stars!` : null)}</p>
    </Stack>
  );
}

StarRating.propTypes = {
    title: PropTypes.string
}