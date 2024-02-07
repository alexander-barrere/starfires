import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Stargate = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Stargate: Live Astrology Chat</h1>
                    <p>Connect with astrologers and enthusiasts in real-time discussions.</p>
                    <Button variant="primary">Join Live Chat</Button>
                </Col>
            </Row>
            {/* Additional content and components specific to Stargate */}
        </Container>
    );
};

export default Stargate;
