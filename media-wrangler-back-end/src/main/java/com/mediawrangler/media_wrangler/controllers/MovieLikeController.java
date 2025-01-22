package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.models.MovieLike;
import com.mediawrangler.media_wrangler.services.MovieLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/likes")
public class MovieLikeController {

    @Autowired
    private MovieLikeService likeService;

    //@localhost:8080/like/movie
    @PostMapping("/movies")
    public ResponseEntity<?> likeMovie(@RequestBody MovieLike movieLike) {
        MovieLike savedLike = likeService.saveLike(movieLike);
        return ResponseEntity.ok(savedLike);
    }

    @DeleteMapping("/movie")
    public ResponseEntity<MovieLike> unLikeMovie(@RequestBody MovieLike movieLike) {
        MovieLike unLiked = likeService.removeLike(movieLike);
        if (unLiked != null) {
            return ResponseEntity.ok(unLiked);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @GetMapping("/movie/{movieId}")
    public ResponseEntity<Long> getLikeCountForMovie(@PathVariable Long movieId) {
        long likeCount = likeService.getLikeCountForMovie(movieId);
        return ResponseEntity.ok(likeCount);
    }
}
