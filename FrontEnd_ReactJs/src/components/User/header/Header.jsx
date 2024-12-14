import React, { useState } from "react";
import PropTypes from "prop-types";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../../api/localStorage";

const Header = ({ data, onLogout }) => {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const avatar = data?.username ? data.username.charAt(0).toUpperCase() : "";

  const handleLogin = () => {
    removeToken();
    navigate("/login");
  };

  const handleLogout = () => {
    removeToken();
    setShowUserInfo(false);
    onLogout();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowUserInfo(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search input after navigation
    }
  };

  return (
    <>
      <div>
        <div className="header">
          <NavLink to="/" className="logo">
            <span>HBCinema</span>
          </NavLink>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="icon">
            <i className="bx bx-menu" id="menu-icon"></i>
            <i className="bx bx-x" id="close-icon"></i>
          </label>
          <nav className="navbar">
            <ul className="menu">
              <NavLink to="/" style={{ "--i": 0 }}>
                Home
              </NavLink>
              <NavLink to="/movie" style={{ "--i": 1 }}>
                Movie
              </NavLink>
              <NavLink to="/toprate" style={{ "--i": 2 }}>
                Top Rate
              </NavLink>
            </ul>
          </nav>
          
          {/* Search Section */}
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search__input"
              />
              <button type="submit" className="search-button">
                <i className="bx bx-search"></i>
              </button>
            </form>
          </div>

          <div className="user-section">
            {data ? (
              <div className="user-avatar-wrapper">
                <button className="user-avatar" onClick={toggleUserInfo}>
                  {avatar}
                </button>
                
                {showUserInfo && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <p className="username">{data.username}</p>
                      <p className="email">{data.email || data.phoneNumber}</p>
                    </div>
                    <hr className="divider" />
                    <button className="dropdown-item" onClick={handleProfile}>
                      Profile
                    </button>
                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login__btn" onClick={handleLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Header;