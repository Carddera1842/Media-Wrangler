package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.dto.MovieLikeDTO;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private final RatingService ratingService;


    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public RatingDTO addLike(@RequestBody RatingDTO ratingDTO) {
        return ratingService.addRating(ratingDTO);
    }


    @GetMapping("/movie/{movieId}")
    public List<RatingDTO> getRatingByMovieId(@PathVariable Long movieId) {
        return ratingService.getRatingsByMovieId(movieId);
    }


    @GetMapping("/user/{userId}")
    public List<RatingDTO> getRatingsByUserId(@PathVariable int userId) {
        return ratingService.getRatingsByUserId(userId);
    }


    @DeleteMapping("/delete/{movieId}/{userId}")
    public void deleteRating(@PathVariable Long movieId, @PathVariable int userId) {
        ratingService.deleteRating(movieId, userId);
    }


    @GetMapping("/check-like/{movieId}/{userId}")
    public boolean hasUserRatedMovie(@PathVariable Long movieId, @PathVariable int userId) {
        return ratingService.hasUserRatedMovie(movieId, userId);
    }
}
