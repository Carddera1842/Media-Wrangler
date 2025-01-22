package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private final RatingService ratingService;


    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRating(@RequestBody Rating rating) {
        try {
            MovieReview savedReview = RatingService.saveRating(rating);
            return new ResponseEntity<>("Rating Submission successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the rating", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
