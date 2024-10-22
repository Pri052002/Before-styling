import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegistrarDashboard.css';

const RegistrarDashboard = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5033/api/registrar'; // Replace with your actual API URL

    useEffect(() => {
        fetchPendingUsers();
        fetchStudents();
        fetchProfessors();
        fetchPendingCourses(); // Fetch pending courses
    }, []);

    // Fetch pending users (students and professors awaiting approval)
    const fetchPendingUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/pending-users`);
            setPendingUsers(response.data);
        } catch (error) {
            setError('Error fetching pending users.');
        }
    };

    // Fetch approved students
    const fetchStudents = async () => {
        try {
            const response = await axios.get(`${API_URL}/students`);
            setStudents(response.data);
        } catch (error) {
            setError('Error fetching students.');
        }
    };

    // Fetch approved professors
    const fetchProfessors = async () => {
        try {
            const response = await axios.get(`${API_URL}/professors`);
            setProfessors(response.data);
        } catch (error) {
            setError('Error fetching professors.');
        }
    };

    // Fetch pending courses
    const fetchPendingCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}/pending-courses`);
            setPendingCourses(response.data);
        } catch (error) {
            setError('Error fetching pending courses.');
        }
    };

    // Approve a user (student or professor)
    const approveUser = async (userId) => {
        try {
            await axios.post(`${API_URL}/approve/${userId}`);
            fetchPendingUsers(); // Refresh pending users list
            alert('User approved successfully.');
        } catch (error) {
            setError('Error approving user.');
        }
    };

    // Reject a user (student or professor)
    const rejectUser = async (userId) => {
        try {
            await axios.post(`${API_URL}/reject/${userId}`);
            fetchPendingUsers(); // Refresh pending users list
            alert('User rejected successfully.');
        } catch (error) {
            setError('Error rejecting user.');
        }
    };

    // Suspend a professor
    const suspendProfessor = async (userId) => {
        try {
            await axios.post(`${API_URL}/suspend-professor/${userId}`);
            fetchProfessors(); // Refresh professors list
            alert('Professor suspended successfully.');
        } catch (error) {
            setError('Error suspending professor.');
        }
    };

    // Delete a student
    const deleteStudent = async (userId) => {
        try {
            await axios.delete(`${API_URL}/delete-student/${userId}`);
            fetchStudents(); // Refresh students list
            alert('Student deleted successfully.');
        } catch (error) {
            setError('Error deleting student.');
        }
    };

    // Approve a course
    const approveCourse = async (courseId) => {
        try {
            await axios.post(`${API_URL}/approve-course/${courseId}`);
            fetchPendingCourses(); // Refresh pending courses list
            alert('Course approved successfully.');
        } catch (error) {
            setError('Error approving course.');
        }
    };

    // Reject a course
    const rejectCourse = async (courseId) => {
        try {
            const response = await axios.post(`${API_URL}/reject-course/${courseId}`);
            console.log(response.data); // Log the response to see what's returned
            fetchPendingCourses(); // Refresh pending courses list
            alert('Course rejected successfully.');
        } catch (error) {
            console.error(error.response?.data || error.message); // Log more detailed error info
            setError('Error rejecting course.');
        }
    };
    

    return (
        <div className="registrar-dashboard">
            <h1>Registrar Dashboard</h1>

            {error && <p className="error">{error}</p>}

            {/* Pending Users Section */}
            <h2>Pending Users</h2>
            <ul>
                {pendingUsers.map((user) => (
                    <li key={user.userId}>
                        {user.username} - {user.email}
                        <div>
                            <button onClick={() => approveUser(user.userId)}>Approve</button>
                            <button onClick={() => rejectUser(user.userId)}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Approved Students Section */}
            <h2>Approved Students</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.userId}>
                        {student.username} - {student.email}
                        <button onClick={() => deleteStudent(student.userId)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Approved Professors Section */}
            <h2>Approved Professors</h2>
            <ul>
                {professors.map((professor) => (
                    <li key={professor.userId}>
                        {professor.username} - {professor.email}
                        <button onClick={() => suspendProfessor(professor.userId)}>Suspend</button>
                    </li>
                ))}
            </ul>
{/* Pending Courses Section */}
<h2>Pending Courses</h2>
{pendingCourses.length > 0 ? (
    <ul>
        {pendingCourses.map((course) => (
            <li key={course.courseId}>
                <strong>{course.title}</strong> - {course.description} <br />
                <em>Start Date: {new Date(course.startDate).toLocaleDateString()}</em> <br />
                <em>End Date: {new Date(course.endDate).toLocaleDateString()}</em> <br />
                <strong>Price:</strong> {course.price}
                <div>
                    <button onClick={() => approveCourse(course.courseId)}>Approve</button>
                    <button onClick={() => rejectCourse(course.courseId)}>Reject</button>
                </div>
            </li>
        ))}
    </ul>
) : (
    <p>No pending courses available.</p>
)}

        </div>
    );
};

export default RegistrarDashboard;
