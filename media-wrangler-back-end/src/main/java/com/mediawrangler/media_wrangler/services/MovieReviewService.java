package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.models.MovieReview;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieReviewService {

    private final MovieReviewRepository movieReviewRepository;


    public MovieReviewService(MovieReviewRepository movieReviewRepository) {
        this.movieReviewRepository = movieReviewRepository;
    }


    public MovieReview saveReview(MovieReview movieReview) {
        return movieReviewRepository.save(movieReview);
    }

    public Optional<MovieReview> findReviewById(Long id){
        return movieReviewRepository.findById(id);
    }

}
