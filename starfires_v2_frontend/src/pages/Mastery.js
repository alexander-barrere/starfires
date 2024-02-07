import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Mastery = () => {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={8}>
                    <h1>Astrology Mastery Courses</h1>
                    <p>Enroll in courses to master astrology, from beginner to advanced levels.</p>
                    <Button variant="primary">View Courses</Button>
                </Col>
            </Row>
            {/* Course listings and details */}
        </Container>
    );
};

export default Mastery;
