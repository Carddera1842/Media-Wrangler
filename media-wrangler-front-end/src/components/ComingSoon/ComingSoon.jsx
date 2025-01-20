import React, { useState, useEffect } from "react";
import { useAuth } from "../../Services/AuthContext";

function AddEventForm() {
    const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/events/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Failed to fetch events.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("User is not logged in or user ID is missing.");
      return;
    }

    if (!title || !start || !end) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          start,
          end,
          userId: user.id,
        }),
      });

      if (response.ok) {
        const newEvent = {
          title,
          start: new Date(start),
          end: new Date(end),
        };
        setEvents([...events, newEvent]);
        setTitle("");
        setStart("");
        setEnd("");
        alert("Event added successfully!");
      } else {
        alert("Failed to add event.");
      }
    } catch (error) {
      console.error("Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };

  const handleAddMovieToEvents = async (movie) => {
    if (!user || !user.id) {
      alert("User is not logged in or user ID is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/events/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: movie.title,
          start: movie.release_date,
          end: movie.release_date,
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert(`"${movie.title}" has been added to your events!`);
      } else {
        alert("Failed to add movie to your events.");
      }
    } catch (error) {
      console.error("Error adding movie to events:", error);
      alert("An error occurred while adding the movie to your events.");
    }
  };

  return (
    <div className="add-event-form">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter event title"
          />
        </div>
        <div className="form-group">
          <label>Start Date/Time:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date/Time:</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Add Event
          </button>
        </div>
      </form>

      <h2>Upcoming Movies</h2>
      {error && <p>{error}</p>}

      <div className="movie-list">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`Poster of ${movie.title}`}
              className="movie-poster"
            />
            <div>
              <p>{movie.title}</p>
              <p>Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
              <button
                className="add-movie-button"
                onClick={() => handleAddMovieToEvents(movie)}
              >
                Add to Events
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddEventForm;
