package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    private final RatingService ratingService;


    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public RatingDTO createRating(@RequestBody RatingDTO ratingDTO) {
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


    @GetMapping("/check-rating/{movieId}/{userId}")
    public boolean hasUserRatedMovie(@PathVariable Long movieId, @PathVariable int userId) {
        return ratingService.hasUserRatedMovie(movieId, userId);
    }

    @PutMapping("/update")
    public ResponseEntity<RatingDTO> updateRating(@RequestBody RatingDTO ratingDTO) {
        RatingDTO updatedRating = ratingService.updateUserRating(ratingDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedRating);
    }


    @GetMapping("/view/{movieId}")
    public ResponseEntity<?> findRatingByMovieId(@PathVariable Long movieId) {
        try {
            Optional<RatingDTO> optionalRating = ratingService.getRatingByMovieId(movieId);

            if (optionalRating.isPresent()) {
                RatingDTO savedRating = (RatingDTO) optionalRating.get();
                return new ResponseEntity<>(savedRating, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Rating not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while retrieving the rating", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



//    @GetMapping("/view/{movieId}/{userId}")
//    public ResponseEntity<?> findRatingByMovieIdAndUserId(@PathVariable Long movieId, @PathVariable int userId) {
//        try {
//            Optional<RatingDTO> optionalRating = ratingService.getRatingByMovieIdAndUserId(movieId, userId);
//
//            if (optionalRating.isPresent()) {
//                return new ResponseEntity<>(optionalRating.get(), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("Rating not found", HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>("An error occurred while retrieving the rating", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//

}
