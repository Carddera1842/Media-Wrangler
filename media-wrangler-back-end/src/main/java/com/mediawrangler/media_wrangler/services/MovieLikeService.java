package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.MovieLikeRepository;

import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.MovieLikeDTO;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.models.MovieLike;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieLikeService {
    private final MovieLikeRepository movieLikeRepository;
    private final UserRepository userRepository;

    public MovieLikeService(MovieLikeRepository movieLikeRepository, UserRepository userRepository) {
        this.movieLikeRepository = movieLikeRepository;
        this.userRepository = userRepository;
    }

    public List<MovieLikeDTO> getLikesByMovieId(Long movieId) {
        List<MovieLike> movieLikes = movieLikeRepository.findByMovieId(movieId);
        List<MovieLikeDTO> movieLikeDTOS = new ArrayList<>();

        MovieLikeDTO dto = null;
        for (MovieLike movieLike : movieLikes) {
            dto = new MovieLikeDTO();
            dto.setMovieId(movieLike.getMovieId());
            dto.setUserId(movieLike.getUser().getId());

            movieLikeDTOS.add(dto);
        }
        return movieLikeDTOS;
    }



    public MovieLikeDTO addLike(MovieLikeDTO movieLikeDTO) {
        User user = userRepository.findById(movieLikeDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MovieLike movieLike = new MovieLike();
        movieLike.setMovieId(movieLikeDTO.getMovieId());
        movieLike.setUser(user);

        MovieLike savedMovieLike = movieLikeRepository.save(movieLike);

        MovieLikeDTO savedMovieLikeDTO = new MovieLikeDTO();
        savedMovieLikeDTO.setMovieId(savedMovieLike.getMovieId());
        savedMovieLikeDTO.setUserId(savedMovieLike.getUser().getId());

        return savedMovieLikeDTO;
    }



    public void deleteLike(Long movieId, int userId) {
        MovieLike movieLike = movieLikeRepository.findByMovieIdAndUserId(movieId, userId)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        movieLikeRepository.delete(movieLike);
    }



    public List<MovieLikeDTO> getLikesByUserId(int userId) {
        List<MovieLike> movieLikes = movieLikeRepository.findByUserId(userId);
        List<MovieLikeDTO> movieLikeDTOS = new ArrayList<>();

        for (MovieLike movieLike : movieLikes) {
            MovieLikeDTO dto = new MovieLikeDTO();
            dto.setMovieId(movieLike.getMovieId());
            dto.setUserId(movieLike.getUser().getId());
            movieLikeDTOS.add(dto);
        }

        return movieLikeDTOS;
    }



    public Long getLikesCountForMovie(Long movieId) {
        return movieLikeRepository.countByMovieId(movieId);
    }



    public boolean hasUserLikedMovie(Long movieId, int userId) {
        return movieLikeRepository.existsByMovieIdAndUserId(movieId, userId);
    }





}
