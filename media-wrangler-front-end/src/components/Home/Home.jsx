import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import StarIcon from "@mui/icons-material/Star";
import GradeIcon from "@mui/icons-material/Grade";
import { useAuth } from "../../Services/AuthContext";
import { useListContext } from "../../Services/ListContext.jsx";
import { getPopularMovies } from "../../Services/HomePageService.js"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const HomePage = () => {
  const navigate = useNavigate();
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userId = user?.id;
  const { lists, setLists } = useListContext();
  const [newListName, setNewListName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddListForm, setShowAddListForm] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async (type, setState) => {
      try {
        const apiKey = "1ae7a70b471c9eb7d389671747750ad0";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} movies.`);
        }

        const data = await response.json();
        setState(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUpcomingMovies("upcoming", setUpcomingMovies);
  }, []);

  
    const fetchPopularMovies = async () => {
      try {
        const movies = await getPopularMovies();
        console.log("Fetched movies", movies);
        if (!Array.isArray(movies)) {
            throw new Error("Invalid response format for popular movies");
        }
        setPopularMovies(movies)
      } catch (err) {
        setError(err.message || "Popular movies fetch failed");
      }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, [])

  useEffect(() => {
    const fetchLists = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:8080/api/lists/user-lists?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error("Failed to fetch lists.");
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [userId]);

  const handlePosterClick = (movie) => {
    navigate(`/movies/${movie.id}`);
  };

  const handleAddClick = (event, movie) => {
    if (!userId) {
      alert("You must be logged in to add movies to a list.");
      return;
    }
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowAddListForm(false);
  };

  const handleAddList = async () => {
    if (newListName.trim() && !lists.includes(newListName)) {
      const payload = { userId, listName: newListName };

      try {
        const response = await fetch("http://localhost:8080/api/lists/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setLists((prevLists) => [...prevLists, newListName]);
          setNewListName("");
          setShowAddListForm(false);
          alert(`List "${newListName}" added!`);
        } else {
          alert("Failed to add list.");
        }
      } catch (error) {
        console.error("Error adding list:", error);
      }
    } else if (lists.includes(newListName)) {
      alert(`The list "${newListName}" already exists.`);
    }
  };

  const handleSelectList = (listName) => {
    if (!selectedMovie) return;
    const payload = { listName, movieId: selectedMovie.id, userId };

    fetch("http://localhost:8080/api/lists/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert(`Movie added to ${listName}`);
        } else {
          alert("Failed to add movie to the list.");
        }
      })
      .catch((error) => console.error("Error:", error));

    setAnchorEl(null);
  };
  return (
    <>
        <div className="home-container">
            <div className="home-hero-section">
                <div className="home-hero-overlay">
                    <h1 className="home-welcome-title">Welcome to Media Wrangler</h1>
                    <p className="home-tagline">Wrangle Up a Good Movie!</p>
                    <div className="home-hero-buttons">
                        <button className="home-get-started-button" onClick={() => navigate("/register")}>Get Started</button>
                        <button className="home-search-movies-button" onClick={() => navigate("/search")}>Search Movies</button>
                    </div>
                </div>
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
