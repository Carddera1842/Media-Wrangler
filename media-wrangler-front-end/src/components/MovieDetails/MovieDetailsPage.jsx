import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetailCard from "./MovieDetailCard";
import StreamingProviders from "./StreamingProviders";
import MovieDetailsNav from "../nav/MovieDetailsNav";
import MovieReviewListCard from "../ReviewDisplay/MovieReviewListCard";
import { fetchMovieDetails, fetchMovieReviewsByMovieId } from "../../Services/MovieReviewService";
import "../../stylings/MovieDetailsPage.css";



function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState();


  useEffect(() => {
    async function fetchData() {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);
        setLoadingMovie(false);
    };
    fetchData();
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
    <>
    <div className="movie-details-page-background">
      {movieDetails && (
        <div>
            <MovieDetailCard movieDetails={ movieDetails } />
            <StreamingProviders movieId={id} />
        </div>
      )}
      {movieDetails && (
        <div>
          <MovieDetailsNav movieDetails={ movieDetails } />
        </div>
      )}

        <div>
          {reviews.length === 0 ? (
              <p>Be the first to write this movie a review!</p>
          ) : (
            reviews.map((review) => (
          <MovieReviewListCard
            key = { review.id }
            rating = { review.rating }
            award = { review.award }
            review = { review.review } 
            authorId = { review.userId }
            username = { review.username }
            firstname = { review.username }
            lastname = { review.lastname }
            title = { review.title }
            movieReviewId = { review.id }
          />
          )))}

        </div>
    </div>
    </>
  );
};

export default MovieDetailsPage;
