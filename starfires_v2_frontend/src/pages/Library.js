import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Library = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <div style={{ backgroundColor: '#000000', padding: '2rem', borderRadius: '0.5rem' }}>
                        <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '1rem' }}>Astrology Library</h1>
                        <p style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Explore articles, blogs, and resources to deepen your astrological knowledge.</p>
                        <a href="http://www.starfires.io/blog" style={{ color: '#ff9900', fontSize: '1.2rem', textDecoration: 'none' }}>Visit our blog</a>
                    </div>
                </Col>
            </Row>
            {/* Components for listing articles, search functionality, etc. */}
        </Container>
    );
};

export default Library;
