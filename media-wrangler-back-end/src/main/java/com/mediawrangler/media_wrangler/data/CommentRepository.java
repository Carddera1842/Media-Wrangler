package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.dto.CommentDTO;
import com.mediawrangler.media_wrangler.models.Comment;

import java.util.List;
import java.util.Optional;

import com.mediawrangler.media_wrangler.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {


    //find all comments for a single review -- to render with the user review card
    List<Comment> findByMovieReviewId(Long movieReviewId);

    //find all comments written by a single user
    List<Comment> findByUserId(Long userId);

}
