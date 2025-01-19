import React, { useEffect, useState } from 'react';
import './MovieListTable.css';

import { useAuth } from '../../Services/AuthContext';

const MovieListTable = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [movies, setMovies] = useState({});
  const [filter, setFilter] = useState(''); 
  const { user } = useAuth();

  const TMDB_API_KEY = "YOUR_TMDB_API_KEY";

  useEffect(() => {
    const fetchMovieLists = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/lists/all');
        if (response.ok) {
          const data = await response.json();
          const userMovieLists = data.filter((list) => list.user.id === user.id);
          setMovieLists(userMovieLists);
        } else {
          console.error('Failed to fetch movie lists.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      fetchMovieLists();
    }
  }, [user]);

  useEffect(() => {
    const fetchMovieDetails = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMovies((prevMovies) => ({
            ...prevMovies,
            [movieId]: data,
          }));
        } else {
          console.error(`Failed to fetch details for movieId: ${movieId}`);
        }
      } catch (error) {
        console.error(`Error fetching details for movieId: ${movieId}`, error);
      }
    };

    movieLists.forEach((list) => {
      if (!movies[list.movieId] && list.movieId !== 0) {
        fetchMovieDetails(list.movieId);
      }
    });
  }, [movieLists, movies]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredLists = filter
    ? movieLists.filter((list) => list.listName.includes(filter))
    : movieLists;

  return (
    <div>
      <h1>Movie Lists</h1>

      <div>
  <label htmlFor="filterDropdown">Filter by List Name: </label>
  <select id="filterDropdown" value={filter} onChange={handleFilterChange}>
    <option value="">All</option>
    {Array.from(new Set(movieLists.map((list) => list.listName))).map((listName, index) => (
      <option key={index} value={listName}>
        {listName}
      </option>
    ))}
  </select>
</div>

      <div className="poster-grid">
        {filteredLists
          .filter((list) => list.movieId !== 0)
          .map((list) => (
            <div key={list.id} className="poster-item">
              {movies[list.movieId]?.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movies[list.movieId].poster_path}`}
                  alt={movies[list.movieId].title}
                  style={{ width: '150px', height: 'auto' }}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieListTable;
