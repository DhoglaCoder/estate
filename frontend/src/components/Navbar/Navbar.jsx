import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [color, setColor] = useState(false);
  const [page, setPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in by looking at local storage
  useEffect(() => {
    const token = window.localStorage.getItem("LogedIn");
    setIsLoggedIn(token === "true");
  }, []);

  // Handle scroll color change
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem("LogedIn");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>
      <header className={color ? 'header-bg' : 'header'}>
        <a href="/" className={color?"logo-bg":"logo"}>Estate</a>

        <ul className={color?"navbar-bg":"navbar"}>
          <Link onClick={() => setPage("home")} className={page === "home" ? "active" : ""} to="/">Home</Link>
          <Link onClick={() => setPage("properties")} className={page === "properties" ? "active" : ""} to="/properties">Explore</Link>
          <Link onClick={() => setPage("")} className="" to="/services">Services</Link>
          <Link onClick={() => setPage("")} className="" to="/contact">Contact</Link>
          <div className="dropdown-container">
            {isLoggedIn ? (
              <div
                className={color?"dropdown-toggle-bg":"dropdown-toggle"}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Profile
                <span className={`${color ? "dropdown-arrow-bg" : "dropdown-arrow"} ${showDropdown ? "rotate" : ""}`}></span>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <p onClick={() => navigate("/profile")}>My Profile</p>
                    <p onClick={() => navigate("/settings")}>Settings</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            ) : (
              <Link
                onClick={() => setPage("signup")}
                className={page === "signup" ? "active" : ""}
                to="/signup"
              >
                Sign Up
              </Link>
            )}
          </div>
        </ul>
      </header>
    </>
  );
}
