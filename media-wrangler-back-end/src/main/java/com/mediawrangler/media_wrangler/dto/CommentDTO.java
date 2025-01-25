package com.mediawrangler.media_wrangler.dto;

public class CommentDTO {


    private Long id;
    private String userComment;
    private Long movieReviewId;
    private int userId; 

    
    public CommentDTO() {
    }

    public CommentDTO(Long id, String userComment, Long movieReviewId, int userId) {
        this.id = id;
        this.userComment = userComment;
        this.movieReviewId = movieReviewId;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    public Long getMovieReviewId() {
        return movieReviewId;
    }

    public void setMovieReviewId(Long movieReviewId) {
        this.movieReviewId = movieReviewId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }



}
