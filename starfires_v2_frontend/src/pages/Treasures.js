import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Treasures = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Astrology Treasures</h1>
                    <p>Discover a curated selection of astrology books.</p>
                </Col>
            </Row>
            {/* Example product card */}
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src="path-to-book-image.jpg" />
                        <Card.Body>
                            <Card.Title>Book Title</Card.Title>
                            <Card.Text>Short description of the book.</Card.Text>
                            <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Repeat for other products */}
            </Row>
        </Container>
    );
};

export default Treasures;
