import React,{ useState, useEffect,useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar1.css'

export default function Navbar1() {
    const [page, setPage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
  
    // Check if user is logged in by looking at local storage
    useEffect(() => {
      const token = window.localStorage.getItem("LogedIn");
      setIsLoggedIn(token === "true");
    }, []);
  
  
    // Handle logout
    const handleLogout = () => {
      window.localStorage.removeItem("LogedIn");
      setIsLoggedIn(false);
      setShowDropdown(false);
      navigate("/");
    };
    const navRef = useRef();
    
      const showNavbar = () => {
        navRef.current.classList.toggle(
          "responsive_nav"
        );
      };
      const closeNavbar = () => {
        if (window.innerWidth <= 1024) {
          navRef.current.classList.remove("responsive_nav");
        }
      };
  
    return (
      <>
        <header className='header-bg'>
          <a href="/" className="logo-bg">Espace</a>
  
          <ul className="navbar-bg" ref={navRef}>
            <Link onClick={() => { setPage("home"); closeNavbar(); }} className={page === "home" ? "active" : ""} to="/">Home</Link>
            <Link onClick={() => { setPage("properties"); closeNavbar(); }} className={page === "properties" ? "active" : ""} to="/properties">Explore</Link>
            {/* <Link onClick={() => setPage("")} className="" to="/services">Services</Link> */}
            <Link onClick={() => { setPage("contact"); closeNavbar(); }} className={page === "contact" ? "active" : ""} to="/contact">Contact</Link>
            <div className="dropdown-container">
              {isLoggedIn ? (
                <div
                  className="dropdown-toggle-bg"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Profile
                  <span className={`dropdown-arrow ${showDropdown ? "rotate" : ""}`}></span>
  
                  {showDropdown && (
                    <div className="dropdown-menu">
                      {/* <p onClick={() => navigate("/profile")}>My Profile</p> */}
                      <p onClick={() => navigate("/chat")}>Chat</p>
                      <p onClick={()=> navigate("/my-listing")}>My listing</p>
                      <p onClick={handleLogout}>Logout</p>
                    </div>
                  )}
                </div>
              ) : (
                <Link onClick={() => setPage("signup")} className={page === "signup" ? "active" : ""} to="/signup">
                  Sign Up
                </Link>
              )}
            </div>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
          </ul>
          <button className="nav-btn" onClick={showNavbar}><FaBars /></button>
        </header>
        <div className="header-space"></div>
      </>
    );
}
