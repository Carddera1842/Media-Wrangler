package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByMovieIdAndUserId(Long movieId, int userId);

    List<Rating> findByMovieId(Long movieId);

    List<Rating> findByUserId(int userId);

    boolean existsByMovieIdAndUserId(Long movieId, int userId);

//    @Query("UPDATE Rating r SET r.rating = :newRating WHERE r.movieId = :movieId AND r.userId = :userId")
//    void updateRating(Long movieId, User user, double newRating);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.movieId = :movieId")
    double findAverageRatingByMovieId(Long movieId);
}
