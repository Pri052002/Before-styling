import React,{useEffect,useState} from 'react';
import CourseList from './CourseList';
import axios from 'axios';
const StudentDashboard = () => {
    // Fetch studentId from localStorage
    const studentId = localStorage.getItem('studentId');
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!studentId) {
        return <p>Please log in to view your dashboard.</p>;
    }

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5033/api/Student/courses/${studentId}`);
            setEnrolledCourses(response.data.enrolledCourses);
            setAvailableCourses(response.data.availableCourses);
        } catch (err) {
            setError(err.response?.data || "Failed to fetch courses.");
        }
    };

    fetchCourses();
}, [studentId]);

if (error) {
    return <p>{error}</p>;
}


return (
    <div className="App">
        <h1>Student Dashboard</h1>

        <h2>Enrolled Courses</h2>
        {enrolledCourses.length === 0 ? (
            <p>No enrolled courses.</p>
        ) : (
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course.courseId}>
                        {course.title} - {course.description} (${course.price})
                    </li>
                ))}
            </ul>
        )}

        <h2>Available Courses</h2>
        {availableCourses.length === 0 ? (
            <p>No available courses.</p>
        ) : (
            <ul>
                {availableCourses.map(course => (
                    <li key={course.courseId}>
                        {course.title} - {course.description} (${course.price})
                        {/* Add an enroll button here if needed */}
                    </li>
                ))}
            </ul>
        )}

        {/* You can keep your CourseList component here if needed */}
         <CourseList studentId={studentId} /> 
    </div>
);
};
export default StudentDashboard;
