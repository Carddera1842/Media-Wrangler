package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;

@Entity
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double rating;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private Long movieId;


    public Rating() {
    }

    public Rating(double rating, User user, Long movieId) {
        this.rating = rating;
        this.user = user;
        this.movieId = movieId;
    }


    public Long getId() {
        return id;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
}
