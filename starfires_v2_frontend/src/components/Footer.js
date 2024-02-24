import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <Container>
        <span>&copy; {new Date().getFullYear()} Starfires </span>
      </Container>
    </footer>
  );
};

export default Footer;