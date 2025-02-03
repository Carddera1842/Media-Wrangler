package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieReviewService {

    @Autowired
    private final MovieReviewRepository movieReviewRepository;



    public MovieReviewService(MovieReviewRepository movieReviewRepository, UserRepository userRepository) {
        this.movieReviewRepository = movieReviewRepository;

    }


    public MovieReview saveReview(MovieReview movieReview) {
        return movieReviewRepository.save(movieReview);
    }


    public Optional<MovieReviewDTO> getReviewById(Long id) {
        Optional<MovieReview> optionalReview = movieReviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            MovieReview review = optionalReview.get();
            MovieReviewDTO dto = new MovieReviewDTO();


            dto.setMovieId(review.getMovieId());
            dto.setTitle(review.getTitle());
            dto.setFullPosterURL(review.getFullPosterURL());
            dto.setYearReleased(review.getYearReleased());
            dto.setReview(review.getReview());
            dto.setRatingValue(review.getRating().getRating());
            dto.setSpoiler(review.isSpoiler());
            dto.setWatchAgain(review.getWatchAgain());
            dto.setAward(review.getAward());
            dto.setTags(review.getTags());
            dto.setDateWatched(review.getDateWatched());
            dto.setId(review.getId());
            dto.setUserId(review.getUser().getId());
            dto.setLastname(review.getUser().getLastname());
            dto.setFirstname(review.getUser().getFirstname());
            dto.setUsername(review.getUser().getUsername());

            return Optional.of(dto);
        }

        return Optional.empty();
    }


    public List<MovieReviewDTO> getReviewsByUser(int userId) {
        List<MovieReview> reviews = movieReviewRepository.findByUserId(userId);
        List<MovieReviewDTO> reviewDTOs = new ArrayList<>();

        for (MovieReview review : reviews) {
            MovieReviewDTO dto = new MovieReviewDTO();
            dto.setMovieId(review.getMovieId());
            dto.setTitle(review.getTitle());
            dto.setFullPosterURL(review.getFullPosterURL());
            dto.setYearReleased(review.getYearReleased());
            dto.setReview(review.getReview());
            dto.setRatingValue(review.getRating().getRating());
            dto.setSpoiler(review.isSpoiler());
            dto.setWatchAgain(review.getWatchAgain());
            dto.setAward(review.getAward());
            dto.setTags(review.getTags());
            dto.setDateWatched(review.getDateWatched());
            dto.setId(review.getId());
            dto.setUserId(review.getUser().getId());

            reviewDTOs.add(dto);
        }
        return reviewDTOs;
    }



    public List<MovieReviewDTO> getReviewsByMovieId(Long movieId) {
        List<MovieReview> movieReviews = movieReviewRepository.findByMovieId(movieId);
        List<MovieReviewDTO> movieReviewDTOS = new ArrayList<>();

        for (MovieReview movieReview : movieReviews) {
            MovieReviewDTO dto = new MovieReviewDTO();
            dto.setMovieId(movieReview.getMovieId());
            dto.setTitle(movieReview.getTitle());
            dto.setFullPosterURL(movieReview.getFullPosterURL());
            dto.setYearReleased(movieReview.getYearReleased());
            dto.setReview(movieReview.getReview());
            dto.setRatingValue(movieReview.getRating().getRating());
            dto.setSpoiler(movieReview.isSpoiler());
            dto.setWatchAgain(movieReview.getWatchAgain());
            dto.setAward(movieReview.getAward());
            dto.setTags(movieReview.getTags());
            dto.setDateWatched(movieReview.getDateWatched());
            dto.setId(movieReview.getId());
            dto.setUserId(movieReview.getUser().getId());
            dto.setUsername(movieReview.getUser().getUsername());
            dto.setFirstname(movieReview.getUser().getFirstname());
            dto.setLastname(movieReview.getUser().getLastname());

            movieReviewDTOS.add(dto);
        }
        return movieReviewDTOS;
    }


    public Optional<MovieReviewDTO> updatedReview(Long id, MovieReviewDTO incomingMovieReview, int userId) {
        Optional<MovieReview> optionalReview = movieReviewRepository.findByIdAndUserId(id, userId);

        if (optionalReview.isPresent()) {
            MovieReview movieReview = optionalReview.get();

            movieReview.setReview(incomingMovieReview.getReview());
            movieReview.setDateWatched(incomingMovieReview.getDateWatched());
            if (incomingMovieReview.getAward() != null) movieReview.setAward(incomingMovieReview.getAward());
            if (incomingMovieReview.getWatchAgain() != null) movieReview.setWatchAgain(incomingMovieReview.getWatchAgain());
            if (incomingMovieReview.getTags() != null) movieReview.setTags(incomingMovieReview.getTags());
            movieReview.setSpoiler(incomingMovieReview.isSpoiler());

            MovieReview updatedReview = movieReviewRepository.save(movieReview);
            System.out.println("Updated review: " + updatedReview.getReview());

            MovieReviewDTO dto = new MovieReviewDTO();
            dto.setMovieId(updatedReview.getMovieId());
            dto.setTitle(updatedReview.getTitle());
            dto.setFullPosterURL(updatedReview.getFullPosterURL());
            dto.setYearReleased(updatedReview.getYearReleased());
            dto.setReview(updatedReview.getReview());
            dto.setSpoiler(updatedReview.isSpoiler());
            dto.setWatchAgain(updatedReview.getWatchAgain());
            dto.setAward(updatedReview.getAward());
            dto.setTags(updatedReview.getTags());
            dto.setDateWatched(updatedReview.getDateWatched());
            dto.setId(updatedReview.getId());
            dto.setUserId(updatedReview.getUser().getId());
            dto.setUsername(updatedReview.getUser().getUsername());
            dto.setFirstname(updatedReview.getUser().getFirstname());
            dto.setLastname(updatedReview.getUser().getLastname());

            return Optional.of(dto);
        }

        return Optional.empty();
    }

}




