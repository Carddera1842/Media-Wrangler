package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.CommentRepository;
import com.mediawrangler.media_wrangler.dto.CommentDTO;
import com.mediawrangler.media_wrangler.models.Comment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;
    
    
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> findCommentById(Long id){
        return commentRepository.findById(id);
    }

    public List<CommentDTO> findCommentsByMovieReviewId(Long movieReviewId) {
        
        List<Comment> commentReviews = commentRepository.findByMovieReviewId(movieReviewId);                
        List<CommentDTO> commentDTOS = new ArrayList<>();

        for (Comment comment : commentReviews) {
            CommentDTO dto = new CommentDTO();

            dto.setUserId(comment.getUser().getId());
            dto.setUserName(comment.getUser().getUsername());
            dto.setUserComment(comment.getUserComment());
            dto.setDateCreated(comment.getDateCreated());
            dto.setMovieReviewId(comment.getMovieReview().getId());        

            commentDTOS.add(dto);
        }
        return commentDTOS;
    }


}
