import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import StarIcon from "@mui/icons-material/Star";

const HomePage = () => {
  const navigate = useNavigate();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const apiKey = "1ae7a70b471c9eb7d389671747750ad0";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming movies.");
        }

        const data = await response.json();
        setUpcomingMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUpcomingMovies();
  }, []);


  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="app-title">Welcome to Media Wrangler</h1>
        <p className="tagline">Track. Discover. Engage.</p>
        <div className="hero-buttons">
          <button className="primary-button" onClick={() => navigate("/register")}>Get Started</button>
          <button className="secondary-button" onClick={() => navigate("/search")}>Search Movies</button>
        </div>
      </div>

      {/* Features Section */}
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

      {/* Popular Features Section */}
      <div className="popular-section">
        <h2 className="section-title">Explore Popular Movies</h2>
        <div className="discussions-grid">
          <div className="discussion-card" onClick={() => navigate("/movie/1")}>The Dark Knight</div>
          <div className="discussion-card" onClick={() => navigate("/movie/2")}>Inception</div>
          <div className="discussion-card" onClick={() => navigate("/movie/3")}>Interstellar</div>
          <div className="discussion-card" onClick={() => navigate("/movie/4")}>The Godfather</div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="cta-section">
        <h2>Start Wrangling Your Media</h2>
        <p>Join Media Wrangler to organize, review, and discuss your favorite movies.</p>
        <button className="primary-button" onClick={() => navigate("/signup")}>Sign Up Now</button>
      </div>

      

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Media Wrangler. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;