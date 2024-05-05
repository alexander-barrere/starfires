import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const renderCard = (image, title, text, buttonText) => (
    <Col md={4}>
        <img variant="top" src={image} />
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
          <Button variant="primary">{buttonText}</Button>
        </div>
    </Col>
  );

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h1>Welcome to Starfires</h1>
          <p className="lead">Explore the mysteries of the stars and unlock the secrets of your zodiac.</p>
        </Col>
      </Row>

      <Row className="my-4">
        {renderCard("/images/venus.jpg", "Live Astrology Chat", "Join our live sessions and chat with Christine in real-time.", "Join Now")}
        {renderCard("/images/venus_2.jpg", "Astrology Treasures", "Discover our exclusive selection of astrology books.", "Shop Now")}
        {renderCard("/images/saturn.jpg", "Learn & Master", "Enroll in our courses and master the art of astrology.", "Learn More")}
      </Row>

      <Row className="my-4">
        <Col>
          <h2>Personalized Astrology Consultations</h2>
          <p>Get tailored insights into your astrological profile with a private consultation.</p>
          <Button variant="secondary">Book a Session</Button>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h2>Customer Testimonials</h2>
          {/* Placeholder for testimonials */}
          <p>"I've never felt so understood. The personal reading was spot-on and enlightening!" - Jane Doe</p>
          {/* fetch and map through an array of testimonials here */}
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h2>Meet Our Team</h2>
          {/* Placeholder for team member profiles */}
          {/* You would typically fetch and map through an array of team member profiles here */}
        </Col>
      </Row>

      {/* INPUT_REQUIRED placeholder for additional content sections like FAQs, Blogs, etc. */}
      {/* Additional sections and components would be added here based on the sitemap details */}
    </Container>
  );
};

export default Home;
