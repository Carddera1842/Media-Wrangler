import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      </div>

      <div 
        className={`navbar-hamburger ${isOpen ? "active" : ""}`} 
        onClick={toggleMenu}
      >
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <a href="/">Media Wrangler</a>
        </li>
        <li>
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </li>

        <li>
          <a href="/discover">Discover</a>
        </li>
        <li>
          <a href="/discussions">Discussions</a>
        </li>
        <li>
          <a href="/login">Log In</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
