import React, { useState } from 'react';
import './PosterCard.css';
import fallbackImage from '../../../Resources/default-fallback-image.jpg'
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {

    const [hoveredId, setHoveredId] = useState(null);

    const navigate = useNavigate();

    const handleMouseOver = (id) => {
        setHoveredId(id);
    };

    const handleMouseOut = () => {
        setHoveredId(null);
    };


    function handleClick() {
        navigate(`/movie/${movie.id}`);
        }
    
  

  const imageUrl = movie.posterPath ? `https://image.tmdb.org/t/p/w780${movie.posterPath}` : fallbackImage;

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

