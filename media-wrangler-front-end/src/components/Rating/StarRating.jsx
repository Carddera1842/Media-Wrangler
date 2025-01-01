/* eslint-disable react/jsx-key */

import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import './StarRating.css';

function StarRating(){

    const [rating, setRating] = useState(null);

    return (
        <>      
        <div>
            {[...Array(5)].map((star, i) => {
                const currentRating = i + 1;
                return (                    
                        <label>
                            <input 
                                type="radio" 
                                name="rating" 
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                            />
                            <FaStar className='star' color={currentRating <= rating ? "#02736B" : "#CECECE"} />
                        </label>                   
                );
            })}
        </div> 
        <p>You gave the movie : {rating} stars </p>        
        </>
    );
}

export default StarRating;

        {/* <div>
            <label>
                <input type="radio" name="rating" value={1} onClick={(e) => setRating(e.target.value)}/>
                <FaStar className='star' />  
                <input type="radio" name="rating" value={2} 
                <FaStar className='star' />  
                <input type="radio" name="rating" value={3}/>
                <FaStar className='star' />  
                <input type="radio" name="rating" value={4}/>
                <FaStar className='star' />  
                <input type="radio" name="rating" value={5}/>
                <FaStar className='star' />  
                
                
           

        </div> */}

        {/* or you can create an array of undefined and map over it, returning a star for each iteration... */}