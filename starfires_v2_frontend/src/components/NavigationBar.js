import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token') ? true : false;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
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
          <Nav>
            {isAuthenticated && (
              <Nav.Item>
                <Link to="/cart" className="nav-link">Cart</Link>
              </Nav.Item>
            )}
          </Nav>
          {isAuthenticated && (
            <>
              <Nav.Item>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </Nav.Item>
              <Nav.Item onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                Logout
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
