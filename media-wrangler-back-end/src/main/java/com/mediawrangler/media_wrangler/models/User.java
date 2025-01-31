package com.mediawrangler.media_wrangler.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than 50 characters")
    @Column(name = "first_name")
    private String firstname;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be less than 50 characters")
    @Column(name = "last_name")
    private String lastname;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(nullable = false)
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;

    @Column(name = "verification_token",nullable = true)
    private String verificationToken;

    @Column(name = "token_expiration_date", nullable = true)
    private LocalDateTime tokenExpirationDate;
  
    @Column(length = 500)
    private String bio;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<MovieReview> movieReviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


    public User() {}

    public User(String username, String firstname, String lastname, String password, String email, String bio) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.bio = bio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public @NotBlank(message = "Username is required") @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username is required") @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters") String username) {
        this.username = username;
    }

    public @NotBlank(message = "First name is required") @Size(max = 50, message = "First name must be less than 50 characters") String getFirstname() {
        return firstname;
    }

    public void setFirstname(@NotBlank(message = "First name is required") @Size(max = 50, message = "First name must be less than 50 characters") String firstname) {
        this.firstname = firstname;
    }

    public @NotBlank(message = "Last name is required") @Size(max = 50, message = "Last name must be less than 50 characters") String getLastname() {
        return lastname;
    }

    public void setLastname(@NotBlank(message = "Last name is required") @Size(max = 50, message = "Last name must be less than 50 characters") String lastname) {
        this.lastname = lastname;
    }

    public @NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 6, message = "Password must be at least 6 characters") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public LocalDateTime getTokenExpirationDate() {
        return tokenExpirationDate;
    }

    public void setTokenExpirationDate(LocalDateTime tokenExpirationDate) {
        this.tokenExpirationDate = tokenExpirationDate;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<MovieReview> getMovieReviews() {
        return movieReviews;
    }

    public void setMovieReviews(List<MovieReview> movieReviews) {
        this.movieReviews = movieReviews;
    }
}
