package com.mediawrangler.media_wrangler.models;

import java.time.LocalDate;

public class Comment {

    private Long id;

    private String userComment;

    private LocalDate dateCreated;

    //Need to add a user and movieReview field inside class when I get them storing properly
    //userId & movieReviewId (Many to One relationships)

    public Comment() {
    }

    public Comment(String userComment) {
        this.userComment = userComment;
        this.dateCreated = LocalDate.now();
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }
}
