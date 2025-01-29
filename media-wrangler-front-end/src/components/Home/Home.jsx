import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
        <div className="home-container">
            <div className="hero-section">
                <div className="hero-overlay">
                    <h1 className="welcome-title">Welcome to Media Wrangler</h1>
                    <p className="tagline">Wrangle Up a Good Movie!</p>
                    <div className="hero-buttons">
                        <button className="get-started-button" onClick={() => navigate("/register")}>Get Started</button>
                        <button className="search-movies-button" onClick={() => navigate("/search")}>Search Movies</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="features-section">
        <h2 className="section-title">What You Can Do</h2>
        <div className="features-grid">
        <div className="feature-card" onClick={() => navigate("/my-lists")}>
            <h3>Create Customized Lists</h3>
            <p>Organize movies you want to watch and have seen.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/calendar")}>
            <h3>Add to Your Calendar</h3>
            <p>Never miss a release. Add upcoming movies to your calendar.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/reviews")}>
            <h3>Read & Write Reviews</h3>
            <p>Share your thoughts or read what others think.</p>
        </div>
        <div className="feature-card" onClick={() => navigate("/discussions")}>
            <h3>Engage in Discussions</h3>
            <p>Join the conversation and connect with fellow movie enthusiasts.</p>
        </div>
        </div>
        </div>

        <div className="popular-section">
        <h2 className="section-title">Explore Popular Movies</h2>
        <div className="discussions-grid">
          <div className="discussion-card" onClick={() => navigate("/movie/1")}>The Dark Knight</div>
          <div className="discussion-card" onClick={() => navigate("/movie/2")}>Inception</div>
          <div className="discussion-card" onClick={() => navigate("/movie/3")}>Interstellar</div>
          <div className="discussion-card" onClick={() => navigate("/movie/4")}>The Godfather</div>
        </div>
      </div>
      <footer className="footer">
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        <p>© {new Date().getFullYear()} Media Wrangler</p>
        <div className="about-us">
          <a href="/about-us">About PurpleTONE</a>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
