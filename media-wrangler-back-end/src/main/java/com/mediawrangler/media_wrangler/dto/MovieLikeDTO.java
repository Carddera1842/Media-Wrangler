package com.mediawrangler.media_wrangler.dto;

public class MovieLikeDTO {

    private Long id;
    private Long movieId;
    private int userId;

    public MovieLikeDTO() {
    }

    public MovieLikeDTO(Long id, Long movieId, int userId) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
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
}
