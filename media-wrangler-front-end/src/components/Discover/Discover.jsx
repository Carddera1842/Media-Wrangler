import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "../MoviePosterCard/PosterCard";
import "./Discover.css";

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
  const [andOrChar, setAndOrChar] = useState(',')
  const [selectedGenres, setSelectedGenres] = useState('');
  
  const handleToggle = (id) => {
    let updatedGenres = selectedGenres.split(andOrChar).map(str => str.trim()).filter(Boolean);
    if (updatedGenres.includes(String(id))) {
      updatedGenres = updatedGenres.filter(genreId => genreId !== String(id));
    } else {
      updatedGenres.push(String(id));
    }
    setSelectedGenres(updatedGenres.join(andOrChar));
  };
  
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);

  const handleDiscover = async () => {
    setMovieData([]); 
    setError(null);
    
    try {

        const encodedGenres = encodeURIComponent(selectedGenres);
        const response = await fetch(`http://localhost:8080/api/movies/discover?genres=${encodedGenres}`, {
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

const handleToggleButton = () => {
  setAndOrChar((prevChar) => {
    const newChar = prevChar === "," ? "|" : ",";
    setSelectedGenres(selectedGenres.replaceAll(prevChar, newChar))
    return newChar;
  });
};

  return (
    <div className="container">
      <h1>Discover a Movie to Watch</h1>
      <div className="button-group">
        <button 
          className="button andor-button" 
          onClick={() => {
            handleToggleButton(); 
            handleDiscover();
          }}
        >
          {andOrChar === "," ? "Any Movies With These Genres" : "Movie Has Each Genre"}
        </button>
      </div>

      <div className="button-group">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleToggle(genre.id)}
            className={`button genre-button ${selectedGenres.includes(String(genre.id)) ? 'selected' : ''}`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div id="discovered-movies">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  </div>

  );
}

export default DiscoverPage;
