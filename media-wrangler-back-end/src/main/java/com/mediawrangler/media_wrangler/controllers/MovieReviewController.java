package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//Add CrossOrigin annotation to allow HTTP request/response exchange between front and back end
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
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


/*
    I have tried ...
    -- @CrossOrigin(origins = "http://localhost:5173")
    -- @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
    -- @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    -- removing it completely since there is WebConfig available
    -- cleared browser cache
    -- tried to put a handler to deal with OPTIONS request specifically:
        @RequestMapping(value = "/create", method = RequestMethod.OPTIONS)
        public ResponseEntity<?> handleOptions() {
         return ResponseEntity.ok().build();  // Respond to OPTIONS request (preflight)
        }
    -- tried to add "Origin" and credentials on the frontend fetch in MovieReviewForm.jsx
            fetch("http://localhost:8080/api/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5173",
            },
            body: JSON.stringify({ review }),
            credentials: "include"
        });
    -- Added some code in application.properties to give me more info in terminal console of what is happening:
            logging.level.org.springframework.web=DEBUG
            logging.level.org.springframework.security=DEBUG



        *** I do not understand how else to get the Access-Control-Allow-Origin header in my response***





 */

