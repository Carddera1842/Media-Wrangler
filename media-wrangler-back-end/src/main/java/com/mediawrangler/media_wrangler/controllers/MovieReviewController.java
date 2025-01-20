package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.services.MovieReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


//Add CrossOrigin annotation to allow HTTP request/response exchange between front and back end
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/reviews")
public class MovieReviewController {

    //Based off other branches, setup Service here
    @Autowired
    private final MovieReviewService movieReviewService;

    //Constructor injection of MovieReviewService -- constructor that takes in service
    public MovieReviewController(MovieReviewService movieReviewService) {
        this.movieReviewService = movieReviewService;
    }

    //Add movieReviewRepository to perform CRUD functions
    @Autowired
    private MovieReviewRepository movieReviewRepository;



    //I currently do not have validation or errors to be checked for tester form
    // Changed the saveReview object in the return response to a String message stating success
    @PostMapping("/create")
        public ResponseEntity<?> createReview(@RequestBody MovieReview movieReview) {
        try {
            MovieReview savedReview = movieReviewService.saveReview(movieReview);
            return new ResponseEntity<>("Review Submission successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("view/{id}")
    public ResponseEntity<?> findReviewById(@PathVariable Long id) {
        try {
            Optional<MovieReviewDTO> optionalMovieReview = movieReviewService.getReviewById(id);

            if (optionalMovieReview.isPresent()) {
                MovieReviewDTO savedReview = (MovieReviewDTO) optionalMovieReview.get();
                return new ResponseEntity<>(savedReview, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Review not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while retrieving the review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findAllReviewsByUser(@PathVariable int userId) {
        try {
            // Fetch all reviews for the given user ID
            List<MovieReviewDTO> userReviews = movieReviewService.getReviewsByUser(userId);

            if (userReviews.isEmpty()) {
                return new ResponseEntity<>("No reviews found for this user", HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(userReviews, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while retrieving reviews", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}



