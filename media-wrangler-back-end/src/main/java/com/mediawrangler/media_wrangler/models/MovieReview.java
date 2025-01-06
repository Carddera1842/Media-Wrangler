package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MovieReview {

    //Add for SQL to store review
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //Start with one basic String input field in review
    private String review;

    //empty constructor for hibernate
    public MovieReview() {
    }

    //overloaded constructor for setting review object with users review input
    public MovieReview(String review) {
        this.review = review;
    }

    //getters for is and review
    public int getId() {
        return id;
    }

    public String getReview() {
        return review;
    }

    //Setter for review to update review when needed
    public void setReview(String review) {
        this.review = review;
    }

    //TODO: Add equals, hashcode, and toString methods later
}






