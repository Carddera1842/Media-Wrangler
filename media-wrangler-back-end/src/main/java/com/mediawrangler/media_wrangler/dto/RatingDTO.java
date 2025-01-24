package com.mediawrangler.media_wrangler.dto;

public class RatingDTO {

    private Long id;
    private Long movieId;
    private int userId;
    private double rating;

    public RatingDTO() {
    }

    public RatingDTO(Long id, Long movieId, int userId, double rating) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }


}
