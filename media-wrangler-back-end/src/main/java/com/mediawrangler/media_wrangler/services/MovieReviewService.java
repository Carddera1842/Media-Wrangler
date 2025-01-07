package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.stereotype.Service;

@Service
public class MovieReviewService {

    private final MovieReviewRepository movieReviewRepository;


    public MovieReviewService(MovieReviewRepository movieReviewRepository) {
        this.movieReviewRepository = movieReviewRepository;
    }


    public MovieReview saveReview(MovieReview movieReview) {
        return movieReviewRepository.save(movieReview);
    }
}
