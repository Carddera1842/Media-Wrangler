package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.RatingRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.models.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private final RatingRepository ratingRepository;

    @Autowired
    private final UserRepository userRepository;


    public RatingService(RatingRepository ratingRepository, UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository;
    }


    public RatingDTO addRating(RatingDTO ratingDTO) {
        User user = userRepository.findById(ratingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Rating rating = new Rating();
        rating.setMovieId(ratingDTO.getMovieId());
        rating.setUser(user);
        rating.setRating(ratingDTO.getRating());

        Rating savedRating = ratingRepository.save(rating);

        RatingDTO savedRatingDTO = new RatingDTO();
        savedRatingDTO.setMovieId(savedRating.getMovieId());
        savedRatingDTO.setUserId(savedRating.getUser().getId());
        savedRatingDTO.setRating(savedRating.getRating());

        return savedRatingDTO;
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



    public void deleteRating(Long movieId, int userId) {
        Rating rating = ratingRepository.findByMovieIdAndUserId(movieId, userId)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        ratingRepository.delete(rating);
    }


    public RatingDTO updateUserRating(RatingDTO ratingDTO) {
        Long movieId = ratingDTO.getMovieId();
        int userId = ratingDTO.getUserId();
        double newRating = ratingDTO.getRating();


        Rating rating = ratingRepository.findByMovieIdAndUserId(movieId, userId)
                .orElseThrow(() -> new RuntimeException("Rating not found"));

        rating.setRating(newRating);
        Rating updatedRating = ratingRepository.save(rating);

        RatingDTO updatedRatingDTO = new RatingDTO();
        updatedRatingDTO.setMovieId(updatedRating.getMovieId());
        updatedRatingDTO.setUserId(updatedRating.getUser().getId());

        return updatedRatingDTO;
    }


    public Optional<RatingDTO> getRatingByMovieId(Long movieId) {
        Optional<Rating> optionalRating = ratingRepository.findRatingByMovieId(movieId);

        if(optionalRating.isPresent()) {
            Rating rating = optionalRating.get();
            RatingDTO dto = new RatingDTO();

            dto.setRating(rating.getRating());
            dto.setMovieId(rating.getMovieId());
            dto.setUserId(rating.getUser().getId());
            dto.setId(rating.getId());

            return Optional.of(dto);
        }
        return Optional.empty();
    }
}
