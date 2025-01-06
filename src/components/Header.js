import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import AdminStatusTag from './AdminStatusTag';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem('token');

  const dropdownRef=useRef(null);
  const userIconRef=useRef(null);

  useEffect(() => {
    if(token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.isAdmin);
    }
  }, [token]);

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    // Redirect to the login page
    navigate('/auth');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) =>{
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return() => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="header">
      <div className="logo">
        <h1>Whiskey Wednesday's</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/food-menu">Food Menu</Link></li>

        <li className="dropdown">
          <Link to="#!">
            Drink Menu
            <span className="arrow">&#9660;</span>
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="/whiskey-menu">Whiskey Menu</Link></li>
            <li><Link to="/weekday-specials">Weekday Specials</Link></li>
            <li><Link to="/happy-hour">Happy Hour</Link></li>
          </ul>
        </li>
        <li><Link to="/events">Book Events</Link></li>
        <li><Link to="/about">About</Link></li>

        {token ? (
          <>
            <li className="user-menu">
              <div className="user-icon" 
              onClick={toggleDropdown}
              ref={userIconRef}
              >
                <i className="fas fa-user"></i> {/* FontAwesome user icon */}
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu user-dropdown" ref={dropdownRef}>
                  {isAdmin && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                  <li onClick={() => {  closeDropdown(); handleLogout(); }}>
                    Log Out
                  </li>
                </ul>
              )}
            </li>
            <AdminStatusTag /> {/* Show only if logged in */}
          </>
        ) : (
          <li><Link to="/auth">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Header;