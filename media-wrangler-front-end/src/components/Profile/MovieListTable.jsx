import React, { useEffect, useState } from 'react';
import './MovieListTable.css';

const MovieListTable = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [movies, setMovies] = useState({}); 

  const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y";; // Replace with your TMDB API key

  useEffect(() => {
   
    const fetchMovieLists = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/lists/all');
        if (response.ok) {
          const data = await response.json();
          setMovieLists(data);
        } else {
          console.error('Failed to fetch movie lists.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMovieLists();
  }, []);

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

  return (
    <div>
      <h1>Movie Lists</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>List Name</th>
            <th>Movie Poster</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {movieLists
            .filter((list) => list.movieId !== 0) 
            .map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.listName}</td>
                <td>
                  {movies[list.movieId]?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movies[list.movieId].poster_path}`}
                      alt={movies[list.movieId].title}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  ) : (
                    'Loading...'
                  )}
                </td>
                <td>{list.user.id}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieListTable;

