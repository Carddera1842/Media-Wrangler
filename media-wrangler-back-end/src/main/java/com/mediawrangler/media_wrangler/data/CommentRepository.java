package com.mediawrangler.media_wrangler.data;

import com.mediawrangler.media_wrangler.dto.CommentDTO;
import com.mediawrangler.media_wrangler.models.Comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByMovieReviewId(Long movieReviewId);

    
    List<Comment> findByUserId(Long userId);
}
