import React from "react";
import './MovieDetailCard.css';

function MovieDetailCard({ title, releaseDate, overview, poster, id, rating, year }){
    

    //The Movie Database (TMDb), the base URL for images might look like https://image.tmdb.org/t/p/w500. So, you would construct the full URL by concatenation... 
    const baseImageUrl = "https://image.tmdb.org/t/p/w500";  
    const fullPosterUrl = `${baseImageUrl}${poster}`;



    return(
        <>
            <div >
                <div>
                    <br />
                    <img 
                        src= { fullPosterUrl }
                        height="400px" width="auto"
                    />
                </div>
                <div>
                    <h2> { title } </h2> 
                    <p> <b>Release Date: </b> { releaseDate } </p>                         
                    <p> <b>Overview: </b>{ overview } </p>
                    <p> <b>Rating: </b>{ rating }</p>


{/* Need to find the property names from API (director, genre) */}
                    {/* <p> <b>Director: </b> { director } </p> */}                     
                    {/* <p><b>Genre(s): </b>
                        {genre.map((genre, index) => <li key={index}>{genre}</li>)}
                    </p> */}                                    
                </div>
            </div>
        </>
    );
}

export default MovieDetailCard;