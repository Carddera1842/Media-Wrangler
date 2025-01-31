package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.services.MovieReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;



@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/reviews")
public class MovieReviewController {


    @Autowired
    private final MovieReviewService movieReviewService;

    public MovieReviewController(MovieReviewService movieReviewService) {
        this.movieReviewService = movieReviewService;
    }


    @PostMapping("/create")
        public ResponseEntity<?> createReview(@RequestBody MovieReview movieReview) {
        try {
            MovieReview savedReview = movieReviewService.saveReview(movieReview);
            return new ResponseEntity<>("Review Submission successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/view/{id}")
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
            List<MovieReviewDTO> userReviews = movieReviewService.getReviewsByUser(userId);

            if (userReviews.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            } else {
                return new ResponseEntity<>(userReviews, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while retrieving reviews", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/movies/{movieId}")
    public ResponseEntity<?> getReviewsByMovieId(@PathVariable Long movieId) {
        try {
            List<MovieReviewDTO> movieReviews = movieReviewService.getReviewsByMovieId(movieId);

            if (movieReviews.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }  else {
                return new ResponseEntity<>(movieReviews, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while retrieving movie reviews", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/edit/{id}/{userId}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @PathVariable int userId, @Valid @RequestBody MovieReviewDTO movieReviewDTO) {
        System.out.println("Received request to update review with ID: " + id + " by user: " + userId);
        System.out.println("Review data: " + movieReviewDTO);

        try {
            Optional<MovieReviewDTO> updatedReview = movieReviewService.updatedReview(id, movieReviewDTO, userId);

            if (updatedReview.isPresent()) {
                System.out.println("Review successfully updated: " + updatedReview.get());
                return new ResponseEntity<>(updatedReview.get(), HttpStatus.OK);
            } else {
                System.out.println("Review not found or unauthorized");
                return new ResponseEntity<>("Review not found or unauthorized", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred while updating the review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }






}



