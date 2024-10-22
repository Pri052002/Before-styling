import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    isActive: false,
    courseStartDate: '',
    courseEndDate: '',
    payment: 0.0,
    professorId: 0 // This will be set from localStorage
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch professorId from localStorage when the component mounts
  useEffect(() => {
    const storedProfessorId = localStorage.getItem('userid'); // Get professorId from localStorage
    if (storedProfessorId) {
      setCourse((prev) => ({
        ...prev,
        professorId: parseInt(storedProfessorId, 10), // Parse as an integer
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset previous error
    setSuccess(''); // Reset previous success message

    // Prepare the course data to send to the backend
    const courseData = {
      title: course.title,
      description: course.description,
      isActive: course.isActive,
      courseStartDate: course.courseStartDate,
      courseEndDate: course.courseEndDate,
      payment: course.payment,
      professorId: course.professorId // Send professorId as an integer
    };

    try {
      const token = localStorage.getItem('token'); // Token fetched from localStorage

      const response = await axios.post(
        'http://localhost:5033/api/Professor/createcourse',
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in Authorization header
          },
        }
      );

      setSuccess(`Course created successfully! ID: ${response.data.courseId}, Title: ${response.data.title}`);

      // Reset form after successful submission
      setCourse({
        title: '',
        description: '',
        isActive: false,
        courseStartDate: '',
        courseEndDate: '',
        payment: 0.0,
        professorId: course.professorId, // Keep the professorId intact
      });

      // Optional: Redirect to the course list or dashboard after successful submission
      // navigate('/professor-dashboard'); 

    } catch (error) {
      if (error.response && error.response.data) {
        setError('Error: ' + JSON.stringify(error.response.data));
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Is Active:</label>
          <input
            type="checkbox"
            name="isActive"
            checked={course.isActive}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Course Start Date:</label>
          <input
            type="date"
            name="courseStartDate"
            value={course.courseStartDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Course End Date:</label>
          <input
            type="date"
            name="courseEndDate"
            value={course.courseEndDate}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Payment:</label>
          <input
            type="number"
            name="payment"
            value={course.payment}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;