import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Library = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Astrology Library</h1>
                    <p>Explore articles, blogs, and resources to deepen your astrological knowledge.</p>
                </Col>
            </Row>
            {/* Components for listing articles, search functionality, etc. */}
        </Container>
    );
};

export default Library;
