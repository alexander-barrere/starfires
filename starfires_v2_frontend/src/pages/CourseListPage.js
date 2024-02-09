// All the imports required for the page
import React, { useState, useEffect } from 'react';
import CourseItem from '../components/CourseItem';
import axios from '../utils/axiosDefaults';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await axios.get('/courses');
      setCourses(result.data);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <div>
        {courses.map(course => (
          <CourseItem key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
