package com.mediawrangler.media_wrangler.controllers;


import com.mediawrangler.media_wrangler.data.CommentRepository;
import com.mediawrangler.media_wrangler.dto.CommentDTO;
import com.mediawrangler.media_wrangler.dto.MovieReviewDTO;
import com.mediawrangler.media_wrangler.dto.RatingDTO;
import com.mediawrangler.media_wrangler.models.Comment;
import com.mediawrangler.media_wrangler.models.MovieReview;
import com.mediawrangler.media_wrangler.services.CommentService;

import java.util.List;
import java.util.Optional;

import com.mediawrangler.media_wrangler.services.MovieReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/comments")
public class CommentController {


    @Autowired
    private final CommentService commentService;

    @Autowired
    private final MovieReviewService movieReviewService;


     public CommentController(CommentService commentService, MovieReviewService movieReviewService) {
        this.commentService = commentService;
        this.movieReviewService = movieReviewService;
     }

    // for saving a comment...
    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CommentDTO commentDTO) {
        try {
            CommentDTO savedComment = commentService.addComment(commentDTO);
            return new ResponseEntity<>("Comment Submission successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the comment", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // for rendering all comments associated with a movie review ...
    @GetMapping("/review/{movieReviewId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByMovieReviewId(@PathVariable Long movieReviewId) {
        List<CommentDTO> comments = commentService.findCommentsByMovieReviewId(movieReviewId);
        return ResponseEntity.ok(comments);
    }



}
