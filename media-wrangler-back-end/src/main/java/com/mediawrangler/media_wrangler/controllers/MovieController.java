package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.models.Movie;
import com.mediawrangler.media_wrangler.services.MovieDataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private final MovieDataFetcher movieDataFetcher;

    // Constructor injection of MovieDataFetcher
    @Autowired
    public MovieController(MovieDataFetcher movieDataFetcher) {
        this.movieDataFetcher = movieDataFetcher;
    }

    // Fetch movie data by title
    @GetMapping("/search")
    public Movie getMovieByTitle(@RequestParam String title) {
        System.out.println("Received request to fetch movie: " + title);
        return movieDataFetcher.fetchMovieData(title);
    }

    // Fetch movie data by ID
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable int id) {
        System.out.println("Received request to fetch movie: " + id);
        return movieDataFetcher.fetchMovieData(id);
    }
}
