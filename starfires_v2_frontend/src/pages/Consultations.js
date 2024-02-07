import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Consultations = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Personalized Astrology Consultations</h1>
                    <p>Book a private consultation for personalized astrological insights.</p>
                    <Button variant="secondary">Book Now</Button>
                </Col>
            </Row>
            {/* Additional information and booking form */}
        </Container>
    );
};

export default Consultations;
