import React, { useState } from 'react';
import './PosterCard.css';
function MovieCard({ movie }) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseOver = (id) => {
      setHoveredId(id);
  };

  const handleMouseOut = () => {
      setHoveredId(null);
  };

  const handleClick = () => {
      console.log("Poster Clicked");
  };

  const imageUrl = movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : 'default-fallback-image.jpg';

  return (
      <div>
          <div id="movie-search">
              <div key={movie.id}>
                  <img
                      onClick={handleClick}
                      onMouseOver={() => handleMouseOver(movie.id)}
                      onMouseOut={handleMouseOut}
                      title={movie.title}
                      src={imageUrl}  // Use imageUrl variable
                      alt={movie.title}
                      style={{
                          border: hoveredId === movie.id ? '2px solid rgb(99, 180, 176)' : 'none',
                      }}
                  />
              </div>
          </div>
      </div>
  );
}

export default MovieCard;
/*
NOTE: The width and height can be adjusted. We probably want a smaller poster size for the poster grid that will display the movie-cards and possibly to attach to the movie-review-form
We probably want an image a bit larger for the movie-detail-card when we are targeting in on one specific movie 


NOTE: We may not want to display the movie title in the poster grid (or horizontal display) because the titles will not allow for a good flow with the various lengths. 

NOTE: We just need to decide if we want the results to list horizontal or vertically. For the homepage, if we are viewing the trending movies I think horizontally would be best, but for the search results a vertical display might be nice. No preference either way

-----
NOTE: Make sure not to add () after clickHandler inside the {} because it would then be calling the function instead of acting as a function
*/
