package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class MovieReview {

    //Add for SQL to store review
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //stamps date for when the review is submitted/created
    private LocalDate dateCreated;


//    @NotNull(message = "You must enter a date watched")
    private LocalDate dateWatched;

//    Might want to change the max to higher than 1000
//    @NotBlank(message = "We want to hear your thoughts, write your movie review")
//    @Size(max = 1000, message = "Review must be less than 1000 characters")
    private String review;

//TODO: Still have to get spoiler checkbox logging correctly...changed back to boolean to see if I can get it to work
    private boolean isSpoiler;

    private String award;

//    @NotNull(message = "You must give movie a star rating")
    private int rating;



    //empty constructor for hibernate
    public MovieReview() {
    }

    //overloaded constructor for setting review object with users review input
    public MovieReview(String review, LocalDate dateWatched, boolean isSpoiler, String award, int rating) {
        this.dateCreated = LocalDate.now();
        this.review = review;
        this.dateWatched = dateWatched;
        this.isSpoiler = isSpoiler;
        this.award = award;
        this.rating = rating;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    public boolean isSpoiler() {
        return isSpoiler;
    }

    public void setSpoiler(boolean isSpoiler) {
        this.isSpoiler = isSpoiler;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public LocalDate getDateWatched() {
        return dateWatched;
    }

    public void setDateWatched(LocalDate dateWatched) {
        this.dateWatched = dateWatched;
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
    //TODO: Get the LocalDate to initialize during MovieReview object instantiation
    //TODO: The checked box isn't registering correctly. I tried a boolean and String. Think I am setting it up wrong in form too
}






