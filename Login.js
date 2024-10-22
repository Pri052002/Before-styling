import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5033/api/User/login', {
                email,
                password,
            });

            console.log('Login Response:', response.data); // Log response data

            const { token, role, username, userId, roleSpecificIdKey } = response.data; // Added 'roleSpecificIdKey'

            // Save the JWT token, role, username, and userId in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem(roleSpecificIdKey, userId); // Dynamically save as professorId or studentId

            // Navigate based on role
            switch (role) {
                case 'Student':
                    navigate('/student-dashboard');
                    break;
                case 'Professor':
                    navigate('/professor-dashboard');
                    break;
                case 'Registrar':
                    navigate('/registrar-dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }

        } catch (error) {
            console.error('Login Error:', error); // Log any error
            const errorMsg = error.response?.data || 'Login failed. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
