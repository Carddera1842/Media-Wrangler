import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailCard from "./MovieDetailCard";
import StreamingProviders from "./StreamingProviders";
import MovieDetailsNav from "../nav/MovieDetailsNav";
import MovieReviewListCard from '../MovieDetails/MovieReviewListCard';
import { fetchMovieReviewsByMovieId } from "../../Services/MovieReviewService";
import { Container, Box, Typography } from "@mui/material";
import "../../stylings/MovieDetailsPage.css";



function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState();


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${id}`);
        const textResponse = await response.text();

        if (response.ok) {
          const movieDetails = JSON.parse(textResponse);
          setMovieDetails(movieDetails);
        } else {
          console.error('Failed to fetch movie details from the backend.');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoadingMovie(false);
      }
    };

    fetchMovieDetails();
  }, [id]);


  useEffect(() => {
    async function fetchReviews() {
        const data = await fetchMovieReviewsByMovieId(id);
        setReviews(data);
        setLoadingReviews(false);
    };
    fetchReviews();
  }, [id]);


  if (loadingMovie) {
    return <p>Loading movie ... </p>
  }

  if (loadingReviews) {
    return <p>Loading movie reviews</p>
  }


  return (
    <div className="movie-details-page-background">
      <Container maxWidth="lg">
        {/* Movie Detail Card - Full Width */}
        <Box mb={3}>
          {movieDetails && <MovieDetailCard movieDetails={movieDetails} />}
        </Box>

        <div className="streaming-nav-container">
          <div className="styled-card">
            {movieDetails && <StreamingProviders movieId={id} />}
          </div>
          <div className="styled-card">
            {movieDetails && <MovieDetailsNav movieDetails={movieDetails} />}
          </div>
        </div>

        {/* Reviews Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography variant="body1">
              Be the first to write this movie a review!
            </Typography>
          ) : (
            reviews.map((review) => (
              <MovieReviewListCard
                key={review.id}
                rating={review.ratingValue}
                award={review.award}
                review={review.review}
                authorId={review.userId}
                username={review.username}
                firstname={review.firstname}
                lastname={review.lastname}
                title={review.title}
                movieReviewId={review.id}
                dateWatched={review.dateWatched}
                isSpoiler={review.isSpoiler}
              />
            ))
          )}
        </Box>
      </Container>
    </div>
  );
}

export default MovieDetailsPage;
