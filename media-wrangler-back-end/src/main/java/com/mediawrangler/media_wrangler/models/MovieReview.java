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

    private String watchAgain;

//TODO: uncomment when ready to test with user
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    //empty constructor for hibernate
    public MovieReview() {
    }

    //overloaded constructor for easier testing (without User logged in)
    public MovieReview(String review, LocalDate dateWatched, boolean isSpoiler, String award, int rating, String watchAgain) {
        this.dateCreated = LocalDate.now();
        this.review = review;
        this.dateWatched = dateWatched;
        this.isSpoiler = isSpoiler;
        this.award = award;
        this.rating = rating;
        this.watchAgain = watchAgain;
    }

//TODO: Uncomment constructor for when user is ready to be test with
//overloaded constructor
//    public MovieReview(String review, LocalDate dateWatched, boolean isSpoiler, String award, int rating, String watchAgain, User user) {
//        this.dateCreated = LocalDate.now();
//        this.review = review;
//        this.dateWatched = dateWatched;
//        this.isSpoiler = isSpoiler;
//        this.award = award;
//        this.rating = rating;
//        this.watchAgain = watchAgain;
//        this.user = user;
//    }

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

    public LocalDate getDateWatched() {
        return dateWatched;
    }

    public void setDateWatched(LocalDate dateWatched) {
        this.dateWatched = dateWatched;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getWatchAgain() {
        return watchAgain;
    }

    public void setWatchAgain(String watchAgain) {
        this.watchAgain = watchAgain;
    }

//TODO: Uncomment when ready to test with User logged in
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    //getters for id and dateCreated since they should update (I could make an editDate)
    public int getId() {
        return id;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }






    //TODO: Add equals, hashcode, and toString methods later
    //TODO: Get the LocalDate to initialize during MovieReview object instantiation
    //TODO: The checked box isn't registering correctly. I tried a boolean and String. Think I am setting it up wrong in form too
}






