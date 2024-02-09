// All the imports required for the component
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from '../utils/axiosDefaults';

const Lesson = ({ lesson, courseId, moduleId, isCompleted }) => {
  const completeLesson = async () => {
    await axios.post('/courses/progress/update', {
      userId: 'userIdFromAuthContext', // INPUT_REQUIRED {Replace with the actual user ID retrieval logic}
      courseId,
      moduleId,
      lessonId: lesson._id
    });
    // Trigger the UI to reflect the lesson completion
  };

  return (
    <div className={`lesson ${isCompleted ? 'completed' : ''}`}>
      <h3>{lesson.lessonTitle}</h3>
      <Button onClick={completeLesson} disabled={isCompleted}>
        Mark as Completed
      </Button>
    </div>
  );
};

export default Lesson;
