package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.User;
import jakarta.validation.constraints.PastOrPresent;
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

//    public MovieReview updatedReview(Long id, int userId) {
//        MovieReview movieReview = MovieReviewRepository.findByIdAndUserId(id, userId)
//                .orElseThrow(() -> new IllegalArgumentException("Review not found or unauthorized"));
//
//        //updated dateCreated
//        if (MovieReviewDTO.getReview() != null) movieReview.setReview(MovieReviewDTO.getReview());
//        if (MovieReviewDTO.getDateWatched() != null) movieReview.setDateWatched(MovieReviewDTO.getDateWatched());
//        if (MovieReviewDTO.getAward() != null) movieReview.setAward(MovieReviewDTO.getAward());
//        if (MovieReviewDTO.getRating() != null) movieReview.setRating(MovieReviewDTO.getRating());
//        if (MovieReviewDTO.getWatchAgain() != null) movieReview.setWatchAgain(MovieReviewDTO.getWatchAgain());
//        if (MovieReviewDTO.getTags() != null) movieReview.setTags(MovieReviewDTO.getTags());
//        if (MovieReviewDTO.getSpoiler() != null) movieReview.setSpoiler(MovieReviewDTO.getSpoiler());
//
//        return movieReviewRepository.save(movieReview);
//
//    }


}



