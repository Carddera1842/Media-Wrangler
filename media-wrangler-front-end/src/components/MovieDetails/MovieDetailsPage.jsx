import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailCard from "./MovieDetailCard";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGY4N2NjNmIxZTZhMzQyMThjNjdjYWM1NGMwYzE0ZiIsIm5iZiI6MTczNDE5MTM5MS43NzcsInN1YiI6IjY3NWRhOTFmZjFiZjk2ZGMyNDc4MTA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4trA-9bv10lqcfQyhPxFTeKRWMyyPjIhgM_3Vri9Y6Y`);
      const movieDetails = await response.json();
      setMovieDetails(movieDetails);
    };

    // Fetch reviews from your backend
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews?movieId=${id}`);
      const data = await response.json();
      setReviews(data);
    };

    fetchMovieDetails();
    fetchReviews();
  }, [id]);

  return (
    <div>
      {movieDetails && (
        <div>
            <MovieDetailCard movieDetails={movieDetails} />
        </div>
      )}
      {/* <div>
        <h2>User Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <small>{review.author}</small>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MovieDetailsPage;
