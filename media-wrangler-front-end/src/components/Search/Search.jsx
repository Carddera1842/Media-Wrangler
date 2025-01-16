import React, { useState } from 'react';
import MovieCard from "../MoviePosterCard/PosterCard";

function Search() {
    const [movieSearch, setMovieSearch] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchType, setSearchType] = useState('title');

    const handleSearch = async () => {
        setMovieData([]); // Reset previous movie data before making a new request
        setError(null); // Reset previous error message
        
        try {
            // GET request to the backend API
            const response = await fetch(`http://localhost:8080/api/movies/search?searchString=${movieSearch}&searchType=${searchType}`, {
            });
            
            if (!response.ok) {
                throw new Error('Movie not found!');
            }

            // Parsing the response as JSON
            const data = await response.json();
            setMovieData(data);  // Save the data to state
            setError(null);       // Reset any previous errors
        } catch (error) {
            setError(error.message); // Handle error
            setMovieData(null); // Clear any previous movie data
        }
    };

    let searchMessage = ""
    if (hasSearched) {
        searchMessage = "No movies found. Try another search!"
    }

    return (
        <div>
            <h1>Search for Movies</h1>

            <div>
                <button 
                    onClick={() => setSearchType('title')} 
                    style={{ backgroundColor: searchType === 'title' ? 'lightblue' : '' }}
                >
                    Search by Title
                </button>
                <button 
                    onClick={() => setSearchType('person')} 
                    style={{ backgroundColor: searchType === 'person' ? 'lightgreen' : '' }}
                >
                    Search by Person
                </button>
            </div>


            <input
                type="text"
                value={movieSearch}
                onChange={(e) => setMovieSearch(e.target.value)}
                placeholder="Enter movie title"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p>{error}</p>}  {/* Display error message if present */}

            {movieData.length > 0 ? (
                <div id="movie-search">
                    {movieData.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p>{searchMessage}</p>
            )}
        </div>
    );
}

export default Search;