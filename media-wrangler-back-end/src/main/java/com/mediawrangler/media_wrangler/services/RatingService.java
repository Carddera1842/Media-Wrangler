package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.RatingRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RatingService {

    @Autowired
    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    public RatingService(RatingRepository ratingRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
    }


    public List<RatingDTO> getRatingsByMovieId(Long movieId) {
        List<Rating> ratings = ratingRepository.findByMovieId(movieId);
        List<RatingDTO> ratingDTOS = new ArrayList<>();

        RatingDTO dto = null;
        for (Rating rating : ratings) {
            dto = new RatingDTO();
            dto.setMovieId(rating.getMovieId());
            dto.setUserId(rating.getUser().getId());

            ratingDTOS.add(dto);
        }
        return ratingDTOS;
    }


    public List<RatingDTO> getRatingsByUserId(int userId) {
        List<Rating> ratings = ratingRepository.findByUserId(userId);
        List<RatingDTO> ratingDTOS = new ArrayList<>();

        for (Rating rating : ratings) {
            RatingDTO dto = new RatingDTO();
            dto.setMovieId(rating.getMovieId());
            dto.setUserId(rating.getUser().getId());

            ratingDTOS.add(dto);
        }

        return ratingDTOS;
    }


    public boolean hasUserRatedMovie(Long movieId, int userId) {
        return ratingRepository.existsByMovieIdAndUserId(movieId, userId);
    }


    //TODO: Not sure where the user would delete the rating at but... just in case we add it in somewhere
    public void deleteRating(Long movieId, int userId) {
        Rating rating = ratingRepository.findByMovieIdAndUserId(movieId, userId)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        ratingRepository.delete(rating);
    }


//    public void updateUserRating(Long movieId, User user, double newRating) {
//        Optional<Rating> existingRating = ratingRepository.findByMovieIdAndUserId(movieId, user.getId());
//
//        if (existingRating.isPresent()) {
//            ratingRepository.updateRating(movieId, user, newRating);
//        } else {
//            Rating newRatingEntry = new Rating();
//            newRatingEntry.setMovieId(movieId);
//            newRatingEntry.setUser(user);
//            newRatingEntry.setRating(newRating);
//
//            ratingRepository.save(newRatingEntry);
//        }
//    }


}
