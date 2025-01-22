package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.models.MovieLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieLikeRepository extends JpaRepository<MovieLike, Long> {

    long countByMovieId(Long movieId);

    Optional<MovieLike> findByMovieIdAndUserId(Long movieId, int userId);
}
