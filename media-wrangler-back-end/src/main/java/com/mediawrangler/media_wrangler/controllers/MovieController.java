package com.mediawrangler.media_wrangler.controllers;

import com.mediawrangler.media_wrangler.models.Movie;
import com.mediawrangler.media_wrangler.models.MovieDataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    private Movie movie;
    private MovieDataFetcher fetcher;

    @Autowired
    public MovieController(Movie movie) {
        this.movie = movie;
    }

    // fetch movie data with title
    @GetMapping("/search")
    public Movie getMovieByTitle(@RequestParam String title) {
        movie = fetcher.fetchMovieData(title);
        return movie;
    }

    // fetch movie data with ID
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable int id) {
        movie = fetcher.fetchMovieData(id);
        return movie;
    }
}

