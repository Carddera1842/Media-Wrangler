package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//Add CrossOrigin annotation to allow HTTP request/response exchange between front and back end
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/reviews")
public class MovieReviewController {

    //Add movieReviewRepository to perform CRUD functions
    @Autowired
    private MovieReviewRepository movieReviewRepository;

    @PostMapping("/create")
        public ResponseEntity<?> createReview(@RequestBody MovieReview movieReview) {
        try {
            MovieReview savedReview = movieReviewRepository.save(movieReview);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the review", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
