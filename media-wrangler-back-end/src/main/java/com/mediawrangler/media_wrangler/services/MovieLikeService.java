package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieLikeRepository;

import com.mediawrangler.media_wrangler.models.MovieLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieLikeService {

    @Autowired
    private MovieLikeRepository likeRepository;

    public MovieLike saveLike(MovieLike like) {
        return likeRepository.save(like);
    }


    public long getLikeCountForMovie(Long movieId) {
        return likeRepository.countByMovieId(movieId);
    }

    public MovieLike removeLike(MovieLike movieLike) {
        Optional<MovieLike> existingLike = likeRepository.findByMovieIdAndUserId(movieLike.getMovieId(), movieLike.getUser().getId());
        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return existingLike.get();
        }
        return null;
    }
}
