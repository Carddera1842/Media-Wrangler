import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../MoviePosterCard/PosterCard";
//import "./Discover.css";

function DiscoverPage() {
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];
  const [selectedGenres, setSelectedGenres] = useState('');
  const handleToggle = (id) => {
    let updatedGenres = selectedGenres.split(',').map(str => str.trim()).filter(Boolean);
    if (updatedGenres.includes(String(id))) {
      updatedGenres = updatedGenres.filter(genreId => genreId !== String(id));
    } else {
      updatedGenres.push(String(id));
    }
    setSelectedGenres(updatedGenres.join(','));
  };
  
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);

  const handleDiscover = async () => {
    setMovieData([]); 
    setError(null);
    
    try {

        const response = await fetch(`http://localhost:8080/api/movies/discover?genres=${selectedGenres}`, {
        });
        
        if (!response.ok) {
            throw new Error('Movie not found!');
        }

        const data = await response.json();
        console.log('Fetched movie data:', data);
        setMovieData(data); 
        setError(null);    
    } catch (error) {
        setError(error.message); 
        setMovieData(null); 
    }
}; 

useEffect(() => {
  if (selectedGenres) {
    handleDiscover();
  }
}, [selectedGenres]);

  console.log(selectedGenres);
  return (
    <div>
      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => handleToggle(genre.id)}
          style={{
            backgroundColor: selectedGenres.includes(String(genre.id)) ? 'lightblue' : 'gray',
            margin: '5px',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {genre.name}
        </button>
      ))}

    <div id="discovered-movies">
      {movieData.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
        </div>
    <div>
        
        <h3>Selected Genres (IDs):</h3>
        
      </div>
    </div>
  );
}

export default DiscoverPage;
