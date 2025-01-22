//package com.mediawrangler.media_wrangler.models;
//
//import jakarta.persistence.*;
//
//import java.util.List;
//

//@Table(name = "movies")
//public class MovieEntity {
//
//    @Id
//    private Long id;
//
//    private String title;
//    private String releaseDate;
//    private double rating;
//    private String overview;
//    private String posterPath;
//    private int likeCount;
//
//    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
//    private List<MovieReview> reviews;
//
//    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
//    private List<Like> likes;
//
//    public MovieEntity() {}
//
//    public MovieEntity(Long id, String title, String releaseDate, Double rating, String overview, String posterPath) {
//        this.id = id;
//        this.title = title;
//        this.releaseDate = releaseDate;
//        this.rating = rating;
//        this.overview = overview;
//        this.posterPath = posterPath;
//    }
//
//    public MovieEntity(Long id, String title, String releaseDate, Double rating, String overview, String posterPath,
//                       List<MovieReview> reviews, List<Like> likes, int likeCount) {
//        this.id = id;
//        this.title = title;
//        this.releaseDate = releaseDate;
//        this.rating = rating;
//        this.overview = overview;
//        this.posterPath = posterPath;
//        this.reviews = reviews;
//        this.likes = likes;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getReleaseDate() {
//        return releaseDate;
//    }
//
//    public void setReleaseDate(String releaseDate) {
//        this.releaseDate = releaseDate;
//    }
//
//    public double getRating() {
//        return rating;
//    }
//
//    public void setRating(double rating) {
//        this.rating = rating;
//    }
//
//    public String getOverview() {
//        return overview;
//    }
//
//    public void setOverview(String overview) {
//        this.overview = overview;
//    }
//
//    public String getPosterPath() {
//        return posterPath;
//    }
//
//    public void setPosterPath(String posterPath) {
//        this.posterPath = posterPath;
//    }
//
//    public int getLikeCount() {
//        return likeCount;
//    }
//
//    public void setLikeCount(int likeCount) {
//        this.likeCount = likeCount;
//    }
//
//    public List<MovieReview> getReviews() {
//        return reviews;
//    }
//
//    public void setReviews(List<MovieReview> reviews) {
//        this.reviews = reviews;
//    }
//
//    public List<Like> getLikes() {
//        return likes;
//    }
//
//    public void setLikes(List<Like> likes) {
//        this.likes = likes;
//    }
//}
