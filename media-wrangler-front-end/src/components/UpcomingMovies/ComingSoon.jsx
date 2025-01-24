import React from "react";
import AddEventForm from './components/UpcomingMovies/UpcomingReleases.jsx'
import "./ComingSoon.css";

function ComingSoon() {
  return (
    <div className="discover-page-container">
      <div className="discover-section">
        <h2>Upcoming Movies</h2>
        <AddEventForm />
      </div>

      <div className="discover-section placeholder-section">
        <h2>Random Movie</h2>
        <p>This section will display a random movie feature.</p>
      </div>
    </div>
  );
}

export default ComingSoon;
