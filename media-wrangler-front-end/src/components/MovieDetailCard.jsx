import React from "react";
import './MovieDetailCard.css';

function MovieDetailCard({ poster, title, releaseDate, director, overview, genre }){

      
    return(
        <>
            <div >
                <div>
                    <img 
                        src={ poster }
                        height="400px" width="auto"
                    />
                                    {/* { movie.poster_path  } */}
                </div>
                <div>
                    <h2> { title } </h2> 
                        {/* { movie.title } */}

                    <p> <b>Release Date: </b> { releaseDate } </p> 
                        {/* { movie.release_date }  ---> Do we just want the year?? */}

                    <p> <b>Director: </b> { director } </p>
                        {/* Need to find the property name from API */}
                            
                    <p><b>Genre(s): </b> {genre.join(", ")} </p>
                        {/* { movie.genres }  ---> I think I will need to use .map() since the genres value is an array with potentially many genre elements NOTE: I tried to use map and it listed each on a separate line. I wanted it all on one line so I ended up using join instead. We can always change it later*/}            

                    <p> <b>Overview: </b>{ overview } </p>
                            {/* { movie.overview } */} 
                </div>
              

            
            </div>
        </>
    );
}

export default MovieDetailCard;