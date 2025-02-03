package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;

@Entity
public class MovieLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long movieId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public MovieLike() {
    }

    public MovieLike(Long movieId, User user) {
        this.movieId = movieId;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}
