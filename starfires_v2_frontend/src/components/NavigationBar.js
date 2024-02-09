import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar-custom">
      <Link to="/" className="navbar-brand">Starfires V2</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
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
          <Nav.Item>
            <Link to="/login" className="nav-link">Login</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register" className="nav-link">Register</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/cart" className="nav-link">Cart</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
