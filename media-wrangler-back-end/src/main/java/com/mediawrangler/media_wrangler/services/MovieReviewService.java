package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            dto.setRating(review.getRating());
            dto.setSpoiler(review.isSpoiler());
            dto.setWatchAgain(review.getWatchAgain());
            dto.setAward(review.getAward());
            dto.setTags(review.getTags());
            dto.setDateWatched(review.getDateWatched());
            dto.setId(review.getId());
            dto.setUserId(review.getUser().getId());

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
            dto.setRating(review.getRating());
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
            dto.setRating(movieReview.getRating());
            dto.setSpoiler(movieReview.isSpoiler());
            dto.setWatchAgain(movieReview.getWatchAgain());
            dto.setAward(movieReview.getAward());
            dto.setTags(movieReview.getTags());
            dto.setDateWatched(movieReview.getDateWatched());
            dto.setId(movieReview.getId());
            dto.setUserId(movieReview.getUser().getId());

            movieReviewDTOS.add(dto);
        }
        return movieReviewDTOS;
    }



}



