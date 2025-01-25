package com.mediawrangler.media_wrangler.services;

import com.mediawrangler.media_wrangler.data.CommentRepository;
import com.mediawrangler.media_wrangler.data.MovieReviewRepository;
import com.mediawrangler.media_wrangler.data.UserRepository;
import com.mediawrangler.media_wrangler.dto.CommentDTO;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.Comment;


import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.models.Rating;
import com.mediawrangler.media_wrangler.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final MovieReviewRepository movieReviewRepository;
    
    
    public CommentService(CommentRepository commentRepository, UserRepository userRepository, MovieReviewRepository movieReviewRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.movieReviewRepository = movieReviewRepository;
    }


    //saving the comment...
    public CommentDTO addComment(CommentDTO commentDTO) {

        User user = userRepository.findById((commentDTO.getUserId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        MovieReview movieReview = movieReviewRepository.findById(commentDTO.getMovieReviewId())
                .orElseThrow(() -> new RuntimeException("MovieReview not found"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setMovieReview(movieReview);
        comment.setUserComment(commentDTO.getUserComment());

        Comment savedComment = commentRepository.save(comment);

        CommentDTO savedCommentDTO = new CommentDTO();
        savedCommentDTO.setId(savedComment.getId());
        savedCommentDTO.setMovieReviewId(savedComment.getMovieReview().getId());
        savedCommentDTO.setUserId(savedComment.getUser().getId());
        savedCommentDTO.setUserComment(savedComment.getUserComment());

        return savedCommentDTO;
    }


    public List<CommentDTO> findCommentsByMovieReviewId(Long movieReviewId) {
        
        List<Comment> commentReviews = commentRepository.findByMovieReviewId(movieReviewId);                
        List<CommentDTO> commentDTOS = new ArrayList<>();

        for (Comment comment : commentReviews) {
            CommentDTO dto = new CommentDTO();

            dto.setId(comment.getId());
            dto.setUserId(comment.getUser().getId());
            dto.setUserComment(comment.getUserComment());
            dto.setMovieReviewId(comment.getMovieReview().getId());        

            commentDTOS.add(dto);
        }
        return commentDTOS;
    }


}
