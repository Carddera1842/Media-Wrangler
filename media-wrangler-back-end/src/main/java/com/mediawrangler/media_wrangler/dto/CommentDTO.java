package com.mediawrangler.media_wrangler.dto;

import java.time.LocalDate;

public class CommentDTO {


    private Long id;
    private String userComment;
    private LocalDate dateCreated;
    private Long movieReviewId; 
    private int userId; 
    private String userName; 
    
    public CommentDTO() {
    }

    public CommentDTO(Long id, String userComment, LocalDate dateCreated, Long movieReviewId, int userId, String userName) {
        this.id = id;
        this.userComment = userComment;
        this.dateCreated = dateCreated;
        this.movieReviewId = movieReviewId;
        this.userId = userId;
        this.userName = userName;
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

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
