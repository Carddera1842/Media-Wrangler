package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.dto.MovieLikeDTO;
import com.mediawrangler.media_wrangler.services.MovieLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/movie-likes")
public class MovieLikeController {

    @Autowired
    private MovieLikeService movieLikeService;


    @PostMapping
    public MovieLikeDTO addLike(@RequestBody MovieLikeDTO movieLikeDTO) {
        return movieLikeService.addLike(movieLikeDTO);
    }


    @GetMapping("/movie/{movieId}")
    public List<MovieLikeDTO> getLikesByMovieId(@PathVariable Long movieId) {
        return movieLikeService.getLikesByMovieId(movieId);
    }


    @GetMapping("/user/{userId}")
    public List<MovieLikeDTO> getLikesByUserId(@PathVariable int userId) {
        return movieLikeService.getLikesByUserId(userId);
    }


    @DeleteMapping
    public void deleteLike(@RequestParam Long movieId, @RequestParam int userId) {
        movieLikeService.deleteLike(movieId, userId);
    }


    @GetMapping("/check-like/{movieId}/{userId}")
    public boolean hasUserLikedMovie(@PathVariable Long movieId, @PathVariable Long userId) {
        return movieLikeService.hasUserLikedMovie(movieId, userId);
    }


    @GetMapping("/{movieId}/like-count")
    public long getLikeCount(@PathVariable Long movieId) {
        return movieLikeService.getLikesCountForMovie(movieId);
    }

}
