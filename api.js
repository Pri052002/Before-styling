import axios from 'axios';

const API_URL = 'http://localhost:5033/api'; // Adjust to your backend URL

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/user/register`, userData);
};

export const loginUser = async (loginData) => {
    return await axios.post(`${API_URL}/user/login`, loginData);
};

export const getUnapprovedUsers = async (token) => {
    return await axios.get(`${API_URL}/registrar/unapproved-users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Additional API calls can be added here
