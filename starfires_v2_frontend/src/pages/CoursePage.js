// All the imports required for the page
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axiosDefaults';
import Lesson from '../components/Lesson';

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const { courseId } = useParams();
  const userId = 'userIdFromAuthContext'; // INPUT_REQUIRED {Insert the actual user ID retrieval logic}

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseResult = await axios.get(`/courses/${courseId}`);
      const progressResult = await axios.get(`/courses/progress/${userId}/${courseId}`);
      
      setCourse(courseResult.data);
      setProgress(progressResult.data);
    };

    fetchCourseDetails();
  }, [courseId, userId]);

  return (
    <div>
      {course && (
        <>
          <h1>{course.title}</h1>
          {course.content.map(module => (
            <div key={module.moduleTitle}>
              <h2>{module.moduleTitle}</h2>
              {module.lessons.map(lesson => 
                <Lesson 
                  key={lesson.lessonTitle}
                  lesson={lesson}
                  courseId={courseId}
                  moduleId={module._id}
                  isCompleted={progress && progress.progress && progress.progress.some(p => p.moduleId === module._id && p.lessonsCompleted.includes(lesson._id))}
                />
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CoursePage;
