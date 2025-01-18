import React, { useEffect, useState } from 'react';
import './MovieListTable.css'

const MovieListTable = () => {
  const [movieLists, setMovieLists] = useState([]);

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

  return (
    <div>
      <h1>Movie Lists</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>List Name</th>
            <th>Movie ID</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {movieLists
            .filter((list) => list.movieId !== 0) // Exclude rows where movieId is 0
            .map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.listName}</td>
                <td>{list.movieId}</td>
                <td>{list.user.id}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieListTable;
