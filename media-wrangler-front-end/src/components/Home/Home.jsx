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

       {/* Upcoming Movies Section */}
       <div className="home-upcoming-container">
        <h2 className="home-upcoming-title">Upcoming Movies</h2>
        {error && <p>{error}</p>}

        <div id="home-upcoming-movie-search">
          {upcomingMovies.slice(0, 5).map((movie) => (
            <div key={movie.id} className="home-upcoming-poster-container">
              <div className="home-upcoming-release-date">
                Release Date: {new Date(movie.release_date).toLocaleDateString()}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`Poster of ${movie.title}`}
                className="home-upcoming-poster-image"
              />
              
              <button
                className="home-upcoming-add-button"
                onClick={() => navigate("/upcoming-releases")}
              >
                <StarIcon style={{ color: "white", fontSize: "20px" }} />
              </button>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="view-more-container">
          <button className="view-more-button" onClick={() => navigate("/upcoming-releases")}>
            View More
          </button>
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
