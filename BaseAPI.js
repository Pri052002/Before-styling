import axios from 'axios';

const API_BASE_URL = 'http://localhost:5033/api/Student';

// Fetch all courses
export const fetchCourses = () => {
    return axios.get(`${API_BASE_URL}/courses`);
};

// Enroll in a course
export const enrollInCourse = (studentId, courseId) => {
    return axios.post(`${API_BASE_URL}/enroll?studentId=${studentId}&courseId=${courseId}`);
};

// Pay for a course
export const payForCourse = (enrollmentId) => {
    return axios.post(`${API_BASE_URL}/pay`, null, { params: { enrollmentId } });
};

// Fetch modules for a specific course
export const fetchModulesByCourseId = (courseId) => {
    return axios.get(`${API_BASE_URL}/modules/${courseId}`);
};
