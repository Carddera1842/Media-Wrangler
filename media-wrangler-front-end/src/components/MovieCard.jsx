import React from 'react';
import movie from '../assets/Its-a-wonderful-lfe.jpg';

function MovieCard() {

    return(
        <div>
            <img src={movie} alt="It's a Wonderful Life" width="200" height="300"></img>
            <p>It's a Wonderful Life (1946)</p>
        </div>
    );
}

export default MovieCard;

/*
Currently I have placeholder values, to make it dynamic we will use a loop that goes over the array of movie objects that is returned from the API
<img src={moviePosterKey}></img>   <--- The width and height can be adjusted. We probably want a smaller poster size for the poster grid that will display the movie-card and possibly to attach to the movie-review-form
We probably want an image a bit larger for the movie-detail-card when we are targeting in on one specific movie 
<p>{movieTitleKey}></p>
*/