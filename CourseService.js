import axios from 'axios';

const API_URL = 'http://localhost:5033/api';

const CourseService = {
  getCourses: async () => {
    const response = await axios.get(`${API_URL}/Courses`);
    return response.data;
  },
  createCourse: async (course) => {
    await axios.post(`${API_URL}/Courses`, course);
  },
  createModule: async (module) => {
    await axios.post(`${API_URL}/Modules`, module);
  },
  getModulesByCourseId: async (courseId) => {
    const response = await axios.get(`${API_URL}/Modules/course/${courseId}`);
    return response.data;
  },
};

export default CourseService;
