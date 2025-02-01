import React from 'react';
import '../../stylings/DiscoverPage.css'


const DiscoverPage = () => {
    return (
        <>
        <div className='discover-page-background'>
        <h1>Discover</h1>
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

export default DiscoverPage;