import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../BaseAPI'; // Ensure the path is correct
import Enrollment from './Enrollment';

const CourseList = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null); // State to capture any errors

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetchCourses();
                console.log('Courses Response:', response.data); // Debugging response
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to fetch courses.'); // Set error message
            }
        };

        getCourses();
    }, []);

    return (
        <div>
            <h2>Available Courses</h2>
            {error && <p>{error}</p>} {/* Display error if it exists */}
            {courses.length > 0 ? (
                courses.map(course => (
                    <div key={course.courseId}>
                        <h3>{course.title}</h3> {/* Match the API response keys */}
                        <p>{course.description}</p>
                        <p>Price: ${course.price}</p> {/* Ensure price key is correct */}
                        <p>Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
                        <p>End Date: {new Date(course.endDate).toLocaleDateString()}</p>
                        <Enrollment 
                courseId={course.courseId} 
                studentId={studentId} 
                courseTitle={course.title} // Pass title
                coursePrice={course.price} // Pass price
            />
                    </div>
                ))
            ) : (
                <p>No courses available at the moment.</p>
            )}
        </div>
    );
};

export default CourseList;
