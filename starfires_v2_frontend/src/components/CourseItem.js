// All the imports required for the component
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CourseItem = ({ course }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{course.title}</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <Button variant='primary' href={`/courses/${course._id}`}>View Course</Button>
      </Card.Body>
    </Card>
  );
};

export default CourseItem;
