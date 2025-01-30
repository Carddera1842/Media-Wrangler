import React from 'react';


const DiscoverPage = () => {
    return (
        <>
        <h1>Discover</h1>
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

export default DiscoverPage;