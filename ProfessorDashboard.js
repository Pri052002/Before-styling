import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseService from './CourseService'; // API service for backend interaction
import { useNavigate } from 'react-router-dom';

const ProfessorDashboard = () => {
  const [professorId, setProfessorId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch ProfessorId from localStorage
  useEffect(() => {
    const storedProfessorId = localStorage.getItem('professorId');
    if (storedProfessorId) {
      setProfessorId(parseInt(storedProfessorId));
      fetchCourses(); // Fetch courses once professorId is set
    }
  }, []);

  // Fetch courses related to the professorId
  const fetchCourses = async () => {
    try {
      const storedProfessorId = localStorage.getItem('professorId');
      if (storedProfessorId) {
        const response = await axios.get(`http://localhost:5033/api/Courses/courses/${storedProfessorId}`);
        setCourses(response.data);
      } else {
        console.error('Professor ID not found in local storage.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreateModule = () => {
    navigate('/create-module'); // Redirect to CreateModule.js page
  };

  // Fetch all modules for a given course
  const fetchModules = async (courseId) => {
    try {
      const data = await CourseService.getModulesByCourseId(courseId);
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Professor Dashboard</h1>

      <div className="courses-section">
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.courseId}>
              <strong>{course.title}</strong> - {course.description}
              <button onClick={() => fetchModules(course.courseId)}>View Modules</button>
              <ul>
                {modules
                  .filter((module) => module.courseId === course.courseId)
                  .map((module) => (
                    <li key={module.moduleId}>
                      {module.title} (Order: {module.order})
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-module-button">
        <button onClick={handleCreateModule}>Create New course</button>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
