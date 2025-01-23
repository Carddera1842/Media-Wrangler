package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByMovieIdAndUserId(Long movieId, int userId);

    List<Rating> findByMovieId(Long movieId);

    List<Rating> findByUserId(int userId);

    boolean existsByMovieIdAndUserId(Long movieId, int userId);



}
