import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Ensure this is imported or use an alternative

const NavigationBar = () => {
  const isAuthenticated = localStorage.getItem('token') ? true : false; // Check if user is authenticated

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Link to="/" className="navbar-brand">Starfires</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"> {/* Change from ml-auto to mr-auto for left alignment */}
          <Nav.Item>
            <Link to="/" className="nav-link">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/stargate" className="nav-link">Stargate</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/library" className="nav-link">Library</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/treasures" className="nav-link">Treasures</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/mastery" className="nav-link">Mastery</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/consultations" className="nav-link">Consultations</Link>
          </Nav.Item>
        </Nav>
        <Nav>
          {/* User-specific actions grouped together and aligned to the right */}
          {!isAuthenticated && (
            <>
              <Nav.Item>
                <Link to="/login" className="nav-link">Login</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/register" className="nav-link">Register</Link>
              </Nav.Item>
            </>
          )}
          <Nav.Item>
            <Link to="/cart" className="nav-link">Cart</Link>
          </Nav.Item>
          {isAuthenticated && (
            <>
              <Nav.Item>
                <Link to="/profile" className="nav-link">
                  <FaUserCircle /> Profile
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/logout" className="nav-link">Logout</Link> {/* Ensure you handle the logout functionality */}
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
